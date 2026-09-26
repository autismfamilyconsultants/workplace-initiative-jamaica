import {forms,validate} from './schema.mjs';
const url=Deno.env.get('SUPABASE_URL')!,service=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const origins=new Set(['https://podwashjamaica.com','https://www.podwashjamaica.com','https://workplace-initiative-jamaica.vercel.app','http://localhost:4190','http://127.0.0.1:4190']);
class Failure extends Error{constructor(public status:number,message:string){super(message);}}
const hash=async(s:string)=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))).map(b=>b.toString(16).padStart(2,'0')).join('');
const esc=(s:unknown)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
async function db(path:string,method='GET',body?:unknown){const r=await fetch(`${url}/rest/v1/${path}`,{method,headers:{apikey:service,Authorization:`Bearer ${service}`,'Content-Type':'application/json',Prefer:'return=representation'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(12000)});if(!r.ok)throw new Failure(503,'Your request could not be saved. Please try again.');return r.status===204?null:await r.json();}
async function admin(req:Request){const token=req.headers.get('x-founder-key')||'';const expected=Deno.env.get('ADMIN_REVIEW_TOKEN_HASH')||'2e518b7bc8cd8c33e93c7bc292fd6e8aa80b8ba542b3685c07ba8085f42154d5';if(!token||token.length>512||await hash(token)!==expected)throw new Failure(401,'Founder access is invalid.');}
const validId=(id:unknown)=>typeof id==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
async function notify(row:any){
 const stale=encodeURIComponent(new Date(Date.now()-120000).toISOString());
 const claimed=await db(`podwash_submissions?id=eq.${row.id}&or=(notification_status.in.(pending,failed),and(notification_status.eq.sending,notification_started_at.lt.${stale}))`,'PATCH',{notification_status:'sending',notification_started_at:new Date().toISOString()});
 if(!claimed?.length)return row.notification_status==='sent';
 try{
  const apiKey=Deno.env.get('RESEND_API_KEY');if(!apiKey)throw Error('Email is not configured');
  const text=Object.entries(row.payload).map(([k,v])=>`${forms[row.form_type].fields.find((f:any)=>f.id===k)?.label||k}: ${v}`).join('\n\n');
  const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json','Idempotency-Key':`podwash/${row.id}`},body:JSON.stringify({from:Deno.env.get('AFC_EMAIL_FROM')||'Autism Family Consultants <plans@autismfamilyconsultants.com>',to:['autismfamilyconsultantslimited@gmail.com'],reply_to:row.email,subject:`PodWash Jamaica — ${forms[row.form_type].title}`,text:`New PodWash submission\n\n${text}\n\nInbox: https://www.podwashjamaica.com/admin`,html:`<div style="font-family:Arial,sans-serif;color:#132c20;max-width:640px;margin:auto;padding:30px;background:#fffdf5"><h1 style="font-size:25px;border-bottom:4px solid #f2d64b;padding-bottom:18px">PodWash Jamaica</h1><h2>${esc(forms[row.form_type].title)}</h2><div style="white-space:pre-wrap;line-height:1.6">${esc(text)}</div><p><a href="https://www.podwashjamaica.com/admin">Open submission inbox</a></p></div>`}),signal:AbortSignal.timeout(20000)});
  const result=await r.json();if(!r.ok||!result.id)throw Error('Email provider did not accept notification');
  await db(`podwash_submissions?id=eq.${row.id}`,'PATCH',{notification_status:'sent',notification_id:result.id,notified_at:new Date().toISOString()});return true;
 }catch{await db(`podwash_submissions?id=eq.${row.id}`,'PATCH',{notification_status:'failed'});return false;}
}
Deno.serve(async(req:Request)=>{
 const origin=req.headers.get('origin')||'';
 const headers={'Access-Control-Allow-Origin':origins.has(origin)?origin:'https://www.podwashjamaica.com','Access-Control-Allow-Headers':'authorization,apikey,content-type,x-founder-key','Access-Control-Allow-Methods':'POST,OPTIONS','Cache-Control':'no-store',Vary:'Origin'};
 const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{...headers,'Content-Type':'application/json'}});
 if(req.method==='OPTIONS')return new Response(null,{status:204,headers});
 if(origin&&!origins.has(origin))return json({error:'Origin is not allowed.'},403);
 if(req.method!=='POST')return json({error:'POST required.'},405);
 try{
  const raw=await req.text();if(raw.length>30000)throw new Failure(413,'Please shorten your responses.');let p:any;try{p=JSON.parse(raw);}catch{throw new Failure(400,'Invalid form data.');}
  if(p.action==='submit'){
   if(p.website||!Number.isFinite(p.started)||Date.now()-p.started<2000||Date.now()-p.started>86400000)throw new Failure(400,'Please reload the form and try again.');
   if(!validId(p.id))throw new Failure(400,'Reload the form and try again.');
   const checked=validate(p.type,p.data);if(checked.error)throw new Failure(400,checked.error);
   const ip=(req.headers.get('x-forwarded-for')||req.headers.get('cf-connecting-ip')||'unknown').split(',')[0].trim();
   const ipHash=await hash(`${service}:${ip}:${new Date().toISOString().slice(0,10)}`);
   const result=await db('rpc/podwash_submit','POST',{p_id:p.id,p_type:p.type,p_data:checked.data,p_ip:ipHash});
   if(result.error==='rate')throw new Failure(429,'Too many requests. Please try again in an hour.');
   if(result.error)throw new Failure(409,'Please reload the form and try again.');
   const rows=await db(`podwash_submissions?id=eq.${p.id}&select=*`);const row=rows[0];if(!row)throw new Failure(503,'Please try again.');
   const notificationSent=await notify(row);return json({ok:true,notificationSent});
  }
  await admin(req);
  if(p.action==='list'){
   const offset=Number.isInteger(p.offset)&&p.offset>=0?Math.min(p.offset,100000):0;
   const type=Object.hasOwn(forms,p.type)?`&form_type=eq.${p.type}`:'';
   return json({submissions:await db(`podwash_submissions?select=id,form_type,name,email,payload,status,notification_status,created_at&order=created_at.desc,id.desc&limit=50&offset=${offset}${type}`)});
  }
  if(!validId(p.id))throw new Failure(400,'Select a valid submission.');
  if(p.action==='status'){
   if(!['new','reviewing','closed'].includes(p.status))throw new Failure(400,'Invalid status.');
   const rows=await db(`podwash_submissions?id=eq.${p.id}`,'PATCH',{status:p.status});if(!rows.length)throw new Failure(404,'Submission not found.');return json({ok:true});
  }
  if(p.action==='retry'){const rows=await db(`podwash_submissions?id=eq.${p.id}&select=*`);if(!rows.length)throw new Failure(404,'Submission not found.');if(!await notify(rows[0]))throw new Failure(503,'Notification could not be sent yet. The submission is saved.');return json({ok:true});}
  throw new Failure(400,'Unknown request.');
 }catch(e){return json({error:e instanceof Failure?e.message:'The request could not be completed. Please try again.'},e instanceof Failure?e.status:500);}
});
