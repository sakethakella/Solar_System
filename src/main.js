import "../src/style.css";
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import sunte from "../src/assets/suntex.jpg";
import mertex from "../src/assets/mercury.jpeg";
import venustex from "../src/assets/venus.jpeg";
import earthtex from "../src/assets/earth.jpeg";
import marstex from "../src/assets/mars.jpg";
import jupitertex from "../src/assets/jupiter.jpeg";
import saturntex from "../src/assets/saturn.jpg";
import uranustex from "../src/assets/uranus.png";
import neptunetex from "../src/assets/neptune.jpg";

const container= document.getElementById('threejs-container');
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);
const scene=new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.01,1000);
// const orbit=new OrbitControls(camera, renderer.domElement);
camera.position.set(0,10,20);
// orbit.update();
scene.background=new THREE.Color(0x000000);
const light2=new THREE.AmbientLight();
scene.add(light2);
light2.position.set(0,0,0);
const light=new THREE.DirectionalLight();
scene.add(light);
light.position.set(0,20,10);
const particleCount = 5000;
const particles = new THREE.BufferGeometry();
const positions = [];

for (let i = 0; i < particleCount; i++) {
  positions.push(
    (Math.random() - 0.5) * 1000, // X
    (Math.random() - 0.5) * 1000, // Y
    (Math.random() - 0.5) * 1000  // Z
  );
}
particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({ color: ( 0xffffff), size: 0.1 });
const pointCloud = new THREE.Points(particles, material);
scene.add(pointCloud);
//sun 
const sungeo=new THREE.SphereGeometry(20,100,100);
const suntex=new THREE.TextureLoader().load(sunte);
const sunmat=new THREE.MeshBasicMaterial({map:suntex});
const sun=new THREE.Mesh(sungeo,sunmat);
scene.add(sun);
//mercury
const mergeo=new THREE.SphereGeometry(3,100,100);
const mertex1=new THREE.TextureLoader().load(mertex);
const mermat=new THREE.MeshBasicMaterial({map:mertex1});
const mer=new THREE.Mesh(mergeo,mermat);
scene.add(mer);
mer.position.set(0,0,30);

//venus
const vengeo=new THREE.SphereGeometry(5,100,100);
const ventex1=new THREE.TextureLoader().load(venustex);
const venmat=new THREE.MeshBasicMaterial({map:ventex1});
const ven=new THREE.Mesh(vengeo,venmat);
scene.add(ven);
ven.position.set(0,0,50);
//earth
const eargeo=new THREE.SphereGeometry(7,100,100);
const eartex1=new THREE.TextureLoader().load(earthtex);
const earmat=new THREE.MeshBasicMaterial({map:eartex1});
const ear=new THREE.Mesh(eargeo,earmat);
scene.add(ear);
ear.position.set(0,0,70);
//mars
const margeo=new THREE.SphereGeometry(5,100,100);
const martex1=new THREE.TextureLoader().load(marstex);
const marmat=new THREE.MeshBasicMaterial({map:martex1});
const mar=new THREE.Mesh(margeo,marmat);
scene.add(mar);
mar.position.set(0,0,90);
//jupiter
const jupgeo=new THREE.SphereGeometry(9,100,100);
const juptex1=new THREE.TextureLoader().load(jupitertex);
const jupmat=new THREE.MeshBasicMaterial({map:juptex1});
const jup=new THREE.Mesh(jupgeo,jupmat);
scene.add(jup);
jup.position.set(0,0,110);
//saturn
const satgeo=new THREE.SphereGeometry(6,100,100);
const sattex1=new THREE.TextureLoader().load(saturntex);
const satmat=new THREE.MeshBasicMaterial({map:sattex1});
const sat=new THREE.Mesh(satgeo,satmat);
scene.add(sat);
sat.position.set(0,0,130);
//neptune
const nepgeo=new THREE.SphereGeometry(5,100,100);
const neptex1=new THREE.TextureLoader().load(neptunetex);
const nepmat=new THREE.MeshBasicMaterial({map:neptex1});
const nep=new THREE.Mesh(nepgeo,nepmat);
scene.add(nep);
nep.position.set(0,0,170);
//uranus
const urageo=new THREE.SphereGeometry(5,100,100);
const uratex1=new THREE.TextureLoader().load(uranustex);
const uramat=new THREE.MeshBasicMaterial({map:uratex1});
const ura=new THREE.Mesh(urageo,uramat);
scene.add(ura);
ura.position.set(0,0,150);

const planets=[mer,ven,ear,mar,jup,sat,ura,nep];
const radius=[30,50,70,90,110,130,150,170];
const speeds = [70,65,45,40,35,20,10,5];
//creation of pivot
const pivot = new THREE.Group();
scene.add(pivot);

for(let i=0;i<8;i++){
  const geometry = new THREE.RingGeometry( radius[i],radius[i]+0.3,100,60 ); 
  const material = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
  const mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  mesh.rotation.x=(Math.PI)/2;
}

for (let i = 0; i < 8; i++) {
  const angle = ((Math.random()*10) / 8) * Math.PI * 2; // Distribute spheres evenly
  planets[i].position.set(
    radius[i] * Math.cos(angle), // X position
    0,                        // Y position
    radius[i] * Math.sin(angle)  // Z position
);
}

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY; // Scroll position in pixels
  const maxScroll = document.body.scrollHeight - window.innerHeight; // Maximum scroll height
  const scrollPercent = scrollY / maxScroll; // Scroll percentage
  const targetZ = -scrollPercent * radius[radius.length - 1]; // Map scroll to Z-axis
  camera.position.z =20-targetZ; // Update camera position
});

const animate=()=>{
  sun.rotation.y+=0.02;
  planets[0].rotation.y+=0.08;
  planets[1].rotation.y+=0.07;
  planets[2].rotation.y+=0.06;
  planets[3].rotation.y+=0.07;
  planets[4].rotation.y+=0.09;
  planets[5].rotation.y+=0.05;
  planets[6].rotation.y+=0.07;
  planets[7].rotation.y+=0.08;
  planets.forEach((sphere, index) => {
    let speed = speeds[index]/30000;
    const angle = performance.now() * speed; // Angle based on time and speed
    sphere.position.set(
        radius[index] * Math.cos(angle), // X position
        0,                        // Y position
        radius[index] * Math.sin(angle)  // Z position
    );
});
  
  
  renderer.render(scene,camera);
}
renderer.setAnimationLoop(animate);
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});