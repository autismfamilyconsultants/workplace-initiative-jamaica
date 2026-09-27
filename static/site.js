import {forms,visible,validate} from '/schema.mjs';
const el=(tag,attrs={},text)=>{const n=document.createElement(tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,v);if(text!==undefined)n.textContent=text;return n;};
// Native dialogs keep the questionnaires on the landing page, with focus trapping.
if(document.querySelector('#home')){
 for(const type of ['corporate','podpro','area']){
  const spec=forms[type],dialog=el('dialog',{class:'inquiry-dialog',id:`inquiry-${type}`,'aria-labelledby':`inquiry-title-${type}`});
  const panel=el('div',{class:'inquiry-panel'}),close=el('button',{type:'button',class:'inquiry-close','aria-label':'Close form'},'×');
  panel.append(close,el('h2',{id:`inquiry-title-${type}`,tabindex:'-1'},spec.title),el('p',{},spec.intro),el('p',{class:'small-note'},'Fields marked * are required. All other fields are optional.'),el('div',{'data-form':type}));
  dialog.append(panel);document.body.append(dialog);
  close.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{document.body.classList.remove('inquiry-open');dialog.opener?.focus();});
 }
 document.addEventListener('click',e=>{
  const link=e.target.closest('a');if(!link||e.defaultPrevented||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button!==0)return;
  const url=new URL(link.href,location.href),match=url.pathname.match(/^\/forms\/(corporate|podpro|area)\/?$/);
  if(url.origin!==location.origin||!match)return;
  e.preventDefault();const dialog=document.querySelector(`#inquiry-${match[1]}`);dialog.opener=link;dialog.showModal();dialog.scrollTop=0;document.body.classList.add('inquiry-open');dialog.querySelector('h2').focus();
 });
}
document.querySelectorAll('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>a.closest('details').open=false));
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.mobile-nav[open]').forEach(n=>{n.open=false;n.querySelector('summary').focus();});});
const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting)document.querySelectorAll('.desktop-nav a').forEach(a=>{const active=a.hash===`#${e.target.id}`;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});},{rootMargin:'-15% 0px -65% 0px'});
document.querySelectorAll('main>section[id]').forEach(s=>observer.observe(s));
async function request(action,payload={},key=''){
 const c=window.PODWASH_CONFIG||{};
 if(!c.url||!c.anonKey)throw Error('Forms are temporarily unavailable. Please email autismfamilyconsultantslimited@gmail.com.');
 const r=await fetch(`${c.url}/functions/v1/podwash-forms`,{method:'POST',headers:{'Content-Type':'application/json',apikey:c.anonKey,Authorization:`Bearer ${c.anonKey}`,...(key?{'x-founder-key':key}:{})},body:JSON.stringify({action,...payload}),signal:AbortSignal.timeout(45000)});
 const body=await r.json().catch(()=>({}));if(!r.ok)throw Error(body.error||'We couldn’t complete your request. Please try again.');return body;
}
for(const host of document.querySelectorAll('[data-form]')){
 const type=host.dataset.form,spec=forms[type],form=el('form'),fields=el('div',{class:'form-fields'}),status=el('p',{class:'form-status',role:'status','aria-live':'polite'}),groups=new Map();
 let started=Date.now(),id=crypto.randomUUID();
 const collect=()=>Object.fromEntries(new FormData(form));
 for(const f of spec.fields){
  const wrap=el(f.type==='radio'?'fieldset':'div',{class:`field ${['textarea','radio','select'].includes(f.type)||f.help?'wide':''}`,'data-field':f.id});
  const label=el(f.type==='radio'?'legend':'label',f.type==='radio'?{}:{for:`${type}-${f.id}`},f.label+(f.required?' *':' '));
  if(!f.required)label.append(el('span',{class:'optional'},'(optional)'));wrap.append(label);
  if(f.help)wrap.append(el('p',{class:'help',id:`${type}-${f.id}-help`},f.help));
  const attrs={id:`${type}-${f.id}`,name:f.id,...(f.required?{required:''}:{}),...(f.autocomplete?{autocomplete:f.autocomplete}:{}),...(f.help?{'aria-describedby':`${type}-${f.id}-help`}:{})};
  if(f.type==='radio'){
   const choices=el('div',{class:'radios'});f.options.forEach((value,i)=>{const choice=el('label',{class:'choice'});choice.append(el('input',{...attrs,id:`${type}-${f.id}-${i}`,type:'radio',value}),el('span',{},value));choices.append(choice);});wrap.append(choices);
  }else if(f.type==='select'){
   const select=el('select',attrs);select.append(el('option',{value:''},'Select an option'));f.options.forEach(v=>select.append(el('option',{value:v},v)));wrap.append(select);
  }else if(f.type==='textarea')wrap.append(el('textarea',{...attrs,rows:'4',maxlength:'4000'}));
  else wrap.append(el('input',{...attrs,type:f.type,...(f.type==='number'?{min:String(f.min),max:String(f.max),step:f.id==='budget'?'0.01':'1'}:{maxlength:String(f.max||300)})}));
  groups.set(f.id,{wrap,field:f});fields.append(wrap);
 }
 const suggestion=el('div',{class:'suggestion',hidden:''});fields.append(suggestion);
 const trap=el('div',{class:'honeypot','aria-hidden':'true'});trap.append(el('label',{for:`${type}-website`},'Leave this empty'),el('input',{id:`${type}-website`,name:'website',tabindex:'-1',autocomplete:'off'}));
 const note=el('p',{class:'form-note'});note.append(document.createTextNode('Your details will be used to review and respond to your inquiry. Read our '),el('a',{href:'/privacy',target:'_blank',rel:'noopener'},'privacy policy'),document.createTextNode('.'));
 const submit=el('button',{type:'submit',class:'button'},spec.button);form.append(fields,trap,note,submit,status);host.append(form);
 const update=()=>{const data=collect();for(const {wrap,field:f} of groups.values()){const show=visible(f,data);wrap.hidden=!show;wrap.querySelectorAll('input,textarea,select').forEach(n=>n.disabled=!show);}
  if(type==='contact'){const routes={'Corporate Partnerships':['corporate','corporate partnership inquiry'],'Becoming a PodPro':['podpro','PodPro interest form'],'Bringing PodWash to My Area':['area','location suggestion form']};const route=routes[data.interest];suggestion.hidden=!route;if(route){suggestion.replaceChildren(document.createTextNode('Ready to share more details? Use the '),el('a',{href:`/forms/${route[0]}`},route[1]),document.createTextNode(', or send a general question below.'));}}
 };form.addEventListener('input',update);form.addEventListener('change',update);update();
 form.addEventListener('submit',async e=>{e.preventDefault();const data=collect(),checked=validate(type,data);if(checked.error){status.textContent=checked.error;groups.get(checked.field)?.wrap.querySelector('input,select,textarea')?.focus();return;}
  submit.disabled=true;submit.textContent='Sending…';status.textContent='';
  try{const result=await request('submit',{type,data:checked.data,id,website:data.website||'',started});if(!result.ok)throw Error('Please try again.');const success=el('div',{class:'success',tabindex:'-1'}),dialog=host.closest('dialog');const done=dialog?el('button',{type:'button',class:'button'},'Done'):el('a',{href:'/',class:'button'},'Return to PodWash Jamaica');if(dialog)done.addEventListener('click',()=>dialog.close());success.append(el('span',{class:'success-icon','aria-hidden':'true'},'✓'),el('h2',{},'Thank you.'),el('p',{},spec.confirmation),done);host.replaceChildren(success);success.focus();}
  catch(error){status.textContent=error.message;submit.disabled=false;submit.textContent=spec.button;}
 });
}
const login=document.querySelector('#admin-login');
if(login){let key='',offset=0,loading=false;const list=document.querySelector('#submission-list'),filter=document.querySelector('#type-filter'),more=document.querySelector('#more'),inbox=document.querySelector('#inbox'),msg=document.querySelector('#inbox-status');
 async function load(append=false){if(loading)return;loading=true;msg.textContent='Loading…';if(!append){offset=0;list.replaceChildren();}try{const {submissions=[]}=await request('list',{type:filter.value,offset},key);for(const row of submissions){const card=el('details',{class:'submission'}),summary=el('summary',{},`${row.name} · ${forms[row.form_type]?.title||row.form_type}`);summary.append(el('span',{class:'badge'},new Date(row.created_at).toLocaleString()),el('span',{class:'badge'},row.status),el('span',{class:'badge'},`Email: ${row.notification_status}`));card.append(summary);const dl=el('dl');for(const f of forms[row.form_type].fields){if(row.payload[f.id])dl.append(el('dt',{},f.label),el('dd',{},row.payload[f.id]));}card.append(dl);const actions=el('div',{class:'submission-actions'}),state=el('select',{'aria-label':'Submission status'});['new','reviewing','closed'].forEach(v=>{const o=el('option',{value:v},v);o.selected=v===row.status;state.append(o);});state.addEventListener('change',async()=>{state.disabled=true;try{await request('status',{id:row.id,status:state.value},key);msg.textContent='Status saved.';}catch(e){msg.textContent=e.message;}finally{state.disabled=false;}});actions.append(state,el('a',{href:`mailto:${row.email}`},'Reply by email'));if(row.notification_status!=='sent'){const retry=el('button',{class:'text-button'},'Retry notification');retry.onclick=async()=>{retry.disabled=true;try{await request('retry',{id:row.id},key);await load();}catch(e){msg.textContent=e.message;retry.disabled=false;}};actions.append(retry);}card.append(actions);list.append(card);}offset+=submissions.length;more.hidden=submissions.length<50;msg.textContent=offset?`${offset} submissions shown.`:'No submissions yet.';}catch(e){msg.textContent=e.message;}finally{loading=false;}}
 login.onsubmit=async e=>{e.preventDefault();const status=document.querySelector('#admin-status'),b=login.querySelector('button');b.disabled=true;status.textContent='Checking access…';key=document.querySelector('#admin-key').value;try{await request('list',{offset:0,type:'',limit:1},key);login.hidden=true;document.querySelector('#admin-key').value='';inbox.hidden=false;await load();}catch(e){key='';status.textContent=e.message;}finally{b.disabled=false;}};
 filter.onchange=()=>load();document.querySelector('#refresh').onclick=()=>load();more.onclick=()=>load(true);document.querySelector('#logout').onclick=()=>{key='';list.replaceChildren();inbox.hidden=true;login.hidden=false;document.querySelector('#admin-status').textContent='';};
}
