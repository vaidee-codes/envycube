import React, { useEffect, useState } from "react";
import logoGif from "../../assets/works/logo/logo.gif";
import styles from "./LoadGifscreen.module.scss";

const SPLASH_DURATION_MS = 2000;
const STORAGE_KEY = "envycube:splashShown";

// The splash animation plays once per browser session; later page visits
// render immediately. Kept at module level so it also holds when storage is
// unavailable (private mode, blocked site data).
let splashShownThisLoad = false;

const hasSeenSplash = () => {
  if (splashShownThisLoad) return true;
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

const markSplashSeen = () => {
  splashShownThisLoad = true;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Storage unavailable: the module-level flag still covers this page load.
  }
};

const withLoadGifScreen = (Component) => (props) => {
  const [showGif, setShowGif] = useState(() => !hasSeenSplash());

  useEffect(() => {
    if (!showGif) return undefined;
    const timer = setTimeout(() => {
      markSplashSeen();
      setShowGif(false);
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [showGif]);

  if (showGif) {
    return (
      <section className={styles.wrapper} aria-busy="true">
        <div className={styles.gifContainer}>
          <img src={logoGif} alt="Loading" />
          <h3 className={styles.title1}>ENVYCUBE</h3>
          <div className={styles.title2}>ARCHITECTS</div>
        </div>
      </section>
    );
  }

  return <Component {...props} />;
};

export default withLoadGifScreen;
