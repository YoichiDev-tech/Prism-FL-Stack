import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storageKey = "prism-fl-stack-theme";
    const legacyKey = `${["prism", "stack"].join("")}-theme`;
    const saved =
      localStorage.getItem(storageKey) ?? localStorage.getItem(legacyKey);
    if (saved && !localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, saved);
    }
    localStorage.removeItem(legacyKey);
    return (saved as Theme) || "light";
  });

  useEffect(() => {
    localStorage.setItem("prism-fl-stack-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
