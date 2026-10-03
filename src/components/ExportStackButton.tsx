import { useStack } from "../context/StackContext";
import { downloadTextFile } from "../utils/downloadTextFile";

export default function ExportStackButton() {
  const { stack } = useStack();

  function exportJSON() {
    const data = JSON.stringify(stack, null, 2);
    downloadTextFile("prism-fl-stack.json", data, "application/json;charset=utf-8");
  }

  return (
    <button
      type="button"
      onClick={exportJSON}
      className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 hover:border-gray-500"
    >
      Export Stack as JSON
    </button>
  );
}
