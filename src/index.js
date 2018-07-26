import * as THREE from 'three'
import OrbitControls from 'orbit-controls-es6'
import ShaderToyMaterial from 'three-shadertoy-material'


import shaderToySample from './shaders/shadertoySample.frag'
import * as dat from 'dat.gui';

const gui = new dat.GUI();
let geom = { geometry: "Plane" };
let controller = gui.add(geom, 'geometry', ['Plane', 'TorusKnot']);
controller.onChange(function (value) {
    switch (value) {
        case 'Plane':
            mesh.visible = true;
            mesh2.visible = false;
            break;
        case 'TorusKnot':
            mesh2.visible = true;
            mesh.visible = false;
            break;

        default:
            break;
    }
});

// Initial HMR Setup
if (module.hot) {
    module.hot.accept()

    module.hot.dispose(() => {
        document.querySelector('canvas').remove()
        renderer.forceContextLoss()
        renderer.context = null
        renderer.domElement = null
        renderer = null
        cancelAnimationFrame(animationId)
        removeEventListener('resize', resize)
    })
}

// Three Scene
let scene, camera, renderer, animationId, controls
let geometry, material, mesh, mesh2;
let clock;

function init() {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        10000
    )
    camera.position.z = 1000



    geometry = new THREE.PlaneBufferGeometry(1500, 750);



    material = new ShaderToyMaterial(shaderToySample);

    var texture = new THREE.TextureLoader().load('resources/UV_Grid_Sm.jpg');

    // immediately use the te

    // material = new THREE.MeshBasicMaterial({
    //     map:texture
    // })

    mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    geometry = new THREE.TorusKnotBufferGeometry();
    mesh2 = new THREE.Mesh(geometry, material)
    scene.add(mesh2)
    mesh2.visible = false;




    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)
    controls = new OrbitControls(camera, renderer.domElement);
}

function animate() {
    animationId = requestAnimationFrame(animate)
    renderer.render(scene, camera);
}

init()
animate()

// Event listeners
function resize() {
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(innerWidth, innerHeight)
}

addEventListener('resize', resize)
