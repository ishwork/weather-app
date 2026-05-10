import styles from "@/components/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.root} data-testid="site-footer">
      <p className={styles.note} data-testid="footer-note">
        Weather data from the{" "}
        <a
          href="https://open-meteo.com/"
          data-testid="footer-link"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Open-Meteo API
        </a>{" "}
        (open-meteo.com)
      </p>
    </footer>
  );
};

export default Footer;
