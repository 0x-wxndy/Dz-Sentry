-- DZ-Sentry Supabase schema (prototype)
-- Enable pgvector in Supabase Dashboard → Database → Extensions first.

create extension if not exists vector;

create type public.user_role as enum ('standard', 'vvip', 'sovereign', 'admin');
create type public.risk_level as enum ('green', 'yellow', 'red');
create type public.sector_type as enum ('energy', 'agriculture', 'security', 'investment');
create type public.doc_type as enum ('law', 'decree', 'ordinance', 'report', 'other');

-- Profiles extend auth.users with RBAC role
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  role public.user_role not null default 'standard',
  created_at timestamptz not null default now()
);

create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null,
  sector public.sector_type not null,
  severity public.risk_level not null,
  region text,
  source text,
  created_at timestamptz not null default now(),
  published boolean not null default true
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  source_path text,
  sector text default 'legal',
  document_type public.doc_type default 'other',
  published_at date,
  status text not null default 'pending', -- pending | approved | live
  ai_summary text,
  edited_summary text,
  uploaded_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

-- Embedding dim 1536 works with OpenAI; Claude path in this prototype
-- uses a local hash-embedding fallback (384) when no embedding API is set.
-- Adjust vector(N) to match your embedding model.
create table if not exists public.document_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents (id) on delete cascade,
  content text not null,
  page int default 1,
  chunk_index int default 0,
  embedding vector(384),
  created_at timestamptz not null default now()
);

create index if not exists document_chunks_embedding_idx
  on public.document_chunks
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

create or replace function public.match_document_chunks(
  query_embedding vector(384),
  match_count int default 8,
  filter_sector text default null,
  filter_doc_type text default null,
  date_from date default null,
  date_to date default null
)
returns table (
  id uuid,
  document_id uuid,
  document_title text,
  content text,
  sector text,
  document_type text,
  published_at date,
  page int,
  similarity float
)
language sql stable
as $$
  select
    c.id,
    c.document_id,
    d.title as document_title,
    c.content,
    d.sector,
    d.document_type::text,
    d.published_at,
    c.page,
    1 - (c.embedding <=> query_embedding) as similarity
  from public.document_chunks c
  join public.documents d on d.id = c.document_id
  where d.status = 'live'
    and (filter_sector is null or d.sector = filter_sector)
    and (filter_doc_type is null or d.document_type::text = filter_doc_type)
    and (date_from is null or d.published_at >= date_from)
    and (date_to is null or d.published_at <= date_to)
  order by c.embedding <=> query_embedding
  limit match_count;
$$;

alter table public.profiles enable row level security;
alter table public.alerts enable row level security;
alter table public.documents enable row level security;
alter table public.document_chunks enable row level security;

-- Prototype policies: authenticated read; tighten for production.
create policy "profiles read own" on public.profiles
  for select using (auth.uid() = id);

create policy "alerts read published" on public.alerts
  for select using (published = true);

create policy "documents read live" on public.documents
  for select using (status = 'live' or auth.uid() is not null);

create policy "chunks read" on public.document_chunks
  for select using (true);
