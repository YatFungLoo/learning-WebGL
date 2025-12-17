import * as THREE from 'three'  // ES module

// Canvas
const canvas = document.querySelector('canvas.webgl')  // DOM element
console.log(canvas)

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: '#006eff' });
const mesh = new THREE.Mesh(geometry, material);

// Put object into the scene
scene.add(mesh);

// Camera (POV)
const sizes = {
    width: 800,
    height: 600
}
const camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height);  // fov is optional (def = 35)
camera.position.x = 1
camera.position.z = 3

// Put camera into the scene, note adding camera is optional but its better practics to do so
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)