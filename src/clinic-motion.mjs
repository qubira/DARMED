import { animate } from 'framer-motion/dom/mini';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const ease = [0.22, 1, 0.36, 1];

if (!reducedMotion.matches && !location.hash) {
  animate('.hero__copy', { opacity: [0.65, 1], transform: ['translateY(10px)', 'translateY(0)'] }, { duration: 0.45, ease });
  animate('.hero__visual', { opacity: [0.75, 1] }, { duration: 0.5, ease });
}

const studio = document.querySelector('.clinic .hero');
const artwork = studio.querySelector('.hero__visual img');
const interactiveStudio = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 761px) and (prefers-reduced-motion: no-preference)');

function resetStudio() {
  artwork.style.removeProperty('--studio-x');
  artwork.style.removeProperty('--studio-y');
}

function syncStudio() {
  artwork.classList.toggle('is-interactive', interactiveStudio.matches);
  resetStudio();
}

studio.addEventListener('pointermove', event => {
  if (!interactiveStudio.matches || event.pointerType !== 'mouse') return;
  const bounds = studio.getBoundingClientRect();
  artwork.style.setProperty('--studio-x', `${(event.clientX - bounds.left - bounds.width / 2) / bounds.width * 16}px`);
  artwork.style.setProperty('--studio-y', `${(event.clientY - bounds.top - bounds.height / 2) / bounds.height * 12}px`);
}, { passive: true });
studio.addEventListener('pointerleave', resetStudio);
interactiveStudio.addEventListener('change', syncStudio);
syncStudio();

const detail = document.getElementById('tDetail');
new MutationObserver(() => {
  if (reducedMotion.matches || !detail.firstElementChild) return;
  animate(detail.firstElementChild, { opacity: [0.65, 1], transform: ['translateY(6px)', 'translateY(0)'] }, { duration: 0.25, ease });
}).observe(detail, { childList: true });
