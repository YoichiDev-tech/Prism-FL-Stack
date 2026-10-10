import { Link } from "react-router-dom";
import { tools } from "../data/tools";

export default function Landing() {
  const trendingTools = tools.filter((t) => t.isTrending).slice(0, 6);
  const newTools = tools.filter((t) => t.isNew).slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 text-center sm:py-20">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
          Discover the Best Tools for Your
          <span className="text-blue-600"> Stack</span>
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-xl">
          A curated directory of useful tools for founders, indie makers, and developers.
          Build your perfect stack and stay productive.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            to="/tools"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            Browse Tools
          </Link>
          <Link
            to="/presets"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-gray-300 px-8 py-3 font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            View Presets
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            Why Veylora?
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Everything you need to discover, organize, and share your tools.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Curated Directory</h3>
              <p className="mt-2 text-gray-600">
                Hand-picked tools across AI, backend, hosting, design, and more. No clutter, just quality.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Build Your Stack</h3>
              <p className="mt-2 text-gray-600">
                Save tools to your personal stack. Organize your workflow and access your favorites instantly.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Share & Export</h3>
              <p className="mt-2 text-gray-600">
                Export your stack as JSON, Markdown, or CSV. Share with your team or the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Tools Section */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Trending Tools</h2>
            <Link to="/tools" className="self-start whitespace-nowrap text-blue-600 hover:text-blue-700 font-medium sm:self-auto">
              View all →
            </Link>
          </div>
          <p className="mt-2 text-gray-600">
            The most popular tools this month.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trendingTools.map((tool) => (
              <Link
                key={tool.id}
                to={`/tools/${tool.id}`}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                  {tool.pricing && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                      {tool.pricing}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {tool.description}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5">{tool.category}</span>
                  <span>♥ {tool.likes?.toLocaleString()}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Tools Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">New Tools</h2>
            <Link to="/tools" className="self-start whitespace-nowrap text-blue-600 hover:text-blue-700 font-medium sm:self-auto">
              View all →
            </Link>
          </div>
          <p className="mt-2 text-gray-600">
            Recently added tools to discover.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {newTools.map((tool) => (
              <Link
                key={tool.id}
                to={`/tools/${tool.id}`}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                    New
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {tool.description}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5">{tool.category}</span>
                  {tool.pricing && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5">{tool.pricing}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 text-center sm:py-20">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Ready to Build Your Stack?
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Start exploring tools and create your perfect stack today.
        </p>
        <Link
          to="/tools"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}
