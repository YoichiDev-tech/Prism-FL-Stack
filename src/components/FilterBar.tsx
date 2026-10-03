interface Category {
  id: string;
  name: string;
}

interface FilterBarProps {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
}

export default function FilterBar({
  categories,
  value,
  onChange,
}: FilterBarProps) {
  return (
    <div className="relative inline-block w-full sm:w-auto sm:shrink-0">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 w-full appearance-none rounded-md border border-ink/15 bg-white py-2 pl-3 pr-8 text-base text-ink transition-colors hover:border-ink/25 focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-amber/20 sm:w-auto sm:text-sm"
      >
        <option value="all">All categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center">
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-ink/50">
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}