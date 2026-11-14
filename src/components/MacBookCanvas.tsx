import { useEffect, useRef } from "react"
import * as THREE from "three"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export type ScreenState = "wallpaper" | "experience" | "gitex" | "guppty" | "contact"

interface MacBookCanvasProps {
  screenState?: ScreenState
  activeRoleIndex?: number
  onScreenStateChange?: (state: ScreenState) => void
}

export default function MacBookCanvas({
  screenState = "wallpaper",
  activeRoleIndex = 0,
}: MacBookCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const screenCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const screenTextureRef = useRef<THREE.CanvasTexture | null>(null)
  const currentScreenStateRef = useRef<ScreenState>(screenState)
  const activeRoleIndexRef = useRef<number>(activeRoleIndex)

  // Keep refs updated
  useEffect(() => {
    currentScreenStateRef.current = screenState
    activeRoleIndexRef.current = activeRoleIndex
    if (screenCanvasRef.current && screenTextureRef.current) {
      drawScreen(screenCanvasRef.current, screenState, activeRoleIndex)
      screenTextureRef.current.needsUpdate = true
    }
  }, [screenState, activeRoleIndex])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 1. Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.set(0, 0.5, 4.4)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)

    // 2. Lighting setup (Apple Studio lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
    scene.add(ambientLight)

    // Key front light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
    keyLight.position.set(3, 5, 4)
    scene.add(keyLight)

    // Soft lavender/blue fill light from left
    const fillLight = new THREE.DirectionalLight(0xb5c8ff, 1.8)
    fillLight.position.set(-4, 3, -1)
    scene.add(fillLight)

    // Specular rim light from behind (Apple edge reflection)
    const rimLight = new THREE.DirectionalLight(0xffffff, 2.8)
    rimLight.position.set(0, 4, -4.5)
    scene.add(rimLight)

    // Subtle bottom bounce light
    const bounceLight = new THREE.DirectionalLight(0xebefff, 0.8)
    bounceLight.position.set(0, -3, 2)
    scene.add(bounceLight)

    // 3. Build Procedural MacBook Model
    function createRoundedRect(w: number, h: number, r: number) {
      const shape = new THREE.Shape()
      const x = -w / 2
      const y = -h / 2
      shape.moveTo(x + r, y)
      shape.lineTo(x + w - r, y)
      shape.quadraticCurveTo(x + w, y, x + w, y + r)
      shape.lineTo(x + w, y + h - r)
      shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
      shape.lineTo(x + r, y + h)
      shape.quadraticCurveTo(x, y + h, x, y + h - r)
      shape.lineTo(x, y + r)
      shape.quadraticCurveTo(x, y, x + r, y)
      return shape
    }

    const laptopGroup = new THREE.Group()

    const width = 3.3
    const depth = 2.25
    const baseThickness = 0.08
    const cornerRadius = 0.12

    // Materials
    const aluminumMat = new THREE.MeshStandardMaterial({
      color: 0xdde2ea,
      metalness: 0.86,
      roughness: 0.22,
    })

    const darkTrimMat = new THREE.MeshStandardMaterial({
      color: 0x14161a,
      metalness: 0.4,
      roughness: 0.55,
    })

    const keyMat = new THREE.MeshStandardMaterial({
      color: 0x121418,
      metalness: 0.15,
      roughness: 0.45,
    })

    // Base Chassis
    const baseGroup = new THREE.Group()
    const baseShape = createRoundedRect(width, depth, cornerRadius)
    const baseGeom = new THREE.ExtrudeGeometry(baseShape, {
      depth: baseThickness,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 4,
    })
    baseGeom.center()
    baseGeom.rotateX(Math.PI / 2)
    const baseMesh = new THREE.Mesh(baseGeom, aluminumMat)
    baseGroup.add(baseMesh)

    // Keyboard Well
    const kbWidth = 2.65
    const kbDepth = 1.05
    const kbShape = createRoundedRect(kbWidth, kbDepth, 0.04)
    const kbGeom = new THREE.ExtrudeGeometry(kbShape, {
      depth: 0.005,
      bevelEnabled: false,
    })
    kbGeom.center()
    kbGeom.rotateX(Math.PI / 2)
    const kbTray = new THREE.Mesh(kbGeom, darkTrimMat)
    kbTray.position.set(0, baseThickness / 2 + 0.002, -0.32)
    baseGroup.add(kbTray)

    // Keyboard Keys (Rows of chiclet keycaps)
    const numRows = 6
    const rowOffsets = [0.42, 0.26, 0.10, -0.06, -0.22, -0.38]
    const rowKeyCounts = [14, 14, 14, 13, 12, 8]
    rowOffsets.forEach((zOffset, rIdx) => {
      const count = rowKeyCounts[rIdx]
      const keyW = (kbWidth - 0.1) / count - 0.018
      const keyD = (kbDepth - 0.15) / numRows - 0.014
      for (let c = 0; c < count; c++) {
        const keyGeom = new THREE.BoxGeometry(keyW, 0.012, keyD)
        const keyMesh = new THREE.Mesh(keyGeom, keyMat)
        const xPos = -kbWidth / 2 + 0.06 + c * (keyW + 0.018) + keyW / 2
        keyMesh.position.set(xPos, baseThickness / 2 + 0.008, -0.32 + zOffset)
        baseGroup.add(keyMesh)
      }
    })

    // Trackpad
    const tpWidth = 1.25
    const tpDepth = 0.8
    const tpShape = createRoundedRect(tpWidth, tpDepth, 0.04)
    const tpGeom = new THREE.ExtrudeGeometry(tpShape, {
      depth: 0.002,
      bevelEnabled: false,
    })
    tpGeom.center()
    tpGeom.rotateX(Math.PI / 2)
    const tpMat = new THREE.MeshStandardMaterial({
      color: 0xd8dde4,
      metalness: 0.5,
      roughness: 0.3,
    })
    const trackpad = new THREE.Mesh(tpGeom, tpMat)
    trackpad.position.set(0, baseThickness / 2 + 0.002, 0.65)
    baseGroup.add(trackpad)

    // Left USB-C ports (visible when laptop rotates into Experience!)
    const portMat = new THREE.MeshBasicMaterial({ color: 0x08090c })
    const portGeom = new THREE.CylinderGeometry(0.016, 0.016, 0.04, 12)
    portGeom.rotateZ(Math.PI / 2)

    const portL1 = new THREE.Mesh(portGeom, portMat)
    portL1.position.set(-width / 2 - 0.01, 0, -0.55)
    baseGroup.add(portL1)

    const portL2 = new THREE.Mesh(portGeom, portMat)
    portL2.position.set(-width / 2 - 0.01, 0, -0.38)
    baseGroup.add(portL2)

    // Right USB-C port
    const portR1 = new THREE.Mesh(portGeom, portMat)
    portR1.position.set(width / 2 + 0.01, 0, -0.55)
    baseGroup.add(portR1)

    // Hinge cylinder
    const hingeGeom = new THREE.CylinderGeometry(0.024, 0.024, width * 0.72, 24)
    hingeGeom.rotateZ(Math.PI / 2)
    const hingeMat = new THREE.MeshStandardMaterial({
      color: 0x181a1f,
      metalness: 0.85,
      roughness: 0.3,
    })
    const hinge = new THREE.Mesh(hingeGeom, hingeMat)
    hinge.position.set(0, baseThickness / 2, -depth / 2)
    baseGroup.add(hinge)

    laptopGroup.add(baseGroup)

    // --- LID ASSEMBLY ---
    const lidGroup = new THREE.Group()
    lidGroup.position.set(0, baseThickness / 2, -depth / 2)

    const lidContent = new THREE.Group()
    const lidThickness = 0.04
    const lidShape = createRoundedRect(width, depth, cornerRadius)
    const lidGeom = new THREE.ExtrudeGeometry(lidShape, {
      depth: lidThickness,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 4,
    })
    lidGeom.center()
    lidGeom.rotateX(Math.PI / 2)
    const lidBackMesh = new THREE.Mesh(lidGeom, aluminumMat)
    lidBackMesh.position.set(0, lidThickness / 2, depth / 2)
    lidContent.add(lidBackMesh)

    // Apple Logo on Back of Lid
    const logoGeom = new THREE.CircleGeometry(0.13, 32)
    logoGeom.rotateX(-Math.PI / 2)
    const logoMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1.0,
      roughness: 0.05,
    })
    const appleLogo = new THREE.Mesh(logoGeom, logoMat)
    appleLogo.position.set(0, lidThickness + 0.005, depth / 2)
    lidContent.add(appleLogo)

    // Screen Bezel (inside face of lid)
    const bezelGeom = new THREE.PlaneGeometry(width - 0.08, depth - 0.08)
    bezelGeom.rotateX(Math.PI / 2)
    const bezelMat = new THREE.MeshBasicMaterial({
      color: 0x060709,
      side: THREE.DoubleSide,
    })
    const bezelMesh = new THREE.Mesh(bezelGeom, bezelMat)
    bezelMesh.position.set(0, -0.013, depth / 2)
    lidContent.add(bezelMesh)

    // Display Screen Canvas & Texture
    const screenCanvas = document.createElement("canvas")
    screenCanvas.width = 2048
    screenCanvas.height = 1280
    screenCanvasRef.current = screenCanvas

    drawScreen(screenCanvas, currentScreenStateRef.current, activeRoleIndexRef.current)

    const screenTexture = new THREE.CanvasTexture(screenCanvas)
    screenTexture.generateMipmaps = true
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter
    screenTextureRef.current = screenTexture

    const screenGeom = new THREE.PlaneGeometry(width - 0.22, depth - 0.2)
    screenGeom.rotateX(Math.PI / 2)
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      side: THREE.DoubleSide,
    })
    const screenMesh = new THREE.Mesh(screenGeom, screenMat)
    screenMesh.position.set(0, -0.014, depth / 2)
    lidContent.add(screenMesh)

    // Camera Notch at Top of Screen
    const notchShape = createRoundedRect(0.25, 0.045, 0.015)
    const notchGeom = new THREE.ShapeGeometry(notchShape)
    notchGeom.rotateX(Math.PI / 2)
    const notchMat = new THREE.MeshBasicMaterial({
      color: 0x060709,
      side: THREE.DoubleSide,
    })
    const notchMesh = new THREE.Mesh(notchGeom, notchMat)
    notchMesh.position.set(0, -0.015, depth - 0.125)
    lidContent.add(notchMesh)

    lidGroup.add(lidContent)
    laptopGroup.add(lidGroup)

    // Soft Contact Shadow Plane beneath laptop
    const shadowCanvas = document.createElement("canvas")
    shadowCanvas.width = 512
    shadowCanvas.height = 512
    const sCtx = shadowCanvas.getContext("2d")
    if (sCtx) {
      const grad = sCtx.createRadialGradient(256, 256, 30, 256, 256, 220)
      grad.addColorStop(0, "rgba(20, 25, 45, 0.28)")
      grad.addColorStop(0.5, "rgba(20, 25, 45, 0.12)")
      grad.addColorStop(1, "rgba(20, 25, 45, 0)")
      sCtx.fillStyle = grad
      sCtx.fillRect(0, 0, 512, 512)
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas)
    const shadowGeom = new THREE.PlaneGeometry(5.2, 4.2)
    shadowGeom.rotateX(-Math.PI / 2)
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
    })
    const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat)
    shadowMesh.position.set(0, -baseThickness / 2 - 0.08, 0)
    laptopGroup.add(shadowMesh)

    scene.add(laptopGroup)

    // Initial state: Opening / Hero
    laptopGroup.position.set(0, -0.85, 0)
    laptopGroup.rotation.set(-0.14, -0.32, 0.07)
    lidGroup.rotation.x = -1.84 // ~105° open

    // 4. GSAP ScrollTrigger Choreography
    const animState = {
      posX: 0,
      posY: -0.85,
      posZ: 0,
      rotX: -0.14,
      rotY: -0.32,
      rotZ: 0.07,
      lidAngle: -1.84,
      camY: 0.5,
      camZ: 4.4,
      shadowOpacity: 0.85,
    }

    const updateTransforms = () => {
      laptopGroup.position.set(animState.posX, animState.posY, animState.posZ)
      laptopGroup.rotation.set(animState.rotX, animState.rotY, animState.rotZ)
      lidGroup.rotation.x = animState.lidAngle
      camera.position.set(0, animState.camY, animState.camZ)
      shadowMesh.material.opacity = animState.shadowOpacity
    }

    // ScrollTrigger Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    })

    // STEP 1: Hero to Experience (The 360° reveal)
    // Laptop rotates, camera zooms in to side profile, positioned cleanly on right half
    tl.to(
      animState,
      {
        posX: 2.35,
        posY: -0.15,
        posZ: 0.65,
        rotX: 0.36,
        rotY: 0.94,
        rotZ: -0.16,
        lidAngle: -1.92,
        camY: 0.45,
        camZ: 3.9,
        shadowOpacity: 0.9,
        duration: 1,
        ease: "power2.inOut",
        onUpdate: updateTransforms,
      },
      0
    )

    // STEP 2: Experience to Projects (Close and reopen)
    // Laptop centers, lid closes smoothly, rotates around, and reopens gracefully
    tl.to(
      animState,
      {
        posX: 0.3,
        posY: 0.05,
        posZ: 0.3,
        rotX: 0.1,
        rotY: 0.4,
        rotZ: 0,
        lidAngle: -0.2, // almost closed
        duration: 0.6,
        ease: "power1.inOut",
        onUpdate: updateTransforms,
      },
      1
    ).to(
      animState,
      {
        posX: 0,
        posY: 0.28,
        posZ: 0.2,
        rotX: 0.06,
        rotY: 0.16,
        rotZ: 0,
        lidAngle: -1.86, // reopened gracefully facing viewer
        camY: 0.55,
        camZ: 4.1,
        duration: 0.7,
        ease: "power2.out",
        onUpdate: updateTransforms,
      },
      1.6
    )

    // STEP 3: Projects to Contact (Cinematic finale)
    // Laptop completes final rotation and lid closes gracefully into sleek profile
    tl.to(
      animState,
      {
        posX: 0,
        posY: -0.18,
        posZ: -0.1,
        rotX: -0.12,
        rotY: -0.72,
        rotZ: 0.05,
        lidAngle: 0, // sleek closed laptop silhouette
        camY: 0.4,
        camZ: 4.5,
        shadowOpacity: 0.3,
        duration: 1,
        ease: "power2.inOut",
        onUpdate: updateTransforms,
      },
      2.5
    )

    // Responsive scaling
    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      // Scale model on mobile
      const scale = w < 768 ? 0.72 : w < 1024 ? 0.88 : 1.0
      laptopGroup.scale.set(scale, scale, scale)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Subtle gentle floating drift when stationary
    let clock = new THREE.Clock()
    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()
      // Gentle breathing float
      laptopGroup.position.y += Math.sin(elapsedTime * 1.4) * 0.0006
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ overflow: "hidden" }}
    />
  )
}

