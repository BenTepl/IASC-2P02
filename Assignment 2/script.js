
import * as THREE from "three"
import * as dat from "lil-gui"
import{ OrbitControls } from "OrbitControls"



/************
 ** SETUP **
 ***********/
//Sizes
const sizes={
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

// Resizing
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.aspectRatio = window.innerWidth / window.innerHeight

    //Update camera
    camera.aspect = sizes.aspectRatio
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**************
 ** SCENE **
**************/
//Canvas
const canvas = document.querySelector('.webgl')

//Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('tan')

//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(0, 12, -20)
//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/*************
 ** LIGHTS **
 ************/
// Directional Light
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

//Ambiant Light
const ambiantLight = new THREE.AmbientLight( 0xffffff, 0.5 ); 
scene.add( ambiantLight );

/*************
 ** MESHES **
 *************/
// Box Geometry
const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

const drawBox = (height, params) =>
{
    //Create box material
    const boxmaterial = new THREE.MeshStandardMaterial(
    {
    color: new THREE.Color(params.color)
    })

    //Create box
    const box = new THREE.Mesh(boxGeometry, boxmaterial)

    // destruction - Randomized spread
    if (params.term === 'destruction') 
    {
        box.position.x = (Math.random() - 1) * params.diameter * 0.5
        box.position.z = (Math.random() - 1) * params.diameter * 0.5
        box.position.y = height - 10 + (Math.random() - 0.5) * 5

        box.rotation.x = Math.random() * Math.PI * 2
        box.rotation.y = Math.random() * Math.PI * 2
        box.rotation.z = Math.random() * Math.PI * 2
    } 
    // heroic -> slightly elevated (base)
   else 
{
    box.position.x = (Math.random() - 0.5) * params.diameter
    box.position.z = (Math.random() - 0.5) * params.diameter
    box.position.y = height - 10

    if(params.randomized){
        box.rotation.x = Math.random() * 2 * Math.PI
        box.rotation.y = Math.random() * 2 * Math.PI
        box.rotation.z = Math.random() * 2 * Math.PI
    }
}

    // Position box
    box.position.x = (Math.random() - 0.5) * params.diameter
    box.position.z = (Math.random() - 0.5) * params.diameter
    box.position.y = height - 10

    // Randomize box 
    if(params.randomized){
        box.rotation.x = Math.random() * 2 * Math.PI
        box.rotation.z = Math.random() * 2 * Math.PI
        box.rotation.y = Math.random() * 2 * Math.PI
    }

    // Add box to group
    params.group.add(box)
    }

//Sphere Geometry
const drawSphere = (height,params) => {
    const sphereGeometry = new THREE.SphereGeometry(0.3)
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(params.color)
        })

    //Create sphere
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

    //Position sphere 
    sphere.position.x = (Math.random() - 0.5) * params.diameter
    sphere.position.z = (Math.random() - 0.5) * params.diameter
    sphere.position.y = height - 10

    //Scale Sphere
    sphere.scale.x = params.scale
    sphere.scale.y = params.scale
    sphere.scale.z = params.scale

    //Randomize sphere rotation 
    if(params.randomized){
        sphere.rotation.x = Math.random() * 2 * Math.PI
        sphere.rotation.z = Math.random() * 2 * Math.PI
        sphere.rotation.y = Math.random() * 2 * Math.PI
    }
    
    //Add sphere to group
    params.group.add(sphere)
    } 


const drawDodecahedron = (height,params) => {
    const dodecahedronGeometry = new THREE.DodecahedronGeometry();
    const dodecahedronMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(params.color)
        })

    //Create dodecahedron
    const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial)

    //Position dodecahedron 
    dodecahedron.position.x = (Math.random() - 0.5) * params.diameter
    dodecahedron.position.z = (Math.random() - 0.5) * params.diameter
    dodecahedron.position.y = height - 10

    //Scale dodecahedron
    dodecahedron.scale.x = params.scale
    dodecahedron.scale.y = params.scale
    dodecahedron.scale.z = params.scale

    //Randomize dodecahedron rotation 
    if(params.randomized){
        dodecahedron.rotation.x = Math.random() * 2 * Math.PI
        dodecahedron.rotation.z = Math.random() * 2 * Math.PI
        dodecahedron.rotation.y = Math.random() * 2 * Math.PI
    }
    
    //Add dodecahedron to group
    params.group.add(dodecahedron)
    } 




/*********
 ** UI **
 *********/
//UI
const ui = new dat.GUI()

let preset = {}

// Groups
const group1 = new THREE.Group()
scene.add(group1)
const group2 = new THREE.Group()
scene.add(group2)
const group3 = new THREE.Group()
scene.add(group3)


