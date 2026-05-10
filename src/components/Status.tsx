import styles from "@/components/WeatherView/WeatherView.module.scss";

type StatusProps = {
  message: string;
};

const Status = ({ message }: StatusProps) => {
  return (
    <div className={styles.statusPanel} data-testid="status-card">
      <p data-testid="status-message">{message}</p>
    </div>
  );
};

export default Status;