// 5. High-Resolution Screen Canvas Renderer
function drawScreen(
  canvas: HTMLCanvasElement,
  state: ScreenState,
  activeRoleIndex: number
) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  const w = canvas.width
  const h = canvas.height

  ctx.clearRect(0, 0, w, h)

  if (state === "wallpaper") {
    // Exact luminous lavender & sky blue flowing silk ribbons from user's image
    const bgGrad = ctx.createLinearGradient(0, 0, w, h)
    bgGrad.addColorStop(0, "#f4f1fa")
    bgGrad.addColorStop(0.4, "#eaeef9")
    bgGrad.addColorStop(0.8, "#dce6fc")
    bgGrad.addColorStop(1, "#c8dbfc")
    ctx.fillStyle = bgGrad
    ctx.fillRect(0, 0, w, h)

    // Flowing silk curves
    ctx.save()
    // Wave 1: Lavender silk
    ctx.beginPath()
    ctx.moveTo(-100, h * 0.9)
    ctx.bezierCurveTo(w * 0.3, h * 0.65, w * 0.6, h * 0.2, w + 100, h * 0.4)
    ctx.lineTo(w + 100, h + 100)
    ctx.lineTo(-100, h + 100)
    ctx.closePath()
    const wave1Grad = ctx.createLinearGradient(0, h * 0.2, w, h)
    wave1Grad.addColorStop(0, "rgba(185, 160, 245, 0.75)")
    wave1Grad.addColorStop(0.5, "rgba(150, 185, 250, 0.8)")
    wave1Grad.addColorStop(1, "rgba(110, 165, 250, 0.85)")
    ctx.fillStyle = wave1Grad
    ctx.fill()

    // Wave 2: Sky blue highlight ribbon
    ctx.beginPath()
    ctx.moveTo(w * 0.2, h + 50)
    ctx.bezierCurveTo(w * 0.5, h * 0.55, w * 0.75, h * 0.25, w + 50, h * 0.15)
    ctx.lineTo(w + 50, h + 50)
    ctx.closePath()
    const wave2Grad = ctx.createLinearGradient(w * 0.2, h, w, h * 0.2)
    wave2Grad.addColorStop(0, "rgba(90, 150, 245, 0.85)")
    wave2Grad.addColorStop(0.6, "rgba(125, 180, 255, 0.95)")
    wave2Grad.addColorStop(1, "rgba(220, 235, 255, 0.9)")
    ctx.fillStyle = wave2Grad
    ctx.fill()

    // Soft specular crest highlight
    ctx.beginPath()
    ctx.moveTo(-50, h * 0.88)
    ctx.bezierCurveTo(w * 0.35, h * 0.63, w * 0.65, h * 0.21, w + 100, h * 0.39)
    ctx.lineWidth = 6
    ctx.strokeStyle = "rgba(255, 255, 255, 0.7)"
    ctx.stroke()
    ctx.restore()

    // macOS Top Menu Bar
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)"
    ctx.fillRect(0, 0, w, 44)
    ctx.fillStyle = "#1e222a"
    ctx.font = "bold 20px -apple-system, sans-serif"
    ctx.fillText("", 32, 28)
    ctx.font = "500 18px -apple-system, sans-serif"
    ctx.fillText("Adrian Cardona", 68, 28)
    ctx.fillText("File   Edit   View   Window   Help", 230, 28)
    ctx.fillText("9:41 AM", w - 120, 28)
  } else if (state === "experience") {
    // Cal Poly Bailey College / CSSE University Research Workspace
    ctx.fillStyle = "#0f1117"
    ctx.fillRect(0, 0, w, h)

    // Top window bar
    ctx.fillStyle = "#161b22"
    ctx.fillRect(0, 0, w, 56)
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 22px -apple-system, sans-serif"
    const titles = [
      "Cal Poly Bailey College · TypeScript Media System",
      "Cal Poly CSSE · Cooperative AI Systems Telemetry",
      "Foundation for California Community Colleges · Research",
      "Extern · RAG Document Intelligence",
    ]
    ctx.fillText(titles[activeRoleIndex] || titles[0], 40, 36)

    // Inner workspace UI
    ctx.fillStyle = "#1c2128"
    ctx.roundRect(40, 90, w - 80, h - 140, 20)
    ctx.fill()

    // Columns
    ctx.fillStyle = "#2d333b"
    ctx.roundRect(70, 130, 580, h - 220, 14)
    ctx.fill()

    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 28px -apple-system, sans-serif"
    ctx.fillText("Automated Media Pipeline", 100, 190)
    ctx.font = "normal 20px -apple-system, sans-serif"
    ctx.fillStyle = "#9ca3af"
    ctx.fillText("SharePoint & Power Automate Ingestion", 100, 230)
    ctx.fillText("Codex-assisted testing & validation", 100, 270)
    ctx.fillText("Department web infrastructure (HTML/Drupal)", 100, 310)

    // Right grid view (Media cards)
    const startX = 700
    const startY = 130
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        const x = startX + c * 390
        const y = startY + r * 300
        ctx.fillStyle = "#22272e"
        ctx.roundRect(x, y, 360, 260, 12)
        ctx.fill()
        // photo accent
        ctx.fillStyle = "#38414a"
        ctx.roundRect(x + 20, y + 20, 320, 160, 8)
        ctx.fill()
        ctx.fillStyle = "#768390"
        ctx.font = "500 16px -apple-system, sans-serif"
        ctx.fillText(`Asset_REC_${r * 3 + c + 1}.png · Ingested`, x + 20, y + 225)
      }
    }
  } else if (state === "gitex") {
    // Gitex Live Codebase Intelligence Interface
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, w, h)

    // Top Header
    ctx.fillStyle = "#f6f8fa"
    ctx.fillRect(0, 0, w, 68)
    ctx.fillStyle = "#111827"
    ctx.font = "bold 26px -apple-system, sans-serif"
    ctx.fillText("Gitex", 40, 42)
    ctx.fillStyle = "#6b7280"
    ctx.font = "500 20px -apple-system, sans-serif"
    ctx.fillText("/ adrian-1-cardona/Guppty", 120, 42)

    // Search bar
    ctx.fillStyle = "#ffffff"
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 2
    ctx.roundRect(40, 100, w - 80, 68, 16)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = "#111827"
    ctx.font = "500 22px -apple-system, sans-serif"
    ctx.fillText("How are syntax errors handled in the lexer?", 90, 142)

    // Split View
    // Left: Answer
    ctx.fillStyle = "#f9fafb"
    ctx.roundRect(40, 200, 780, h - 250, 20)
    ctx.fill()

    ctx.fillStyle = "#111827"
    ctx.font = "bold 24px -apple-system, sans-serif"
    ctx.fillText("Synthesized Explanation", 70, 260)
    ctx.font = "normal 20px -apple-system, sans-serif"
    ctx.fillStyle = "#374151"
    ctx.fillText(
      "The lexer tracks line and column byte positions for every token.",
      70,
      310
    )
    ctx.fillText(
      "When an invalid syntax character is encountered, it constructs an error",
      70,
      350
    )
    ctx.fillText(
      "holding the exact source span, highlighting the line in the terminal.",
      70,
      390
    )

    // Right: Code Editor
    ctx.fillStyle = "#0d1117"
    ctx.roundRect(860, 200, w - 900, h - 250, 20)
    ctx.fill()

    ctx.fillStyle = "#58a6ff"
    ctx.font = "bold 20px Menlo, monospace"
    ctx.fillText("src/compiler/lexer.rs · Lines 42–58", 900, 250)

    ctx.fillStyle = "#e6edf3"
    ctx.font = "normal 18px Menlo, monospace"
    const codeLines = [
      "pub struct Span {",
      "    pub start: usize,",
      "    pub end: usize,",
      "    pub line: u32,",
      "    pub col: u32,",
      "}",
      "",
      "impl<'a> Lexer<'a> {",
      "    pub fn error(&self, msg: &str) -> CompileError {",
      "        CompileError::Syntax {",
      "            span: self.current_span(),",
      "            message: msg.to_string(),",
      "        }",
      "    }",
      "}",
    ]
    codeLines.forEach((line, idx) => {
      ctx.fillText(line, 900, 300 + idx * 30)
    })
  } else if (state === "guppty") {
    // Guppty Rust Compiler & VM
    ctx.fillStyle = "#0d1117"
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = "#161b22"
    ctx.fillRect(0, 0, w, 60)
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 24px -apple-system, sans-serif"
    ctx.fillText("Guppty Programming Language · Rust Virtual Machine", 40, 38)

    // Code Left
    ctx.fillStyle = "#1c2128"
    ctx.roundRect(40, 90, 880, h - 140, 16)
    ctx.fill()

    ctx.fillStyle = "#f0883e"
    ctx.font = "bold 20px Menlo, monospace"
    ctx.fillText("main.gup", 70, 140)

    ctx.fillStyle = "#e6edf3"
    ctx.font = "normal 18px Menlo, monospace"
    const gupptyCode = [
      "fn fib(n) {",
      "    if (n <= 1) {",
      "        return n;",
      "    }",
      "    return fib(n - 1) + fib(n - 2);",
      "}",
      "",
      "fn main() {",
      "    let result = fib(10);",
      "    print(\"Result =\", result);",
      "    return result;",
      "}",
    ]
    gupptyCode.forEach((line, idx) => {
      ctx.fillText(line, 70, 185 + idx * 32)
    })

    // Bytecode Disassembly Right
    ctx.fillStyle = "#1c2128"
    ctx.roundRect(960, 90, w - 1000, h - 140, 16)
    ctx.fill()

    ctx.fillStyle = "#7ee787"
    ctx.font = "bold 20px Menlo, monospace"
    ctx.fillText("vm::disassembly", 990, 140)

    ctx.fillStyle = "#8b949e"
    ctx.font = "normal 18px Menlo, monospace"
    const disLines = [
      "0000  OP_CONSTANT      10",
      "0002  OP_GET_GLOBAL    'fib'",
      "0004  OP_CALL          1",
      "0006  OP_SET_LOCAL     0",
      "0008  OP_GET_LOCAL     0",
      "0010  OP_PRINT",
      "0011  OP_RETURN",
      "",
      "; 38/38 Differential Tests Passing",
      "; 0.42 μs dispatch latency",
    ]
    disLines.forEach((line, idx) => {
      if (line.startsWith(";")) ctx.fillStyle = "#3fb950"
      else ctx.fillStyle = "#e6edf3"
      ctx.fillText(line, 990, 185 + idx * 32)
    })
  } else if (state === "contact") {
    // Cinematic Monogram & Ethereal Glow
    ctx.fillStyle = "#090a0f"
    ctx.fillRect(0, 0, w, h)

    const grad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, 600)
    grad.addColorStop(0, "rgba(90, 140, 255, 0.25)")
    grad.addColorStop(0.6, "rgba(140, 100, 240, 0.12)")
    grad.addColorStop(1, "rgba(0, 0, 0, 0)")
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 84px -apple-system, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Adrian Cardona", w / 2, h / 2 - 20)

    ctx.font = "normal 28px -apple-system, sans-serif"
    ctx.fillStyle = "#9ca3af"
    ctx.fillText("Software Engineer · Cal Poly San Luis Obispo", w / 2, h / 2 + 50)
    ctx.fillText("cardonaadrian101@gmail.com", w / 2, h / 2 + 100)
    ctx.textAlign = "left"
  }
}
