create table if not exists public.podwash_submissions (
 id uuid primary key,
 form_type text not null check (form_type in ('corporate','podpro','area','contact')),
 name text not null,
 email text not null,
 payload jsonb not null,
 status text not null default 'new' check (status in ('new','reviewing','closed')),
 ip_hash text not null,
 notification_status text not null default 'pending' check (notification_status in ('pending','sending','sent','failed')),
 notification_started_at timestamptz,
 notification_id text,
 notified_at timestamptz,
 created_at timestamptz not null default now()
);
create index if not exists podwash_submissions_created_idx on public.podwash_submissions(created_at desc);
create index if not exists podwash_submissions_type_idx on public.podwash_submissions(form_type,created_at desc);
create index if not exists podwash_submissions_ip_idx on public.podwash_submissions(ip_hash,created_at desc);
create index if not exists podwash_submissions_email_idx on public.podwash_submissions(lower(email),created_at desc);
alter table public.podwash_submissions enable row level security;
revoke all on public.podwash_submissions from public,anon,authenticated;
grant select,insert,update,delete on public.podwash_submissions to service_role;
create or replace function public.podwash_submit(p_id uuid,p_type text,p_data jsonb,p_ip text)
returns jsonb language plpgsql security invoker set search_path=public,pg_temp as $$
declare existing public.podwash_submissions;
begin
 perform pg_advisory_xact_lock(hashtextextended(p_ip,0));
 perform pg_advisory_xact_lock(hashtextextended(lower(p_data->>'email'),1));
 select * into existing from public.podwash_submissions where id=p_id;
 if found then
  if existing.payload=p_data and existing.form_type=p_type then return jsonb_build_object('ok',true);end if;
  return jsonb_build_object('error','conflict');
 end if;
 if (select count(*) from public.podwash_submissions where ip_hash=p_ip and created_at>now()-interval '1 hour')>=10
 or (select count(*) from public.podwash_submissions where lower(email)=lower(p_data->>'email') and created_at>now()-interval '1 hour')>=5
 then return jsonb_build_object('error','rate');end if;
 insert into public.podwash_submissions(id,form_type,name,email,payload,ip_hash) values(p_id,p_type,p_data->>'name',lower(p_data->>'email'),p_data,p_ip);
 return jsonb_build_object('ok',true);
end;$$;
revoke all on function public.podwash_submit(uuid,text,jsonb,text) from public,anon,authenticated;
grant execute on function public.podwash_submit(uuid,text,jsonb,text) to service_role;
