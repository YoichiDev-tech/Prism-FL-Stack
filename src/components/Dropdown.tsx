import { useState, useRef, useEffect, useId } from "react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="w-full max-w-xs font-[Inter]" ref={ref}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-ink/70"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <button
          id={id}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`
            flex w-full items-center justify-between
            rounded-xl border bg-paper
            min-h-11 py-2.5 pl-4 pr-3
            text-sm text-ink
            transition-all duration-150
            ${open
              ? "border-amber ring-2 ring-amber/30"
              : "border-ink/15 hover:border-ink/30"}
          `}
        >
          <span className={selected ? "text-ink" : "text-ink/40"}>
            {selected ? selected.label : placeholder}
          </span>

          {/* Chevron: fixed-width box, centered, rotates on open, breathing room from text */}
          <span className="ml-3 flex h-5 w-5 shrink-0 items-center justify-center">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className={`h-4 w-4 text-ink/50 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        {open && (
          <ul
            role="listbox"
            className="
              absolute z-20 mt-1.5 w-full
              max-h-60 overflow-auto
              rounded-xl border border-ink/10
              bg-paper shadow-lg shadow-ink/5
              py-1.5
            "
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`
                  mx-1.5 min-h-11 rounded-lg px-3 py-2
                  text-sm cursor-pointer
                  transition-colors duration-100
                  ${opt.value === value
                    ? "bg-amber/15 text-ink font-medium"
                    : "text-ink/80 hover:bg-ink/5"}
                `}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}