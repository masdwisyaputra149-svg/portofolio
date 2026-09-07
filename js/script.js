// ===== Year in footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile menu toggle =====
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Close menu when a link is clicked (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('main section[id], .hero[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', setActiveLink);

// ===== Header shadow + back to top button on scroll =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Typed text effect for role =====
const roles = ['Data Analyst', 'Web Developer'];
const typedEl = document.getElementById('typed');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 50 : 90);
}
typeLoop();

// ===== Accordion (Pengalaman: Pendidikan / Pekerjaan) =====
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.closest('.accordion-item');
    item.classList.toggle('open');
  });
});

// ===== Project image preview =====
const imageModal = document.getElementById('imageModal');
const imageModalPreview = document.getElementById('imageModalPreview');
const imageModalTitle = document.getElementById('imageModalTitle');
const imageModalClose = document.getElementById('imageModalClose');

function closeImageModal() {
  imageModal.hidden = true;
  document.body.style.overflow = '';
}

document.querySelectorAll('.preview-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    imageModalPreview.src = trigger.dataset.image;
    imageModalPreview.alt = trigger.dataset.title;
    imageModalTitle.textContent = trigger.dataset.title;
    imageModal.hidden = false;
    document.body.style.overflow = 'hidden';
  });
});

imageModalClose.addEventListener('click', closeImageModal);
imageModal.addEventListener('click', (event) => {
  if (event.target === imageModal) closeImageModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !imageModal.hidden) closeImageModal();
});

// ===== Reveal on scroll (fade/slide up) =====
const revealTargets = document.querySelectorAll(
  '.section-title, .section-sub, .about-text, .about-info, .accordion-item, .project-card, .skill-item, .cert-card, .contact-info, .contact-form'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px -5% 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

// Fallback: force-reveal any target the observer missed (e.g. instant/programmatic scroll)
setTimeout(() => {
  revealTargets.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('active');
    }
  });
}, 300);

// ===== Animate skill bars when visible =====
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(el => skillObserver.observe(el));

// ===== Simple theme toggle (accent color swap) =====
const themeToggle = document.getElementById('themeToggle');
const accentColors = [
  { primary: '#e53935', dark: '#b71c1c' }, // red (default)
  { primary: '#2563eb', dark: '#1d4ed8' }, // blue
  { primary: '#16a34a', dark: '#15803d' }, // green
  { primary: '#7c3aed', dark: '#6d28d9' }  // purple
];
let colorIndex = 0;
themeToggle.addEventListener('click', () => {
  colorIndex = (colorIndex + 1) % accentColors.length;
  const { primary, dark } = accentColors[colorIndex];
  document.documentElement.style.setProperty('--primary', primary);
  document.documentElement.style.setProperty('--primary-dark', dark);
});

// ===== Contact form (Gmail compose) =====
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputs = contactForm.querySelectorAll('input');
  const message = contactForm.querySelector('textarea');
  const recipient = 'masdwisyaputra@gmail.com';
  const senderName = inputs[0].value.trim();
  const senderEmail = inputs[1].value.trim();
  const subject = inputs[2].value.trim();
  const body = [
    `Nama: ${senderName}`,
    `Email: ${senderEmail}`,
    '',
    message.value.trim()
  ].join('\n');
  const gmailUrl = new URL('https://mail.google.com/mail/');
  gmailUrl.searchParams.set('view', 'cm');
  gmailUrl.searchParams.set('fs', '1');
  gmailUrl.searchParams.set('to', recipient);
  gmailUrl.searchParams.set('su', subject);
  gmailUrl.searchParams.set('body', body);

  window.open(gmailUrl.toString(), '_blank', 'noopener,noreferrer');
});
