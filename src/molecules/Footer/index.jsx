import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footerContainer}>
      &copy; {currentYear} Envycube Architects. All rights reserved.
    </footer>
  );
};

export default Footer;
