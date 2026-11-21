import { animate } from 'framer-motion/dom/mini';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const ease = [0.22, 1, 0.36, 1];

const portraitScene = document.querySelector('.hero__visual');
const motionToggle = portraitScene.querySelector('.hero__motion-toggle');
let motionPaused = false;
let portraitVisible = true;

function syncAmbientMotion() {
  const enabled = !reducedMotion.matches;
  portraitScene.classList.toggle('has-ambient-motion', enabled);
  portraitScene.classList.toggle('is-motion-paused', motionPaused);
  portraitScene.classList.toggle('is-offscreen', !portraitVisible || document.hidden);
  motionToggle.hidden = !enabled;
}

motionToggle.addEventListener('click', () => {
  motionPaused = !motionPaused;
  const label = motionPaused ? 'Reanudar animación de portada' : 'Pausar animación de portada';
  motionToggle.setAttribute('aria-label', label);
  motionToggle.title = label;
  syncAmbientMotion();
  if (!motionPaused) updateProgress();
});
new IntersectionObserver(([entry]) => {
  portraitVisible = entry.isIntersecting;
  syncAmbientMotion();
}).observe(portraitScene);
document.addEventListener('visibilitychange', syncAmbientMotion);
syncAmbientMotion();

const endOpening = () => portraitScene.classList.remove('is-opening');
portraitScene.addEventListener('focusin', endOpening);
if (!reducedMotion.matches && !location.hash && scrollY < 100) {
  const openingImage = portraitScene.querySelector('.hero__opening');
  openingImage.decode().then(() => {
    if (reducedMotion.matches || motionPaused || scrollY >= 100 || portraitScene.matches(':focus-within')) return;
    portraitScene.classList.add('is-opening');
    portraitScene.querySelector('.hero__depth').addEventListener('animationend', event => {
      if (event.animationName === 'opening-camera') endOpening();
    });
  }).catch(() => {
    // The main portrait stays visible if the opening image cannot be decoded.
  });
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
const galleryVisual = gallery.querySelector('.care-gallery__visual');
const galleryInlay = gallery.querySelector('.care-gallery__inlay');
const galleryAction = gallery.querySelector('.care-gallery__copy .btn');
new IntersectionObserver(([entry], observer) => {
  if (!entry.isIntersecting) return;
  observer.disconnect();
  if (reducedMotion.matches) return;
  animate(galleryVisual, { opacity: [.45, 1], transform: ['perspective(1000px) translateZ(-65px) rotateY(9deg)', 'perspective(1000px) translateZ(0px) rotateY(0deg)'] }, { duration: .9, ease });
}, { threshold: .2 }).observe(galleryVisual);
new MutationObserver(() => {
  if (reducedMotion.matches) return;
  const copy = gallery.querySelectorAll('#care-description > h3, #care-description > p, .care-gallery__topics > li');
  [...copy, galleryAction].forEach((piece, index) => {
    animate(piece, { opacity: [.35, 1], transform: ['translateY(12px)', 'translateY(0)'] }, { delay: index * .045, duration: .36, ease });
  });
  animate(galleryInlay, { opacity: [.25, 1], transform: ['perspective(850px) translateZ(42px) rotateY(-7deg)', 'perspective(850px) translateZ(0px) rotateY(0deg)'] }, { duration: .62, ease });
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
    if (!reducedMotion.matches && !motionPaused) syncPortrait();
    const photoBounds = galleryVisual.getBoundingClientRect();
    if (photoBounds.bottom > 0 && photoBounds.top < innerHeight) {
      const travel = Math.min(13, photoBounds.height * .03);
      const progress = Math.max(-1, Math.min(1, 1 - 2 * (photoBounds.top + photoBounds.height / 2) / innerHeight));
      gallery.style.setProperty('--gallery-drift', `${progress * travel}px`);
    }
    syncVisit();
    progressFrame = 0;
  });
}
addEventListener('scroll', updateProgress, { passive: true });
addEventListener('resize', updateProgress);
reducedMotion.addEventListener('change', () => {
  syncAmbientMotion();
  if (reducedMotion.matches) {
    endOpening();
    gallery.style.removeProperty('--gallery-drift');
    Object.keys(depthProperties).forEach(property => portraitScene.style.removeProperty(property));
  }
  else updateProgress();
});
updateProgress();
