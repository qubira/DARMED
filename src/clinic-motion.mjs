import { animate } from 'framer-motion/dom/mini';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const ease = [0.22, 1, 0.36, 1];

if (!reducedMotion.matches && !location.hash) {
  document.querySelectorAll('.hero__copy > *').forEach((element, index) => {
    animate(element, { opacity: [.55, 1], transform: ['translateY(15px)', 'translateY(0)'] }, { delay: index * .055, duration: .5, ease });
  });
  animate('.hero__portrait img', { transform: ['scale(1.04)', 'scale(1)'] }, { duration: .85, ease });
  animate('.hero__visit', { opacity: [.45, 1], transform: ['translateY(14px)', 'translateY(0)'] }, { delay: .17, duration: .58, ease });
  animate('.hero__monogram img', { transform: ['perspective(220px) rotateY(-65deg)', 'perspective(220px) rotateY(0deg)'] }, { delay: .12, duration: .95, ease });
}

const detail = document.getElementById('tDetail');
new MutationObserver(() => {
  if (reducedMotion.matches || !detail.firstElementChild) return;
  animate(detail.querySelector('.tdetail__img img'), { transform: ['scale(1.08)', 'scale(1)'] }, { duration: .48, ease });
  animate(detail.querySelector('.tdetail__body'), { opacity: [.5, 1], transform: ['translateY(10px)', 'translateY(0)'] }, { duration: .34, ease });
}).observe(detail, { childList: true });

const revealGroups = new Map([
  [document.querySelector('.care-gallery__header'), 'h2, nav'],
  [document.querySelector('.visit__content'), 'h2, li'],
  [document.getElementById('team'), ':scope > *']
]);
const entrances = new IntersectionObserver((entries, observer) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    observer.unobserve(entry.target);
    if (reducedMotion.matches) continue;
    const pieces = entry.target.querySelectorAll(revealGroups.get(entry.target));
    pieces.forEach((piece, index) => {
      animate(piece, { opacity: [.25, 1], transform: ['translateY(18px)', 'translateY(0)'] }, { delay: index * .075, duration: .48, ease });
    });
  }
}, { threshold: .16 });
for (const target of revealGroups.keys()) entrances.observe(target);

const gallery = document.getElementById('careOptions');
const galleryPhoto = gallery.querySelector('img');
const initialPhoto = galleryPhoto.src;
galleryPhoto.addEventListener('load', () => {
  if (reducedMotion.matches || galleryPhoto.src === initialPhoto) return;
  animate(galleryPhoto, { opacity: [.45, 1], transform: ['scale(1.07)', 'scale(1)'] }, { duration: .62, ease });
});
new MutationObserver(() => {
  if (reducedMotion.matches) return;
  animate(gallery.querySelector('.care-gallery__copy'), { opacity: [.4, 1], transform: ['translateY(14px)', 'translateY(0)'] }, { duration: .42, ease });
}).observe(gallery, { attributes: true, attributeFilter: ['data-scene'] });

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
const portraitScene = document.querySelector('.hero__visual');
const hero = document.querySelector('.clinic .hero');
const desktopDepth = matchMedia('(min-width: 761px)');
let pointerX = 0;
let pointerY = 0;
let depthProperties = {};

function syncPortrait() {
  const { top, bottom, height } = hero.getBoundingClientRect();
  if (bottom < 0 || top > innerHeight) return;
  const movement = Math.min(1, Math.max(0, (72 - top) / height));
  const horizontal = desktopDepth.matches ? 1 : .35;
  depthProperties = {
    '--portrait-x': `${pointerX * 4 * horizontal}px`,
    '--portrait-y': `${movement * 18}px`,
    '--portrait-yaw': `${(movement * -11 + pointerX * 4) * horizontal}deg`,
    '--portrait-pitch': `${movement * 4 - pointerY * 3}deg`,
    '--frame-x': `${(movement * -14 + pointerX * 9) * horizontal}px`,
    '--frame-y': `${movement * -4}px`,
    '--frame-z': `${movement * 38 * horizontal}px`,
    '--mark-x': `${(movement * -18 + pointerX * 16) * horizontal}px`,
    '--mark-y': `${movement * -26 + pointerY * 10}px`,
    '--mark-z': `${movement * 55 * horizontal}px`,
    '--mark-yaw': `${(movement * 23 + pointerX * 12) * horizontal}deg`,
    '--visit-card-x': `${(movement * 17 + pointerX * 8) * horizontal}px`,
    '--visit-card-y': `${movement * -36}px`
  };
  for (const [property, value] of Object.entries(depthProperties)) portraitScene.style.setProperty(property, value);
}

hero.addEventListener('pointermove', event => {
  if (reducedMotion.matches || !desktopDepth.matches || event.pointerType !== 'mouse') return;
  const box = portraitScene.getBoundingClientRect();
  pointerX = Math.max(-.5, Math.min(.5, (event.clientX - box.left) / box.width - .5));
  pointerY = Math.max(-.5, Math.min(.5, (event.clientY - box.top) / box.height - .5));
  updateProgress();
}, { passive: true });
hero.addEventListener('pointerleave', () => {
  pointerX = 0;
  pointerY = 0;
  updateProgress();
});
const visit = document.getElementById('experiencia');
const visitFrames = [...visit.querySelectorAll('.visit__frames img')];
const visitSteps = [...visit.querySelectorAll('.visit__steps li')];
let activeVisit = -1;
function syncVisit() {
  const bounds = visit.getBoundingClientRect();
  if (bounds.bottom <= 0 || bounds.top >= innerHeight) return;
  const marker = innerHeight * .67;
  let selected = 0;
  for (const [index, step] of visitSteps.entries()) {
    if (step.getBoundingClientRect().top <= marker) selected = index;
  }
  if (activeVisit !== selected) {
    activeVisit = selected;
    visitFrames.forEach((frame, index) => frame.classList.toggle('is-active', index === selected));
    visitSteps.forEach((step, index) => step.classList.toggle('is-active', index === selected));
  }
  const fraction = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height - innerHeight)));
  visit.style.setProperty('--visit-offset', `${(fraction - .5) * 18}px`);
}
let progressFrame = 0;
function updateProgress() {
  if (reducedMotion.matches || progressFrame) return;
  progressFrame = requestAnimationFrame(() => {
    const pageHeight = document.documentElement.scrollHeight - innerHeight;
    const fraction = pageHeight > 0 ? Math.max(0, Math.min(1, scrollY / pageHeight)) : 0;
    pageProgress.style.transform = `scaleX(${fraction})`;
    if (!reducedMotion.matches) syncPortrait();
    syncVisit();
    progressFrame = 0;
  });
}
addEventListener('scroll', updateProgress, { passive: true });
addEventListener('resize', updateProgress);
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) Object.keys(depthProperties).forEach(property => portraitScene.style.removeProperty(property));
  else updateProgress();
});
updateProgress();
