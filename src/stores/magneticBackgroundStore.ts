import { keys } from 'lodash-es'
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
  mouseX: number = 0
  mouseY: number = 0
  repulsionRadius: number = 0.1
  repulsionStrength: number = 0.03
  touchRepulsionStrength: number = 0.2 // New property for touch repulsion
  private lastTouchX: number | null = null
  private lastTouchY: number | null = null
  staticPoints: THREE.Points | null = null
  staticPlaneZ: number = -0.5 // Z-coordinate for the static plane
  particleAGoals: Float32Array | null = null
  particleAProgress: Float32Array | null = null
  isMovingToB: boolean = false
  movementDuration: number = 5000 // 5 seconds for the movement
  movementStartTime: number | null = null

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
    window.addEventListener('mousemove', event => this.onMouseMove(event))
    window.addEventListener('touchstart', event => this.onTouchStart(event))
    window.addEventListener('touchmove', event => this.onTouchMove(event))
    window.addEventListener('touchend', () => this.onTouchEnd())
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

  onMouseMove(event: MouseEvent) {
    this.updateInputPosition(event.clientX, event.clientY)
  }

  private onTouchStart(event: TouchEvent) {
    if (event.touches.length === 1) {
      const touch = event.touches[0]
      this.updateInputPosition(touch.clientX, touch.clientY)
    }
  }

  private onTouchMove(event: TouchEvent) {
    if (event.touches.length === 1) {
      const touch = event.touches[0]
      this.updateInputPosition(touch.clientX, touch.clientY)
    }
  }

  private onTouchEnd() {
    this.lastTouchX = null
    this.lastTouchY = null
  }

  private updateInputPosition(clientX: number, clientY: number) {
    const rect = this.renderer.domElement.getBoundingClientRect()
    this.mouseX = ((clientX - rect.left) / rect.width) * 2 - 1
    this.mouseY = -((clientY - rect.top) / rect.height) * 2 + 1
    this.lastTouchX = this.mouseX
    this.lastTouchY = this.mouseY
  }

  animate = () => {
    const animateFrame = () => {
      this.animationId = requestAnimationFrame(animateFrame)

      const time = performance.now() * 0.001
      const positions = this.points.geometry.attributes.position.array as Float32Array

      if (this.isMovingToB && this.particleAGoals && this.movementStartTime) {
        const elapsedTime = performance.now() - this.movementStartTime
        const progress = Math.min(elapsedTime / this.movementDuration, 1)

        for (let i = 0; i < positions.length; i += 3) {
          const index = i / 3
          this.particleAProgress[index] = progress

          positions[i] = THREE.MathUtils.lerp(positions[i], this.particleAGoals[i], progress * 0.1)
          positions[i + 1] = THREE.MathUtils.lerp(positions[i + 1], this.particleAGoals[i + 1], progress * 0.1)
          positions[i + 2] = THREE.MathUtils.lerp(positions[i + 2], this.particleAGoals[i + 2], progress * 0.1)
        }

        if (progress === 1)
          this.isMovingToB = false
      }
      else {
        // Original animation logic
        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i]
          const y = positions[i + 1]
          const angle = Math.atan2(y, x)
          const distance = Math.sqrt(x * x + y * y)

          positions[i + 2] = Math.sin(distance * 10 - time) * 0.4

          positions[i] += Math.cos(angle) * FIELD_STRENGTH * 0.005
          positions[i + 1] += Math.sin(angle) * FIELD_STRENGTH * 0.08

          // Apply repulsion from mouse or touch
          const inputX = this.lastTouchX !== null ? this.lastTouchX : this.mouseX
          const inputY = this.lastTouchY !== null ? this.lastTouchY : this.mouseY
          const dx = x - inputX
          const dy = y - inputY
          const inputDistance = Math.sqrt(dx * dx + dy * dy)
          if (inputDistance < this.repulsionRadius) {
            const repulsionFactor = (this.repulsionRadius - inputDistance) / this.repulsionRadius
            const currentRepulsionStrength = this.lastTouchX !== null ? this.touchRepulsionStrength : this.repulsionStrength
            positions[i] += dx * repulsionFactor * currentRepulsionStrength
            positions[i + 1] += dy * repulsionFactor * currentRepulsionStrength
          }

          if (Math.abs(positions[i]) > 0.75)
            positions[i] *= -1
          if (Math.abs(positions[i + 1]) > 0.75)
            positions[i + 1] *= -1
        }
      }

      this.points.geometry.attributes.position.needsUpdate = true

      if (this.renderer.domElement.isConnected)
        this.renderer.render(this.scene, this.camera)
    }

    animateFrame()
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  updateCanvas(canvas: HTMLCanvasElement) {
    if (this.renderer.domElement !== canvas) {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.domElement = canvas
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
    }
  }

  updatePointColor(color: number) {
    const material = this.points.material as THREE.PointsMaterial
    material.color.setHex(color)
    material.needsUpdate = true
  }

  createAdditionalParticles() {
    if (this.staticPoints)
      return

    const currentPositions = this.points.geometry.attributes.position.array as Float32Array
    const newPositions = new Float32Array(currentPositions.length)

    const μ = Math.random() * 0.8 - 0.4
    // Create new static particles (Set B)
    for (let i = 0; i < newPositions.length; i += 3) {
      const σ = 0.3
      const x = Math.random() * 10 - 5
      const k = 1 / Math.sqrt(2 * Math.PI)
      newPositions[i] = x
      newPositions[i + 1] = k * Math.exp((-1 * (x - μ) ** 2) / (2 * σ ** 2))
      newPositions[i + 2] = this.staticPlaneZ
    }

    const staticGeometry = new THREE.BufferGeometry()
    staticGeometry.setAttribute('position', new THREE.Float32BufferAttribute(newPositions, 3))

    const staticMaterial = new THREE.PointsMaterial({
      size: POINT_SIZE,
      color: (this.points.material as THREE.PointsMaterial).color,
      transparent: true,
      opacity: this.pointOpacity * 0.0001,
    })

    this.staticPoints = new THREE.Points(staticGeometry, staticMaterial)
    this.scene.add(this.staticPoints)

    // Set up movement of particles A to B
    this.particleAGoals = new Float32Array(currentPositions.length)
    this.particleAProgress = new Float32Array(currentPositions.length / 3).fill(0)

    // Assign random goals for each particle A
    for (let i = 0; i < currentPositions.length; i += 3) {
      const randomIndex = Math.floor(Math.random() * (newPositions.length / 3)) * 3
      this.particleAGoals[i] = newPositions[randomIndex]
      this.particleAGoals[i + 1] = newPositions[randomIndex + 1]
      this.particleAGoals[i + 2] = newPositions[randomIndex + 2]
    }

    this.isMovingToB = true
    this.movementStartTime = performance.now()
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
          return currentBackground
        }
        else {
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
    createAdditionalParticles: () => {
      update((currentBackground) => {
        if (currentBackground)
          currentBackground.createAdditionalParticles()
        return currentBackground
      })
    },
  }
}

export const magneticBackgroundStore = createMagneticBackgroundStore()
