import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const h = window.innerHeight;
const w = window.innerWidth;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,w/h,0.1,1000);
const renderer = new THREE.WebGLRenderer({ antialias : true});
camera.position.z = 5;
renderer.setSize(w,h);
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(2,50,50);
const material = new THREE.ShaderMaterial({
  uniforms :{
    uTexture : {value : new THREE.TextureLoader().load('./earth.jpg')}
  },
  vertexShader : `
  varying vec2 vertexUV;
  void main(){
    vertexUV = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
  fragmentShader : `
  uniform sampler2D uTexture;
  varying vec2 vertexUV;
  void main(){
    gl_FragColor = texture2D(uTexture, vertexUV);
  }`
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const newgeometry = new THREE.SphereGeometry(3,50,50);
const newmaterial = new THREE.ShaderMaterial({
  vertexShader :
  `varying vec3 vNormal;
  void main(){
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
  fragmentShader : `
  varying vec3 vNormal;
  void main(){
    float intensity = pow(0.64 - dot(vNormal, vec3(0, 0, 0.65)), 6.0);
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
  }`,
  blending : THREE.AdditiveBlending,
  side : THREE.BackSide
});
const newsphere = new THREE.Mesh(newgeometry, newmaterial);
scene.add(newsphere);

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.02, // Adjust for smaller/larger stars
});

const starVertices = [];
for (let i = 0; i < 10000; i++) {
  // Create random coordinates within a large sphere/cube
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = (Math.random() - 0.5) * 2000;
  starVertices.push(x, y, z);
}

starGeometry.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(starVertices,3)
);

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

function animate(){
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.001;
  renderer.render(scene,camera);
}
animate();