export type Theme = "light" | "dark";

/** Shared by the pre-paint script and the provider. They must agree on this
 *  key or the script would restore a theme the provider never wrote. */
export const THEME_STORAGE_KEY = "bn-theme";

export const DARK_CLASS = "dark";
