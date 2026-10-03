export default function FAQ() {
  const faqs = [
    {
      question: "What is Prism FL Stack?",
      answer: "Prism FL Stack is a curated directory of tools and resources for founders, indie makers, and developers. It helps you discover, organize, and share the tools you use to build products."
    },
    {
      question: "How do I add tools to my stack?",
      answer: "Browse the tools directory and click 'Add to Stack' on any tool card. Your stack is saved locally in your browser and persists across sessions."
    },
    {
      question: "What are stack presets?",
      answer: "Presets are curated collections of tools for specific use cases, such as AI startups, indie makers, or agencies. You can browse presets and add all their tools to your stack with one click."
    },
    {
      question: "Can I export my stack?",
      answer: "Yes! You can export your stack in multiple formats including JSON, Markdown, and CSV. This makes it easy to share with your team or document your stack."
    },
    {
      question: "How do I submit a new tool?",
      answer: "Click the 'Submit' link in the navigation and fill out the form with the tool's name, category, description, and link. Submitted tools are reviewed before being added to the directory."
    },
    {
      question: "Is Prism FL Stack free?",
      answer: "Yes, Prism FL Stack is completely free to use. We believe in providing value to the community without barriers."
    },
    {
      question: "How are tools curated?",
      answer: "We hand-pick tools based on their usefulness, reliability, community adoption, and relevance to modern development workflows. We focus on quality over quantity."
    },
    {
      question: "Can I request a tool to be added?",
      answer: "Absolutely! Use the submit form to suggest tools you'd like to see in the directory. We review all submissions and add tools that meet our quality standards."
    },
    {
      question: "Is my data private?",
      answer: "Your stack is stored locally in your browser using localStorage. We don't collect or store your personal stack data on our servers."
    },
    {
      question: "How often is the directory updated?",
      answer: "We regularly add new tools and update existing information. The directory is continuously evolving to reflect the latest and best tools in the ecosystem."
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
      <p className="mt-4 text-lg text-gray-600">
        Everything you need to know about Prism FL Stack.
      </p>

      <div className="mt-12 space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <summary className="flex cursor-pointer items-center justify-between font-semibold text-gray-900">
              {faq.question}
              <svg
                className="h-5 w-5 transform transition-transform group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
          </details>
        ))}
      </div>

      <div className="mt-12 rounded-lg border border-blue-200 bg-blue-50 p-6">
        <h2 className="text-lg font-semibold text-gray-900">Still have questions?</h2>
        <p className="mt-2 text-gray-600">
          Can't find the answer you're looking for? Feel free to reach out or submit a new tool suggestion.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href="/submit"
            className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-blue-700"
          >
            Submit a Tool
          </a>
          <a
            href="/about"
            className="inline-block rounded-lg border border-gray-300 px-4 py-2 text-center font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
