"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
const themes = ["light", "dark", "system"];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("system");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (themes.includes(saved)) setTheme(saved);
    } catch {
      // System mode still works when browser storage is unavailable.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    function applyTheme() {
      const resolved =
        theme === "system" ? (preference.matches ? "dark" : "light") : theme;
      document.documentElement.setAttribute("data-theme", resolved);
      document.documentElement.setAttribute("data-theme-preference", theme);
    }
    applyTheme();
    if (theme !== "system") return;
    preference.addEventListener("change", applyTheme);
    return () => preference.removeEventListener("change", applyTheme);
  }, [theme, ready]);

  function toggleTheme() {
    const selected = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(selected);
    try {
      localStorage.setItem("theme", selected);
    } catch {
      // The current selection remains usable without persistence.
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
