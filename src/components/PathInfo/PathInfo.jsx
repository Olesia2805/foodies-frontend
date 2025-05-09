import { Link } from 'react-router-dom';
import styles from './PathInfo.module.css';

const PathInfo = ({ currentPage }) => {
  return (
    <div className={styles.pathInfo}>
      <Link to="/" className={styles.link}>Home</Link>
      <span className={styles.separator}>/</span>
      <span className={styles.currentPage}>{currentPage}</span>
    </div>
  );
};

export default PathInfo;