// ===== Theme Toggle (dark/light) =====
const toggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
toggle.addEventListener('click', () => {
  const now = document.documentElement.getAttribute('data-theme') === 'light' ? '' : 'light';
  if (now) document.documentElement.setAttribute('data-theme', now);
  else document.documentElement.removeAttribute('data-theme');
  localStorage.setItem('theme', now);
});

// ===== Active nav highlight =====
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

// ===== Footer Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Contact form basic validation =====
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
if (form) {
  form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      msg.textContent = 'Please fill out all fields with a valid email.';
    } else {
      msg.textContent = 'Sending…';
    }
  });
}

// ===== Theme Customizer =====
const COLOR_VARS = ['--primary','--primary-2','--bg','--bg-soft','--card','--border','--fg','--muted'];
const customizer = document.getElementById('customizer');
const openBtn = document.getElementById('openCustomizer');
const closeBtn = document.getElementById('closeCustomizer');
const saveBtn = document.getElementById('saveTheme');
const resetBtn = document.getElementById('resetTheme');
const presetSelect = document.getElementById('presetSelect');
const custMsg = document.getElementById('custMsg');

const PRESETS = {
  ocean: {
    '--primary':'#2563eb','--primary-2':'#38bdf8',
    '--bg':'#0a1020','--bg-soft':'#0e1630','--card':'#101a2c','--border':'#21314f',
    '--fg':'#e9eef6','--muted':'#96a3be'
  },
  teal: {
    '--primary':'#0ea5a4','--primary-2':'#5eead4',
    '--bg':'#071a1a','--bg-soft':'#0b2323','--card':'#0d2626','--border':'#0f3a3a',
    '--fg':'#e6fffb','--muted':'#8bdad4'
  },
  violet: {
    '--primary':'#7c3aed','--primary-2':'#a78bfa',
    '--bg':'#0f0a1a','--bg-soft':'#160e26','--card':'#1a1030','--border':'#2a1f4d',
    '--fg':'#efeaff','--muted':'#b9a9f2'
  },
  sunset: {
    '--primary':'#f97316','--primary-2':'#fda4af',
    '--bg':'#180d0a','--bg-soft':'#22110c','--card':'#27140e','--border':'#3a1f15',
    '--fg':'#fff4ed','--muted':'#f0c2a6'
  }
};

function getComputedVar(name){
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
function applyVars(vars){
  Object.entries(vars).forEach(([k,v])=>{
    document.documentElement.style.setProperty(k, v);
  });
}
function readUIVars(){
  const out = {};
  COLOR_VARS.forEach(v=>{
    const el = document.getElementById('var'+v);
    if (el && el.value) out[v] = el.value;
  });
  return out;
}
function syncUIWithCurrent(){
  COLOR_VARS.forEach(v=>{
    const el = document.getElementById('var'+v);
    if (el) el.value = rgbToHex(getComputedVar(v));
  });
}
function rgbToHex(rgb){
  if (!rgb) return '#000000';
  if (rgb.startsWith('#')) return rgb;
  const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return '#000000';
  const [r,g,b] = m.slice(1).map(Number);
  return '#'+[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('');
}

// Open/close
function openCustomizerPanel(){
  syncUIWithCurrent();
  customizer.setAttribute('aria-hidden','false');
}
function closeCustomizerPanel(){
  customizer.setAttribute('aria-hidden','true');
}
openBtn?.addEventListener('click', openCustomizerPanel);
closeBtn?.addEventListener('click', closeCustomizerPanel);
customizer?.addEventListener('click', (e)=>{ if (e.target === customizer) closeCustomizerPanel(); });

// Live updates
COLOR_VARS.forEach(v=>{
  const el = document.getElementById('var'+v);
  el?.addEventListener('input', ()=>{
    document.documentElement.style.setProperty(v, el.value);
  });
});

// Save / Reset
saveBtn?.addEventListener('click', ()=>{
  const vars = readUIVars();
  applyVars(vars);
  localStorage.setItem('themeVars', JSON.stringify(vars));
  custMsg.textContent = 'Saved!';
  setTimeout(()=> custMsg.textContent = '', 1200);
});
resetBtn?.addEventListener('click', ()=>{
  localStorage.removeItem('themeVars');
  const theme = document.documentElement.getAttribute('data-theme');
  document.documentElement.removeAttribute('style'); // clears inline vars
  // Re-set the current theme attribute to re-apply CSS rules
  if (theme) document.documentElement.setAttribute('data-theme', theme);
  syncUIWithCurrent();
  custMsg.textContent = 'Reset to defaults';
  setTimeout(()=> custMsg.textContent = '', 1200);
});

// Presets
presetSelect?.addEventListener('change', ()=>{
  const p = PRESETS[presetSelect.value];
  if (!p) return;
  applyVars(p);
  syncUIWithCurrent();
  custMsg.textContent = 'Preset applied';
  setTimeout(()=> custMsg.textContent = '', 1200);
});

// Load saved vars on boot
try {
  const savedVars = JSON.parse(localStorage.getItem('themeVars') || 'null');
  if (savedVars) applyVars(savedVars);
} catch {}
