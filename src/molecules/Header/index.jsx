import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import AppMenu from "./AppMenu";
import logoBlack from "../../assets/works/logo/logo_black.svg";
import logoWhite from "../../assets/works/logo/logo_white.svg";
import styles from "./Header.module.scss";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { pathname } = useLocation();

  const isHomePage = pathname === "/" && !showMenu;

  const toggleShowMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <>
      <header
        id="header"
        className={`${styles.headerContainer} ${
          isHomePage ? styles.homePageHeader : ""
        }`}
      >
        <NavLink className={styles.title} to="/">
          {/* Decorative: the link's text already names the firm */}
          <img src={isHomePage ? logoWhite : logoBlack} alt="" />
          <div>
            <h3>ENVYCUBE</h3>
            <span>ARCHITECTS</span>
          </div>
        </NavLink>
        <div className={styles.rightContainer}>
          <button
            type="button"
            className={styles.menuButton}
            onClick={toggleShowMenu}
            aria-label={showMenu ? "Close menu" : "Open menu"}
            aria-expanded={showMenu}
            aria-controls="app-menu"
          >
            {showMenu ? (
              <CloseOutlined aria-hidden="true" />
            ) : (
              <MenuOutlined aria-hidden="true" />
            )}
          </button>
        </div>
      </header>
      <AppMenu open={showMenu} onClickLink={toggleShowMenu} />
    </>
  );
};

export default Header;
