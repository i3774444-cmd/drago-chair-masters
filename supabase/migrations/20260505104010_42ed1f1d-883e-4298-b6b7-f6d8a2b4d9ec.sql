
-- Leads table for contact form submissions
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  client_type text not null check (client_type in ('private','company')),
  name text not null,
  phone text not null,
  comment text,
  company text,
  unn text,
  photo_urls text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Anyone (anon) can submit a lead
create policy "anyone can insert leads"
on public.leads for insert
to anon, authenticated
with check (true);

-- No one reads via client by default (admin reads via service role)

-- Storage bucket for uploaded photos
insert into storage.buckets (id, name, public)
values ('lead-photos','lead-photos', true)
on conflict (id) do nothing;

create policy "public read lead photos"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'lead-photos');

create policy "anyone can upload lead photos"
on storage.objects for insert
to anon, authenticated
with check (bucket_id = 'lead-photos');
