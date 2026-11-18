import React from "react";
import { Link } from "react-router-dom";
import usePageMeta from "../../hooks/usePageMeta";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  usePageMeta({
    title: "Page not found",
    description: "The page you are looking for does not exist.",
    noIndex: true,
  });

  return (
    <div className={styles.notFound}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.description}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className={styles.link}>
        Go back to home page
      </Link>
    </div>
  );
};

export default NotFound;
