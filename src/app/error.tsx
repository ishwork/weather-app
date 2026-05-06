"use client";

import styles from "./status-page.module.scss";

const ErrorPage = () => {
  return (
    <div className={styles.root}>
      <p className={styles.title}>Something went wrong.</p>
    </div>
  );
};

export default ErrorPage;
