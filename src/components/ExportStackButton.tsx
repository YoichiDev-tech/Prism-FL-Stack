import { useStack } from "../context/StackContext";

export default function ExportStackButton() {
  const { stack } = useStack();

  function exportJSON() {
    const data = JSON.stringify(stack, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "prismstack.json";
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={exportJSON}
      className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 hover:border-gray-500"
    >
      Export Stack as JSON
    </button>
  );
}
