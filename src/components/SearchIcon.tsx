"use client";

import Image from "next/image";

const SearchIcon = () => (
  <Image
    src="/icons/search-icon.svg"
    alt=""
    width={14}
    height={14}
    aria-hidden="true"
    style={{ filter: "brightness(0) invert(1)" }}
  />
);

export default SearchIcon;
