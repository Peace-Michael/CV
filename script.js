const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const filters = document.querySelectorAll('.filter-pill');
const projectCards = document.querySelectorAll('.project-card');
const caseStudyButtons = document.querySelectorAll('.text-button[data-case-study]');
const navLinks = document.querySelectorAll('.nav-link');
const modal = document.getElementById('case-study-modal');
const modalBody = document.getElementById('modal-content');
const closeButtons = document.querySelectorAll('[data-close-modal]');
const contactForm = document.querySelector('.contact-form');
const formMessage = document.querySelector('.form-message');

const caseStudies = {
  azure: {
    title: 'Azure Cloud BI and Medallion Data Pipeline',
    summary: 'Project type: Professional Project<br>Duration: Multi-phase delivery<br>Role: Data and BI support<br>Tools: Azure, SQL, Power BI<br>Dataset / scale: Large-scale business data processing<br>Key result: Improved access to trusted reporting data',
    content: '<h3>Project Overview</h3><p>This project focused on creating a dependable data foundation for reporting and analysis using an Azure-based pipeline and Medallion architecture approach.</p><h3>Business Problem</h3><p>The organisation needed a more structured way to bring together business data sources and support reporting with better consistency and trust.</p><h3>My Role</h3><p>I contributed to the data preparation, pipeline coordination, and reporting support needed to make data usable for decision-making.</p><h3>Tools and Technologies</h3><p>Microsoft Azure, Azure Blob Storage, SQL, Power BI, Medallion Architecture.</p><h3>Data or Process Used</h3><p>Structured business datasets were organised into layered data flows to support downstream reporting and analytics.</p><h3>Approach</h3><p>The work centred on creating reliable data movement, transformation, and quality checks to support reporting needs.</p><h3>Dashboard, Architecture, or Workflow Visual</h3><p><img src="assets/projects/azure-medallion-dashboard.png" alt="Azure data pipeline placeholder" loading="lazy" /></p><h3>Key Results</h3><p>Improved access to organised and trusted data for reporting and analytical workflows.</p><h3>Challenges</h3><p>Balancing performance, data quality, and usability across multiple data sources required careful planning.</p><h3>Lessons Learned</h3><p>Clear documentation and consistent data standards are important for long-term reporting reliability.</p><h3>Future Improvements</h3><p>Further automation, monitoring, and expanded reporting coverage could strengthen the solution.</p>'
  },
  netsuite: {
    title: 'Oracle NetSuite ERP Transformation',
    summary: 'Project type: Professional Project<br>Duration: Transformation support<br>Role: Data and process support<br>Tools: Oracle NetSuite, Excel, SQL<br>Dataset / scale: 50,000+ records migrated<br>Key result: Greater structure and oversight during transformation',
    content: '<h3>Project Overview</h3><p>This case study reflects support for an ERP transformation that required careful data movement, coordination, and process oversight.</p><h3>Business Problem</h3><p>The business needed to transition to a new system while maintaining continuity and reducing the risk of data issues.</p><h3>My Role</h3><p>I supported data preparation, migration coordination, and process-related activities across the transformation.</p><h3>Tools and Technologies</h3><p>Oracle NetSuite, Excel, SQL, reporting tools.</p><h3>Data or Process Used</h3><p>Data mapping, validation, and migration support were used to manage a large record set during the change.</p><h3>Approach</h3><p>The work combined process structure with practical data handling to support the move to the new ERP environment.</p><h3>Dashboard, Architecture, or Workflow Visual</h3><p><img src="assets/projects/netsuite-transformation.png" alt="NetSuite transformation placeholder" loading="lazy" /></p><h3>Key Results</h3><p>More than 50,000 records were moved with improved structure and greater oversight.</p><h3>Challenges</h3><p>Maintaining consistency across migrating records and supporting stakeholders during change was a key challenge.</p><h3>Lessons Learned</h3><p>Well-managed data controls and communication are essential in transformation work.</p><h3>Future Improvements</h3><p>Additional automation and validation checks could further improve data readiness.</p>'
  },
  powerbi: {
    title: 'Executive Power BI Suite',
    summary: 'Project type: Professional Project<br>Duration: Ongoing reporting development<br>Role: BI analyst and dashboard developer<br>Tools: Power BI, DAX, Excel<br>Dataset / scale: 40+ executive and operational KPIs<br>Key result: Improved management reporting visibility',
    content: '<h3>Project Overview</h3><p>This work involved building a suite of reporting views for managers and executives to monitor performance across key business areas.</p><h3>Business Problem</h3><p>Leadership needed a clear and consistent way to review business performance without relying on fragmented reporting.</p><h3>My Role</h3><p>I supported the design of dashboard structures, metric definitions, and reporting layouts that were easy to interpret.</p><h3>Tools and Technologies</h3><p>Power BI, DAX, Excel, business reporting methods.</p><h3>Data or Process Used</h3><p>Business metrics were defined and organised into dashboards to support clear performance tracking.</p><h3>Approach</h3><p>Each dashboard was shaped around the needs of different audiences, balancing detail with readability.</p><h3>Dashboard, Architecture, or Workflow Visual</h3><p><img src="assets/projects/executive-powerbi-dashboard.png" alt="Power BI dashboard placeholder" loading="lazy" /></p><h3>Key Results</h3><p>More than 40 metrics were created to improve reporting consistency and executive oversight.</p><h3>Challenges</h3><p>Different stakeholders needed varying levels of detail, which required careful dashboard design.</p><h3>Lessons Learned</h3><p>Strong reporting depends as much on clear logic as on strong visuals.</p><h3>Future Improvements</h3><p>Deeper drill-through options and more automated refresh processes could enhance the experience.</p>'
  },
  workflow: {
    title: 'Operations Process and Workflow Engineering',
    summary: 'Project type: Professional Project<br>Duration: Process review and improvement<br>Role: Process analyst and coordinator<br>Tools: Visio, BPMN, Excel<br>Dataset / scale: Operational workflows and service processes<br>Key result: More reliable and better-understood operational processes',
    content: '<h3>Project Overview</h3><p>This project focused on reviewing and improving operational workflows to reduce ambiguity and support more consistent outcomes.</p><h3>Business Problem</h3><p>Operational handovers and process steps were not always clear, which created friction and unnecessary delays.</p><h3>My Role</h3><p>I contributed by mapping processes, identifying gaps, and helping shape more effective workflow structures.</p><h3>Tools and Technologies</h3><p>Visio, BPMN, process mapping methods, Excel.</p><h3>Data or Process Used</h3><p>Existing workflow documentation and process observations were used to create clearer operating models.</p><h3>Approach</h3><p>Workflows were reviewed from a practical perspective with attention to consistency, ownership, and traceability.</p><h3>Dashboard, Architecture, or Workflow Visual</h3><p><img src="assets/projects/workflow-process-map.png" alt="Workflow map placeholder" loading="lazy" /></p><h3>Key Results</h3><p>Improved process clarity and stronger operational oversight across the work area.</p><h3>Challenges</h3><p>Bringing multiple perspectives together into a single, clear process view required careful facilitation.</p><h3>Lessons Learned</h3><p>Processes become more effective when documentation reflects how people actually work.</p><h3>Future Improvements</h3><p>Further automation and clearer governance could help scale the approach.</p>'
  },
  incident: {
    title: 'Incident Trends and Behavioural Intelligence',
    summary: 'Project type: Professional Project<br>Duration: Analytical review<br>Role: Analyst and reporting support<br>Tools: Splunk, Excel, reporting tools<br>Dataset / scale: Incident and operational datasets<br>Key result: Better visibility into recurring issues and trends',
    content: '<h3>Project Overview</h3><p>This work involved analysing operational incidents and patterns to better understand recurring behaviours and risk signals.</p><h3>Business Problem</h3><p>Incident data was available, but it needed to be translated into clearer trend-based insight for monitoring and response.</p><h3>My Role</h3><p>I supported analysis, reporting, and the communication of findings into a more understandable format.</p><h3>Tools and Technologies</h3><p>Splunk, Excel, reporting tools, incident analysis methods.</p><h3>Data or Process Used</h3><p>Incident data was reviewed and summarised to highlight patterns and contributors.</p><h3>Approach</h3><p>The analysis emphasised clarity, context, and practical interpretation rather than purely technical detail.</p><h3>Dashboard, Architecture, or Workflow Visual</h3><p><img src="assets/projects/incident-trends-dashboard.png" alt="Incident trends placeholder" loading="lazy" /></p><h3>Key Results</h3><p>Improved visibility into recurring issues and stronger support for operational monitoring.</p><h3>Challenges</h3><p>Signal quality and the need to interpret complex events carefully were important considerations.</p><h3>Lessons Learned</h3><p>Strong analysis depends on disciplined data handling and thoughtful communication.</p><h3>Future Improvements</h3><p>More automated trend reporting and deeper segmentation could increase value.</p>'
  },
  edtech: {
    title: 'EdTech Programme and Partner Metrics',
    summary: 'Project type: Professional Project<br>Duration: Programme monitoring<br>Role: Reporting and metrics support<br>Tools: Excel, reporting tools, SQL<br>Dataset / scale: 150+ participants supported<br>Key result: Better oversight of programme performance and stakeholder engagement',
    content: '<h3>Project Overview</h3><p>This project focused on tracking programme activity and partner performance through structured reporting and operational metrics.</p><h3>Business Problem</h3><p>The programme needed clearer visibility into participation, engagement, and outcomes across multiple stakeholders.</p><h3>My Role</h3><p>I supported reporting structures, data organisation, and insight delivery that helped stakeholders monitor progress.</p><h3>Tools and Technologies</h3><p>Excel, SQL, reporting tools, stakeholder tracking methods.</p><h3>Data or Process Used</h3><p>Programme data and engagement records were organised into consistent metrics and reporting views.</p><h3>Approach</h3><p>Reporting was designed to be straightforward and useful for operational and partner-facing audiences.</p><h3>Dashboard, Architecture, or Workflow Visual</h3><p><img src="assets/projects/edtech-kpi-tracker.png" alt="EdTech dashboard placeholder" loading="lazy" /></p><h3>Key Results</h3><p>Support was provided to more than 150 participants through clearer tracking and reporting processes.</p><h3>Challenges</h3><p>The work required balancing detail, consistency, and accessibility for different audiences.</p><h3>Lessons Learned</h3><p>Well-designed reporting can make a significant difference to programme coordination.</p><h3>Future Improvements</h3><p>More automated data refreshes and richer trend views could expand the solution.</p>'
  }
};

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('is-open');
  });
}

