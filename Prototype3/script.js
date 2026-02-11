
import * as THREE from 'three';
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

console.log(THREE)
console.log(dat)
console.log(OrbitControls)

/*********
**SET UP**
*********/
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}


/***********
 ** SCENE **
 ***********/

 //Canvas 
const canvas = document.querySelector('.webgl')

 //Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('black')

 //Camera
const camera = new THREE.PerspectiveCamera(
    75, 
    sizes.aspectRatio,
    0.1, 
    100
)
scene.add(camera)
camera.position.set(10, 2, 7.5)

 //Renderer
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas, 
    antialias: true
 })
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls (camera, canvas)
controls.enableDamping = true

/*************
 * * MESHES **
 ************/
//Cave 
const caveGeometry = new THREE.PlaneGeometry(15, 7.5)
const caveMaterial = new THREE.MeshStandardMaterial ({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)

//Objects 

//Left Sphere
const leftSphereGeometry = new THREE.SphereGeometry(0.5, 32, 16)
const leftSphereMaterial = new THREE.MeshNormalMaterial()
const sphere = new THREE.Mesh(leftSphereGeometry, leftSphereMaterial)
sphere.position.set(9, 4, 1.5)
sphere.castShadow = true
scene.add(sphere)

//Right Sphere
const rightSphereGeometry = new THREE.SphereGeometry(0.5, 32, 16)
const rightSphereMaterial = new THREE.MeshNormalMaterial()
const spheree = new THREE.Mesh(rightSphereGeometry, rightSphereMaterial)
spheree.position.set(9, 4, -1.5)
spheree.castShadow = true
scene.add(spheree)

//Smile
const torusGeometry = new THREE.TorusGeometry(2, 0.2, 12, 48, Math.PI*1)
const torusMaterial = new THREE.MeshNormalMaterial()
const torus = new THREE.Mesh(torusGeometry, torusMaterial)
torus.position.set(9, 2, 0)
torus.castShadow = true
torus.rotation.y = Math.PI * 0.5
torus.rotation.z = Math.PI * 1
scene.add(torus)

/**********
 **LIGHTS**
 *********/
//Ambient Light
//const ambientLight = new THREE.AmbientLight(0x404040)
//const ambientLight = new THREE.AmbientLight(
//    new THREE.Color ('white')
//)

//scene.add(ambientLight)

//Directional Lighgt
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color ('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048

//Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/********
 ** UI **
 *******/
// UI
const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder('Light Position')

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Y')

lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Z')

 /******************* 
 ** ANIMATION LOOP **
 *******************/
const clock = new THREE.Clock()

const animation = () =>
{
    //Return elapsedTime
    const elapsedTime = clock.getElapsedTime()
    console.log(elapsedTime)

    //Animate Objects 
    //sphere.rotation.y = elapsedTime

    //Update directionalLightHelper
    directionalLightHelper.update()

    //Update OrbitControls
    controls.update()

    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()
