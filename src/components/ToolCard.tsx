import { Link } from "react-router-dom";
import { Tool } from "../types";
import { useStack } from "../context/StackContext";
interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const { addToStack } = useStack();

  const getPricingColor = (pricing?: string) => {
    switch (pricing) {
      case "Free":
        return "bg-green-100 text-green-700";
      case "Freemium":
        return "bg-blue-100 text-blue-700";
      case "Paid":
        return "bg-purple-100 text-purple-700";
      case "Open Source":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Link
      to={`/tools/${tool.id}`}
      className="block rounded-xl border border-ink/8 bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-base font-semibold text-ink">
          {tool.name}
        </h3>
        {tool.pricing && (
          <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ${getPricingColor(tool.pricing)}`}>
            {tool.pricing}
          </span>
        )}
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-ink/60">
        {tool.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tool.tags && tool.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-2 gap-y-3">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="rounded-full bg-gray-100 px-2 py-0.5">{tool.category}</span>
          {tool.likes && (
            <span className="flex items-center gap-1">
              ♥ {tool.likes.toLocaleString()}
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            addToStack(tool);
          }}
          className="shrink-0 rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 transition-colors hover:border-gray-500 hover:bg-gray-50"
        >
          Add to Stack
        </button>
      </div>
      {tool.isNew && (
        <div className="mt-2">
          <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
            ✓ New
          </span>
        </div>
      )}
      {tool.isTrending && (
        <div className="mt-2">
          <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-medium text-orange-700">
            🔥 Trending
          </span>
        </div>
      )}
    </Link>
  );
}