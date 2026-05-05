
drop policy if exists "anyone can insert leads" on public.leads;
drop policy if exists "public read lead photos" on storage.objects;
drop policy if exists "anyone can upload lead photos" on storage.objects;

update storage.buckets set public = false where id = 'lead-photos';
