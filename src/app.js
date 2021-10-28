import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import * as dat from 'dat.gui';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  5000,
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

let car;
let hlight;
let directionalLight;
let light;
let light2;
let light3;
let light4;

document.body.onload = () => {
  main();
};

window.onresize = () => {
  scene.background = new THREE.Color(0xdddddd);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight, true);
};

function main() {
  // Configuracion inicial
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  scene.background = new THREE.Color(0xdddddd);
  document.body.appendChild(renderer.domElement);

  /* const axesHelper = new THREE.AxesHelper(20);
  scene.add(axesHelper); */

  cameraConfig();

  // Controls
  new OrbitControls(camera, renderer.domElement);

  // GUI
  loadGUI();

  // Light
  setupLights();

  // Modelo

  let loader = new GLTFLoader();

  loader.load(
    'assets/scene.gltf',
    function (gltf) {
      car = gltf.scene.children[0];
      //car.position.y = 15;
      //car.position.x = 10;
      //car.position.z = -15;
      scene.add(gltf.scene);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );
}

function cameraConfig() {
  camera.position.x = 8;
  camera.position.y = 2;
  camera.position.z = 8;
}

function loadGUI() {
  const gui = new dat.GUI();
}

function setupLights() {
  hlight = new THREE.AmbientLight(0x404040, 100);
  scene.add(hlight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 100);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  light = new THREE.PointLight(0xc4c4c4, 10);
  light.position.set(0, 300, 500);
  scene.add(light);

  light2 = new THREE.PointLight(0xc4c4c4, 10);
  light2.position.set(500, 100, 0);
  scene.add(light2);

  light3 = new THREE.PointLight(0xc4c4c4, 10);
  light3.position.set(0, 100, -500);
  scene.add(light3);

  light4 = new THREE.PointLight(0xc4c4c4, 10);
  light4.position.set(-500, 300, 500);
  scene.add(light4);
}

function animate() {
  renderer.render(scene, camera);
  console.log(camera.position);
  console.log(camera.rotation);
  requestAnimationFrame(animate);
}