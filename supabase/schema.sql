-- IndieMakerStack v1 schema
-- Run this in the Supabase SQL editor for your project.

-- Enable UUID generation (usually already enabled on Supabase projects).
create extension if not exists "pgcrypto";

-- Categories table: a flat list of category names used to group tools.
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

-- Tools table: the main directory entries.
-- "category" stores the category name directly (not a foreign key) to
-- keep v1 simple; this can be normalized to a category_id later.
create table if not exists tools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text not null,
  link text not null,
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- Helpful index for filtering tools by category.
create index if not exists tools_category_idx on tools (category);

-- Row Level Security
alter table categories enable row level security;
alter table tools enable row level security;

-- Categories: public read-only access.
drop policy if exists "Public can read categories" on categories;
create policy "Public can read categories"
  on categories for select
  using (true);

drop policy if exists "Public can read tools" on tools;
drop policy if exists "Public can insert tools" on tools;
drop policy if exists "Public can delete tools" on tools;
drop policy if exists "Public can read approved tools" on tools;
drop policy if exists "Admins can read all tools" on tools;
drop policy if exists "Public can submit tools for review" on tools;
drop policy if exists "Admins can update tools" on tools;
drop policy if exists "Admins can delete tools" on tools;

-- Public users can only read approved tools.
create policy "Public can read approved tools"
  on tools for select
  to anon, authenticated
  using (is_approved = true);

-- Admins can review pending submissions and manage published tools.
create policy "Admins can read all tools"
  on tools for select
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Public can submit tools for review"
  on tools for insert
  to anon, authenticated
  with check (is_approved = false);

create policy "Admins can update tools"
  on tools for update
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can delete tools"
  on tools for delete
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
