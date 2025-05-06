import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Oops! Page Not Found</h2>
      <p className={styles.text}>
        It seems that the page you are looking for doesn't exist or has been
        moved. You may have entered an incorrect URL or followed an outdated
        link.
      </p>
      <div className={styles.buttonContainer}>
        <Link to="/">
          <Button variant="primary" width="220px">
            Back to Home
          </Button>
        </Link>
        <Link to="/recipes">
          <Button variant="outlined" width="220px">
            Browse Recipes
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
