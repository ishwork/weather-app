import Link from "next/link";

import styles from "@/components/Header.module.scss";

import SearchBar from "@/components/SearchBar";
import UnitToggle from "@/components/UnitToggle";

const Header = () => {
  return (
    <header className={styles.root} data-testid="site-header">
      <Link href="/" className={styles.title} data-testid="site-title-link">
        CheckWeather
      </Link>
      <SearchBar />
      <UnitToggle />
    </header>
  );
};

export default Header;
