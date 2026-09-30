import { NavLink } from "react-router-dom";
import { Logo } from "./Logo";

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${
    isActive ? "text-ink" : "text-ink/50 hover:text-ink"
  }`;

export default function Navbar() {
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
          <NavLink to="/" end className={linkClasses}>
            Tools
          </NavLink>
          <NavLink to="/categories" className={linkClasses}>
            Categories
          </NavLink>
          <NavLink to="/submit" className={linkClasses}>
            Submit
          </NavLink>
          <NavLink to="/admin" className={linkClasses}>
            Admin
          </NavLink>
          <NavLink to="/stack" className={linkClasses}>
            My Stack
          </NavLink>
        </nav>
      </div>
    </header>
  );
}