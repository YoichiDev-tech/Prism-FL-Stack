export default function About() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">About Prism FL Stack</h1>
      <p className="mt-4 text-lg text-gray-600">
        Your curated directory for discovering, organizing, and sharing the best tools for building products.
      </p>

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Prism FL Stack was built with a simple goal: to help founders, indie makers, and developers discover the right tools for their projects. We believe that the right stack can make the difference between shipping quickly and getting stuck in tool paralysis.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            We curate tools across AI, backend, hosting, design, productivity, and more—focusing on quality over quantity. Every tool in our directory is selected for its usefulness, reliability, and community adoption.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">What Makes Us Different</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="font-semibold text-gray-900">Curated, Not Crowded</h3>
              <p className="mt-2 text-gray-600">
                We don't just list every tool out there. We hand-pick the best ones so you can make decisions faster.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="font-semibold text-gray-900">Stacks That Stay With You</h3>
              <p className="mt-2 text-gray-600">
                Your personal stack is saved locally and persists across sessions. Build once, access anywhere.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="font-semibold text-gray-900">Presets for Every Builder</h3>
              <p className="mt-2 text-gray-600">
                Browse curated stacks for AI startups, indie makers, agencies, and more. Start from a proven foundation.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="font-semibold text-gray-900">Fast, Clean, and Focused</h3>
              <p className="mt-2 text-gray-600">
                No ads, no clutter, no noise. Just tools and the information you need to choose them.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">The Team</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Prism FL Stack is built by Yoichi, a frontend developer and product builder who believes tools should stay out of the way and let you work. The project is continuously evolving based on feedback from the community.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">Open Source</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Prism FL Stack is open source and built with modern web technologies. We welcome contributions, bug reports, and suggestions from the community.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">Contact</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Have questions, suggestions, or want to contribute?{" "}
            <a
              href="https://github.com/YoichiDev-tech/IndieMakerStack/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
            >
              Contact us through GitHub
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
