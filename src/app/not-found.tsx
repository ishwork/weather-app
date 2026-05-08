"use client";

import Link from "next/link";
import { useEffect } from "react";

import styles from "@/app/status-page.module.scss";

const NotFound = () => {
  useEffect(() => {
    document.title = "Page not found";
  }, []);

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.message}>
        The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <Link href="/" className={styles.statusAction}>
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
