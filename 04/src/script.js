import * as THREE from 'three';

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0xff00ff,
    wireframe: true,
  })
);
group.add(cube1);

cube1.position.set(4, 1, -1);
cube1.scale.set(1, 3, -6);
cube1.rotation.reorder('YXZ');
cube1.rotation.set(Math.PI * 0, Math.PI * 0, Math.PI * 0);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  })
);
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
  })
);
group.add(cube3);

cube3.position.set(1, 1, 3);

// rotation all cube 1, 2 and 3
group.rotation.set(0, 0.3, 0);

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// console.log(cube1.position.length());

const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height);
camera.position.set(2, 1, 8);
scene.add(camera);

camera.lookAt(cube3.position);

// mesh.position.normalize(camera.position)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
