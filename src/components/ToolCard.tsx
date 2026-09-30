import { Link } from "react-router-dom";
import { Tool } from "../types";
import { useStack } from "../context/StackContext";
interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const { addToStack } = useStack(); 
  return (
    <Link
      to={`/tools/${tool.id}`}
      className="block rounded-xl border border-ink/8 bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-base font-semibold text-ink">
          {tool.name}
        </h3>
        <span className="whitespace-nowrap rounded-full bg-amber/12 px-2 py-0.5 font-mono text-[11px] font-medium text-amber-700">
          {tool.category}
        </span>
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-ink/60">
        {tool.description}
      </p>
      <button
        onClick={() => addToStack(tool)}
        className="mt-3 rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:border-gray-500" 
      >
        Add to Stack
      </button>
    </Link>
  );
}