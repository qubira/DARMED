import { animate } from 'framer-motion/dom/mini';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const ease = [0.22, 1, 0.36, 1];

if (!reducedMotion.matches && !location.hash) {
  animate('.hero__copy', { opacity: [0.65, 1], transform: ['translateY(10px)', 'translateY(0)'] }, { duration: 0.45, ease });
  animate('.hero__visual', { opacity: [0.75, 1] }, { duration: 0.5, ease });
}

const detail = document.getElementById('tDetail');
new MutationObserver(() => {
  if (reducedMotion.matches || !detail.firstElementChild) return;
  animate(detail.firstElementChild, { opacity: [0.65, 1], transform: ['translateY(6px)', 'translateY(0)'] }, { duration: 0.25, ease });
}).observe(detail, { childList: true });
