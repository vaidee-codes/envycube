import React from "react";
import { NavLink } from "react-router-dom";
import { Drawer } from "antd";
import { InstagramOutlined } from "@ant-design/icons";
import styles from "./Header.module.scss";

const MenuItems = [
  { label: "HOME", to: "/" },
  { label: "ABOUT", to: "/about" },
  { label: "SERVICES", to: "/services" },
  { label: "WORKS", to: "/works" },
  { label: "CONTACT", to: "/contact" },
];

const AppMenu = ({ open, onClickLink }) => {
  return (
    <Drawer
      rootClassName={styles.drawerContainer}
      styles={{ header: { display: "none" } }}
      open={open}
      placement="bottom"
      aria-label="Site menu"
    >
      <div id="app-menu" className={styles.appMenuContent}>
        <nav aria-label="Main">
          {MenuItems.map(({ label, to }) => (
            <div key={to}>
              <NavLink
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
                onClick={onClickLink}
                to={to}
                end
              >
                {label}
              </NavLink>
            </div>
          ))}
        </nav>
        <p className={styles.rightText}>
          ARCHITECTURE | INTERIOR | PLANNING | CONSTRUCTION
        </p>
        <footer>
          <a
            className={styles.socialLink}
            href="https://www.instagram.com/envycube_architects"
            target="_blank"
            rel="noreferrer"
            aria-label="Envycube Architects on Instagram"
          >
            <InstagramOutlined aria-hidden="true" />
          </a>
        </footer>
      </div>
    </Drawer>
  );
};

export default AppMenu;
