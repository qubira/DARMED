import {
  ACESFilmicToneMapping, AmbientLight, BufferGeometry, CanvasTexture,
  CylinderGeometry, DirectionalLight, DoubleSide, EquirectangularReflectionMapping,
  Float32BufferAttribute, Group, Mesh, MeshStandardMaterial, PerspectiveCamera,
  Scene, SRGBColorSpace, Vector3, WebGLRenderer
} from 'three';

function ribbonGeometry() {
  const segments = 192;
  const positions = [];
  const indices = [];
  const viewAxis = new Vector3(0, 0, 1);
  for (let i = 0; i < segments; i++) {
    const angle = i * Math.PI * 2 / segments;
    const center = new Vector3(1.98 * Math.sin(angle), .99 * Math.sin(2 * angle), .62 * Math.cos(angle));
    const tangent = new Vector3(1.98 * Math.cos(angle), 1.98 * Math.cos(2 * angle), -.62 * Math.sin(angle)).normalize();
    const width = new Vector3().crossVectors(tangent, viewAxis).normalize()
      .applyAxisAngle(tangent, .47 + .74 * Math.sin(angle + .45));
    const halfWidth = .34 + .09 * Math.cos(angle * 2);
    positions.push(...center.clone().addScaledVector(width, -halfWidth).toArray());
    positions.push(...center.clone().addScaledVector(width, halfWidth).toArray());
    const left = i * 2;
    const next = (i + 1) % segments * 2;
    indices.push(left, next, left + 1, next, next + 1, left + 1);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function studioReflections() {
  const map = document.createElement('canvas');
  map.width = 512;
  map.height = 256;
  const brush = map.getContext('2d');
  brush.fillStyle = '#422619';
  brush.fillRect(0, 0, map.width, map.height);
  for (const [x, y, radius, color] of [
    [95, 74, 100, '#fff0cb'],
    [335, 56, 110, '#fff9eb'],
    [440, 145, 64, '#d48959'],
    [255, 206, 60, '#e9b58c']
  ]) {
    const light = brush.createRadialGradient(x, y, 0, x, y, radius);
    light.addColorStop(0, color);
    light.addColorStop(.42, color);
    light.addColorStop(1, '#0000');
    brush.fillStyle = light;
    brush.fillRect(0, 0, map.width, map.height);
  }
  const texture = new CanvasTexture(map);
  texture.mapping = EquirectangularReflectionMapping;
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

export function mountScene(hero, reducedMotion) {
  const canvas = hero.querySelector('.hero__scene');
  const visual = hero.querySelector('.hero__visual');
  const control = hero.querySelector('.hero__motion-control');
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  const scene = new Scene();
  scene.environment = studioReflections();
  const camera = new PerspectiveCamera(35, 1, .1, 40);
  camera.position.set(0, 1.15, 9.5);
  camera.lookAt(0, -.24, 0);
  scene.add(new AmbientLight(0xffc786, .85));
  const key = new DirectionalLight(0xffe7b6, 3.1);
  key.position.set(-2, 5, 4);
  scene.add(key);
  const rim = new DirectionalLight(0xffaa69, 2.4);
  rim.position.set(3, 2, -4);
  scene.add(rim);

  const stage = new Group();
  scene.add(stage);
  const ribbon = new Mesh(ribbonGeometry(), new MeshStandardMaterial({
    color: 0xf9bc65, metalness: .79, roughness: .24, side: DoubleSide
  }));
  ribbon.rotation.set(.12, -.24, .29);
  ribbon.position.y = .12;
  stage.add(ribbon);
  const pedestal = new Mesh(new CylinderGeometry(1.72, 1.81, .34, 80), new MeshStandardMaterial({
    color: 0xc59470, roughness: .71, metalness: .05
  }));
  pedestal.position.y = -1.8;
  stage.add(pedestal);

  let frame = 0;
  let lastTime = 0;
  let elapsed = 0;
  let inView = false;
  let paused = false;
  let lost = false;
  let scrollDepth = 0;
  let pointerX = 0;
  let pointerY = 0;

  function render() {
    renderer.render(scene, camera);
  }

  function tick(time) {
    elapsed += lastTime ? Math.min((time - lastTime) / 1000, .05) : 0;
    lastTime = time;
    const yaw = Math.sin(elapsed * 1.08) * .65 + scrollDepth * .75 + pointerX * .2;
    ribbon.rotation.y += (yaw - ribbon.rotation.y) * .10;
    ribbon.rotation.x = .12 + Math.sin(elapsed * .83) * .16 + pointerY * .13;
    ribbon.rotation.z = .29 + Math.sin(elapsed * .74) * .12;
    ribbon.position.y = .12 + Math.sin(elapsed * 1.17) * .19 + scrollDepth * .25;
    render();
    frame = requestAnimationFrame(tick);
  }

  function updatePlayback() {
    const active = inView && !paused && !reducedMotion.matches && !document.hidden && !lost;
    if (active && !frame) {
      lastTime = 0;
      frame = requestAnimationFrame(tick);
    } else if (!active && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  }

  function resize() {
    if (lost) return;
    const { clientWidth: width, clientHeight: height } = visual;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.fov = Math.max(32, 2 * Math.atan(2.65 / (9.5 * camera.aspect)) * 180 / Math.PI);
    stage.position.x = width > 650 ? .70 : 0;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    render();
  }

  resize();
  visual.classList.add('is-rendered');
  canvas.hidden = false;
  control.hidden = reducedMotion.matches;
  control.addEventListener('click', () => {
    paused = !paused;
    control.textContent = paused ? 'Reanudar animación' : 'Pausar animación';
    updatePlayback();
  });
  reducedMotion.addEventListener('change', () => {
    control.hidden = reducedMotion.matches || lost;
    updatePlayback();
  });
  document.addEventListener('visibilitychange', updatePlayback);
  new ResizeObserver(resize).observe(visual);
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    updatePlayback();
  }, { threshold: .08 }).observe(hero);
  addEventListener('scroll', () => {
    if (!inView || lost) return;
    const { top, height } = hero.getBoundingClientRect();
    scrollDepth = Math.min(1, Math.max(0, -top / height));
  }, { passive: true });
  hero.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    const bounds = hero.getBoundingClientRect();
    pointerX = (event.clientX - bounds.left) / bounds.width - .5;
    pointerY = (event.clientY - bounds.top) / bounds.height - .5;
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; });
  canvas.addEventListener('webglcontextlost', () => {
    lost = true;
    control.hidden = true;
    canvas.hidden = true;
    visual.classList.remove('is-rendered');
    updatePlayback();
  });
}
