import { THEME_STORAGE_KEY } from "./themeConstants";

/** Applies the stored theme before the browser paints anything.
 *
 *  The server has no way to know which theme a visitor chose, so it always
 *  renders the light default. Without this script a returning dark-mode user
 *  would get a full white page until React hydrated and swapped the class —
 *  a flash that is far more jarring than the theme change itself.
 *
 *  It must stay a plain synchronous inline script rendered as the first child
 *  of `<body>`: React only hoists `async` scripts into `<head>`, so an inline
 *  one runs exactly where it sits in the markup, which is precisely the
 *  behaviour we want — parsing blocks here, before any content is painted.
 *
 *  Anything this touches must be wrapped in try/catch. `localStorage` throws
 *  outright in Safari's private mode and under some embedded webviews, and an
 *  exception in a blocking head-of-body script takes the whole page with it. */
const ThemeScript = () => {
  const script = `(function(){try{if(localStorage.getItem(${JSON.stringify(
    THEME_STORAGE_KEY
  )})==="dark"){document.documentElement.classList.add("dark")}}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};

export default ThemeScript;
