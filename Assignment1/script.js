
import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/********** 
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth * 0.4,
    height: window.innerHeight,
    aspectRatio: window.innerWidth * 0.4 / window.innerHeight
}

/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
//scene.background = new THREE.Color('black')

// Camera
const camera =  new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(10, 2, 7.5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** MESHES **
************/
// Cave
const caveGeometry = new THREE.PlaneGeometry(15.5,7.5)
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})

const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)

// Objects
const guard1geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8, 1 );
const guard1material = new THREE.MeshBasicMaterial( { color: "cyan" } );
const guard1 = new THREE.Mesh( guard1geometry, guard1material );
guard1.position.set(15, 1, 0)
guard1.castShadow = true
scene.add( guard1 );

const guard2geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8, 1 );
const guard2material = new THREE.MeshBasicMaterial( { color: "red" } );
const guard2 = new THREE.Mesh( guard2geometry, guard2material );
guard2.position.set(15, 1, -5)
guard2.castShadow = true
scene.add( guard2 );



/************
 ** LIGHTS **
 ************/
// Ambient Light
//const ambientLight = new THREE.AmbientLight(0x404040)
//const ambientLight = new THREE.AmbientLight(
//   new THREE.Color('white')
//)
//scene.add(ambientLight)

// Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)

scene.add(directionalLight)
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width =  1024
directionalLight.shadow.mapSize.height = 1024

// Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/********************* 
** DOM INTERACTIONS **
**********************/
const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false
}

// part-one
document.querySelector('#part-one').onclick = function() {
    domObject.part = 1
}

// part-two
document.querySelector('#part-two').onclick = function() {
    domObject.part = 2
}

// first-change
document.querySelector('#first-change').onclick = function() {
    domObject.firstChange = true
}

// second-change
document.querySelector('#second-change').onclick = function() {
    domObject.secondChange = true
}

// third-change
document.querySelector('#third-change').onclick = function() {
    domObject.thirdChange = true
}

// fourth-change
document.querySelector('#fourth-change').onclick = function() {
    domObject.fourthChange = true
}

/********
 ** UI **
 ********/
// UI
/*
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
    */

/******************* 
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () => 
{   
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // part-one
    if(domObject.part === 1) 
    {
        camera.position.set(6, 0, 0)
        camera.lookAt(0, 0, 0)
    }

    // part-two
    if(domObject.part === 2)
    {
        camera.position.set(25, 1, 0)
        camera.lookAt(0, 0, 0)
    }

    // first-change
    if(domObject.firstChange)
    {
        /* 
        This is supposed to represent forward and backward movement. 
        When I tried changing the position it did not work right with the shadow.
        While technically not the right movement 
        it still looks very similar to how it should in each view.
        */
        guard1.scale.y = 1 + Math.sin(elapsedTime * 1) * 0.2
        guard1.scale.z = 1 + Math.sin(elapsedTime * 1) * 0.2

        guard2.scale.y = 1 + Math.sin(elapsedTime * 1) * 0.2
        guard2.scale.z = 1 + Math.sin(elapsedTime * 1) * 0.2
    }

    // second-change
    if(domObject.secondChange)
    {
        guard1.position.z = (Math.sin(elapsedTime) + 1) * 3

        guard2.position.z = (Math.sin(elapsedTime) - 1) * 3
        
    }

    // third-change
    if(domObject.thirdChange)
    {
      guard1.position.x = (Math.sin(elapsedTime) + 5) * 3

    }

    // fourth-change
    if(domObject.fourthChange)
    {

        guard1.rotation.x = Math.PI * 0.5;
        guard1.rotation.x = ((elapsedTime) / 2)
    }
   
 


    // Update directionalLightHelper
    directionalLightHelper.update()

    // Update OrbitControls
    controls.update()

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()
