import { animate } from 'framer-motion/dom/mini';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const ease = [0.22, 1, 0.36, 1];

if (!reducedMotion.matches && !location.hash) {
  animate('.hero__copy', { opacity: [0.65, 1], transform: ['translateY(10px)', 'translateY(0)'] }, { duration: 0.45, ease });
  animate('.hero__visual', { opacity: [0.75, 1] }, { duration: 0.5, ease });
}

const studio = document.querySelector('.clinic .hero');
function loadStudio() {
  if (reducedMotion.matches) return;
  reducedMotion.removeEventListener('change', loadStudio);
  import('./irradia-scene.mjs')
    .then(({ mountScene }) => mountScene(studio, reducedMotion))
    .catch(() => {
      // The original artwork is visible if WebGL or the animation module is unavailable.
    });
}
if (reducedMotion.matches) reducedMotion.addEventListener('change', loadStudio);
else loadStudio();

const detail = document.getElementById('tDetail');
new MutationObserver(() => {
  if (reducedMotion.matches || !detail.firstElementChild) return;
  animate(detail.querySelector('.tdetail__img img'), { transform: ['scale(1.08)', 'scale(1)'] }, { duration: .48, ease });
  animate(detail.querySelector('.tdetail__body'), { opacity: [.5, 1], transform: ['translateY(10px)', 'translateY(0)'] }, { duration: .34, ease });
}).observe(detail, { childList: true });

const revealGroups = new Map([
  [document.getElementById('careOptions'), ':scope > a'],
  [document.querySelector('.visit__content'), 'h2, li'],
  [document.getElementById('team'), ':scope > *']
]);
const entrances = new IntersectionObserver((entries, observer) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    observer.unobserve(entry.target);
    if (reducedMotion.matches) continue;
    if (entry.target.matches('.visit__media')) {
      animate(entry.target, { clipPath: ['inset(0 24% 0 0 round 12px)', 'inset(0 0 0 0 round 12px)'] }, { duration: .76, ease })
        .then(() => entry.target.style.removeProperty('clip-path'));
      animate(entry.target.querySelector('img'), { transform: ['scale(1.09)', 'scale(1)'] }, { duration: .85, ease });
      continue;
    }
    const pieces = entry.target.querySelectorAll(revealGroups.get(entry.target));
    pieces.forEach((piece, index) => {
      animate(piece, { opacity: [.25, 1], transform: ['translateY(18px)', 'translateY(0)'] }, { delay: index * .075, duration: .48, ease });
    });
  }
}, { threshold: .16 });
entrances.observe(document.querySelector('.visit__media'));
for (const target of revealGroups.keys()) entrances.observe(target);

const quiz = document.getElementById('quizMain');
new MutationObserver(() => {
  if (reducedMotion.matches) return;
  animate(quiz, { opacity: [.55, 1], transform: ['translateX(14px)', 'translateX(0)'] }, { duration: .32, ease });
}).observe(quiz, { childList: true });

const summary = document.querySelector('.summary');
new MutationObserver(records => {
  if (reducedMotion.matches) return;
  for (const field of new Set(records.map(record => record.target))) {
    animate(field, { opacity: [.45, 1], transform: ['translateY(5px)', 'translateY(0)'] }, { duration: .26, ease });
  }
}).observe(summary, { childList: true, subtree: true });

const pageProgress = document.querySelector('.clinic-progress');
let progressFrame = 0;
function updateProgress() {
  if (reducedMotion.matches || progressFrame) return;
  progressFrame = requestAnimationFrame(() => {
    const pageHeight = document.documentElement.scrollHeight - innerHeight;
    const fraction = pageHeight > 0 ? Math.max(0, Math.min(1, scrollY / pageHeight)) : 0;
    pageProgress.style.transform = `scaleX(${fraction})`;
    progressFrame = 0;
  });
}
addEventListener('scroll', updateProgress, { passive: true });
addEventListener('resize', updateProgress);
reducedMotion.addEventListener('change', updateProgress);
updateProgress();
