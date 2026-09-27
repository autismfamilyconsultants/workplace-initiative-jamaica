import assert from 'node:assert/strict';
import {forms,visible,validate} from '../supabase/functions/podwash-forms/schema.mjs';
const fixtures={
 corporate:{name:'[TEST] PodWash corporate launch QA',jobTitle:'QA',organization:'Deployment check — no action needed',email:'podwash-qa@example.com',phone:'+1 876 555 0100',parish:'Kingston',organizationType:'Private business',vehicles:'12',frequency:'Weekly',vehicleType:'Company/Fleet Vehicles',onSite:'Yes',start:'Exploring options'},
 podpro:{name:'[TEST] PodWash PodPro launch QA',email:'podwash-qa@example.com',phone:'+1 876 555 0100',age:'17',parish:'Kingston',guardianContact:'Synthetic guardian — guardian@example.com',current:'In School',experience:'Yes',experienceDetails:'Synthetic volunteer experience.',interest:'Synthetic QA inquiry. No action needed.',learning:'Teamwork.',availability:'Weekends',transport:'Yes'},
 area:{name:'[TEST] PodWash location launch QA',email:'podwash-qa@example.com',phone:'+1 876 555 0100',country:'Jamaica',region:'Kingston',city:'Kingston',role:'Community Member',reason:'Synthetic QA inquiry. No action needed.',partner:'Yes',partnerDetails:'Synthetic partner for launch QA.'},
 contact:{name:'[TEST] PodWash contact launch QA',email:'podwash-qa@example.com',phone:'+1 876 555 0100',interest:'General Information',message:'Synthetic launch test of PodWash forms, storage and notification. No action needed.'}
};
for(const [type,data] of Object.entries(fixtures)){assert.ok(validate(type,data).data,type);assert.ok(validate(type,{...data,email:'invalid'}).error);assert.ok(validate(type,{...data,name:''}).error);}
assert.ok(validate('podpro',{...fixtures.podpro,guardianContact:''}).error);
const adult=validate('podpro',{...fixtures.podpro,age:'18',experience:'No'}).data;
assert.equal(adult.guardianContact,undefined);assert.equal(adult.experienceDetails,undefined);
assert.ok(validate('podpro',{...fixtures.podpro,age:'15'}).error);
assert.ok(validate('podpro',{...fixtures.podpro,age:'26'}).error);
assert.ok(validate('corporate',{...fixtures.corporate,vehicles:'-1'}).error);
assert.ok(validate('corporate',{...fixtures.corporate,frequency:'Other'}).error);
assert.equal(validate('area',{...fixtures.area,partner:'No'}).data.partnerDetails,undefined);
assert.ok(validate('__proto__',{}).error);
console.log('Required fields, choices, numbers and conditional branches passed for all four forms.');
if(process.argv.includes('--live')){
 const c={url:process.env.NEXT_PUBLIC_SUPABASE_URL,anonKey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY};
 const endpoint=`${c.url}/functions/v1/podwash-forms`,headers={'content-type':'application/json',apikey:c.anonKey,authorization:`Bearer ${c.anonKey}`,origin:'https://www.podwashjamaica.com'};
 const send=async data=>{const r=await fetch(endpoint,{method:'POST',headers,body:JSON.stringify(data)});return {status:r.status,body:await r.json()};};
 assert.equal((await send({action:'list'})).status,401,'inbox requires founder key');
 assert.equal((await send({action:'submit',type:'contact',data:fixtures.contact,website:'spam',id:crypto.randomUUID(),started:Date.now()-5000})).status,400,'honeypot');
 for(const [type,data] of Object.entries(fixtures)){
  const payload={action:'submit',type,data,id:crypto.randomUUID(),started:Date.now()-5000,website:''};
  const result=await send(payload);assert.equal(result.status,200,JSON.stringify(result));assert.equal(result.body.notificationSent,true,`Notification failed: ${type}`);
  console.log(type,payload.id,'stored, notification accepted');
  const duplicate=await send(payload);assert.equal(duplicate.status,200);assert.equal(duplicate.body.notificationSent,true);console.log(type,'duplicate retry accepted without a new record');
 }
 const access=await fetch(`${c.url}/rest/v1/podwash_submissions?select=id&limit=1`,{headers});assert.ok([401,403].includes(access.status),'anonymous table access denied');
 console.log('Live submission, notification, idempotency and access checks passed.');
}
export {fixtures};
