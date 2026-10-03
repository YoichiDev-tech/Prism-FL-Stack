import { NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { useTheme } from "../context/ThemeContext";

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${
    isActive ? "text-ink" : "text-ink/50 hover:text-ink"
  }`;

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-base font-semibold tracking-tight text-ink">
            PrismStack
          </span>
        </NavLink>
        <nav className="flex items-center gap-6">
          <NavLink to="/tools" end className={linkClasses}>
            Tools
          </NavLink>
          <NavLink to="/categories" className={linkClasses}>
            Categories
          </NavLink>
          <NavLink to="/presets" className={linkClasses}>
            Presets
          </NavLink>
          <NavLink to="/stack" className={linkClasses}>
            My Stack
          </NavLink>
          <NavLink to="/export" className={linkClasses}>
            Export
          </NavLink>
          <NavLink to="/about" className={linkClasses}>
            About
          </NavLink>
          <NavLink to="/faq" className={linkClasses}>
            FAQ
          </NavLink>
          <NavLink to="/submit" className={linkClasses}>
            Submit
          </NavLink>
          <NavLink to="/admin" className={linkClasses}>
            Admin
          </NavLink>
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-ink/50 hover:text-ink transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}