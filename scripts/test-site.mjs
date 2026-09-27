import assert from 'node:assert/strict';
import fs from 'node:fs';
const html=fs.readFileSync('dist/index.html','utf8');
const ids=[...html.matchAll(/<section id="([^"]+)"/g)].map(m=>m[1]);
assert.deepEqual(ids,['home','corporate','podpro','area','about','contact']);
for(const label of ['Home','Corporate Partnerships','Become a PodPro','Bring PodWash to Your Area','About','Contact']) assert.ok(html.includes(`>${label}</a>`), `Missing navigation label: ${label}`);
assert.equal((html.match(/data-form="/g)||[]).length,1);
assert.ok(html.includes('data-form="contact"'));
for(const path of ['corporate','podpro','area']){
 assert.ok(html.includes(`href="/forms/${path}"`));
 const form=fs.readFileSync(`dist/forms/${path}.html`,'utf8');
 assert.ok(form.includes(`data-form="${path}"`));
 assert.ok(form.includes('/podwash-logo.svg'));
 assert.ok(form.includes('/brand.css'));
}
for(const text of ['Clean Vehicles.','Real Jobs.','Lasting Skills.','An AFC Workforce Initiative | Powered by EcoWash Global','More Than Vehicle Cleaning','16–25','exterior and interior','2 litres','PodWash Manages the Team','Site & Service Assessment','Following Instructions','Problem Solving','Support While You Work','paid employment','START A CORPORATE PARTNERSHIP CONVERSATION','BRING PODWASH TO MY AREA']){
 assert.ok(html.includes(text),`Missing content: ${text}`);
}
assert.equal((html.match(/class="step-number"/g)||[]).length,4);
assert.ok(html.includes('https://autismfamilyconsultants.com'));
assert.ok(html.includes('https://ecowashglobal.com/'));
for(const match of html.matchAll(/(?:src|href)="(\/[^"#]+\.(?:css|js|svg|webp))"/g)){
 assert.ok(fs.existsSync(`dist${match[1]}`),`Missing asset: ${match[1]}`);
}
const css=fs.readFileSync('static/brand.css','utf8');
for(const color of ['#107128','#fac32a','#020202'])assert.ok(css.includes(color));
assert.ok(!html.includes('A cleaner car.'));
const client=fs.readFileSync('static/site.js','utf8');
assert.ok(client.includes("el('dialog'"));
assert.ok(client.includes('dialog.showModal()'));
assert.ok(client.includes('dialog.opener?.focus()'));
console.log('Six sections, modal form wiring, fallback routes, brand assets and colors passed.');
