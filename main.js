// Theme toggle with localStorage
const toggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
toggle.addEventListener('click', () => {
  const now = document.documentElement.getAttribute('data-theme') === 'light' ? '' : 'light';
  if (now) document.documentElement.setAttribute('data-theme', now); else document.documentElement.removeAttribute('data-theme');
  localStorage.setItem('theme', now);
});

// Active nav highlighting
const links = Array.from(document.querySelectorAll('nav a'));
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    const id = '#' + e.target.id;
    const link = links.find(l => l.getAttribute('href') === id);
    if (!link) return;
    if (e.isIntersecting) { links.forEach(l => l.classList.remove('active')); link.classList.add('active'); }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
sections.forEach(s => io.observe(s));

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form basic client validation
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
    msg.textContent = 'Please fill out all fields with a valid email.';
  } else {
    msg.textContent = 'Sending…';
  }
});
