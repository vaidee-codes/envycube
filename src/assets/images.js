// Responsive image helper. The WebP variants and images.json are generated
// by scripts/optimize-images.py from the source photos in ./works.
import manifest from "./works/images.json";

const files = require.context("./works", true, /-\d+\.webp$/);

/**
 * Returns props for an <img>: src, srcSet, sizes, width and height.
 * width/height are the original photo's dimensions, so the image keeps the
 * same displayed size it had before and the browser can reserve its space.
 *
 * @param {string} key  "<folder>/<file name without extension>", e.g. "bedroom/1"
 * @param {string} [sizes] the `sizes` attribute, defaults to the full viewport width
 */
export const getImage = (key, sizes = "100vw") => {
  const entry = manifest[key];
  if (!entry) {
    throw new Error(`Unknown image "${key}". Run scripts/optimize-images.py.`);
  }
  const { width, height, widths } = entry;
  const url = (w) => files(`./${key}-${w}.webp`);
  return {
    src: url(widths[widths.length - 1]),
    srcSet: widths.map((w) => `${url(w)} ${w}w`).join(", "),
    sizes,
    width,
    height,
  };
};