navLinks.forEach((link) => {
  const isActive = link.classList.contains('active');
  if (isActive) {
    link.setAttribute('aria-current', 'page');
  }
});

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    filter.classList.add('active');
    const selected = filter.dataset.filter || 'all';

    projectCards.forEach((card) => {
      const category = card.dataset.category || '';
      const matches = selected === 'all' || category === selected;
      card.style.display = matches ? 'flex' : 'none';
    });
  });
});

caseStudyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.caseStudy;
    const data = caseStudies[key];
    if (!data) return;

    modalBody.innerHTML = `
      <p class="eyebrow">Case study</p>
      <h2>${data.title}</h2>
      <p>${data.summary}</p>
      ${data.content}
    `;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

closeButtons.forEach((button) => {
  button.addEventListener('click', closeModal);
});

modal.addEventListener('click', (event) => {
  if (event.target === modal || event.target.hasAttribute('data-close-modal')) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) {
    closeModal();
  }
});

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get('name')?.toString().trim() || '';
    const email = data.get('email')?.toString().trim() || '';
    const subject = data.get('subject')?.toString().trim() || '';
    const message = data.get('message')?.toString().trim() || '';

    if (!name || !email || !subject || !message) {
      formMessage.textContent = 'Please complete the required fields before sending.';
      formMessage.classList.add('error');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formMessage.textContent = 'Please enter a valid email address.';
      formMessage.classList.add('error');
      return;
    }

    formMessage.textContent = 'Thanks for getting in touch. This form is ready for email integration or a mailto fallback.';
    formMessage.classList.remove('error');
    contactForm.reset();
  });
}
