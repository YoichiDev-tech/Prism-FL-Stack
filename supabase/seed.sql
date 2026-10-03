-- IndieMakerStack v1 seed data
-- Run this after schema.sql to populate initial categories and tools.

insert into categories (name) values
  ('Analytics'),
  ('Payments'),
  ('Design'),
  ('Hosting'),
  ('Marketing'),
  ('Productivity'),
  ('No-Code'),
  ('Developer Tools')
on conflict (name) do nothing;

insert into tools (name, category, description, link, is_approved) values
  ('Plausible', 'Analytics', 'A lightweight, privacy-friendly web analytics tool with a simple dashboard.', 'https://plausible.io', true),
  ('Fathom Analytics', 'Analytics', 'Privacy-focused website analytics built for simplicity and GDPR compliance.', 'https://usefathom.com', true),
  ('Stripe', 'Payments', 'Infrastructure for accepting payments and managing subscriptions online.', 'https://stripe.com', true),
  ('Lemon Squeezy', 'Payments', 'A merchant of record for selling software, handling taxes and billing.', 'https://lemonsqueezy.com', true),
  ('Figma', 'Design', 'A collaborative interface design tool for creating mockups and prototypes.', 'https://figma.com', true),
  ('Excalidraw', 'Design', 'A minimal, hand-drawn style tool for sketching diagrams and wireframes.', 'https://excalidraw.com', true),
  ('Vercel', 'Hosting', 'A platform for deploying frontend apps and static sites with zero configuration.', 'https://vercel.com', true),
  ('Railway', 'Hosting', 'A platform for deploying backends, databases, and full-stack apps quickly.', 'https://railway.app', true),
  ('Netlify', 'Hosting', 'A platform for building, deploying, and hosting modern web projects.', 'https://netlify.com', true),
  ('ConvertKit', 'Marketing', 'Email marketing software built for creators to grow and monetize an audience.', 'https://convertkit.com', true),
  ('Buffer', 'Marketing', 'A tool for scheduling and managing social media posts across platforms.', 'https://buffer.com', true),
  ('Notion', 'Productivity', 'A flexible workspace for notes, docs, wikis, and project tracking.', 'https://notion.so', true),
  ('Linear', 'Productivity', 'An issue tracking and project management tool built for software teams.', 'https://linear.app', true),
  ('Trello', 'Productivity', 'A visual, board-based tool for organizing tasks and projects.', 'https://trello.com', true),
  ('Bubble', 'No-Code', 'A visual programming platform for building web apps without writing code.', 'https://bubble.io', true),
  ('Webflow', 'No-Code', 'A visual website builder that generates clean, production-ready code.', 'https://webflow.com', true),
  ('Airtable', 'No-Code', 'A spreadsheet-database hybrid for organizing data and building simple apps.', 'https://airtable.com', true),
  ('Supabase', 'Developer Tools', 'An open-source backend platform with a Postgres database, auth, and APIs.', 'https://supabase.com', true),
  ('GitHub', 'Developer Tools', 'A platform for hosting code, tracking issues, and collaborating on software.', 'https://github.com', true),
  ('Postman', 'Developer Tools', 'A tool for building, testing, and documenting APIs.', 'https://postman.com', true);
