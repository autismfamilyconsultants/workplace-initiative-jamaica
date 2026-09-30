export const icon=name=>`<i class="bi bi-${name}" aria-hidden="true"></i>`;
const button=(url,label,secondary=false)=>`<a class="button${secondary?' secondary':''}" href="${url}">${label}</a>`;
const photo=(file,alt,cls='',eager=false)=>`<figure class="photo ${cls}"><img src="/${file}.webp" alt="${alt}" width="1536" height="1024" ${eager?'fetchpriority="high"':'loading="lazy"'}><figcaption>Illustrative imagery</figcaption></figure>`;

const benefits=[
 ['geo-alt','Convenient','PodWash brings vehicle cleaning directly to your location, reducing the need to move vehicles off site for routine cleaning.'],
 ['droplet','Environmentally Conscious','Powered by EcoWash Global technology, PodWash uses approximately 2 litres of water per vehicle, significantly reducing water use compared with conventional vehicle washing methods.'],
 ['sliders','Customized','Exterior and interior cleaning services can be structured around your organization’s vehicle volume, scheduling requirements, service frequency, and operational needs.'],
 ['shield-check','Professionally Supervised','PodPros work under the direction of trained PodWash supervisors who provide on site supervision, job coaching, task support, quality oversight, and day to day workforce management.'],
 ['briefcase','Workforce Focused','Every PodWash corporate partnership helps create paid employment and workforce development opportunities for youth and young adults.'],
 ['bullseye','Purpose Built','PodWash combines a practical business service with a structured workforce model designed to help young people strengthen transferable workplace skills through actual employment.']
];

const skills=[
 ['clock','Showing Up Ready','Arriving prepared and ready to work.'],
 ['list-check','Following Instructions','Understanding directions and completing assigned tasks.'],
 ['check2-circle','Starting and Finishing Tasks','Following responsibilities from beginning through completion.'],
 ['question-circle','Asking for Help','Recognizing when assistance is needed and learning how to request it appropriately.'],
 ['chat-dots','Communication','Building effective communication with supervisors, coworkers, and others in the workplace.'],
 ['bullseye','Staying on Task','Maintaining focus and returning to a task when redirection is needed.'],
 ['chat-square-text','Receiving Feedback','Learning how to receive guidance and use it to improve performance.'],
 ['lightbulb','Problem Solving','Identifying challenges and working toward appropriate solutions.']
];

const sectors=[
 'Auto Dealerships',
 'Corporate and Commercial Fleets',
 'Rental Car Companies',
 'Airports',
 'Business and Corporate Compounds',
 'Shopping Centres',
 'Residential Communities',
 'Organizations with Vehicle Fleets or High Vehicle Traffic'
];

const process=[
 ['Tell Us About Your Needs','Share information about your organization, location, vehicles, anticipated volume, and cleaning needs.'],
 ['Site & Service Assessment','We assess the proposed location and discuss vehicle volume, exterior and interior cleaning requirements, scheduling, service frequency, and other operational considerations.'],
 ['Customized Service Plan','We develop a service arrangement based on your organization’s needs, including the scope of services, anticipated volume, scheduling, and service frequency.'],
 ['PodWash Team Deployment','Once the service arrangement is established, PodWash coordinates the team, supervision, scheduling, and day to day delivery of services at your location.']
];

