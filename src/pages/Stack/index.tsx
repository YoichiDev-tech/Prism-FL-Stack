import { Link } from "react-router-dom";
import { useStack } from "../../context/StackContext";

export default function StackPage() {
  const { stack, removeFromStack, clearStack } = useStack();

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">My Stack</h1>
      <p className="mt-1 text-sm text-gray-500">
        Your curated selection of tools.
      </p>

      {stack.length === 0 && (
        <div className="py-24 text-center text-gray-500">
          <p>Your stack is empty.</p>
          <Link
            to="/"
            className="mt-4 inline-block rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 hover:border-gray-500"
          >
            Browse tools
          </Link>
        </div>
      )}

      {stack.length > 0 && (
        <div className="mt-6 flex flex-col gap-4">
          <button
            onClick={clearStack}
            className="self-end rounded-md border border-red-300 px-3 py-1.5 text-xs text-red-600 hover:border-red-500"
          >
            Clear Stack
          </button>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {stack.map((tool) => (
              <div
                key={tool.id}
                className="rounded-xl border border-gray-200 p-4 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                  <button
                    onClick={() => removeFromStack(tool.id)}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>

                <p className="mt-2 text-sm text-gray-600">{tool.description}</p>

                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm text-blue-600 hover:underline"
                >
                  Visit tool →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
