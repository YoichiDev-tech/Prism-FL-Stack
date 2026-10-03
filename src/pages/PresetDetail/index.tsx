import { useParams } from "react-router-dom";
import { presets } from "../../data/presets";
import { useStack } from "../../context/StackContext";
import { tools } from "../../data/tools";
import { Tool } from "../../types";
import { Link } from "react-router-dom";

export default function PresetDetailPage() {
  const { id } = useParams();

  const preset = presets.find((p) => p.id === String(id));

  const { addToStack, stack } = useStack();

  if (!preset) {
    return <p className="text-gray-500">Preset not found.</p>;
  }

  const presetTools: Tool[] = tools.filter((tool) =>
    preset.tools.includes(tool.id)
  );

  const allToolsInStack = presetTools.every((tool) =>
    stack.some((s) => s.id === tool.id)
  );

  const handleAddAll = () => {
    presetTools.forEach((tool) => addToStack(tool));
  };

  return (
    <div>
      <Link to="/presets" className="text-sm text-gray-500 hover:text-gray-900">
        &larr; Back to presets
      </Link>

      <div className="mt-4">
        <h1 className="text-3xl font-bold text-gray-900">{preset.name}</h1>
        <p className="mt-2 text-lg text-gray-600">{preset.description}</p>

        <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
          {!allToolsInStack ? (
            <button
              onClick={handleAddAll}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto"
            >
              Add All {presetTools.length} Tools to Stack
            </button>
          ) : (
            <div className="rounded-lg bg-green-100 px-6 py-3 text-sm font-medium text-green-700">
              ✓ All tools in your stack
            </div>
          )}
          <div className="text-sm text-gray-600">
            {presetTools.length} tools included
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {presetTools.map((tool) => (
          <Link
            key={tool.id}
            to={`/tools/${tool.id}`}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-gray-900">{tool.name}</h3>
              {tool.pricing && (
                <span className="whitespace-nowrap rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                  {tool.pricing}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {tool.description}
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
              <span className="rounded-full bg-gray-100 px-2 py-0.5">{tool.category}</span>
              {stack.some((s) => s.id === tool.id) && (
                <span className="text-green-600">✓ In Stack</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
