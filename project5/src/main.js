import * as THREE from 'three'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z = 3;
const renderer = new THREE.WebGLRenderer({ antialias : true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry(2,3,0.2);
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.7,
    roughness: 0.2
})
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(4, 5, 5);
scene.add(dirLight);
const down = new THREE.DirectionalLight(0xffffff, 1)
down.position.set(-5,-5,-5)
scene.add(down)
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);
mesh.rotation.y = 0.3


let mouseX = 0;
let mouseY = 0;
let target1 = 0;
let target2 = 0;

window.addEventListener('mousemove',(e)=>{
    mouseX = (e.clientX / window.innerWidth) - 0.5 ;
    mouseY = -(e.clientY / window.innerHeight) + 0.5;
    target1 = mouseX * 0.6;
    target2 = mouseY * 0.6
})

function animate(){
    requestAnimationFrame(animate);
    mesh.position.y = Math.sin(Date.now() * 0.002) * 0.1;
    mesh.rotation.x = (target1 - mesh.position.x) * 0.5;
    mesh.rotation.y = (target2 - mesh.position.y) * 0.5;
    renderer.render(scene,camera)
}
animate()

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});