const uiObj = {
    sourceText: "",
    savesourceText() {
        saveSourceText()

    },
        term1: 
        {
        term: 'peter',
        color: '#DE0606',
        diameter: 5,
        group: group1,
        nBoxes: 50,
        randomized: false,
        scale: 0.5,
        shape: 3
        },
    
        term2: 
        {
        term:'destruction',
        color: '#FF5F1F',
        diameter: 10,
        group: group2,
        nBoxes: 100,
        randomized: false,
        scale: 1.5,
        shape: 1
        },
    
        term3: 
        {
        term:'heroic',
        color: '#00ffff',
        diameter: 10,
        group: group3,
        nBoxes: 100,
        randomized: true,
        scale: 1,
        shape: 2
        },

    saveTerms(){
        saveTerms()
    },
    rotateCamera: false

}

// UI Functions
const saveSourceText = () =>
{
    //UI
    preset = ui.save()
    textFolder.hide()
    termsFolder.show()
    visualizeFolder.show()

    // Text Analysis
    tokenizedSourceText(uiObj.sourceText)

}

const saveTerms = () =>
{
    //UI
    preset = ui.save()
    visualizeFolder.hide()
    cameraFolder.show()

    // Text Analysis
    findSearchTermInTokenizedText(uiObj.term1)
    findSearchTermInTokenizedText(uiObj.term2)
    findSearchTermInTokenizedText(uiObj.term3)
}



// Text Folder
const textFolder = ui.addFolder("Source Text")

textFolder
    .add(uiObj, 'sourceText')
    .name("Source Text")

textFolder
.add(uiObj, 'savesourceText')
.name("Save")

// Terms, Visualize and Camera Folders
const termsFolder = ui.addFolder("Search Terms")
const visualizeFolder = ui.addFolder("Visualize")
const cameraFolder = ui.addFolder("Camera")


termsFolder.add(uiObj.term1, 'term')
.name("Term 1")

termsFolder.add(group1, 'visible')
.name("Term 1 Visibility")

termsFolder.addColor(uiObj.term1, 'color')
.name("Term 1 Color")

termsFolder.add(uiObj.term2, 'term')
.name("Term 2")

termsFolder.add(group2, 'visible')
.name("Term 2 Visibility")

termsFolder.addColor(uiObj.term2, 'color')
.name("Term 2 Color")

termsFolder.add(uiObj.term3, 'term')
.name("Term 3")

termsFolder.add(group3, 'visible')
.name("Term 3 Visibility")

termsFolder.addColor(uiObj.term3, 'color')
.name("Term 3 Color")

visualizeFolder.add(uiObj, 'saveTerms')
.name("Visualize")

cameraFolder.add(uiObj, 'rotateCamera')
.name("Turntable")


//Terms and Visualize folders are hidden by default
termsFolder.hide()
visualizeFolder.hide()
cameraFolder.hide()


/********************
 ** TEXT ANALYSIS **
 *******************/

 // Varibles
 let parsedText, tokenizedText

 // Parse and Tokenize sourceText
 const tokenizedSourceText = (sourceText) =>
 {
    //Strip periods and downcase sourceText
    parsedText = sourceText.replaceAll(".", "").toLowerCase()
    
    // Tokenize text
    tokenizedText = parsedText.split(/[^\w']+/)
 }

 // Find searchTerm in tokenizedText
 const findSearchTermInTokenizedText = (params) =>
 {
    // Use a for loop to go through the tokenizedText array
    for (let i = 0; i < tokenizedText.length; i++)
    {
        // If tokenizedText [i] matches our searchTerm, then we draw a box
        if(tokenizedText[i] === params.term){
            // convert i into height, which is a value between 0 and 20
            const height = (100 / tokenizedText.length) * i * 0.2

            //call drawBox functon nBoxes times using converted height value
            if(params.shape===1)
            {
            for(let a = 0; a < params.nBoxes; a++)
            {
            drawBox(height, params)
            }
            }
             if(params.shape===2)
            {
            for(let a = 0; a < params.nBoxes; a++)
            {
            drawSphere(height, params)
            }
            }
             if(params.shape===3)
            {
            for(let a = 0; a < params.nBoxes; a++)
            {
            drawDodecahedron(height, params)
            }
            }
        }
    }
}

/*********************
 ** ANIMATION LOOP **
 ********************/

 const clock = new THREE.Clock()

 const animation = () => 
 {
    // Return elapsed time
    const elaspedTime = clock.getElapsedTime()

    //Update OrbitControls
    controls.update()

    // Rotate Camera
    if(uiObj.rotateCamera)
    {
        camera.position.x = Math.sin(elaspedTime * 0.1) * 25
        camera.position.z = Math.cos(elaspedTime * 0.1) * 25
        camera.position.y = 5
        camera.lookAt(0, 0, 0)
    }
    
    //peter -movement
    group1.position.y += Math.sin(elaspedTime + group1.position.x) * 0.006
    
    //destruction - rotation    
    group2.rotation.y = (Math.random() -1) * -1

    //heroic - rotation
    group3.rotation.y -= 0.01
    
    //Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
 }

animation()
