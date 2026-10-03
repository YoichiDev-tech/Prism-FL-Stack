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
    alter table public.tools
      add column is_approved boolean not null default true;
  end if;
end
$$;

alter table public.tools
  alter column is_approved set default false;

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
