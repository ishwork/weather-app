"use client";

import styles from "@/app/status-page.module.scss";

const ErrorPage = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Something went wrong!</h1>
      <button
        type="button"
        className={styles.statusAction}
        onClick={() => window.location.reload()}
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorPage;
