import styles from "@/components/WeatherView/WeatherView.module.scss";

type LoadingProps = {
  message: string;
};

const Loading = ({ message }: LoadingProps) => {
  return (
    <div
      className={styles.loadingCard}
      data-testid="loading-card"
      role="status"
      aria-live="polite"
    >
      <div className={styles.loadingSpinner} data-testid="loading-spinner" />
      <p className={styles.loadingMessage} data-testid="loading-message">
        {message}
      </p>
    </div>
  );
};

export default Loading;
