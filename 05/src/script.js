import * as THREE from 'three';
import gsap from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const mesh2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x0055ff,
    wireframe: true,
  })
);
mesh2.position.x = -2;
scene.add(mesh2);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Clock
const clock = new THREE.Clock();

// Gsap
gsap.to(mesh2.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh2.position, { duration: 1, delay: 2, x: -2 });

// Animation
const tick = () => {
  const elapsedTime = clock.getElapsedTime(); // started a zero, in second

  mesh.rotation.x = Math.sin(elapsedTime * 0.5);
  mesh.rotation.z = Math.cos(elapsedTime * 0.5);
  mesh.position.x = Math.sin(elapsedTime * 0.5);
  mesh.position.y = Math.cos(elapsedTime * 0.5);
  // camera.lookAt(mesh.position)

  renderer.render(scene, camera); // rerenderer
  window.requestAnimationFrame(tick);
};

tick();
