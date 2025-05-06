import styles from './MainTitle.module.css';

const MainTitle = ({ title }) => {
  return <h1 className={styles.mainTitle}>{title}</h1>;
};

export default MainTitle;