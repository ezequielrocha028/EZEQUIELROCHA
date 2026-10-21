// Menu do celular, cabeçalho ao rolar e animação de entrada das seções
const header = document.getElementById('header');
const menuBtn = document.getElementById('menuBtn');

function setMenu(open) {
  header.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
}

menuBtn.addEventListener('click', () => setMenu(!header.classList.contains('open')));
document.querySelectorAll('#nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('visible'));
}

// Galeria: abre a foto em tela cheia, com setas e tecla Esc para fechar
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('img');
const galleryButtons = [...document.querySelectorAll('.gallery-item')];
let current = 0;
let lastFocus = null;

const photosAvailable = () => galleryButtons.filter((b) => b.querySelector('img'));

function showPhoto(btn) {
  const img = btn.querySelector('img');
  if (!img) return;
  current = photosAvailable().indexOf(btn);
  lbImg.src = img.src;
  lbImg.alt = img.alt;
}

function openLightbox(btn) {
  if (!btn.querySelector('img')) return; // foto ainda não enviada
  lastFocus = btn;
  showPhoto(btn);
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  lightbox.querySelector('.lb-close').focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
  if (lastFocus) lastFocus.focus();
}

function step(dir) {
  const list = photosAvailable();
  if (!list.length) return;
  current = (current + dir + list.length) % list.length;
  showPhoto(list[current]);
}

galleryButtons.forEach((b) => b.addEventListener('click', () => openLightbox(b)));
lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lb-prev').addEventListener('click', () => step(-1));
lightbox.querySelector('.lb-next').addEventListener('click', () => step(1));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (lightbox.hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'ArrowRight') step(1);
});

// deslizar o dedo no celular para trocar de foto
let touchX = null;
lightbox.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  touchX = null;
});

// FarLands: o link do menu abre a seção; o botão do final fecha e volta ao título
const flDetails = document.getElementById('flDetails');
document.querySelectorAll('a[href="#farlands"]').forEach((a) =>
  a.addEventListener('click', () => { flDetails.open = true; }));
document.getElementById('flClose').addEventListener('click', () => {
  flDetails.open = false;
  document.getElementById('farlands').scrollIntoView({ behavior: 'smooth' });
});
// garante que o conteúdo apareça ao abrir (animação de entrada)
flDetails.addEventListener('toggle', () => {
  if (flDetails.open) flDetails.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
});

// Números da faixa "Os caminhos percorridos": contam de 0 até o valor ao aparecer na tela
const counters = document.querySelectorAll('[data-count]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function runCounter(el) {
  const target = Number(el.dataset.count);
  const prefix = el.dataset.prefix || '';
  const duration = 1600;
  const start = performance.now();
  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // começa rápido e desacelera no final
    el.textContent = prefix + Math.round(target * eased);
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
if (!reduceMotion && 'IntersectionObserver' in window) {
  counters.forEach((el) => { el.textContent = (el.dataset.prefix || '') + '0'; });
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        runCounter(e.target);
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach((el) => counterObserver.observe(el));
}
