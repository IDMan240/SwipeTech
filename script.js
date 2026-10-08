const header = document.querySelector('.site-header');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 24));
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = open ? '×' : '☰';
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));
document.getElementById('year').textContent = new Date().getFullYear();

const galleryItems = [...document.querySelectorAll('.gallery-item')];
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
let currentImage = 0;
function showImage(index) {
  currentImage = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[currentImage];
  lightboxImage.src = item.dataset.image;
  lightboxImage.alt = item.querySelector('img').alt;
  lightboxCaption.textContent = item.dataset.caption || '';
}
function openLightbox(index) {
  showImage(index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('lightboxClose').focus();
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
galleryItems.forEach((item, index) => item.addEventListener('click', () => openLightbox(index)));
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => showImage(currentImage - 1));
document.getElementById('lightboxNext').addEventListener('click', () => showImage(currentImage + 1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => {
  if (!lightbox.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showImage(currentImage - 1);
  if (event.key === 'ArrowRight') showImage(currentImage + 1);
});

document.getElementById('quoteForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const get = key => (form.get(key) || '').toString().trim();
  const lines = [
    'Hello Keswill Steve Lighting, I would like to make a booking enquiry.',
    '',
    'Name: ' + get('name'),
    'Phone: ' + get('phone'),
    'Event type: ' + get('eventType'),
    'Event date: ' + (get('date') || 'Not specified'),
    'Venue / location: ' + (get('venue') || 'Not specified'),
    'Lighting requirements: ' + (get('requirements') || 'I would like to discuss my requirements.')
  ];
  window.open('https://wa.me/2347086768082?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
});
