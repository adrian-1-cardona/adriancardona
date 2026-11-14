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

  // Interactive manual lid override state
  const isManuallyToggledRef = useRef<boolean>(false)

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
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // 2. Lighting setup (Apple Studio lighting with rich specular sheen)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
    scene.add(ambientLight)

    // Key front light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4)
    keyLight.position.set(3, 5, 4)
    scene.add(keyLight)

    // Soft sky blue/lavender fill light from left
    const fillLight = new THREE.DirectionalLight(0xb5c8ff, 2.0)
    fillLight.position.set(-4, 3, -1)
    scene.add(fillLight)

    // Specular rim light from behind (Apple edge reflection)
    const rimLight = new THREE.DirectionalLight(0xffffff, 3.2)
    rimLight.position.set(0, 4, -4.5)
    scene.add(rimLight)

    // Subtle bottom bounce light for aluminum chassis underbelly
    const bounceLight = new THREE.DirectionalLight(0xebefff, 0.9)
    bounceLight.position.set(0, -3, 2)
    scene.add(bounceLight)

    // 3. Build Photorealistic MacBook Model
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

    // Authentic Apple Anodized Aluminum PBR Material
    const aluminumMat = new THREE.MeshStandardMaterial({
      color: 0xe2e6ee,
      metalness: 0.88,
      roughness: 0.18,
    })

    // Dark trim material for interior wells
    const darkTrimMat = new THREE.MeshStandardMaterial({
      color: 0x121418,
      metalness: 0.4,
      roughness: 0.5,
    })

    // --- BASE ASSEMBLY ---
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

    // Front center thumb scoop (subtle Apple cutout in chassis to lift lid)
    const scoopGeom = new THREE.BoxGeometry(0.35, 0.012, 0.02)
    const scoopMesh = new THREE.Mesh(scoopGeom, darkTrimMat)
    scoopMesh.position.set(0, 0.05, depth / 2 - 0.005)
    baseGroup.add(scoopMesh)

    // Keyboard Well
    const kbWidth = 2.65
    const kbDepth = 1.05
    const kbShape = createRoundedRect(kbWidth, kbDepth, 0.04)
    const kbGeom = new THREE.ExtrudeGeometry(kbShape, {
      depth: 0.006,
      bevelEnabled: false,
    })
    kbGeom.center()
    kbGeom.rotateX(Math.PI / 2)
    const kbTray = new THREE.Mesh(kbGeom, darkTrimMat)
    kbTray.position.set(0, 0.054, -0.32)
    baseGroup.add(kbTray)

    // Photorealistic Apple Magic Keyboard Texture Canvas
    const kbCanvas = document.createElement("canvas")
    kbCanvas.width = 2048
    kbCanvas.height = 1024
    drawAppleKeyboard(kbCanvas)
    const kbTexture = new THREE.CanvasTexture(kbCanvas)
    kbTexture.generateMipmaps = true
    kbTexture.minFilter = THREE.LinearMipmapLinearFilter

    const kbPlaneGeom = new THREE.PlaneGeometry(kbWidth - 0.02, kbDepth - 0.02)
    kbPlaneGeom.rotateX(-Math.PI / 2)
    const kbMat = new THREE.MeshStandardMaterial({
      map: kbTexture,
      roughness: 0.35,
      metalness: 0.15,
      polygonOffset: true,
      polygonOffsetFactor: -1,
    })
    const kbPlaneMesh = new THREE.Mesh(kbPlaneGeom, kbMat)
    kbPlaneMesh.position.set(0, 0.0565, -0.32)
    baseGroup.add(kbPlaneMesh)

    // Speaker Grilles (Left & Right micro-drilled perforations)
    const speakerCanvas = document.createElement("canvas")
    speakerCanvas.width = 128
    speakerCanvas.height = 512
    drawSpeakerGrille(speakerCanvas)
    const speakerTexture = new THREE.CanvasTexture(speakerCanvas)
    const speakerGeom = new THREE.PlaneGeometry(0.18, 0.98)
    speakerGeom.rotateX(-Math.PI / 2)
    const speakerMat = new THREE.MeshStandardMaterial({
      map: speakerTexture,
      transparent: true,
      roughness: 0.3,
      metalness: 0.8,
      polygonOffset: true,
      polygonOffsetFactor: -1,
    })

    const speakerL = new THREE.Mesh(speakerGeom, speakerMat)
    speakerL.position.set(-1.46, 0.056, -0.32)
    baseGroup.add(speakerL)

    const speakerR = new THREE.Mesh(speakerGeom, speakerMat)
    speakerR.position.set(1.46, 0.056, -0.32)
    baseGroup.add(speakerR)

    // Force Touch Glass Trackpad with Hairline Border
    const tpWidth = 1.25
    const tpDepth = 0.8
    const tpShape = createRoundedRect(tpWidth, tpDepth, 0.035)
    const tpGeom = new THREE.ExtrudeGeometry(tpShape, {
      depth: 0.002,
      bevelEnabled: false,
    })
    tpGeom.center()
    tpGeom.rotateX(Math.PI / 2)
    const tpMat = new THREE.MeshStandardMaterial({
      color: 0xdde2ea,
      metalness: 0.55,
      roughness: 0.26,
    })
    const trackpad = new THREE.Mesh(tpGeom, tpMat)
    trackpad.position.set(0, 0.0555, 0.65)
    baseGroup.add(trackpad)

    // Trackpad fine hairline border
    const tpBorderShape = createRoundedRect(tpWidth + 0.005, tpDepth + 0.005, 0.038)
    const tpBorderGeom = new THREE.ShapeGeometry(tpBorderShape)
    tpBorderGeom.rotateX(Math.PI / 2)
    const tpBorderMat = new THREE.MeshBasicMaterial({ color: 0xbac0cc })
    const tpBorderMesh = new THREE.Mesh(tpBorderGeom, tpBorderMat)
    tpBorderMesh.position.set(0, 0.0558, 0.65)
    baseGroup.add(tpBorderMesh)

    // MagSafe 3 Charging Port on Left Side
    const magSafeGeom = new THREE.CylinderGeometry(0.016, 0.016, 0.035, 12)
    magSafeGeom.rotateZ(Math.PI / 2)
    const magSafeMat = new THREE.MeshBasicMaterial({ color: 0x08090c })
    const magSafe = new THREE.Mesh(magSafeGeom, magSafeMat)
    magSafe.position.set(-width / 2 - 0.01, 0, -0.72)
    baseGroup.add(magSafe)

    // Dual Thunderbolt 4 / USB-C Ports on Left Side (Extreme Close-Up Visible!)
    const portGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.035, 12)
    portGeom.rotateZ(Math.PI / 2)
    const portMat = new THREE.MeshBasicMaterial({ color: 0x08090c })

    const portL1 = new THREE.Mesh(portGeom, portMat)
    portL1.position.set(-width / 2 - 0.01, 0, -0.52)
    baseGroup.add(portL1)

    const portL2 = new THREE.Mesh(portGeom, portMat)
    portL2.position.set(-width / 2 - 0.01, 0, -0.36)
    baseGroup.add(portL2)

    // Right Side Ports (HDMI & Thunderbolt)
    const portR1 = new THREE.Mesh(portGeom, portMat)
    portR1.position.set(width / 2 + 0.01, 0, -0.52)
    baseGroup.add(portR1)

    const hdmiGeom = new THREE.BoxGeometry(0.035, 0.02, 0.045)
    const hdmi = new THREE.Mesh(hdmiGeom, portMat)
    hdmi.position.set(width / 2 + 0.01, 0, -0.7)
    baseGroup.add(hdmi)

    // Bottom Rubber Feet
    const footGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.012, 16)
    const footMat = new THREE.MeshStandardMaterial({
      color: 0x181a1f,
      roughness: 0.8,
    })
    const footPositions = [
      [-width / 2 + 0.35, -baseThickness / 2 - 0.006, -depth / 2 + 0.35],
      [width / 2 - 0.35, -baseThickness / 2 - 0.006, -depth / 2 + 0.35],
      [-width / 2 + 0.35, -baseThickness / 2 - 0.006, depth / 2 - 0.35],
      [width / 2 - 0.35, -baseThickness / 2 - 0.006, depth / 2 - 0.35],
    ]
    footPositions.forEach(([x, y, z]) => {
      const foot = new THREE.Mesh(footGeom, footMat)
      foot.position.set(x, y, z)
      baseGroup.add(foot)
    })

    // Iconic Apple Clutch Hinge Cylinder
    const hingeGeom = new THREE.CylinderGeometry(0.024, 0.024, width * 0.72, 24)
    hingeGeom.rotateZ(Math.PI / 2)
    const hingeMat = new THREE.MeshStandardMaterial({
      color: 0x14161a,
      metalness: 0.9,
      roughness: 0.25,
    })
    const hinge = new THREE.Mesh(hingeGeom, hingeMat)
    hinge.position.set(0, baseThickness / 2, -depth / 2)
    baseGroup.add(hinge)

    laptopGroup.add(baseGroup)

    // --- LID ASSEMBLY (Articulating Hinge) ---
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

    // Apple Logo on Back of Lid (Polished Chrome with Real Shape)
    const logoShape = createAppleLogoShape()
    const logoGeom = new THREE.ShapeGeometry(logoShape)
    logoGeom.rotateX(-Math.PI / 2)
    const logoMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1.0,
      roughness: 0.04,
    })
    const appleLogo = new THREE.Mesh(logoGeom, logoMat)
    appleLogo.position.set(0, lidThickness + 0.005, depth / 2)
    appleLogo.scale.set(0.0035, 0.0035, 0.0035)
    lidContent.add(appleLogo)

    // Screen Bezel (Glossy black display border glass)
    const bezelGeom = new THREE.PlaneGeometry(width - 0.08, depth - 0.08)
    bezelGeom.rotateX(Math.PI / 2)
    const bezelMat = new THREE.MeshBasicMaterial({
      color: 0x050608,
      side: THREE.DoubleSide,
    })
    const bezelMesh = new THREE.Mesh(bezelGeom, bezelMat)
    bezelMesh.position.set(0, -0.013, depth / 2)
    lidContent.add(bezelMesh)

    // Liquid Retina XDR Display (High-Resolution Glowing Canvas Texture)
    const screenCanvas = document.createElement("canvas")
    screenCanvas.width = 2048
    screenCanvas.height = 1280
    screenCanvasRef.current = screenCanvas

    drawScreen(screenCanvas, currentScreenStateRef.current, activeRoleIndexRef.current)

    const screenTexture = new THREE.CanvasTexture(screenCanvas)
    screenTexture.generateMipmaps = true
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter
    screenTextureRef.current = screenTexture

    const screenGeom = new THREE.PlaneGeometry(width - 0.2, depth - 0.18)
    screenGeom.rotateX(Math.PI / 2)
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      side: THREE.DoubleSide,
    })
    const screenMesh = new THREE.Mesh(screenGeom, screenMat)
    screenMesh.position.set(0, -0.014, depth / 2)
    lidContent.add(screenMesh)

    // Iconic Apple Camera Notch centered at top of display
    const notchShape = createRoundedRect(0.24, 0.042, 0.014)
    const notchGeom = new THREE.ShapeGeometry(notchShape)
    notchGeom.rotateX(Math.PI / 2)
    const notchMat = new THREE.MeshBasicMaterial({
      color: 0x050608,
      side: THREE.DoubleSide,
    })
    const notchMesh = new THREE.Mesh(notchGeom, notchMat)
    notchMesh.position.set(0, -0.015, depth - 0.125)
    lidContent.add(notchMesh)

    // Tiny Camera Lens Reflection inside notch
    const lensGeom = new THREE.CircleGeometry(0.007, 12)
    lensGeom.rotateX(Math.PI / 2)
    const lensMat = new THREE.MeshBasicMaterial({ color: 0x1a243a, side: THREE.DoubleSide })
    const lensMesh = new THREE.Mesh(lensGeom, lensMat)
    lensMesh.position.set(0, -0.016, depth - 0.125)
    lidContent.add(lensMesh)

    lidGroup.add(lidContent)
    laptopGroup.add(lidGroup)

    // Soft Contact Ground Shadow Plane beneath laptop
    const shadowCanvas = document.createElement("canvas")
    shadowCanvas.width = 512
    shadowCanvas.height = 512
    const sCtx = shadowCanvas.getContext("2d")
    if (sCtx) {
      const grad = sCtx.createRadialGradient(256, 256, 20, 256, 256, 230)
      grad.addColorStop(0, "rgba(15, 20, 40, 0.32)")
      grad.addColorStop(0.5, "rgba(15, 20, 40, 0.14)")
      grad.addColorStop(1, "rgba(15, 20, 40, 0)")
      sCtx.fillStyle = grad
      sCtx.fillRect(0, 0, 512, 512)
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas)
    const shadowGeom = new THREE.PlaneGeometry(5.4, 4.4)
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

    // Initial state: Opening / Hero (Floating gracefully below headline)
    laptopGroup.position.set(0, -0.85, 0)
    laptopGroup.rotation.set(-0.14, -0.32, 0.07)
    lidGroup.rotation.x = -1.84 // ~105° open

    // 4. GSAP ScrollTrigger Choreography (Cinematic close & reopen sequence!)
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
      if (!isManuallyToggledRef.current) {
        lidGroup.rotation.x = animState.lidAngle
      }
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
    // Laptop rotates, camera zooms into isometric side profile on right half
    tl.to(
      animState,
      {
        posX: 2.35,
        posY: -0.15,
        posZ: 0.65,
        rotX: 0.36,
        rotY: 0.94,
        rotZ: -0.16,
        lidAngle: -1.92, // open wide reflecting light
        camY: 0.45,
        camZ: 3.9,
        shadowOpacity: 0.9,
        duration: 1,
        ease: "power2.inOut",
        onUpdate: updateTransforms,
      },
      0
    )

    // STEP 2A: Experience to Projects (THE DRAMATIC CLOSE)
    // Laptop sweeps to center, and the lid CLOSES FULLY DOWN (0° clamshell shut!)
    tl.to(
      animState,
      {
        posX: 0.5,
        posY: 0.05,
        posZ: 0.3,
        rotX: 0.12,
        rotY: 0.45,
        rotZ: 0.02,
        lidAngle: 0.0, // COMPLETELY CLOSED!
        duration: 0.5,
        ease: "power2.inOut",
        onUpdate: updateTransforms,
      },
      1
    )

    // STEP 2B: Projects Reopen (THE DRAMATIC REOPEN)
    // Laptop centers, and the lid OPENS BACK UP gracefully facing the viewer!
    tl.to(
      animState,
      {
        posX: 0,
        posY: 0.28,
        posZ: 0.2,
        rotX: 0.06,
        rotY: 0.16,
        rotZ: 0,
        lidAngle: -1.86, // REOPENS FULLY FACING VIEWER!
        camY: 0.55,
        camZ: 4.1,
        duration: 0.7,
        ease: "power2.out",
        onUpdate: updateTransforms,
      },
      1.5
    )

    // STEP 3: Projects to Contact (Cinematic finale)
    // Laptop completes final rotation and lid closes into sleek dark silhouette
    tl.to(
      animState,
      {
        posX: 0,
        posY: -0.18,
        posZ: -0.1,
        rotX: -0.12,
        rotY: -0.72,
        rotZ: 0.05,
        lidAngle: 0.0, // CLOSES COMPLETELY INTO SLEEK SILHOUETTE!
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

    // Interactive Click-to-Open/Close:
    // Clicking anywhere on the screen toggles the laptop lid smoothly!
    const handleClick = (e: MouseEvent) => {
      // Don't trigger if clicking interactive buttons or links
      const target = e.target as HTMLElement
      if (target.closest("button") || target.closest("a") || target.closest("input")) return

      const isCurrentlyOpen = lidGroup.rotation.x < -0.5
      const targetLidAngle = isCurrentlyOpen ? 0.0 : -1.84

      isManuallyToggledRef.current = true
      gsap.to(lidGroup.rotation, {
        x: targetLidAngle,
        duration: 0.85,
        ease: "power3.inOut",
        onComplete: () => {
          setTimeout(() => {
            isManuallyToggledRef.current = false
          }, 3000)
        },
      })
    }
    window.addEventListener("click", handleClick)

    // Subtle gentle floating drift when stationary
    let clock = new THREE.Clock()
    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()
      laptopGroup.position.y += Math.sin(elapsedTime * 1.4) * 0.0006
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("click", handleClick)
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

// 5. Authentic Apple Logo Vector Shape Generator
function createAppleLogoShape() {
  const shape = new THREE.Shape()
  // Apple body
  shape.moveTo(0, 15)
  shape.bezierCurveTo(-15, 15, -30, -5, -30, -25)
  shape.bezierCurveTo(-30, -55, 0, -65, 0, -65)
  shape.bezierCurveTo(0, -65, 30, -55, 30, -25)
  shape.bezierCurveTo(30, -5, 15, 15, 0, 15)
  return shape
}

// 6. Photorealistic Apple Magic Keyboard Drawer
function drawAppleKeyboard(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  const w = canvas.width
  const h = canvas.height

  // Anodized black tray base
  ctx.fillStyle = "#121418"
  ctx.fillRect(0, 0, w, h)

  // Keyboard Rows layout definition
  const row0 = ["esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Touch ID"]
  const row1 = ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "delete"]
  const row2 = ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"]
  const row3 = ["caps lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "return"]
  const row4 = ["shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "shift"]
  const row5 = ["fn", "control", "option", "command", " ", "command", "option", "◀", "▲▼", "▶"]

  const allRows = [row0, row1, row2, row3, row4, row5]
  const rowHeights = [110, 135, 135, 135, 135, 135]
  const paddingX = 40
  const paddingY = 40
  const gapX = 14
  const gapY = 14

  let currentY = paddingY

  allRows.forEach((row, rIdx) => {
    const rowH = rowHeights[rIdx]
    const usableW = w - paddingX * 2
    const totalGaps = (row.length - 1) * gapX

    // Determine custom key widths
    const keyWidths: number[] = []
    if (rIdx === 0) {
      // Function row: uniform except Touch ID
      const standardW = (usableW - totalGaps) / row.length
      row.forEach(() => keyWidths.push(standardW))
    } else if (rIdx === 1) {
      // delete is 1.6x
      const unit = (usableW - totalGaps) / (row.length + 0.6)
      row.forEach((_, i) => keyWidths.push(i === row.length - 1 ? unit * 1.6 : unit))
    } else if (rIdx === 2) {
      // tab is 1.5x, \ is 1.1x
      const unit = (usableW - totalGaps) / (row.length + 0.6)
      row.forEach((_, i) => {
        if (i === 0) keyWidths.push(unit * 1.5)
        else if (i === row.length - 1) keyWidths.push(unit * 1.1)
        else keyWidths.push(unit)
      })
    } else if (rIdx === 3) {
      // caps lock is 1.8x, return is 1.8x
      const unit = (usableW - totalGaps) / (row.length + 1.6)
      row.forEach((_, i) => {
        if (i === 0 || i === row.length - 1) keyWidths.push(unit * 1.8)
        else keyWidths.push(unit)
      })
    } else if (rIdx === 4) {
      // shift is 2.3x each
      const unit = (usableW - totalGaps) / (row.length + 2.6)
      row.forEach((_, i) => {
        if (i === 0 || i === row.length - 1) keyWidths.push(unit * 2.3)
        else keyWidths.push(unit)
      })
    } else if (rIdx === 5) {
      // spacebar row
      const unit = (usableW - totalGaps) / 16
      keyWidths.push(unit * 1.2) // fn
      keyWidths.push(unit * 1.2) // ctrl
      keyWidths.push(unit * 1.2) // opt
      keyWidths.push(unit * 1.5) // cmd
      keyWidths.push(unit * 6.0) // spacebar
      keyWidths.push(unit * 1.5) // cmd
      keyWidths.push(unit * 1.2) // opt
      keyWidths.push(unit * 1.0) // left
      keyWidths.push(unit * 1.0) // up/down
      keyWidths.push(unit * 1.0) // right
    }

    let currentX = paddingX
    row.forEach((key, kIdx) => {
      const kw = keyWidths[kIdx] || 100

      // Chiclet Key Body
      ctx.fillStyle = "#181a20"
      ctx.strokeStyle = "#252830"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.roundRect(currentX, currentY, kw, rowH, 14)
      ctx.fill()
      ctx.stroke()

      // Subtle key top highlight
      const keyGrad = ctx.createLinearGradient(currentX, currentY, currentX, currentY + rowH)
      keyGrad.addColorStop(0, "rgba(255, 255, 255, 0.08)")
      keyGrad.addColorStop(1, "rgba(0, 0, 0, 0.2)")
      ctx.fillStyle = keyGrad
      ctx.beginPath()
      ctx.roundRect(currentX + 2, currentY + 2, kw - 4, rowH - 4, 12)
      ctx.fill()

      // Key Legend (Crisp white Apple typography)
      ctx.fillStyle = "#e2e8f0"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      if (key === "Touch ID") {
        ctx.fillStyle = "#0c0d10"
        ctx.beginPath()
        ctx.roundRect(currentX + 6, currentY + 6, kw - 12, rowH - 12, 10)
        ctx.fill()
      } else if (rIdx === 0) {
        ctx.font = "600 24px -apple-system, sans-serif"
        ctx.fillText(key, currentX + kw / 2, currentY + rowH / 2)
      } else {
        ctx.font = "bold 32px -apple-system, sans-serif"
        ctx.fillText(key, currentX + kw / 2, currentY + rowH / 2)
      }

      currentX += kw + gapX
    })

    currentY += rowH + gapY
  })
}

// 7. Micro-drilled Speaker Grille Texture
function drawSpeakerGrille(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  const w = canvas.width
  const h = canvas.height

  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = "rgba(10, 12, 16, 0.85)"

  const cols = 8
  const rows = 36
  const stepX = w / cols
  const stepY = h / rows

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.beginPath()
      ctx.arc(c * stepX + stepX / 2, r * stepY + stepY / 2, 2.2, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

// 8. High-Resolution Liquid Retina Screen Canvas Renderer
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
    // VIBRANT GLOWING ELECTRIC BLUE & VIOLET WALLPAPER (Identical to user's uploaded mockup!)
    // Deep royal blue & midnight base
    const bgGrad = ctx.createLinearGradient(0, 0, w, h)
    bgGrad.addColorStop(0, "#11183c")
    bgGrad.addColorStop(0.35, "#18265e")
    bgGrad.addColorStop(0.7, "#1d3278")
    bgGrad.addColorStop(1, "#0d1838")
    ctx.fillStyle = bgGrad
    ctx.fillRect(0, 0, w, h)

    // Flowing luminous silk curves
    ctx.save()

    // Wave 1: Glowing Royal Violet/Indigo Under-Swoop
    ctx.beginPath()
    ctx.moveTo(-100, h * 0.95)
    ctx.bezierCurveTo(w * 0.25, h * 0.8, w * 0.55, h * 0.35, w + 100, h * 0.45)
    ctx.lineTo(w + 100, h + 100)
    ctx.lineTo(-100, h + 100)
    ctx.closePath()
    const wave1Grad = ctx.createLinearGradient(0, h * 0.3, w, h)
    wave1Grad.addColorStop(0, "rgba(129, 140, 248, 0.9)")
    wave1Grad.addColorStop(0.4, "rgba(99, 102, 241, 0.85)")
    wave1Grad.addColorStop(0.8, "rgba(59, 130, 246, 0.95)")
    wave1Grad.addColorStop(1, "rgba(30, 64, 175, 0.9)")
    ctx.fillStyle = wave1Grad
    ctx.fill()

    // Wave 2: Luminous Electric Cyan & Sky Blue Ribbon (The brilliant glowing curve!)
    ctx.beginPath()
    ctx.moveTo(w * 0.15, h + 60)
    ctx.bezierCurveTo(w * 0.45, h * 0.62, w * 0.72, h * 0.28, w + 80, h * 0.18)
    ctx.lineTo(w + 80, h + 80)
    ctx.closePath()
    const wave2Grad = ctx.createLinearGradient(w * 0.15, h, w, h * 0.2)
    wave2Grad.addColorStop(0, "rgba(56, 189, 248, 0.95)")
    wave2Grad.addColorStop(0.5, "rgba(96, 165, 250, 0.9)")
    wave2Grad.addColorStop(0.85, "rgba(192, 132, 252, 0.85)")
    wave2Grad.addColorStop(1, "rgba(238, 242, 255, 0.95)")
    ctx.fillStyle = wave2Grad
    ctx.fill()

    // Wave 3: Gleaming White Specular Edge Ribbon
    ctx.beginPath()
    ctx.moveTo(-60, h * 0.92)
    ctx.bezierCurveTo(w * 0.32, h * 0.68, w * 0.62, h * 0.24, w + 100, h * 0.42)
    ctx.lineWidth = 14
    ctx.strokeStyle = "rgba(255, 255, 255, 0.9)"
    ctx.shadowColor = "rgba(186, 230, 253, 0.9)"
    ctx.shadowBlur = 25
    ctx.stroke()
    ctx.restore()

    // Soft Lavender Glow in Upper-Left
    const auraGrad = ctx.createRadialGradient(w * 0.2, h * 0.2, 50, w * 0.2, h * 0.2, 600)
    auraGrad.addColorStop(0, "rgba(196, 181, 253, 0.4)")
    auraGrad.addColorStop(1, "rgba(0, 0, 0, 0)")
    ctx.fillStyle = auraGrad
    ctx.fillRect(0, 0, w, h)

    // macOS Top Status Bar
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)"
    ctx.fillRect(0, 0, w, 44)
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 20px -apple-system, sans-serif"
    ctx.fillText("", 32, 28)
    ctx.font = "500 18px -apple-system, sans-serif"
    ctx.fillText("Adrian Cardona", 68, 28)
    ctx.fillText("File   Edit   View   Window   Help", 230, 28)
    ctx.fillText("9:41 AM", w - 120, 28)
  } else if (state === "experience") {
    // Cal Poly Bailey College / CSSE University Research Workspace
    ctx.fillStyle = "#0c1017"
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = "#161b24"
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
    ctx.fillStyle = "#181e28"
    ctx.roundRect(40, 90, w - 80, h - 140, 20)
    ctx.fill()

    ctx.fillStyle = "#252d3d"
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

    const startX = 700
    const startY = 130
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        const x = startX + c * 390
        const y = startY + r * 300
        ctx.fillStyle = "#1e2532"
        ctx.roundRect(x, y, 360, 260, 12)
        ctx.fill()
        ctx.fillStyle = "#2f3a4e"
        ctx.roundRect(x + 20, y + 20, 320, 160, 8)
        ctx.fill()
        ctx.fillStyle = "#8b9bb4"
        ctx.font = "500 16px -apple-system, sans-serif"
        ctx.fillText(`Asset_REC_${r * 3 + c + 1}.png · Ingested`, x + 20, y + 225)
      }
    }
  } else if (state === "gitex") {
    // Gitex Live Codebase Intelligence Interface
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = "#f6f8fa"
    ctx.fillRect(0, 0, w, 68)
    ctx.fillStyle = "#111827"
    ctx.font = "bold 26px -apple-system, sans-serif"
    ctx.fillText("Gitex", 40, 42)
    ctx.fillStyle = "#6b7280"
    ctx.font = "500 20px -apple-system, sans-serif"
    ctx.fillText("/ adrian-1-cardona/Guppty", 120, 42)

    ctx.fillStyle = "#ffffff"
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 2
    ctx.roundRect(40, 100, w - 80, 68, 16)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = "#111827"
    ctx.font = "500 22px -apple-system, sans-serif"
    ctx.fillText("How are syntax errors handled in the lexer?", 90, 142)

    // Left: Answer
    ctx.fillStyle = "#f9fafb"
    ctx.roundRect(40, 200, 780, h - 250, 20)
    ctx.fill()

    ctx.fillStyle = "#111827"
    ctx.font = "bold 24px -apple-system, sans-serif"
    ctx.fillText("Synthesized Explanation", 70, 260)
    ctx.font = "normal 20px -apple-system, sans-serif"
    ctx.fillStyle = "#374151"
    ctx.fillText("The lexer tracks line and column byte positions for every token.", 70, 310)
    ctx.fillText("When an invalid syntax character is encountered, it constructs an error", 70, 350)
    ctx.fillText("holding the exact source span, highlighting the line in the terminal.", 70, 390)

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
    ctx.fillStyle = "#080a0e"
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
