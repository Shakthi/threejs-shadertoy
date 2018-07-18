import * as THREE from 'three'
import OrbitControls from 'orbit-controls-es6'

import vert from './shaders/shader.vert'
import frag from './shaders/shader.frag'

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
let geometry, material, mesh

function init() {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        10000
    )
    camera.position.z = 1000

    controls = new OrbitControls(camera)

    geometry = new THREE.BoxGeometry(200, 200, 200)
    material = new THREE.RawShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag
    })

    mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    for (let i = -5; i <= 5; i++) {
        const geometry = new THREE.BoxGeometry(200, 200, 200)
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true
        })

        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
        mesh.position.x = i * 400
    }

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth*0.5, window.innerHeight)

    document.body.appendChild(renderer.domElement)
}

function animate() {
    animationId = requestAnimationFrame(animate)

    mesh.rotation.x += 0.04
    mesh.rotation.y += 0.02

    renderer.render(scene, camera)
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
