import * as THREE from 'three';

const right =  document.querySelector('.right')

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  65,
  right.clientWidth / right.clientHeight,
  0.1,
  1000
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(right.clientWidth, right.clientHeight);
right.appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry(0.7, 0.2, 150, 52);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove',(e)=>{
  mouseX = e.clientX / window.innerWidth;
  mouseY = -(e.clientY / window.innerHeight);
})

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.005;
  mesh.position.x = (mouseX - mesh.position.x)/3;
  mesh.position.y = (mouseY - mesh.position.y)/3;
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  const right =  document.querySelector('.right')
  camera.aspect = right.clientWidth / right.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(right.clientWidth, right.clientHeight);
});
