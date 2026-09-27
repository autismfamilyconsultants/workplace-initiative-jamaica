import assert from 'node:assert/strict';
import fs from 'node:fs';
const html=fs.readFileSync('dist/index.html','utf8');
const ids=[...html.matchAll(/<section id="([^"]+)"/g)].map(m=>m[1]);
assert.deepEqual(ids,['home','corporate','podpro','area','about','contact']);
assert.equal((html.match(/data-form="/g)||[]).length,1);
assert.ok(html.includes('data-form="contact"'));
for(const path of ['corporate','podpro','area']){
 assert.ok(html.includes(`href="/forms/${path}"`));
 const form=fs.readFileSync(`dist/forms/${path}.html`,'utf8');
 assert.ok(form.includes(`data-form="${path}"`));
 assert.ok(form.includes('/podwash-logo.svg'));
 assert.ok(form.includes('/brand.css'));
}
for(const text of ['Clean Vehicles.','Real Jobs.','Lasting Skills.','16–25','exterior and interior','2 litres','PodWash manages the team','Site & service assessment','Following Instructions','Problem Solving','Support while you work','paid employment']){
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
