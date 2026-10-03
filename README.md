# Prism FL Stack

The right tools should make building easier—not add noise.

Prism FL Stack is a curated directory for founders, indie makers, and developers. Find tools for your next project, save the ones you use, and export your stack when you need it.

## What you can do

- **Discover tools:** Browse a searchable directory with categories, descriptions, and detail pages.
- **Build your stack:** Save tools to a personal collection that stays in your browser between visits.
- **Explore presets:** Start with a curated collection for a particular kind of work.
- **Export your stack:** Download your collection as JSON, Markdown, or CSV.
- **Suggest a tool:** Submit a tool for review. Approved submissions are added to the public directory.

Prism FL Stack is built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

## Get started

You’ll need Node.js and a Supabase project.

Install the dependencies and start the local development server:

```sh
npm install
npm run dev
```

To check the production build and lint the code:

```sh
npm run build
npm run lint
```

## Connect Supabase

Add your Supabase project URL and public anon key to a local `.env` file:

```dotenv
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

These are public client credentials. Never put a Supabase service-role key in the app or expose it in client-side environment variables.

For a new database, run the database schema in the Supabase SQL Editor, then run the seed data if you want to start with the example directory.

For an existing database, apply the included moderation migration in the Supabase SQL Editor. Existing tools remain published; new submissions are held for review.

## Review submissions

The `/admin` page requires a Supabase Auth account with the trusted `app_metadata.role` set to `admin`. The database uses Row Level Security to enforce these permissions; hiding admin controls in the app is not the security boundary.

1. Enable the Email provider in Supabase Auth and create your administrator account.
2. In the Supabase SQL Editor, assign the admin role to that account. Replace the example email with the administrator’s email:

   ```sql
   update auth.users
   set raw_app_meta_data =
     coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
   where email = 'admin@example.com';
   ```

3. Sign out and back in so the new role is included in the session.

Public tool submissions do not require an account and are always created as pending. Disable public account signups in Supabase if you don’t want visitors creating accounts.

## Your stack and privacy

Your personal stack is stored in your browser using local storage. It is not synced to an account or shared between browsers. Clearing that browser’s site data will remove the saved stack.

## Contributing

Suggestions, bug reports, and contributions are welcome. Open an issue to discuss a change before starting larger work.

## License

Prism FL Stack is available under the MIT License.

---

Built by Yoichi — frontend developer and product builder. I like tools that stay out of the way and let you work.
