import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1,1,1,-1,0,10);
camera.position.z = 3;
const renderer = new THREE.WebGLRenderer({ antialias : true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(2,2);
const material = new THREE.ShaderMaterial({
  uniforms : {
    color1 : {value : new THREE.Color()},
    color2 : {value : new THREE.Color()}
  },
  vertexShader : `
  varying vec2 vertexUV;
  void main(){
  vertexUV = uv;
    gl_Position = vec4(position, 1.0);
  }`,
  fragmentShader : `
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vertexUV;
  void main(){
    float gradient = vertexUV.x;
    vec3 final = mix(color1, color2, gradient);
    gl_FragColor = vec4(final, 1.0);
  }`
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function randomColor(){
  return new THREE.Color(
    Math.random(),
    Math.random(),
    Math.random()
  )
}

let target1 = randomColor();
let target2 = randomColor();

material.uniforms.color1.value.copy(randomColor())
material.uniforms.color2.value.copy(randomColor())

setInterval(()=>{
  target1 = randomColor();
  target2 = randomColor();
},2000)

function animate(){
  requestAnimationFrame(animate);
  material.uniforms.color1.value.lerp(target1, 0.02);
  material.uniforms.color2.value.lerp(target2, 0.02);
  renderer.render(scene,camera);
}
animate()

window.addEventListener('resize',()=>{
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w,h);
})