begin;

do $$
begin
  if not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'tools'
      and column_name = 'is_approved'
  ) then
    -- Preserve pre-existing directory entries as published during the migration.
    alter table public.tools
      add column is_approved boolean not null default true;
  end if;
end
$$;

alter table public.tools
  alter column is_approved set default false;

-- Add database-level limits. NOT VALID avoids blocking deployment on legacy rows;
-- new and changed rows are still checked immediately.
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'tools_name_length_check' and conrelid = 'public.tools'::regclass) then
    alter table public.tools add constraint tools_name_length_check
      check (char_length(btrim(name)) between 1 and 100) not valid;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'tools_category_length_check' and conrelid = 'public.tools'::regclass) then
    alter table public.tools add constraint tools_category_length_check
      check (char_length(btrim(category)) between 1 and 80) not valid;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'tools_description_length_check' and conrelid = 'public.tools'::regclass) then
    alter table public.tools add constraint tools_description_length_check
      check (char_length(btrim(description)) between 1 and 1200) not valid;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'tools_link_length_check' and conrelid = 'public.tools'::regclass) then
    alter table public.tools add constraint tools_link_length_check
      check (char_length(btrim(link)) between 8 and 2048 and link ~* '^https?://') not valid;
  end if;
end
$$;

alter table public.tools enable row level security;

drop policy if exists "Public can read tools" on public.tools;
drop policy if exists "Public can insert tools" on public.tools;
drop policy if exists "Public can delete tools" on public.tools;
drop policy if exists "Public can read approved tools" on public.tools;
drop policy if exists "Admins can read all tools" on public.tools;
drop policy if exists "Public can submit tools for review" on public.tools;
drop policy if exists "Admins can update tools" on public.tools;
drop policy if exists "Admins can delete tools" on public.tools;

create policy "Public can read approved tools"
  on public.tools for select
  to anon, authenticated
  using (is_approved = true);

create policy "Admins can read all tools"
  on public.tools for select
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Public can submit tools for review"
  on public.tools for insert
  to anon, authenticated
  with check (is_approved = false);

create policy "Admins can update tools"
  on public.tools for update
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can delete tools"
  on public.tools for delete
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

commit;
