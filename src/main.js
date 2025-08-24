import { OrbitControls, ThreeMFLoader } from "three/examples/jsm/Addons.js";
import "./style.css";

import * as THREE from "three";

/** Three objects are always needed: Scene, Camera and Renderer
 * 1. Scene: Container that holds all the objects, cameras and lights
 * 2. Camera: Camera is needed to view the objects inside a scene
 * 3. Renderer: Renderer is responsible for rendering the scene from the perspective of the camera
 */

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / 2 / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth / 2, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

/** To create an object, we need:
 * 1. Geometry: The (x, y, z) coordinates that make up a shape
 * 2. Material: The appearance of the object (color, texture, etc.). Think of it as wrapping paper for the geometry
 * 3. Mesh: Geometry + Material
 */

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
  // wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("space.png");
scene.background = spaceTexture;

const meTexture = new THREE.TextureLoader().load("me.png");

const me = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: meTexture })
);

// scene.add(me);

const drumTexture = new THREE.TextureLoader().load("drum.png");

const drum = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: drumTexture })
);

scene.add(drum);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
