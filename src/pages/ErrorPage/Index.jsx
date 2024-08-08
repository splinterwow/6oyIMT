import React from 'react';
import errorPage from "../../assets/images/errorPageU.png";
import styles from './index.module.css';

function ErrorPage() {
  return (
    <div className={styles.container}>
      <img src={errorPage} alt="Error" className={styles.image} />
      <h1 className={styles.title}>Oops! Something went wrong.</h1>
      <p className={styles.description}>
        The page you're looking for doesn't exist or an error occurred. Please try again later.
      </p>
    </div>
  );
}

export default ErrorPage;
