import { Link } from "react-router-dom";
import { StackPreset } from "../data/presets";

export default function PresetCard({ preset }: { preset: StackPreset }) {
  return (
    <Link
      to={`/presets/${preset.id}`}
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-gray-300"
    >
      <h3 className="font-semibold text-gray-900">{preset.name}</h3>
      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{preset.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-gray-500">{preset.tools.length} tools</span>
        <span className="text-xs text-blue-600">View preset →</span>
      </div>
    </Link>
  );
}
