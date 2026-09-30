"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { DARK_CLASS, THEME_STORAGE_KEY, type Theme } from "./themeConstants";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/* The theme is not React state — it is a class on `<html>` that a blocking
 * script already set before React existed on the page. Mirroring it into
 * `useState` would mean writing that value back during an effect, which is a
 * cascading render and reads the DOM a beat after the user already saw it.
 *
 * `useSyncExternalStore` models it for what it is: external state React
 * subscribes to. It also solves hydration for free — `getServerSnapshot`
 * returns the light default the server rendered, and React re-reads the real
 * snapshot immediately after hydrating, with no mismatch warning. */

const listeners = new Set<() => void>();

const notify = () => {
  for (const listener of listeners) listener();
};

const subscribe = (onStoreChange: () => void) => {
  listeners.add(onStoreChange);

  // A sibling tab changed the theme. Mirror it onto this document first, then
  // let React re-read; otherwise the snapshot would report the old class.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    document.documentElement.classList.toggle(
      DARK_CLASS,
      event.newValue === "dark"
    );
    notify();
  };

  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
};

/** The document is the honest source: it is what the visitor is actually
 *  looking at. Reading storage instead would let the toggle disagree with the
 *  screen if the two ever drifted. */
const getSnapshot = (): Theme =>
  document.documentElement.classList.contains(DARK_CLASS) ? "dark" : "light";

const getServerSnapshot = (): Theme => "light";

const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle(DARK_CLASS, theme === "dark");
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private-mode Safari and some embedded webviews refuse to persist. The
    // theme still applies to this page view, it just will not outlive it.
  }
  notify();
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => applyTheme(next), []);

  const toggleTheme = useCallback(
    // Derived from the document rather than from `theme` so a fast double
    // click cannot read a stale value and land back where it started.
    () => applyTheme(getSnapshot() === "dark" ? "light" : "dark"),
    []
  );

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
