export const parishes=['Kingston','St. Andrew','St. Catherine','Clarendon','Manchester','St. Elizabeth','Westmoreland','Hanover','St. James','Trelawny','St. Ann','St. Mary','Portland','St. Thomas','Outside Jamaica'];
const field=(id,label,type='text',options={})=>({id,label,type,required:true,...options});
const name=field('name','Name','text',{autocomplete:'name',max:160});
const email=field('email','Email','email',{autocomplete:'email',max:254});
const phone=field('phone','Phone / WhatsApp','tel',{autocomplete:'tel',max:60});
const parish=field('parish','Parish / location','select',{options:parishes});
const other=(id,parent)=>field(id,'Please specify','text',{when:{field:parent,value:'Other'}});
export const forms={
 corporate:{title:'Corporate Partnership Inquiry',eyebrow:'Let’s work together',intro:'Tell us about your organization and vehicle cleaning needs. We’ll use these details to start the right conversation.',button:'Submit corporate inquiry',confirmation:'Thank you for your interest in partnering with PodWash Jamaica. Your inquiry has been received. A member of our team will review the information you provided and contact you regarding next steps.',fields:[
 name,field('jobTitle','Job title'),field('organization','Organization','text',{autocomplete:'organization'}),email,phone,parish,
 field('organizationType','Type of organization','select',{options:['Private business','Fleet / transport operator','Vehicle dealership','Hospitality / tourism','Government / public sector','Nonprofit / community organization','Education','Other']}),other('organizationOther','organizationType'),
 field('vehicles','Approximately how many vehicles would require cleaning?','number',{min:1,max:100000}),
 field('frequency','How often would you anticipate needing vehicle cleaning?','radio',{options:['Daily','Several times per week','Weekly','Other','Not sure']}),other('frequencyOther','frequency'),
 field('vehicleType','The vehicles are primarily:','select',{options:['Company/Fleet Vehicles','Customer Vehicles','Employee Vehicles','Vehicle Inventory','Combination','Other']}),other('vehiclesOther','vehicleType'),
 field('onSite','Is there a designated area on site where vehicle cleaning could take place?','radio',{options:['Yes','No','Not sure']}),
 field('budget','Estimated budget (JMD)','number',{required:false,min:0,max:1000000000,help:'If your organization has established a budget for vehicle cleaning services, please share the approximate amount and budget period.'}),
 field('budgetPeriod','Budget period','select',{required:false,options:['Weekly','Monthly','Quarterly','Annual','Not yet determined']}),
 field('start','When would you ideally like service to begin?','radio',{options:['As soon as possible','Within 30 days','Within 1–3 months','Exploring options']}),
 field('details','Tell us anything else we should know about your vehicle cleaning needs.','textarea',{required:false})]},
 podpro:{title:'PodPro Interest Form',eyebrow:'Your next chapter',intro:'Tell us a little about yourself, your interests, and what would help you succeed. You don’t need previous work experience to express interest.',button:'Submit PodPro interest form',confirmation:'Thank you for your interest in becoming a PodPro. Your information has been received. Our team will review your submission and contact you regarding next steps and available opportunities.',fields:[
 name,field('age','Age','number',{min:1,max:120}),parish,phone,email,
 field('guardianName','Parent / guardian name','text',{when:{field:'age',under:18}}),field('guardianContact','Parent / guardian contact information','text',{when:{field:'age',under:18},help:'Please include their email address or phone number.'}),
 field('current','What are you currently doing?','select',{options:['In School','Training Program','Working','Looking for Work','Other']}),other('currentOther','current'),
 field('experience','Have you worked or volunteered before?','radio',{options:['Yes','No']}),
 field('experienceDetails','Tell us briefly about your previous work or volunteer experience.','textarea',{when:{field:'experience',value:'Yes'}}),
 field('interest','Why are you interested in becoming a PodPro?','textarea'),field('learning','What would you like to learn or get better at through working with PodWash?','textarea'),
 field('availability','When are you generally available to work?','radio',{options:['Weekdays','Weekends','Both','Not sure']}),
 field('transport','Do you have reliable transportation to and from a work location?','radio',{options:['Yes','No','Depends on Location']}),
 field('support','Is there anything you would like us to know that could help you be successful at work?','textarea',{required:false})]},
 area:{title:'Bring PodWash to Your Area',eyebrow:'A place to grow',intro:'Help us understand where PodWash could make a difference. Share your location and any potential connections in your community.',button:'Submit location suggestion',confirmation:'Thank you for telling us where you would like to see PodWash. Your suggestion has been received and will help us identify communities and locations where there may be interest in bringing the PodWash model.',fields:[
 name,email,phone,field('country','Country','text',{autocomplete:'country-name'}),field('region','Parish / state / province','text',{autocomplete:'address-level1'}),field('city','City / town','text',{autocomplete:'address-level2'}),
 field('role','I am a:','select',{options:['Community Member','Business Owner or Representative','Community Organization Representative','Government or Public Sector Representative','Potential Corporate Partner','Other']}),other('roleOther','role'),
 field('reason','Why do you think PodWash would be a good fit for your area?','textarea'),
 field('partner','Do you know of a business, organization, or location that may be interested in partnering with PodWash?','radio',{options:['Yes','No','Not Sure']}),
 field('partnerDetails','Tell us about the business, organization, or location.','textarea',{required:false,when:{field:'partner',value:'Yes'}})]},
 contact:{title:'Contact message',button:'Send message',confirmation:'Thank you for getting in touch with PodWash Jamaica. Your message has been received. Our team will review it and contact you.',fields:[
 field('interest','I am interested in:','select',{options:['Corporate Partnerships','Becoming a PodPro','Bringing PodWash to My Area','General Information']}),name,field('organization','Organization','text',{required:false,autocomplete:'organization'}),email,phone,field('message','Message','textarea')]}
};
export function visible(f,data){return !f.when || (f.when.under ? data[f.when.field]!=='' && data[f.when.field]!=null && Number(data[f.when.field])<f.when.under : data[f.when.field]===f.when.value);}
export function validate(type,input){
 if(!Object.hasOwn(forms,type)||!input||typeof input!=='object'||Array.isArray(input))return {error:'Choose a valid form.'};
 const data={};
 for(const f of forms[type].fields){
  if(!visible(f,input))continue;
  const value=typeof input[f.id]==='string'?input[f.id].trim():'';
  if(!value){if(f.required)return {error:`Please complete: ${f.label}`,field:f.id};continue;}
  if(value.length>(f.type==='textarea'?4000:f.type==='number'?20:f.max||300))return {error:`Please shorten: ${f.label}`,field:f.id};
  if(f.options&&!f.options.includes(value))return {error:`Choose an option for: ${f.label}`,field:f.id};
  if(f.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))return {error:'Enter a valid email address.',field:f.id};
  if(f.type==='number'&&(!/^\d+(\.\d+)?$/.test(value)||Number(value)<f.min||Number(value)>f.max||(['age','vehicles'].includes(f.id)&&!Number.isInteger(Number(value)))))return {error:`Enter a valid number for: ${f.label}`,field:f.id};
  data[f.id]=value;
 }
 return {data};
}
