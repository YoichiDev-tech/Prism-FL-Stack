import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import { supabase } from "../lib/supabaseClient";
import { Tool } from "../types";
import { useStack } from "../context/StackContext";
import { tools } from "../data/tools";

// Tool detail page: fetches a single tool by id from the route params
// and displays its full description plus a link to the external site.
export default function ToolDetail() {
  const { id } = useParams<{ id: string }>();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToStack, removeFromStack, stack } = useStack();

  useEffect(() => {
    let isMounted = true;

    async function fetchTool() {
      if (!id) return;

      setLoading(true);
      setError(null);

      // First try to get from local data
      const localTool = tools.find((t) => t.id === id);

      if (localTool) {
        if (!isMounted) return;
        setTool(localTool);
        setLoading(false);
        return;
      }

      // If not in local data, try Supabase
      const { data, error: fetchError } = await supabase
        .from("tools")
        .select("*")
        .eq("id", id)
        .single();

      if (!isMounted) return;

      if (fetchError) {
        setError(fetchError.message);
        setTool(null);
      } else {
        setTool(data);
      }

      setLoading(false);
    }

    fetchTool();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const isInStack = tool ? stack.some((t) => t.id === tool.id) : false;

  if (loading) return <Loader />;

  if (error || !tool) {
    return (
      <ErrorState message={error ? `Failed to load tool: ${error}` : "Tool not found."} />
    );
  }

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
    <div>
      <Link to="/tools" className="text-sm text-gray-500 hover:text-gray-900">
        &larr; Back to tools
      </Link>

      <div className="mt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                {tool.category}
              </span>
              {tool.pricing && (
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${getPricingColor(tool.pricing)}`}>
                  {tool.pricing}
                </span>
              )}
              {tool.isNew && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  ✓ New
                </span>
              )}
              {tool.isTrending && (
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                  🔥 Trending
                </span>
              )}
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            {isInStack ? (
              <button
                onClick={() => removeFromStack(tool.id)}
                className="rounded-lg border border-red-300 px-4 py-2 text-center text-sm font-medium text-red-600 transition-colors hover:border-red-500 hover:bg-red-50"
              >
                Remove from Stack
              </button>
            ) : (
              <button
                onClick={() => addToStack(tool)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Add to Stack
              </button>
            )}
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-900 transition-colors hover:border-gray-500 hover:bg-gray-50"
            >
              Visit Website →
            </a>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900">Description</h2>
          <p className="mt-2 text-base leading-relaxed text-gray-700">
            {tool.description}
          </p>
        </div>

        {tool.features && tool.features.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">Key Features</h2>
            <ul className="mt-2 space-y-2">
              {tool.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <svg className="h-5 w-5 flex-shrink-0 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {tool.tags && tool.tags.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">Tags</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {tool.likes && (
          <div className="mt-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-2xl">♥</span>
              <span className="text-lg font-semibold">{tool.likes.toLocaleString()}</span>
              <span>likes</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
