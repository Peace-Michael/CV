// script.js - Updated for new HTML structure

// ---- DOM refs ----
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.nav-link');
const filters = document.querySelectorAll('.filter-pill');
const projectCards = document.querySelectorAll('.project-card');
const caseStudyButtons = document.querySelectorAll('.case-study-btn'); // now using .case-study-btn
const modal = document.getElementById('case-study-modal');
const modalBody = document.getElementById('modal-content');
const modalClose = document.querySelector('.modal-close');
const contactForm = document.querySelector('.contact-form');
const formMessage = document.querySelector('.form-message');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// ---- Case study data ----
const caseStudies = {
  azure: {
    title: 'Azure Cloud BI and Medallion Data Pipeline',
    category: 'Cloud & Data Engineering',
    tags: ['Azure', 'Medallion Architecture', 'Power BI', 'SQL'],
    description: 'Built a scalable data foundation to support reporting and analytics across structured business data. Implemented a medallion architecture (bronze, silver, gold layers) to ensure data quality and reliability.',
    detail: 'The pipeline processed over 1.9 million records, enabling faster and more accurate reporting. The project improved data accessibility for the analytics team and reduced reporting time by 40%.'
  },
  powerbi: {
    title: 'Executive Power BI Suite',
    category: 'Business Intelligence',
    tags: ['Power BI', 'DAX', 'KPI reporting', 'Excel'],
    description: 'Developed more than 40 Power BI metrics to help managers monitor sales, finance, HR, and inventory performance. Created interactive dashboards with drill-through capabilities.',
    detail: 'The suite provided a single source of truth for executive decision-making, reducing reporting inconsistencies and saving 15+ hours per week in manual reporting efforts.'
  }
  // Add more projects as needed
};

// ---- Mobile nav toggle ----
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('is-open');
  });
}

// ---- Active nav link ----
navLinks.forEach((link) => {
  if (link.classList.contains('active')) {
    link.setAttribute('aria-current', 'page');
  }
});

// ---- Project filtering ----
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

// ---- Case study modal ----
function openModal(projectId) {
  const data = caseStudies[projectId];
  if (!data) return;

  modalBody.innerHTML = `
    <p class="project-category">${data.category}</p>
    <h2 id="modal-title">${data.title}</h2>
    <div class="modal-tags">
      ${data.tags.map(tag => `<span>${tag}</span>`).join('')}
    </div>
    <p>${data.description}</p>
    <div class="modal-detail">
      <strong>Key outcome:</strong> ${data.detail}
    </div>
  `;

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

caseStudyButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const projectId = button.dataset.project;
    openModal(projectId);
  });
});

// Close modal on backdrop click or close button
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.closest('.modal-close')) {
      closeModal();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
    closeModal();
  }
});

// ---- Contact form ----
if (contactForm && formMessage) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name')?.trim() || '';
    const email = formData.get('email')?.trim() || '';
    const subject = formData.get('subject')?.trim() || '';
    const message = formData.get('message')?.trim() || '';

    if (!name || !email || !subject || !message) {
      formMessage.textContent = 'Please fill in all required fields.';
      formMessage.className = 'form-message error';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formMessage.textContent = 'Please enter a valid email address.';
      formMessage.className = 'form-message error';
      return;
    }

    formMessage.textContent = 'Thank you! Your message has been sent successfully.';
    formMessage.className = 'form-message success';
    contactForm.reset();

    setTimeout(() => {
      formMessage.textContent = '';
      formMessage.className = 'form-message';
    }, 5000);
  });
}

// ---- Dark mode toggle ----
function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
  if (themeIcon) {
    themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
  // Update toggle text (if present)
  const toggleText = themeToggle?.querySelector('span');
  if (toggleText) {
    toggleText.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
  }
}

if (themeToggle) {
  const currentTheme = getPreferredTheme();
  setTheme(currentTheme);

  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    setTheme(next);
  });
}

// ---- Initialize Lucide icons (if needed) ----
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});