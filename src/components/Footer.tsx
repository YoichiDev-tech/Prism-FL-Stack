import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-paper/60">
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <div className="text-sm text-ink/50">
            © {year} Prism FL Stack — a directory of tools and resources for indie makers.
          </div>
          <div className="flex gap-6 text-sm text-ink/50">
            <Link to="/about" className="inline-flex min-h-11 items-center hover:text-ink transition-colors">
              About
            </Link>
            <Link to="/faq" className="inline-flex min-h-11 items-center hover:text-ink transition-colors">
              FAQ
            </Link>
            <Link to="/submit" className="inline-flex min-h-11 items-center hover:text-ink transition-colors">
              Submit
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
