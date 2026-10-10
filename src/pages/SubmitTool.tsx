import { FormEvent, useState } from "react";
import { useTools } from "../hooks/useTools";
import { useCategories } from "../hooks/useCategories";
import { NewTool } from "../types";

const emptyForm: NewTool = {
  name: "",
  category: "",
  description: "",
  link: "",
};

// Submit Tool page: a controlled form that writes a new row to the
// "tools" table in Supabase via the addTool helper from useTools.
export default function SubmitTool() {
  const { addTool } = useTools();
  const { categories } = useCategories();

  const [form, setForm] = useState<NewTool>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function updateField<K extends keyof NewTool>(field: K, value: NewTool[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSubmitted(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const { error: submitError } = await addTool(form);

      if (submitError) {
        setError(submitError);
        return;
      }

      setForm(emptyForm);
      setSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "An unexpected error occurred while submitting the tool."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-xl font-semibold text-gray-900">Submit a tool</h1>
      <p className="mt-1 text-sm text-gray-500">
        Share a tool or resource for other indie makers to discover. Submissions
        are reviewed before they appear in the directory.
      </p>

      {submitted && (
        <p
          className="mt-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800"
          role="status"
        >
          Thanks for your submission. It is now pending review.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="tool-name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="tool-name"
            maxLength={100}
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="mt-1 min-h-11 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-amber/30 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="tool-category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            id="tool-category"
            maxLength={80}
            required
            list="category-options"
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            placeholder="e.g. Analytics"
            className="mt-1 min-h-11 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-amber/30 sm:text-sm"
          />
          <datalist id="category-options">
            {categories.map((category) => (
              <option key={category.id} value={category.name} />
            ))}
          </datalist>
        </div>

        <div>
          <label htmlFor="tool-description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            required
            id="tool-description"
            maxLength={1200}
            rows={4}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-amber/30 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="tool-link" className="block text-sm font-medium text-gray-700">
            Link
          </label>
          <input
            type="url"
            id="tool-link"
            maxLength={2048}
            required
            value={form.link}
            onChange={(e) => updateField("link", e.target.value)}
            placeholder="https://example.com"
            className="mt-1 min-h-11 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-amber/30 sm:text-sm"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="min-h-11 rounded-md border border-gray-900 bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit tool"}
        </button>
      </form>
    </div>
  );
}
