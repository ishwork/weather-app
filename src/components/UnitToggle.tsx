"use client";

import { useUnit } from "@/contexts/UnitContext";

import styles from "@/components/UnitToggle.module.scss";

const UnitToggle = () => {
  const { unit, toggle } = useUnit();

  return (
    <div
      className={styles.root}
      aria-label="Temperature unit"
      data-testid="unit-toggle"
    >
      <button
        className={`${styles.option}${unit === "c" ? ` ${styles.active}` : ""}`}
        onClick={() => unit !== "c" && toggle()}
        type="button"
        aria-pressed={unit === "c"}
        data-testid="unit-toggle-celsius"
      >
        °C
      </button>
      <button
        className={`${styles.option}${unit === "f" ? ` ${styles.active}` : ""}`}
        onClick={() => unit !== "f" && toggle()}
        type="button"
        aria-pressed={unit === "f"}
        data-testid="unit-toggle-fahrenheit"
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;
