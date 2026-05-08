"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "@/components/SearchBar.module.scss";
import type { GeoSuggestion } from "@/types/weather";
import useGeocode from "@/hooks/useGeocode";

import SearchIcon from "@/components/SearchIcon";

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const { suggestions, loading } = useGeocode(query);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const id = setTimeout(() => setActiveIndex(-1), 0);
    return () => clearTimeout(id);
  }, [suggestions]);

  const handleSelect = (suggestion: GeoSuggestion) => {
    setQuery(suggestion.name);
    setOpen(false);
    setActiveIndex(-1);
    setSearchError(null);
    router.replace(`/?city=${encodeURIComponent(suggestion.name)}`, {
      scroll: false,
    });
  };

  const handleSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setOpen(false);
    setSearchError(null);
    setSearching(true);

    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(trimmed)}`);
      const data = await res.json();
      const results: GeoSuggestion[] = data.results ?? [];

      if (results.length === 0) {
        setSearchError("City not found");
      } else {
        setOpen(false);
        setSearchError(null);
        setQuery(results[0].name);
        router.replace(`/?city=${encodeURIComponent(results[0].name)}`, {
          scroll: false,
        });
      }
    } catch {
      setSearchError("City not found");
    } finally {
      setSearching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setOpen(true);
    setSearchError(null);
    if (!value.trim()) {
      router.replace("/", { scroll: false });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isOpen) {
      handleSearch();
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        const next = Math.min(activeIndex + 1, suggestions.length - 1);
        setActiveIndex(next);
        itemRefs.current[next]?.scrollIntoView({ block: "nearest" });
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const prev = Math.max(activeIndex - 1, 0);
        setActiveIndex(prev);
        itemRefs.current[prev]?.scrollIntoView({ block: "nearest" });
        break;
      }
      case "Enter": {
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          handleSelect(suggestions[activeIndex]);
        } else {
          handleSearch();
        }
        break;
      }
      case "Escape": {
        setOpen(false);
        setActiveIndex(-1);
        break;
      }
    }
  };

  const hasQuery = query.trim().length >= 2;
  const noResults = hasQuery && !loading && suggestions.length === 0;
  const isOpen = open && (suggestions.length > 0 || noResults);

  return (
    <div
      className={styles.root}
      data-testid="search-bar"
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls="city-suggestions"
    >
      <div className={styles.inputWrapper}>
        <div className={styles.inputField}>
          <input
            type="search"
            className={styles.input}
            data-testid="city-search-input"
            placeholder="Search city…"
            value={query}
            onChange={handleChange}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            onKeyDown={handleKeyDown}
            aria-label="Search city"
            aria-autocomplete="list"
            aria-activedescendant={
              activeIndex >= 0 ? `city-suggestion-${activeIndex}` : undefined
            }
          />
          {isOpen && (
            <ul
              id="city-suggestions"
              className={styles.dropdown}
              role="listbox"
              data-testid="city-suggestions"
            >
              {noResults ? (
                <li
                  className={styles.empty}
                  role="option"
                  aria-selected={false}
                  data-testid="city-suggestions-empty"
                >
                  City not found
                </li>
              ) : (
                suggestions.map((suggestion, index) => (
                  <li
                    key={suggestion.id}
                    id={`city-suggestion-${index}`}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    role="option"
                    aria-selected={index === activeIndex}
                    className={`${styles.option}${index === activeIndex ? ` ${styles.optionActive}` : ""}`}
                    data-testid={`city-suggestion-${suggestion.id}`}
                    onMouseDown={() => handleSelect(suggestion)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <span className={styles.optionCity}>{suggestion.name}</span>
                    <span className={styles.optionMeta}>
                      {suggestion.admin1 ? `${suggestion.admin1}, ` : ""}
                      {suggestion.country}
                    </span>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
        <button
          className={styles.searchButton}
          onClick={handleSearch}
          disabled={searching || !query.trim()}
          aria-label="Search"
          type="button"
          data-testid="city-search-submit"
        >
          <SearchIcon />
        </button>
      </div>
      {searchError && (
        <p
          className={styles.searchError}
          role="alert"
          data-testid="city-search-error"
        >
          {searchError}
        </p>
      )}
    </div>
  );
};

export default SearchBar;
