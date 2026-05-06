import type { Metadata } from "next";
import Link from "next/link";

import styles from "./status-page.module.scss";

export const metadata: Metadata = {
  title: "Page not found",
};

const NotFound = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.message}>
        The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <div className={styles.actions}>
        <Link href="/" className={styles.button}>
          Back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
