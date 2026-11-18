import { useEffect } from "react";

// Public address of the site, used for canonical and social-share URLs.
// Update this if the domain changes (also in public/index.html,
// public/robots.txt and public/sitemap.xml).
export const SITE_URL = "https://www.envycubearchitects.com";

const SITE_NAME = "Envycube Architects";

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

/**
 * Sets the document title, description, canonical URL and social tags for a page.
 *
 * @param {object} meta
 * @param {string} meta.title        page title; " | Envycube Architects" is appended
 * @param {string} meta.description  meta description, ideally under 160 characters
 * @param {string} [meta.path]       canonical path, e.g. "/about"
 * @param {boolean} [meta.noIndex]   ask search engines not to index the page
 */
const usePageMeta = ({ title, description, path, noIndex = false }) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("name", "robots", noIndex ? "noindex, follow" : "index, follow");
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    if (path !== undefined) {
      const url = `${SITE_URL}${path}`;
      setCanonical(url);
      setMeta("property", "og:url", url);
    } else {
      // No canonical URL for this page (e.g. 404): don't leave the previous page's.
      document.head.querySelector('link[rel="canonical"]')?.remove();
    }
  }, [title, description, path, noIndex]);
};

export default usePageMeta;
