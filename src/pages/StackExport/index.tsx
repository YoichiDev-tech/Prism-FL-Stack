import { useStack } from "../../context/StackContext";

export default function Index() {
  const { stack } = useStack();

  const downloadJSON = () => {
    const data = JSON.stringify(stack, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prismstack.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadMarkdown = () => {
    let markdown = "# My Stack\n\n";
    stack.forEach((tool) => {
      markdown += `## ${tool.name}\n`;
      markdown += `${tool.description}\n`;
      markdown += `- Category: ${tool.category}\n`;
      if (tool.pricing) markdown += `- Pricing: ${tool.pricing}\n`;
      markdown += `- Link: ${tool.link}\n\n`;
    });
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prismstack.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    let csv = "Name,Category,Description,Link,Pricing\n";
    stack.forEach((tool) => {
      csv += `"${tool.name}","${tool.category}","${tool.description}","${tool.link}","${tool.pricing || ''}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prismstack.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (stack.length === 0) {
    return (
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Export Your Stack</h1>
        <p className="mt-1 text-sm text-gray-500">
          Download your current stack in multiple formats.
        </p>
        <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
          <p className="text-gray-600">Your stack is empty. Add some tools first!</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">Export Your Stack</h1>
      <p className="mt-1 text-sm text-gray-500">
        Download your current stack in multiple formats.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <button
          onClick={downloadJSON}
          className="rounded-lg border border-gray-300 bg-white p-4 text-left hover:border-gray-500 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">JSON</h3>
              <p className="text-sm text-gray-600">Machine-readable format</p>
            </div>
          </div>
        </button>

        <button
          onClick={downloadMarkdown}
          className="rounded-lg border border-gray-300 bg-white p-4 text-left hover:border-gray-500 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Markdown</h3>
              <p className="text-sm text-gray-600">Documentation format</p>
            </div>
          </div>
        </button>

        <button
          onClick={downloadCSV}
          className="rounded-lg border border-gray-300 bg-white p-4 text-left hover:border-gray-500 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">CSV</h3>
              <p className="text-sm text-gray-600">Spreadsheet format</p>
            </div>
          </div>
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">Stack Preview ({stack.length} tools)</h2>
        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <pre className="text-sm text-gray-800 overflow-x-auto">
            {JSON.stringify(stack, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