export const home=`<main id="main">
<section id="home" class="hero"><div class="shell">
 <div class="hero-bento">
  <div class="hero-copy">
   <p class="micro-label">An AFC Workforce Initiative | Powered by EcoWash Global</p>
   <h1>Clean Vehicles.<br>Real Jobs.<br><em>Lasting Skills.</em></h1>
   <p>PodWash Jamaica provides environmentally conscious exterior and interior vehicle cleaning services to businesses and organizations while creating paid employment and workforce development opportunities for youth and young adults ages 16–25.</p>
   <div class="actions">${button('#corporate','EXPLORE CORPORATE PARTNERSHIPS')}${button('/forms/podpro','BECOME A PODPRO',true)}</div>
  </div>
  <div class="hero-visual">${photo('vehicle-care','Illustrative scene of a vehicle-care professional wiping a silver corporate vehicle at an office campus','hero-photo',true)}<div class="photo-caption"><span>Professional care.<br>Right where you need it.</span>${icon('shield-check')}</div></div>
 </div>

 <div class="hero-summary">
  <div><p class="eyebrow">More Than Vehicle Cleaning</p><h2>PodWash Jamaica brings together professional vehicle cleaning and meaningful employment.</h2></div>
  <div><p>Through corporate partnerships, we provide exterior and interior vehicle cleaning services at partner locations while creating opportunities for youth and young adults to earn, work, and develop transferable workplace skills through real employment.</p><p><strong>Clean vehicles are the service. Opportunity is the impact.</strong></p></div>
 </div>

 <div class="water-strip">
  <div class="water-number">${icon('droplet')}<strong>~2<span>L</span></strong><span>of water<br>per vehicle</span></div>
  <div><h3>A Smarter Way to Clean Vehicles</h3><p>PodWash Jamaica is powered by EcoWash Global technology, an environmentally conscious vehicle cleaning system that uses approximately 2 litres of water per vehicle.</p><p>The system allows PodWash to provide vehicle cleaning directly at partner locations while using significantly less water than conventional vehicle washing methods.</p><p>For businesses and organizations, that means convenient vehicle cleaning where your vehicles already are.</p></div>
  <a class="text-link" href="#corporate">EXPLORE CORPORATE PARTNERSHIPS</a>
 </div>
</div></section>

<section id="corporate" class="section corporate"><div class="shell">
 <div class="corporate-intro">
  <div class="section-heading corporate-heading-visual">
   <p class="eyebrow">Corporate Partnerships</p>
   <h2>Bring PodWash to<br><em>Your Organization</em></h2>
  </div>
  <div class="corporate-intro-copy">
   <p class="lede">PodWash Jamaica partners with businesses and organizations to provide convenient, environmentally conscious vehicle cleaning services at their locations.</p>
   <p>Rather than routinely sending vehicles off site for cleaning, your organization can work with PodWash to develop a vehicle cleaning arrangement designed around your operation.</p>
  </div>
 </div>
 <div class="service-layout">
  <div class="service-copy">
   <h3>Vehicle Cleaning Designed Around Your Operation</h3>
   <p>PodWash Jamaica provides both exterior and interior vehicle cleaning services at partner locations.</p>
   <p>Because every organization operates differently, the exact service package is developed around each corporate partner's vehicle volume, location, scheduling requirements, service frequency, and cleaning needs.</p>
   <p>Whether your organization manages a fleet, vehicle inventory, or a high volume of vehicles at a single location, we work with you to determine a service arrangement that fits your operation.</p>
   ${button('/forms/corporate','DISCUSS YOUR VEHICLE CLEANING NEEDS')}
  </div>
  <div class="sector-panel"><ul class="sector-list">${sectors.map(x=>`<li>${icon('check2')}<span>${x}</span></li>`).join('')}</ul></div>
 </div>

 <div class="subheading"><h3>Why Partner With PodWash?</h3></div>
 <div class="benefit-grid">${benefits.map(([i,t,p])=>`<article>${icon(i)}<h3>${t}</h3><p>${p}</p></article>`).join('')}</div>

 <div class="impact-line">
  <h3>A Service With<br>Built In Impact</h3>
  <div>
   <p>A PodWash partnership does more than keep vehicles clean.</p>
   <p>Corporate partnerships create real work environments where PodPros can gain paid employment, develop workplace skills, and build experience they can carry into future opportunities.</p>
   <p>Your organization receives a needed service.</p>
   <p>Young people receive an opportunity to work, earn, and grow.</p>
   <p>The social impact is built into the business model.</p>
  </div>
 </div>

 <div class="team-panel">${photo('team-work','Illustrative scene of a supervisor and two adult coworkers reviewing a work plan beside a vehicle')}<div>
  <h3>PodWash Manages the Team</h3>
  <p>Partnering with PodWash does not mean taking on responsibility for managing our workforce.</p>
  <p>PodWash manages the recruitment, training, scheduling, on site supervision, job coaching, task support, quality oversight, and day to day management of the PodWash team.</p>
  <p>PodPros work under the direction of trained PodWash supervisors who help ensure responsibilities are understood, workplace expectations are maintained, and services are completed according to PodWash standards.</p>
  <strong>Your organization partners with PodWash. PodWash manages its people.</strong>
 </div></div>

 <div class="process">
  <p class="eyebrow">How Corporate Partnerships Work</p>
  <h3>From Conversation to Service</h3>
  <div class="process-grid">${process.map(([t,p],n)=>`<article><span class="step-number">0${n+1}</span><h4>${t}</h4><p>${p}</p></article>`).join('')}</div>
  <div class="process-bottom"><div><h4>Let's Talk About Your Organization</h4><p>Tell us about your vehicle cleaning needs and let's explore how PodWash could work within your operation.</p></div>${button('/forms/corporate','START A CORPORATE PARTNERSHIP CONVERSATION')}</div>
 </div>
</div></section>

<section id="podpro" class="section podpro"><div class="shell">
 <div class="podpro-top">
  <div>
   <p class="eyebrow">Become a PodPro</p>
   <h2>Build Skills.<br>Gain Experience.<br><em>Get Paid.</em></h2>
   <p class="lede">PodPros are the people behind PodWash Jamaica.</p>
   <p>The PodPro Program provides youth and young adults ages 16–25 with opportunities to gain paid work experience while developing skills that can transfer to future jobs, careers, and greater independence.</p>
   <p>PodWash welcomes hardworking and reliable young people of all abilities. We intentionally create opportunities that are inclusive of autistic, ADHD, and other neurodivergent youth and young adults.</p>
   ${button('/forms/podpro','BECOME A PODPRO')}
  </div>
  ${photo('podpro-training','Illustrative scene of young adult coworkers learning vehicle detailing with a supervisor','podpro-photo')}
 </div>

 <div class="work-pair">
  <article><h3>This Is Real Work</h3><p>PodPros work as part of a team providing professional vehicle cleaning services to PodWash corporate partners.</p><p>That means showing up ready to work, learning the job, completing assigned responsibilities, working with others, receiving feedback, solving problems, and meeting workplace expectations.</p><p>Support is available when needed, but the experience is built around real work, real responsibilities, and real expectations.</p></article>
  <article><h3>Support While You Work</h3><p>PodPros are not expected to navigate the workplace alone.</p><p>PodPros work alongside trained PodWash supervisors who provide clear instructions, on site supervision, job coaching, feedback, task support, and guidance throughout the workday.</p><p>Support can be adjusted as skills and independence develop.</p><p>The goal is to provide the structure needed for PodPros to learn, grow, take increasing responsibility, and experience success in a real workplace.</p></article>
 </div>

 <div class="subheading"><div><h3>Skills That Go Beyond PodWash</h3></div><p>The goal is not simply to learn how to clean vehicles. PodPros have opportunities to strengthen eight core workplace skills.</p></div>
 <div class="skills-grid">${skills.map(([i,t,p])=>`<article>${icon(i)}<h4>${t}</h4><p>${p}</p></article>`).join('')}</div>

 <div class="takeaway">
  <div><h3>Your PodWash Experience Can Go With You</h3><p>The workplace skills developed at PodWash are not just vehicle cleaning skills.</p><p>Communication, reliability, problem solving, task completion, teamwork, and responding to feedback matter in almost every workplace.</p><p>Our goal is for PodPros to leave every work experience with more skills, more experience, and a stronger foundation for whatever comes next.</p></div>
  <div><strong>Interested in Becoming a PodPro?</strong><p>If you are between the ages of 16 and 25 and interested in gaining paid work experience while developing workplace skills, we would like to hear from you.</p>${button('/forms/podpro','BECOME A PODPRO')}</div>
 </div>
</div></section>

<section id="area" class="section"><div class="shell location-panel">
 <div>
  <p class="eyebrow">Bring PodWash to Your Area</p>
  <h2>Where Should PodWash Go <em>Next?</em></h2>
  <p class="lede">Want to See PodWash in Your Community?</p>
  <p>PodWash brings together environmentally conscious vehicle cleaning, paid employment, and workforce development.</p>
  <p>If you believe PodWash would be a good fit for your parish, community, city, or country, we want to hear from you.</p>
  <p>Whether you are a community leader, business owner, organization, potential partner, or simply someone who sees a need for PodWash where you live, tell us where you would like to see PodWash next.</p>
  ${button('/forms/area','BRING PODWASH TO MY AREA')}
 </div>
 <div class="location-aside">${icon('geo-alt')}<h3>Where Would You Like to See PodWash?</h3><p>Share your community, city, parish, or country and help us identify places where the PodWash model may be a good fit.</p><div class="tags"><span>Parish</span><span>Community</span><span>City</span><span>Country</span></div></div>
</div></section>

<section id="about" class="section about"><div class="shell">
 <div class="about-grid">
  <div><p class="eyebrow">About PodWash Jamaica</p><h2>Where Workforce Development Meets <em>Real Employment</em></h2></div>
  <div>
   <p class="lede">PodWash Jamaica is an AFC Workforce Initiative that connects workforce development with actual paid employment.</p>
   <p>Autism Family Consultants brings extensive experience supporting autistic individuals and their families, including experience in education, transition planning, workforce preparation, and preparation for adult life.</p>
   <p>PodWash takes that experience into the workplace.</p>
   <p>Instead of only teaching young people about employment, PodWash creates opportunities for them to experience employment.</p>
   <p class="work-statement">They work.<br>They earn.<br>They develop skills.<br>They gain experience.<br>They have the opportunity to demonstrate what they can do.</p>
  </div>
 </div>

 <div class="about-details">
  <article><h3>Why PodWash?</h3><p>The transition from school and training into employment can be difficult for many young people, particularly those who may benefit from additional opportunities to develop and demonstrate workplace skills.</p><p>PodWash helps bridge that space.</p><p>Vehicle cleaning provides work that can be taught systematically, practiced repeatedly, measured clearly, and performed as part of a team.</p><p>That makes the workplace itself an opportunity for growth.</p><p>At the same time, PodWash provides businesses and organizations with a legitimate service they already need.</p><strong>That is the PodWash model: business and workforce development working together.</strong></article>
  <article><h3>An AFC Workforce Initiative</h3><p>Autism Family Consultants believes preparation for adulthood must extend beyond conversations about what young people may eventually do.</p><p>Young people need opportunities to work, practice workplace skills, earn money, receive feedback, solve problems, build confidence, and discover what they are capable of doing.</p><p>PodWash Jamaica was created to provide those opportunities through real employment.</p><p>The workforce model reflects Autism Family Consultants' experience in education, transition planning, family support, workforce preparation, and preparation for adult life while creating a pathway where workplace skills can be practiced in an actual work environment.</p><p>PodWash moves from preparing for employment to creating opportunities for employment.</p><a class="button secondary external-cta" href="https://www.autismfamilyconsultants.com/" target="_blank" rel="noopener">VISIT AUTISM FAMILY CONSULTANTS</a></article>
 </div>

 <div class="ecowash">
  <div>${icon('droplet')}<h3>Powered by<br>EcoWash Global</h3></div>
  <div><p>PodWash Jamaica uses EcoWash Global vehicle cleaning technology.</p><p>The EcoWash system provides an environmentally conscious approach to vehicle cleaning using approximately 2 litres of water per vehicle.</p><p>This technology allows PodWash to combine environmental responsibility, operational convenience, and workforce opportunity within one business model.</p></div>
  <a class="button secondary external-cta" href="https://ecowashglobal.com/" target="_blank" rel="noopener">LEARN MORE ABOUT ECOWASH GLOBAL</a>
 </div>
</div></section>

<section id="contact" class="section contact-section"><div class="shell">
 <div class="contact-grid">
  <div>
   <p class="eyebrow">Contact</p>
   <h2>Let's <em>Connect</em></h2>
   <p>Whether you represent an organization interested in bringing PodWash to your location, are interested in becoming a PodPro, want to see PodWash in your area, or simply want to learn more, we would like to hear from you.</p>
   <a class="contact-email" href="mailto:autismfamilyconsultantslimited@gmail.com">${icon('envelope')} Email the PodWash team</a>
   <p class="small-note">For a detailed inquiry, use one of our dedicated forms below.</p>
  </div>
  <div class="form-card" data-form="contact"></div>
 </div>

 <div class="closing">
  <p class="eyebrow">Clean Vehicles. Create Opportunities.</p>
  <h2>PodWash Jamaica brings together environmentally conscious vehicle cleaning, real employment, and workforce development.</h2>
  <div class="closing-grid">
   <article><h3>For Organizations</h3><p>Bring PodWash to your location and let's develop a vehicle cleaning solution that works for your operation.</p><a href="#corporate">EXPLORE CORPORATE PARTNERSHIPS</a></article>
   <article><h3>For Future PodPros</h3><p>Build skills. Gain experience. Get paid.</p><a href="/forms/podpro">BECOME A PODPRO</a></article>
   <article><h3>Want PodWash in Your Area?</h3><p>Tell us where you would like to see PodWash next.</p><a href="/forms/area">BRING PODWASH TO MY AREA</a></article>
  </div>
 </div>
</div></section>
</main>`;
