import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import GUI from 'lil-gui';

/**
Debug
*/
const gui = new GUI({
    width: 300,
    title: 'test',
    closeFolders: true,
});
// gui.hide();

window.addEventListener('keydown', (event) => {
    if ((event.key == 'h')) {
	gui.show(gui._hidden);
    }
});

const debugObject = {};

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
debugObject.color = '#9f7b43';
debugObject.spin = () => {
    gsap.to(mesh.rotation, { duration: 2, y: mesh.rotation.y + Math.PI * 2 });
    gsap.to(mesh.rotation, { duration: 2, z: mesh.rotation.z + Math.PI * 2 });
    gsap.to(mesh.rotation, {
        duration: 1,
        delay: 2,
        z: mesh.rotation.z - Math.PI * 1,
    });
};
debugObject.subdivision = 2;
gui.add(debugObject, 'subdivision', 0, 10, 1).onFinishChange(() => {
    // mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(
        1,
        1,
        1,
        debugObject.subdivision,
        debugObject.subdivision,
        debugObject.subdivision
    );
});

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({
    color: debugObject.color,
    wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const tweaks = gui.addFolder('tweaks menu');

tweaks.add(mesh.position, 'y', 0, 1, 0.01).name('elevation');
tweaks.add(mesh, 'visible');
tweaks.add(material, 'wireframe');
tweaks.addColor(debugObject, 'color').onChange((value) => {
    material.color.set(debugObject.color);
});
tweaks.add(debugObject, 'spin');
// tweaks.close();

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
