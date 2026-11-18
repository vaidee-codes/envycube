import React, { useLayoutEffect, useRef, useState } from "react";
import logoGif from "../../assets/works/logo/logo.gif";
import styles from "./LoadGifscreen.module.scss";

// The loader covers the page while the photos visible on screen download,
// so visitors never see empty white image boxes. The page renders underneath
// the loader straight away, which starts those downloads immediately.
//
// - First page of a visit: the full logo animation plays (at least 2s).
// - Later pages: if the visible photos are already loaded (cached), the page
//   shows instantly with no loader; otherwise the loader stays until they
//   arrive, for at least 1s so it never just flickers.
// - Either way the loader gives up after 6s on a very slow connection.
const FIRST_VISIT_MIN_MS = 2000;
const LATER_MIN_MS = 1000;
const MAX_MS = 6000;
const STORAGE_KEY = "envycube:splashShown";

// Module-level flag so this also holds when storage is unavailable
// (private mode, blocked site data).
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

// Images the loader waits for: those on screen now, plus any marked
// fetchpriority="high" (the main photo of a page), which covers components
// such as the carousel that size their slides only after mounting.
// Off-screen slides and images further down the page are skipped.
const criticalImages = (container) => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return [...container.querySelectorAll("img")].filter((img) => {
    if (img.getAttribute("fetchpriority") === "high") return true;
    const r = img.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw;
  });
};

const isLoaded = (img) => img.complete && img.naturalWidth > 0;

const withLoadGifScreen = (Component) => (props) => {
  const contentRef = useRef(null);
  const [showLoader, setShowLoader] = useState(true);

  // Runs before the first paint, so a page whose photos are cached never
  // shows the loader at all.
  useLayoutEffect(() => {
    const firstVisit = !hasSeenSplash();
    const pending = criticalImages(contentRef.current).filter((img) => !isLoaded(img));

    if (!firstVisit && pending.length === 0) {
      setShowLoader(false);
      return undefined;
    }

    const startedAt = Date.now();
    const minMs = firstVisit ? FIRST_VISIT_MIN_MS : LATER_MIN_MS;
    let remaining = pending.length;
    let hideTimer;
    let done = false;

    const hide = () => {
      if (done) return;
      done = true;
      markSplashSeen();
      setShowLoader(false);
    };

    const hideWhenMinElapsed = () => {
      const wait = Math.max(0, minMs - (Date.now() - startedAt));
      hideTimer = setTimeout(hide, wait);
    };

    const onImageSettled = () => {
      remaining -= 1;
      if (remaining === 0) hideWhenMinElapsed();
    };

    pending.forEach((img) => {
      img.addEventListener("load", onImageSettled, { once: true });
      img.addEventListener("error", onImageSettled, { once: true });
    });
    if (remaining === 0) hideWhenMinElapsed();
    const maxTimer = setTimeout(hide, MAX_MS);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(maxTimer);
      pending.forEach((img) => {
        img.removeEventListener("load", onImageSettled);
        img.removeEventListener("error", onImageSettled);
      });
    };
  }, []);

  return (
    <>
      {showLoader && (
        <section className={styles.wrapper} aria-busy="true">
          <div className={styles.gifContainer}>
            <img src={logoGif} alt="Loading" />
            <h3 className={styles.title1}>ENVYCUBE</h3>
            <div className={styles.title2}>ARCHITECTS</div>
          </div>
        </section>
      )}
      {/* display: contents keeps the page's own layout exactly as before */}
      <div ref={contentRef} style={{ display: "contents" }}>
        <Component {...props} />
      </div>
    </>
  );
};

export default withLoadGifScreen;
