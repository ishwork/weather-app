import styles from "@/components/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.root} data-testid="site-footer">
      <p className={styles.note} data-testid="footer-note">
        Built with Next.js
      </p>
    </footer>
  );
};

export default Footer;
