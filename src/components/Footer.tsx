import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.root}>
      <p className={styles.note}>Built with Next.js</p>
    </footer>
  );
};

export default Footer;
