import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Logo } from "./Logo";
import { useTheme } from "../context/ThemeContext";

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `inline-flex min-h-11 items-center rounded-md px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber ${
    isActive ? "text-ink" : "text-ink/50 hover:text-ink"
  }`;

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-y-3 px-4 py-3 sm:px-6 sm:py-4">
        <NavLink to="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-sm font-semibold tracking-tight text-ink sm:text-base">
            Veylora
          </span>
        </NavLink>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
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
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber xl:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        <nav
          id="primary-navigation"
          onClick={() => setMenuOpen(false)}
          className={`${menuOpen ? "grid" : "hidden"} basis-full grid-cols-2 gap-x-3 gap-y-1 border-t border-ink/10 pt-3 sm:grid-cols-3 xl:flex xl:basis-auto xl:items-center xl:gap-4 xl:border-0 xl:pt-0`}
        >
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
        </nav>
      </div>
    </header>
  );
}