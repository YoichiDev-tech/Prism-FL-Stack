import { Link } from "react-router-dom";
import { presets } from "../data/presets";

export default function PresetsPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">Stack Presets</h1>
      <p className="mt-1 text-sm text-gray-500">
        Curated stacks for different types of builders.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {presets.map((preset) => (
          <Link
            key={preset.id}
            to={`/presets/${preset.id}`}
            className="rounded-xl border border-gray-200 p-4 shadow-sm transition hover:shadow-md"
          >
            <h3 className="font-semibold text-gray-900">{preset.name}</h3>
            <p className="mt-2 text-sm text-gray-600">{preset.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
