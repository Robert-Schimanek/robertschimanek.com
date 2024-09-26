import { writable } from 'svelte/store'
import * as THREE from 'three'

const GRID_SIZE = 50
const POINT_SIZE = 0.001
const FIELD_STRENGTH = 0.003

class MagneticBackground {
  renderer: THREE.WebGLRenderer
  points: THREE.Points = new THREE.Points()
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  animationId: number | null = null
  pointOpacity: number = 0.6

  constructor(canvas: HTMLCanvasElement, opacity: number = this.pointOpacity) {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.pointOpacity = opacity // Use the opacity parameter
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.setupPoints()
    this.setupLights()
    this.setupCamera()
    this.animate()

    window.addEventListener('resize', () => this.onWindowResize())
  }

  setupPoints() {
    const positions = new Float32Array(GRID_SIZE * GRID_SIZE * 3)
    let i = 0
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        positions[i] = (x / (GRID_SIZE - 1) - 0.5) * 1.5
        positions[i + 1] = (y / (GRID_SIZE - 1) - 0.5) * 1.5
        positions[i + 2] = 0
        i += 3
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3),
    )

    const material = new THREE.PointsMaterial({
      size: POINT_SIZE,
      color: 0xFFFFFF,
      transparent: true,
      opacity: this.pointOpacity,
    })
    this.points = new THREE.Points(geometry, material)
    this.scene.add(this.points)
  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 10)
    this.scene.add(ambientLight)
  }

  setupCamera() {
    this.camera.position.z = 1.4
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate())

    const time = performance.now() * 0.001
    const positions = this.points.geometry.attributes.position.array

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const angle = Math.atan2(y, x)
      const distance = Math.sqrt(x * x + y * y)

      positions[i + 2] = Math.sin(distance * 10 - time) * 0.4

      positions[i] += Math.cos(angle) * FIELD_STRENGTH * 0.005
      positions[i + 1] += Math.sin(angle) * FIELD_STRENGTH * 0.08

      if (Math.abs(positions[i]) > 0.75)
        positions[i] *= -1
      if (Math.abs(positions[i + 1]) > 0.75)
        positions[i + 1] *= -1
    }

    this.points.geometry.attributes.position.needsUpdate = true

    this.renderer.render(this.scene, this.camera)
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  updateCanvas(canvas: HTMLCanvasElement) {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.domElement = canvas
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()

    // Cancel the existing animation frame if it exists
    if (this.animationId !== null)
      cancelAnimationFrame(this.animationId)

    // Restart the animation loop
    this.animate()
  }

  updatePointColor(color: number) {
    const material = this.points.material as THREE.PointsMaterial
    material.color.setHex(color)
    material.needsUpdate = true
  }
}

function createMagneticBackgroundStore() {
  const { subscribe, set, update } = writable<MagneticBackground | null>(null)

  return {
    subscribe,
    init: (canvas: HTMLCanvasElement) => {
      update((currentBackground) => {
        if (currentBackground) {
          currentBackground.updateCanvas(canvas)
          // currentBackground.animate() // Restart animation
          return currentBackground
        }
        else {
          // const newBackground = new MagneticBackground(canvas)
          // newBackground.animate() // Start animation
          return new MagneticBackground(canvas)
        }
      })
    },
    updateCanvas: (canvas: HTMLCanvasElement) => {
      update((currentBackground) => {
        if (currentBackground)
          currentBackground.updateCanvas(canvas)

        return currentBackground
      })
    },
    updatePointColor: (color: number) => {
      update((currentBackground) => {
        if (currentBackground)
          currentBackground.updatePointColor(color)

        return currentBackground
      })
    },
    destroy: () => set(null),
  }
}

export const magneticBackgroundStore = createMagneticBackgroundStore()
