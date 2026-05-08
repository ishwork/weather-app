import { useLayoutEffect, useState } from "react";

import { formatLocalTime } from "@/lib/utils";

import styles from "@/components/WeatherView/WeatherView.module.scss";

type LocationHeaderProps = {
  location: string;
  utcOffsetSeconds: number;
};

const LocationHeader = ({
  location,
  utcOffsetSeconds,
}: LocationHeaderProps) => {
  const [localTime, setLocalTime] = useState(() =>
    formatLocalTime(utcOffsetSeconds),
  );

  useLayoutEffect(() => {
    const tick = () => setLocalTime(formatLocalTime(utcOffsetSeconds));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [utcOffsetSeconds]);

  return (
    <div className={styles.locationRow} data-testid="weather-location-header">
      <span className={styles.location} data-testid="weather-location-name">
        {location}
      </span>
      <span className={styles.localTime} data-testid="weather-local-time">
        Local time: {localTime}
      </span>
    </div>
  );
};

export default LocationHeader;
