import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.root}>
      <p className={styles.title}>Weather app</p>
    </header>
  );
};

export default Header;
