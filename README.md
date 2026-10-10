# Veylora

A curated toolkit directory for founders, indie makers, and developers. Discover useful software, collect tools into a personal stack, explore curated presets, and export your collection when you need it.

> **Case study status:** Veylora is a PrismWave Studio portfolio project. The name is a working candidate and has not been cleared for commercial trademark use. Do not treat the project as a live third-party service.

## Features

- Search and browse a curated tool directory with categories and detail pages.
- Save tools to a personal collection stored locally in the browser.
- Explore curated presets for different kinds of work.
- Export a stack as JSON, Markdown, or CSV.
- Submit tools for moderation before they can appear publicly.
- Review submissions through an administrator-only interface backed by Supabase Auth and Row Level Security.

## Technology

- React 18, TypeScript, Vite
- Tailwind CSS
- React Router
- Supabase (Postgres, Auth, Row Level Security)

## Requirements

- Node.js 20 or a currently supported LTS release
- npm
- A Supabase project for database-backed features

## Local development

```sh
npm ci
cp .env.example .env
# Set the public Supabase project URL and anon/publishable key in .env
npm run dev
```

Run quality checks before submitting changes:

```sh
npm run lint
npm run build
```

The generated static site is in `dist/`. Use `npm run preview` to smoke-test the production build locally.

## Environment configuration

The client uses these Vite variables:

```dotenv
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

These values are delivered to the browser and are **not secrets**. Never place a Supabase service-role key, database password, or other privileged credential in a `VITE_*` variable. The app relies on database grants and Row Level Security for authorization.

If these variables are missing, the app will show a console warning and database-backed actions will not work. Configure the environment before deployment; do not treat the fallback client configuration as production-ready.

## Supabase setup

1. Review `supabase/schema.sql` before applying it to a new project.
2. Apply the included migrations in timestamp order to an existing database.
3. Seed example content only if you want the demo directory data.
4. Verify Row Level Security is enabled and test public and administrator access with separate accounts.
5. Enable only the authentication providers you intend to support.

The administrator page checks the trusted `app_metadata.role` claim. Set that role only through a trusted administrative process; never let a user edit their own app metadata. The role check in the UI is for presentation only—the database policies are the authorization boundary.

Public tool submissions are expected to be pending review. Before opening submissions to the public, add suitable abuse protection (such as rate limiting or a CAPTCHA), validate input server-side or through database constraints, and monitor rejected or suspicious submissions. A browser-only form is not an abuse-prevention boundary.

## Privacy and data behaviour

Personal stacks are stored in the current browser and are not synced to an account. Clearing site data may remove them. Public submissions are sent to the configured Supabase database for moderation. Before a public launch, publish a privacy notice that accurately describes retention, analytics, and any third-party services actually enabled.

## Deployment checklist

- [ ] Configure production Supabase URL and public anon/publishable key in the hosting provider.
- [ ] Apply and review schema/migrations in the correct order.
- [ ] Test anonymous read access, pending submissions, and administrator review against production RLS policies.
- [ ] Configure abuse prevention for public submissions.
- [ ] Set the final canonical domain and update SEO/social metadata.
- [ ] Verify direct navigation and refresh on every client-side route with the chosen host.
- [ ] Run `npm ci`, `npm run lint`, and `npm run build` in CI.
- [ ] Test keyboard navigation, mobile layouts, empty/error/loading states, and exported files.
- [ ] Add a privacy notice and confirm all example tool descriptions, links, and claims are accurate.
- [ ] Confirm trademark, domain, and social-handle availability before adopting the Veylora name publicly.

## License

MIT. See `LICENSE` if present in this repository.

---

Built as a PrismWave Studio case study.
