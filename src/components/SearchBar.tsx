export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/35">
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
          <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M18 18l-3.8-3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tools..."
        className="min-h-11 w-full rounded-md border border-ink/15 bg-white py-2 pl-9 pr-3 text-base text-ink placeholder-ink/35 transition-colors hover:border-ink/25 focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-amber/20 sm:text-sm"
      />
    </div>
  );
}