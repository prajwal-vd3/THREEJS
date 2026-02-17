import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js?module';

console.log("Script is running");

const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);
const camera = new THREE.PerspectiveCamera(75,w/h,0.1,1000);
camera.position.z = 3;
const renderer = new THREE.WebGLRenderer({ antialias: (true) });
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.IcosahedronGeometry(1.0,2)
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 , flatShading : true})
const light = new THREE.HemisphereLight(0xffffff , 0x000000, 1)
light.position.set(1,13,2)
scene.add(light)
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)
const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03

window.addEventListener('resize',()=>{
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w/h;
    camera.updateProjectionMatrix()
    renderer.setSize(w,h)
})

function animate(){
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene,camera)
}

animate()