import { useEffect, useRef } from "react"
import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export type ScreenState = "wallpaper" | "experience" | "gitex" | "guppty" | "contact"

interface MacBookCanvasProps {
  screenState?: ScreenState
  activeRoleIndex?: number
  onScreenStateChange?: (state: ScreenState) => void
  onRoleChange?: (index: number) => void
}

export default function MacBookCanvas({
  screenState = "wallpaper",
  activeRoleIndex = 0,
  onRoleChange,
}: MacBookCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const screenCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const screenTextureRef = useRef<THREE.CanvasTexture | null>(null)
  const currentScreenStateRef = useRef<ScreenState>(screenState)
  const activeRoleIndexRef = useRef<number>(activeRoleIndex)
  const lastScreenUpdateRef = useRef<number>(0)
  const mousePosRef = useRef({ x: 0, y: 0 })

  // Interactive manual lid override state
  const isManuallyToggledRef = useRef<boolean>(false)

  // Redraw screen whenever state or active role changes
  useEffect(() => {
    currentScreenStateRef.current = screenState
    activeRoleIndexRef.current = activeRoleIndex
    if (screenCanvasRef.current && screenTextureRef.current) {
      drawScreen(screenCanvasRef.current, screenState, activeRoleIndex, 0)
      screenTextureRef.current.needsUpdate = true
    }
  }, [screenState, activeRoleIndex])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 1. Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      38,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.set(0, 0.18, 4.1)

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

    // Photorealistic Studio Environment Map (PMREM) for authentic Apple unibody reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()
    const roomEnvironment = new RoomEnvironment()
    scene.environment = pmremGenerator.fromScene(roomEnvironment, 0.04).texture

    // 2. Studio Lighting Setup for Apple Aluminum & Glass Reflections
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1)
    scene.add(ambientLight)

    // Key front light
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.3)
    keyLight.position.set(2.5, 4.5, 4.0)
    scene.add(keyLight)

    // Soft sky blue/lavender fill light from left
    const fillLight = new THREE.DirectionalLight(0xd5e2ff, 1.2)
    fillLight.position.set(-4, 2.5, 1)
    scene.add(fillLight)

    // Rim specular light from behind (Apple signature perimeter edge gleam)
    const rimLight = new THREE.DirectionalLight(0xffffff, 2.4)
    rimLight.position.set(0, 4.0, -4.5)
    scene.add(rimLight)

    // Soft bottom bounce light for aluminum underbelly
    const bounceLight = new THREE.DirectionalLight(0xe8eeff, 1.4)
    bounceLight.position.set(-1, -3.5, 2.5)
    scene.add(bounceLight)

    // Helper: Rounded Rectangle 2D Shape
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

    // Authentic M3/M4 MacBook Air Proportions (Razor-thin unibody chassis)
    const width = 3.25
    const depth = 2.15
    const baseThickness = 0.052
    const cornerRadius = 0.12

    // Authentic Apple Anodized Aluminum PBR Material (Silver / Space Gray Unibody)
    const aluminumMat = new THREE.MeshStandardMaterial({
      color: 0xb2b7c0,
      metalness: 0.82,
      roughness: 0.22,
    })

    // Dark trim material for interior wells & port cavities
    const darkTrimMat = new THREE.MeshStandardMaterial({
      color: 0x101216,
      metalness: 0.4,
      roughness: 0.5,
    })

    // --- BASE ASSEMBLY ---
    const baseGroup = new THREE.Group()
    const baseShape = createRoundedRect(width, depth, cornerRadius)
    const baseGeom = new THREE.ExtrudeGeometry(baseShape, {
      depth: baseThickness,
      bevelEnabled: true,
      bevelThickness: 0.014,
      bevelSize: 0.014,
      bevelSegments: 5,
    })
    baseGeom.center()
    baseGeom.rotateX(Math.PI / 2)
    const baseMesh = new THREE.Mesh(baseGeom, aluminumMat)
    baseGroup.add(baseMesh)

    // Front center thumb scoop
    const scoopGeom = new THREE.BoxGeometry(0.36, 0.012, 0.016)
    const scoopMesh = new THREE.Mesh(scoopGeom, darkTrimMat)
    scoopMesh.position.set(0, 0.032, depth / 2 - 0.004)
    baseGroup.add(scoopMesh)

    // Keyboard Well (Recessed tray)
    const kbWidth = 2.62
    const kbDepth = 1.02
    const kbShape = createRoundedRect(kbWidth, kbDepth, 0.04)
    const kbGeom = new THREE.ExtrudeGeometry(kbShape, {
      depth: 0.006,
      bevelEnabled: false,
    })
    kbGeom.center()
    kbGeom.rotateX(Math.PI / 2)
    const kbTray = new THREE.Mesh(kbGeom, darkTrimMat)
    kbTray.position.set(0, 0.038, -0.30)
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
    // Using MeshBasicMaterial with transparent dark tone prevents blown-out white specular wash
    const kbMat = new THREE.MeshBasicMaterial({
      map: kbTexture,
      polygonOffset: true,
      polygonOffsetFactor: -1,
    })
    const kbPlaneMesh = new THREE.Mesh(kbPlaneGeom, kbMat)
    kbPlaneMesh.position.set(0, 0.042, -0.30)
    baseGroup.add(kbPlaneMesh)

    // Speaker Grilles (Left & Right laser-drilled perforations)
    const speakerCanvas = document.createElement("canvas")
    speakerCanvas.width = 128
    speakerCanvas.height = 512
    drawSpeakerGrille(speakerCanvas)
    const speakerTexture = new THREE.CanvasTexture(speakerCanvas)
    const speakerGeom = new THREE.PlaneGeometry(0.16, 0.94)
    speakerGeom.rotateX(-Math.PI / 2)
    const speakerMat = new THREE.MeshBasicMaterial({
      map: speakerTexture,
      transparent: true,
      polygonOffset: true,
      polygonOffsetFactor: -1,
    })

    const speakerL = new THREE.Mesh(speakerGeom, speakerMat)
    speakerL.position.set(-1.44, 0.041, -0.30)
    baseGroup.add(speakerL)

    const speakerR = new THREE.Mesh(speakerGeom, speakerMat)
    speakerR.position.set(1.44, 0.041, -0.30)
    baseGroup.add(speakerR)

    // Force Touch Glass Trackpad with Hairline Gap
    const tpWidth = 1.20
    const tpDepth = 0.76
    const tpShape = createRoundedRect(tpWidth, tpDepth, 0.035)
    const tpGeom = new THREE.ExtrudeGeometry(tpShape, {
      depth: 0.002,
      bevelEnabled: false,
    })
    tpGeom.center()
    tpGeom.rotateX(Math.PI / 2)
    const tpMat = new THREE.MeshStandardMaterial({
      color: 0x989ea8,
      metalness: 0.65,
      roughness: 0.28,
    })
    const trackpad = new THREE.Mesh(tpGeom, tpMat)
    trackpad.position.set(0, 0.040, 0.62)
    baseGroup.add(trackpad)

    // Trackpad fine hairline border
    const tpBorderShape = createRoundedRect(tpWidth + 0.005, tpDepth + 0.005, 0.037)
    const tpBorderGeom = new THREE.ShapeGeometry(tpBorderShape)
    tpBorderGeom.rotateX(Math.PI / 2)
    const tpBorderMat = new THREE.MeshBasicMaterial({ color: 0x727a87 })
    const tpBorderMesh = new THREE.Mesh(tpBorderGeom, tpBorderMat)
    tpBorderMesh.position.set(0, 0.0405, 0.62)
    baseGroup.add(tpBorderMesh)

    // Recessed Flush Ports on Left & Right Sides (Authentic Apple Unibody Pill Sockets)
    const portSocketMat = new THREE.MeshBasicMaterial({ color: 0x0a0c10 })
    const portPinMat = new THREE.MeshBasicMaterial({ color: 0x606570 })

    function createRecessedPillPort(x: number, y: number, z: number, isRight = false) {
      const portGroup = new THREE.Group()
      // Outer dark socket cavity
      const cavityGeom = new THREE.BoxGeometry(0.016, 0.018, 0.048)
      const cavity = new THREE.Mesh(cavityGeom, portSocketMat)
      portGroup.add(cavity)

      // Center tongue / pin bar
      const pinGeom = new THREE.BoxGeometry(0.012, 0.004, 0.032)
      const pin = new THREE.Mesh(pinGeom, portPinMat)
      portGroup.add(pin)

      portGroup.position.set(x, y, z)
      return portGroup
    }

    // Left Side: MagSafe 3 and Dual Thunderbolt 4 / USB-C Ports
    const portL1 = createRecessedPillPort(-width / 2, 0, -0.60)
    baseGroup.add(portL1)

    const portL2 = createRecessedPillPort(-width / 2, 0, -0.42)
    baseGroup.add(portL2)

    // Right Side: 3.5mm Headphone Jack (Authentic circular socket)
    const jackGeom = new THREE.CylinderGeometry(0.013, 0.013, 0.024, 20)
    jackGeom.rotateZ(Math.PI / 2)
    const jackMat = new THREE.MeshBasicMaterial({ color: 0x050608 })
    const jackMesh = new THREE.Mesh(jackGeom, jackMat)
    jackMesh.position.set(width / 2, 0, -0.45)
    baseGroup.add(jackMesh)

    // Bottom Rubber Feet (Four circular black feet clearly protruding on bottom chassis plate)
    const footGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.014, 24)
    const footMat = new THREE.MeshStandardMaterial({
      color: 0x14161a,
      roughness: 0.85,
    })
    const footPositions = [
      [-width / 2 + 0.38, -baseThickness / 2 - 0.016, -depth / 2 + 0.38],
      [width / 2 - 0.38, -baseThickness / 2 - 0.016, -depth / 2 + 0.38],
      [-width / 2 + 0.38, -baseThickness / 2 - 0.016, depth / 2 - 0.38],
      [width / 2 - 0.38, -baseThickness / 2 - 0.016, depth / 2 - 0.38],
    ]
    footPositions.forEach(([x, y, z]) => {
      const foot = new THREE.Mesh(footGeom, footMat)
      foot.position.set(x, y, z)
      baseGroup.add(foot)
    })

    // Iconic Apple Clutch Hinge Bar (Matte Graphite Recessed Hinge)
    const hingeGeom = new THREE.CylinderGeometry(0.020, 0.020, width * 0.74, 24)
    hingeGeom.rotateZ(Math.PI / 2)
    const hingeMat = new THREE.MeshStandardMaterial({
      color: 0x0a0c0e,
      metalness: 0.85,
      roughness: 0.35,
    })
    const hinge = new THREE.Mesh(hingeGeom, hingeMat)
    hinge.position.set(0, baseThickness / 2 - 0.004, -depth / 2)
    baseGroup.add(hinge)

    laptopGroup.add(baseGroup)

    // --- LID ASSEMBLY (Articulating Hinge) ---
    const lidGroup = new THREE.Group()
    lidGroup.position.set(0, baseThickness / 2, -depth / 2)

    const lidContent = new THREE.Group()
    const lidThickness = 0.024
    const lidShape = createRoundedRect(width, depth, cornerRadius)
    const lidGeom = new THREE.ExtrudeGeometry(lidShape, {
      depth: lidThickness,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
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
      roughness: 0.05,
    })
    const appleLogo = new THREE.Mesh(logoGeom, logoMat)
    appleLogo.position.set(0, lidThickness + 0.003, depth / 2)
    appleLogo.scale.set(0.0035, 0.0035, 0.0035)
    lidContent.add(appleLogo)

    // Matte Black Display Chin
    const chinGeom = new THREE.PlaneGeometry(width - 0.03, 0.06)
    chinGeom.rotateX(Math.PI / 2)
    const chinMat = new THREE.MeshBasicMaterial({ color: 0x050608 })
    const chinMesh = new THREE.Mesh(chinGeom, chinMat)
    chinMesh.position.set(0, -0.009, 0.03)
    lidContent.add(chinMesh)

    // Liquid Retina XDR Display (Single high-res plane with zero z-fighting)
    const screenCanvas = document.createElement("canvas")
    screenCanvas.width = 2048
    screenCanvas.height = 1280
    screenCanvasRef.current = screenCanvas

    drawScreen(screenCanvas, currentScreenStateRef.current, activeRoleIndexRef.current)

    const screenTexture = new THREE.CanvasTexture(screenCanvas)
    screenTexture.generateMipmaps = true
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter
    screenTextureRef.current = screenTexture

    // Display plane matches lid interior face (DoubleSide ensures it is NEVER culled by camera angles)
    const screenPlaneGeom = new THREE.PlaneGeometry(width - 0.02, depth - 0.02)
    screenPlaneGeom.rotateX(Math.PI / 2)
    const screenPlaneMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -1,
    })
    const screenMesh = new THREE.Mesh(screenPlaneGeom, screenPlaneMat)
    screenMesh.position.set(0, -0.008, depth / 2)
    lidContent.add(screenMesh)

    // Ethereal Screen Glow Light (Casts soft purple/blue light onto keyboard deck matching mockup)
    const screenGlowLight = new THREE.PointLight(0x7090ff, 1.6, 2.5)
    screenGlowLight.position.set(0, -0.15, depth * 0.45)
    lidContent.add(screenGlowLight)

    lidGroup.add(lidContent)
    laptopGroup.add(lidGroup)

    scene.add(laptopGroup)

    // Ground Contact Shadow (Soft Apple product drop shadow)
    const shadowCanvas = document.createElement("canvas")
    shadowCanvas.width = 512
    shadowCanvas.height = 512
    const shadowCtx = shadowCanvas.getContext("2d")
    if (shadowCtx) {
      const grad = shadowCtx.createRadialGradient(256, 256, 30, 256, 256, 240)
      grad.addColorStop(0, "rgba(20, 30, 60, 0.28)")
      grad.addColorStop(0.4, "rgba(40, 60, 110, 0.14)")
      grad.addColorStop(0.7, "rgba(80, 100, 160, 0.04)")
      grad.addColorStop(1, "rgba(0, 0, 0, 0)")
      shadowCtx.fillStyle = grad
      shadowCtx.fillRect(0, 0, 512, 512)
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
    shadowMesh.position.set(0, -1.05, 0)
    scene.add(shadowMesh)

    // 4. GSAP ScrollTrigger Choreography (Scroll-synchronized 3D transformation)
    // EXACT MATCH TO USER'S REFERENCE MOCKUP
    const animState = {
      posX: 0.02,
      posY: -0.52,
      posZ: 0.0,
      scale: 0.84,
      rotX: -0.08,
      rotY: -0.34,
      rotZ: 0.04,
      lidAngle: -1.82, // ~104° open, screen standing upright and facing camera
      camY: 0.05,
      camZ: 4.60,
      shadowOpacity: 0.75,
    }

    const updateTransforms = () => {
      laptopGroup.position.set(animState.posX, animState.posY, animState.posZ)
      laptopGroup.scale.set(animState.scale, animState.scale, animState.scale)
      laptopGroup.rotation.set(animState.rotX, animState.rotY, animState.rotZ)
      if (!isManuallyToggledRef.current) {
        lidGroup.rotation.x = animState.lidAngle
      }
      camera.position.set(0, animState.camY, animState.camZ)
      shadowMesh.material.opacity = animState.shadowOpacity
    }

    // ScrollTrigger Timeline
    // Choreographed to scroll through all 4 experiences, then close/reopen into projects, then contact
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    })

    // STAGE 1: Hero to Experience Role 0 (Software Engineering Intern @ Cal Poly)
    // Extreme isometric close-up: USB-C port, Magic Keyboard, speaker grille, open lid displaying computer UI
    // Placed in right column (posX: 1.85) with scale: 0.88 so left typography has complete breathing room!
    tl.to(
      animState,
      {
        posX: 1.85,
        posY: -0.16,
        posZ: 0.25,
        scale: 0.88,
        rotX: 0.24,
        rotY: 0.44,
        rotZ: -0.05,
        lidAngle: -1.82, // fully open showing actual computer screen!
        camY: 0.18,
        camZ: 3.75,
        shadowOpacity: 0.90,
        duration: 1.0,
        ease: "power2.inOut",
        onUpdate: updateTransforms,
      },
      0
    )

    // STAGE 2: Experience Role 0 -> Role 1 (Undergraduate Researcher @ Cal Poly CSSE)
    // Dynamic glide: subtle rotation shift to view Ray RLlib telemetry & multi-agent graphs
    tl.to(
      animState,
      {
        posX: 1.80,
        posY: -0.15,
        posZ: 0.22,
        scale: 0.88,
        rotX: 0.26,
        rotY: 0.40,
        rotZ: -0.04,
        lidAngle: -1.84,
        duration: 0.7,
        ease: "power1.inOut",
        onUpdate: updateTransforms,
      },
      1.0
    )

    // STAGE 3: Experience Role 1 -> Role 2 (Technology Solutions Research Intern @ Foundation for CCC)
    // Subtle rotation shift, highlighting the FAFSA analytics dashboard across 116 campuses
    tl.to(
      animState,
      {
        posX: 1.84,
        posY: -0.16,
        posZ: 0.25,
        scale: 0.88,
        rotX: 0.22,
        rotY: 0.44,
        rotZ: -0.05,
        lidAngle: -1.82,
        duration: 0.7,
        ease: "power1.inOut",
        onUpdate: updateTransforms,
      },
      1.7
    )

    // STAGE 4: Experience Role 2 -> Role 3 (AI Document Insights Extern @ Extern)
    // Smooth settling showing RAG document intelligence interface & highlighted contract
    tl.to(
      animState,
      {
        posX: 1.82,
        posY: -0.15,
        posZ: 0.24,
        scale: 0.88,
        rotX: 0.25,
        rotY: 0.38,
        rotZ: -0.04,
        lidAngle: -1.85,
        duration: 0.7,
        ease: "power1.inOut",
        onUpdate: updateTransforms,
      },
      2.4
    )

    // STAGE 5A: Experience to Projects (THE DRAMATIC CLAMSHELL CLOSE)
    // Occurs as user scrolls OUT of Experience and into Projects
    tl.to(
      animState,
      {
        posX: 0.10,
        posY: 0.10,
        posZ: 0.15,
        scale: 0.84,
        rotX: 0.15,
        rotY: 0.32,
        rotZ: 0.02,
        lidAngle: 0.0, // COMPLETELY CLOSED!
        duration: 0.6,
        ease: "power2.inOut",
        onUpdate: updateTransforms,
      },
      3.3
    )

    // STAGE 5B: Projects Reopen (THE DRAMATIC REOPEN)
    // Laptop centers above project cards, and the lid OPENS BACK UP facing the viewer!
    tl.to(
      animState,
      {
        posX: 0,
        posY: 0.45,
        posZ: 0.10,
        scale: 0.82,
        rotX: 0.08,
        rotY: 0.16,
        rotZ: 0,
        lidAngle: -1.84, // REOPENS FULLY FACING VIEWER!
        camY: 0.26,
        camZ: 4.10,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: updateTransforms,
      },
      3.9
    )

    // STAGE 6: Projects to Contact (Cinematic finale)
    // Laptop completes final rotation and lid closes into sleek dark silhouette atop the blue curved dome
    tl.to(
      animState,
      {
        posX: 0,
        posY: 0.38,
        posZ: 0.0,
        scale: 0.80,
        rotX: -0.06,
        rotY: -0.55,
        rotZ: 0.02,
        lidAngle: 0.0, // CLOSES COMPLETELY INTO SLEEK SILHOUETTE!
        camY: 0.15,
        camZ: 4.20,
        shadowOpacity: 0.35,
        duration: 0.9,
        ease: "power2.inOut",
        onUpdate: updateTransforms,
      },
      4.8
    )

    // Expose transform controls on window for live testing and fine-tuning
    ;(window as any).__setTransform = (params: any) => {
      Object.assign(animState, params)
      updateTransforms()
      renderer.render(scene, camera)
    }
    ;(window as any).__getTransform = () => ({ ...animState })

    updateTransforms()

    // 5. Interactive Click & Hover on MacBook
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const handleClick = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(mouse, camera)

      const intersects = raycaster.intersectObjects([baseMesh, lidBackMesh, screenMesh], true)
      if (intersects.length > 0) {
        // Toggle lid open/close smoothly on click!
        isManuallyToggledRef.current = true
        const isCurrentlyClosed = Math.abs(lidGroup.rotation.x) < 0.2
        const targetAngle = isCurrentlyClosed ? -1.85 : 0.0

        gsap.to(lidGroup.rotation, {
          x: targetAngle,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            if (!isCurrentlyClosed) {
              setTimeout(() => {
                isManuallyToggledRef.current = false
              }, 1200)
            }
          },
        })
      }
    }

    window.addEventListener("click", handleClick)

    const handlePointerMove = (e: PointerEvent) => {
      mousePosRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mousePosRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("pointermove", handlePointerMove)

    // 6. Animation Loop (Live computer animations, floating levitation, and mouse parallax)
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Redraw screen 10 times per second for smooth live computer animations (blinking cursor, clocks, progress)
      if (elapsedTime - lastScreenUpdateRef.current > 0.09) {
        lastScreenUpdateRef.current = elapsedTime
        if (screenCanvasRef.current && screenTextureRef.current) {
          drawScreen(
            screenCanvasRef.current,
            currentScreenStateRef.current,
            activeRoleIndexRef.current,
            elapsedTime
          )
          screenTextureRef.current.needsUpdate = true
        }
      }

      // Subtly float only in hero wallpaper mode
      if (currentScreenStateRef.current === "wallpaper" && !isManuallyToggledRef.current) {
        laptopGroup.position.y = animState.posY + Math.sin(elapsedTime * 1.2) * 0.012
        laptopGroup.rotation.z = animState.rotZ + Math.cos(elapsedTime * 0.9) * 0.006
      }

      // Subtle Apple-style physical mouse parallax
      const targetParallaxY = mousePosRef.current.x * 0.035
      const targetParallaxX = -mousePosRef.current.y * 0.025
      laptopGroup.rotation.y = THREE.MathUtils.lerp(
        laptopGroup.rotation.y,
        animState.rotY + targetParallaxY,
        0.05
      )
      laptopGroup.rotation.x = THREE.MathUtils.lerp(
        laptopGroup.rotation.x,
        animState.rotX + targetParallaxX,
        0.05
      )

      renderer.render(scene, camera)
    }

    animate()

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("click", handleClick)
      window.removeEventListener("pointermove", handlePointerMove)
      cancelAnimationFrame(animationFrameId)
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [onRoleChange])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-25"
      style={{ overflow: "hidden" }}
    />
  )
}

// 5. Authentic Apple Logo Vector Shape Generator
function createAppleLogoShape() {
  const shape = new THREE.Shape()
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
  ctx.fillStyle = "#0c0d10"
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

    const keyWidths: number[] = []
    if (rIdx === 0) {
      const standardW = (usableW - totalGaps) / row.length
      row.forEach(() => keyWidths.push(standardW))
    } else if (rIdx === 1) {
      const unit = (usableW - totalGaps) / (row.length + 0.6)
      row.forEach((_, i) => keyWidths.push(i === row.length - 1 ? unit * 1.6 : unit))
    } else if (rIdx === 2) {
      const unit = (usableW - totalGaps) / (row.length + 0.6)
      row.forEach((_, i) => {
        if (i === 0) keyWidths.push(unit * 1.5)
        else if (i === row.length - 1) keyWidths.push(unit * 1.1)
        else keyWidths.push(unit)
      })
    } else if (rIdx === 3) {
      const unit = (usableW - totalGaps) / (row.length + 1.6)
      row.forEach((_, i) => {
        if (i === 0 || i === row.length - 1) keyWidths.push(unit * 1.8)
        else keyWidths.push(unit)
      })
    } else if (rIdx === 4) {
      const unit = (usableW - totalGaps) / (row.length + 2.6)
      row.forEach((_, i) => {
        if (i === 0 || i === row.length - 1) keyWidths.push(unit * 2.3)
        else keyWidths.push(unit)
      })
    } else if (rIdx === 5) {
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

      // Matte Black Chiclet Key Body
      ctx.fillStyle = "#121418"
      ctx.strokeStyle = "#1a1d24"
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.roundRect(currentX, currentY, kw, rowH, 14)
      ctx.fill()
      ctx.stroke()

      // Key top subtle highlight bevel
      const keyGrad = ctx.createLinearGradient(currentX, currentY, currentX, currentY + rowH)
      keyGrad.addColorStop(0, "rgba(255, 255, 255, 0.06)")
      keyGrad.addColorStop(1, "rgba(0, 0, 0, 0.35)")
      ctx.fillStyle = keyGrad
      ctx.beginPath()
      ctx.roundRect(currentX + 2, currentY + 2, kw - 4, rowH - 4, 12)
      ctx.fill()

      // Crisp White Key Legend (San Francisco / Apple System Font)
      ctx.fillStyle = "rgba(255, 255, 255, 0.92)"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      if (key === "Touch ID") {
        ctx.fillStyle = "#08090b"
        ctx.beginPath()
        ctx.roundRect(currentX + 6, currentY + 6, kw - 12, rowH - 12, 10)
        ctx.fill()
      } else if (rIdx === 0) {
        ctx.font = "600 22px -apple-system, BlinkMacSystemFont, sans-serif"
        ctx.fillText(key, currentX + kw / 2, currentY + rowH / 2)
      } else {
        ctx.font = "bold 30px -apple-system, BlinkMacSystemFont, sans-serif"
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
  const rows = 40
  const stepX = w / cols
  const stepY = h / rows

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.beginPath()
      ctx.arc(c * stepX + stepX / 2, r * stepY + stepY / 2, 1.8, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

// Helper: macOS Window Frame with Authentic Traffic Lights & Menu Bar inside active screen area
function drawMacOSTopBar(
  ctx: CanvasRenderingContext2D,
  screenX: number,
  screenY: number,
  screenW: number,
  appTitle: string,
  time: number = 0
) {
  // macOS Top Menu Bar
  ctx.fillStyle = "#1e222b"
  ctx.fillRect(screenX, screenY, screenW, 44)

  // Apple Logo icon
  ctx.fillStyle = "#d1d5db"
  ctx.font = "bold 18px -apple-system, sans-serif"
  ctx.fillText("", screenX + 24, screenY + 28)

  // Menu items
  ctx.fillStyle = "#9ca3af"
  ctx.font = "500 14px -apple-system, sans-serif"
  const menus = ["File", "Edit", "View", "Window", "Help"]
  let mx = screenX + 54
  menus.forEach((m) => {
    ctx.fillText(m, mx, screenY + 28)
    mx += ctx.measureText(m).width + 22
  })

  // Right menu bar items with live time animation
  const colon = Math.floor(time * 2) % 2 === 0 ? ":" : " "
  const sec = String(Math.floor(time * 1.5) % 60).padStart(2, "0")
  const timeStr = `9${colon}41:${sec} AM   100%   Wi-Fi`

  ctx.fillStyle = "#d1d5db"
  ctx.font = "500 13px -apple-system, sans-serif"
  ctx.textAlign = "right"
  ctx.fillText(timeStr, screenX + screenW - 28, screenY + 28)
  ctx.textAlign = "left"

  // App Window Header Bar
  ctx.fillStyle = "#161922"
  ctx.fillRect(screenX, screenY + 44, screenW, 52)

  // Red, Yellow, Green Traffic Lights
  const lights = ["#ff5f56", "#ffbd2e", "#27c93f"]
  lights.forEach((color, i) => {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(screenX + 28 + i * 22, screenY + 70, 7, 0, Math.PI * 2)
    ctx.fill()
  })

  // Window Title
  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 15px -apple-system, BlinkMacSystemFont, sans-serif"
  ctx.textAlign = "center"
  ctx.fillText(appTitle, screenX + screenW / 2, screenY + 76)
  ctx.textAlign = "left"

  // Thin window separator
  ctx.strokeStyle = "#252b38"
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(screenX, screenY + 96)
  ctx.lineTo(screenX + screenW, screenY + 96)
  ctx.stroke()
}

// 8. High-Resolution Liquid Retina Screen Canvas Renderer
function drawScreen(
  canvas: HTMLCanvasElement,
  state: ScreenState,
  activeRoleIndex: number,
  time: number = 0
) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  const w = canvas.width
  const h = canvas.height

  const cursor = Math.floor(time * 2) % 2 === 0 ? "█" : " "
  const pulse = 0.5 + 0.5 * Math.sin(time * 3)

  // 1. Glossy Black Glass Bezel covering the display front
  ctx.fillStyle = "#050608"
  ctx.fillRect(0, 0, w, h)

  // Active display screen coordinates (22px bezel on sides/top, 30px on bottom)
  const bezelTop = 22
  const bezelSide = 22
  const bezelBottom = 30
  const screenX = bezelSide
  const screenY = bezelTop
  const screenW = w - bezelSide * 2
  const screenH = h - bezelTop - bezelBottom
  const screenRadius = 20

  ctx.save()
  // Clip to rounded display area
  ctx.beginPath()
  ctx.roundRect(screenX, screenY, screenW, screenH, screenRadius)
  ctx.clip()

  if (state === "wallpaper") {
    // VIBRANT GLOWING ELECTRIC BLUE & VIOLET WALLPAPER (Identical to user's uploaded mockup)
    // Deep royal azure & midnight base
    const bgGrad = ctx.createLinearGradient(screenX, screenY, screenX + screenW, screenY + screenH)
    bgGrad.addColorStop(0, "#081d4a")
    bgGrad.addColorStop(0.3, "#0f2e6e")
    bgGrad.addColorStop(0.65, "#184594")
    bgGrad.addColorStop(1, "#07173b")
    ctx.fillStyle = bgGrad
    ctx.fillRect(screenX, screenY, screenW, screenH)

    // Ambient Lavender Glow in lower left
    const lavGrad = ctx.createRadialGradient(
      screenX + screenW * 0.25,
      screenY + screenH * 0.75,
      10,
      screenX + screenW * 0.25,
      screenY + screenH * 0.75,
      screenW * 0.55
    )
    lavGrad.addColorStop(0, "rgba(216, 180, 254, 0.45)")
    lavGrad.addColorStop(0.5, "rgba(168, 140, 255, 0.25)")
    lavGrad.addColorStop(1, "rgba(168, 140, 255, 0)")
    ctx.fillStyle = lavGrad
    ctx.fillRect(screenX, screenY, screenW, screenH)

    // Wave 1: Soft Luminous Lavender / Purple Ambient Swoop
    ctx.beginPath()
    ctx.moveTo(screenX - 60, screenY + screenH * 0.98)
    ctx.bezierCurveTo(
      screenX + screenW * 0.22,
      screenY + screenH * 0.76,
      screenX + screenW * 0.46,
      screenY + screenH * 0.44,
      screenX + screenW + 60,
      screenY + screenH * 0.48
    )
    ctx.lineTo(screenX + screenW + 60, screenY + screenH + 60)
    ctx.lineTo(screenX - 60, screenY + screenH + 60)
    ctx.closePath()
    const wave1Grad = ctx.createLinearGradient(screenX, screenY + screenH * 0.4, screenX + screenW, screenY + screenH)
    wave1Grad.addColorStop(0, "rgba(233, 213, 255, 0.95)")
    wave1Grad.addColorStop(0.35, "rgba(192, 160, 255, 0.92)")
    wave1Grad.addColorStop(0.7, "rgba(125, 148, 255, 0.90)")
    wave1Grad.addColorStop(1, "rgba(59, 130, 246, 0.88)")
    ctx.fillStyle = wave1Grad
    ctx.fill()

    // Wave 2: Brilliant Glowing Electric Cyan & Sky Blue Ribbon
    ctx.beginPath()
    ctx.moveTo(screenX + screenW * 0.08, screenY + screenH + 40)
    ctx.bezierCurveTo(
      screenX + screenW * 0.38,
      screenY + screenH * 0.62,
      screenX + screenW * 0.68,
      screenY + screenH * 0.26,
      screenX + screenW + 40,
      screenY + screenH * 0.16
    )
    ctx.lineTo(screenX + screenW + 40, screenY + screenH + 60)
    ctx.lineTo(screenX + screenW * 0.08, screenY + screenH + 40)
    ctx.closePath()
    const wave2Grad = ctx.createLinearGradient(screenX + screenW * 0.2, screenY + screenH, screenX + screenW, screenY)
    wave2Grad.addColorStop(0, "rgba(14, 165, 233, 0.98)")
    wave2Grad.addColorStop(0.45, "rgba(56, 189, 248, 0.98)")
    wave2Grad.addColorStop(0.85, "rgba(96, 165, 250, 0.96)")
    wave2Grad.addColorStop(1, "rgba(224, 242, 254, 0.98)")
    ctx.fillStyle = wave2Grad
    ctx.fill()

    // Wave 2 Specular Razor Ridge Gleam (Crisp white streak across wave ridge)
    ctx.save()
    ctx.shadowColor = "#38bdf8"
    ctx.shadowBlur = 18 + Math.sin(time * 2) * 4
    ctx.strokeStyle = "rgba(255, 255, 255, 0.95)"
    ctx.lineWidth = 4.2
    ctx.beginPath()
    ctx.moveTo(screenX + screenW * 0.08, screenY + screenH + 40)
    ctx.bezierCurveTo(
      screenX + screenW * 0.38,
      screenY + screenH * 0.62,
      screenX + screenW * 0.68,
      screenY + screenH * 0.26,
      screenX + screenW + 40,
      screenY + screenH * 0.16
    )
    ctx.stroke()
    ctx.restore()
  } else if (state === "experience") {
    // ACTUAL COMPUTER WORKING ENVIRONMENTS FOR ALL 4 RESUME EXPERIENCES
    if (activeRoleIndex === 0) {
      // 01 / 04: Cal Poly Bailey College of Science and Mathematics - Software Engineering Intern
      // SharePoint & OneDrive Media Asset Pipeline (58,579 records, batch ingestion, duplicate detection, Codex test runner)
      drawMacOSTopBar(ctx, screenX, screenY, screenW, "OneDrive & SharePoint Media Ingestion Pipeline · Bailey College", time)

      ctx.fillStyle = "#0d1117"
      ctx.fillRect(screenX, screenY + 96, screenW, screenH - 96)

      // Sidebar
      const sbW = 380
      ctx.fillStyle = "#131720"
      ctx.fillRect(screenX, screenY + 96, sbW, screenH - 96)

      ctx.fillStyle = "#8b949e"
      ctx.font = "600 13px -apple-system, sans-serif"
      ctx.fillText("ASSET REPOSITORIES", screenX + 30, screenY + 140)

      const sideItems = [
        { name: "Ingestion Queue", count: "58,579", active: true },
        { name: "SharePoint College Hub", count: "34,120", active: false },
        { name: "OneDrive Faculty Media", count: "24,459", active: false },
        { name: "Duplicate Detection", count: "0 flagged", active: false },
        { name: "Codex Test Suite", count: "32/32 pass", active: false },
        { name: "Drupal CMS Sync", count: "Active", active: false },
      ]

      sideItems.forEach((item, i) => {
        const itemY = screenY + 165 + i * 48
        if (item.active) {
          ctx.fillStyle = "rgba(59, 130, 246, 0.18)"
          ctx.beginPath()
          ctx.roundRect(screenX + 20, itemY, 340, 42, 8)
          ctx.fill()
          ctx.fillStyle = "#60a5fa"
          ctx.font = "bold 15px -apple-system, sans-serif"

          // Pulsing active dot
          ctx.fillStyle = `rgba(16, 185, 129, ${0.4 + 0.6 * pulse})`
          ctx.beginPath()
          ctx.arc(screenX + 32, itemY + 21, 5, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillStyle = "#c9d1d9"
          ctx.font = "500 15px -apple-system, sans-serif"
        }
        ctx.fillText(item.name, screenX + 46, itemY + 26)

        ctx.fillStyle = item.active ? "#3b82f6" : "#282e3d"
        ctx.beginPath()
        ctx.roundRect(screenX + 275, itemY + 10, 70, 22, 6)
        ctx.fill()
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 11px -apple-system, sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(item.count, screenX + 310, itemY + 25)
        ctx.textAlign = "left"
      })

      // Main Content Area
      const mainX = screenX + sbW + 30
      const mainW = screenW - sbW - 50

      // Stats KPI Bar
      ctx.fillStyle = "#161b26"
      ctx.beginPath()
      ctx.roundRect(mainX, screenY + 120, mainW, 110, 14)
      ctx.fill()

      ctx.fillStyle = "#60a5fa"
      ctx.font = "bold 34px -apple-system, sans-serif"
      ctx.fillText("58,579", mainX + 40, screenY + 172)
      ctx.fillStyle = "#8b949e"
      ctx.font = "500 14px -apple-system, sans-serif"
      ctx.fillText("Media Records Indexed", mainX + 40, screenY + 202)

      ctx.strokeStyle = "#252d3d"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(mainX + 300, screenY + 135)
      ctx.lineTo(mainX + 300, screenY + 215)
      ctx.stroke()

      ctx.fillStyle = "#34d399"
      ctx.font = "bold 34px -apple-system, sans-serif"
      ctx.fillText("100%", mainX + 340, screenY + 172)
      ctx.fillStyle = "#8b949e"
      ctx.fillText("Automated Flow Ingestion", mainX + 340, screenY + 202)

      ctx.beginPath()
      ctx.moveTo(mainX + 620, screenY + 135)
      ctx.lineTo(mainX + 620, screenY + 215)
      ctx.stroke()

      ctx.fillStyle = "#a78bfa"
      ctx.font = "bold 34px -apple-system, sans-serif"
      ctx.fillText("32 / 32", mainX + 660, screenY + 172)
      ctx.fillStyle = "#8b949e"
      ctx.fillText("Codex Test Specs Passing", mainX + 660, screenY + 202)

      // Animated Ingestion Progress Bar
      ctx.fillStyle = "#1e293b"
      ctx.beginPath()
      ctx.roundRect(mainX, screenY + 240, mainW, 8, 4)
      ctx.fill()
      ctx.fillStyle = "#38bdf8"
      ctx.beginPath()
      ctx.roundRect(mainX, screenY + 240, mainW, 8, 4)
      ctx.fill()
      // Shimmer sweep
      const shimX = mainX + ((time * 260) % (mainW + 120)) - 120
      const shimGrad = ctx.createLinearGradient(shimX, screenY + 240, shimX + 120, screenY + 240)
      shimGrad.addColorStop(0, "rgba(255, 255, 255, 0)")
      shimGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.75)")
      shimGrad.addColorStop(1, "rgba(255, 255, 255, 0)")
      ctx.fillStyle = shimGrad
      ctx.fillRect(Math.max(mainX, shimX), screenY + 240, 120, 8)

      // Media Asset Grid Cards
      const gridStartY = screenY + 266
      const cardW = 370
      const cardH = 205
      const assetCards = [
        { name: "Baker_Center_Lab_4K.raw", size: "48.2 MB", tag: "SharePoint Live" },
        { name: "Dean_Keynote_Spring26.mov", size: "1.4 GB", tag: "OneDrive Synced" },
        { name: "Biochem_Research_08.heic", size: "12.8 MB", tag: "Metadata Indexed" },
        { name: "Faculty_Symposium_42.tif", size: "28.5 MB", tag: "Power Automate" },
        { name: "Observatory_NightSky.raw", size: "52.0 MB", tag: "Archive Ready" },
        { name: "Commencement_Banner.png", size: "8.6 MB", tag: "Drupal Deployed" },
      ]

      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 3; c++) {
          const idx = r * 3 + c
          const card = assetCards[idx]
          const cx = mainX + c * (cardW + 24)
          const cy = gridStartY + r * (cardH + 18)

          ctx.fillStyle = "#151a24"
          ctx.beginPath()
          ctx.roundRect(cx, cy, cardW, cardH, 12)
          ctx.fill()

          const imgGrad = ctx.createLinearGradient(cx, cy, cx + cardW, cy + 110)
          if (idx % 3 === 0) {
            imgGrad.addColorStop(0, "#1d3557")
            imgGrad.addColorStop(1, "#457b9d")
          } else if (idx % 3 === 1) {
            imgGrad.addColorStop(0, "#2b2d42")
            imgGrad.addColorStop(1, "#8d99ae")
          } else {
            imgGrad.addColorStop(0, "#1a2a3a")
            imgGrad.addColorStop(1, "#2a4365")
          }
          ctx.fillStyle = imgGrad
          ctx.beginPath()
          ctx.roundRect(cx + 12, cy + 12, cardW - 24, 105, 8)
          ctx.fill()

          ctx.fillStyle = "#ffffff"
          ctx.font = "bold 15px -apple-system, sans-serif"
          ctx.fillText(card.name, cx + 16, cy + 148)

          ctx.fillStyle = "#8b949e"
          ctx.font = "13px -apple-system, sans-serif"
          ctx.fillText(card.size, cx + 16, cy + 175)

          ctx.fillStyle = "#2563eb"
          ctx.beginPath()
          ctx.roundRect(cx + cardW - 135, cy + 158, 120, 24, 6)
          ctx.fill()
          ctx.fillStyle = "#ffffff"
          ctx.font = "bold 11px -apple-system, sans-serif"
          ctx.textAlign = "center"
          ctx.fillText(card.tag, cx + cardW - 75, cy + 174)
          ctx.textAlign = "left"
        }
      }

      // Bottom Console / Codex Runner Pane
      const termY = screenY + screenH - 180
      ctx.fillStyle = "#0a0d14"
      ctx.fillRect(mainX, termY, mainW, 160)
      ctx.strokeStyle = "#252d3d"
      ctx.strokeRect(mainX, termY, mainW, 160)

      ctx.fillStyle = "#38bdf8"
      ctx.font = "bold 13px Monaco, monospace"
      ctx.fillText("calpoly-bailey:~/dam-pipeline $ codex run-tests --suite=migration-integrity", mainX + 24, termY + 36)
      ctx.fillStyle = "#34d399"
      ctx.fillText("✓ batch_ingestion.spec.ts (58,579 records validated, 0 drops) [PASS]", mainX + 24, termY + 68)
      ctx.fillText("✓ duplicate_fingerprint_sha256.spec.ts (100% deduplication confidence) [PASS]", mainX + 24, termY + 98)
      ctx.fillStyle = "#a78bfa"
      ctx.fillText(`✓ resumable_onedrive_transfer.spec.ts (32/32 assertions passed in 0.42s) ${cursor}`, mainX + 24, termY + 128)
    } else if (activeRoleIndex === 1) {
      // 02 / 04: Cal Poly CSSE - Undergraduate Researcher
      // Cooperative AI Multi-Agent RL Telemetry (Ray RLlib, PettingZoo, PPO Loss Curves, Weights & Biases)
      drawMacOSTopBar(ctx, screenX, screenY, screenW, "Ray RLlib Multi-Agent Reinforcement Learning Telemetry · Cal Poly CSSE", time)

      ctx.fillStyle = "#0b0f19"
      ctx.fillRect(screenX, screenY + 96, screenW, screenH - 96)

      // Top Metric Cards
      const cardW = 320
      const currentSteps = (2450000 + Math.floor(time * 180)).toLocaleString()
      const metrics = [
        { label: "COOPERATION INDEX", val: "0.942", sub: "PettingZoo MARL benchmark", color: "#34d399" },
        { label: "RAY WORKERS", val: "8 / 8 Active", sub: "Distributed cluster online", color: "#38bdf8" },
        { label: "POLICY ALGORITHM", val: "MAPPO", sub: "Centralized value function", color: "#a78bfa" },
        { label: "TRAINING STEPS", val: currentSteps, sub: "Live convergence stream", color: "#f59e0b" },
      ]

      metrics.forEach((m, i) => {
        const mx = screenX + 40 + i * (cardW + 28)
        ctx.fillStyle = "#131a2a"
        ctx.beginPath()
        ctx.roundRect(mx, screenY + 120, cardW, 110, 12)
        ctx.fill()

        ctx.fillStyle = "#8b949e"
        ctx.font = "bold 12px Monaco, monospace"
        ctx.fillText(m.label, mx + 20, screenY + 150)

        ctx.fillStyle = m.color
        ctx.font = "bold 32px -apple-system, sans-serif"
        ctx.fillText(m.val, mx + 20, screenY + 190)

        ctx.fillStyle = "#6b7280"
        ctx.font = "12px -apple-system, sans-serif"
        ctx.fillText(m.sub, mx + 20, screenY + 215)
      })

      // Dual Telemetry Charts
      const chartW = (screenW - 120) / 2
      const chartH = 420
      const chartY = screenY + 260

      // Chart 1: Multi-Agent Cooperation Index vs Iteration
      ctx.fillStyle = "#131a2a"
      ctx.beginPath()
      ctx.roundRect(screenX + 40, chartY, chartW, chartH, 14)
      ctx.fill()

      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 16px -apple-system, sans-serif"
      ctx.fillText("Multi-Agent Cooperation Index (Reward Sharing)", screenX + 68, chartY + 38)

      // Graph grid lines
      ctx.strokeStyle = "#1f293d"
      ctx.lineWidth = 1
      for (let g = 0; g < 5; g++) {
        const gy = chartY + 80 + g * 60
        ctx.beginPath()
        ctx.moveTo(screenX + 68, gy)
        ctx.lineTo(screenX + 40 + chartW - 30, gy)
        ctx.stroke()
        ctx.fillStyle = "#6b7280"
        ctx.font = "11px Monaco, monospace"
        ctx.fillText((1.0 - g * 0.2).toFixed(1), screenX + 45, gy + 4)
      }

      // Cooperation Curve (Climbing upwards)
      ctx.strokeStyle = "#34d399"
      ctx.lineWidth = 3.5
      ctx.beginPath()
      ctx.moveTo(screenX + 70, chartY + 300)
      ctx.bezierCurveTo(
        screenX + 220, chartY + 280,
        screenX + 400, chartY + 160,
        screenX + 40 + chartW - 40, chartY + 95
      )
      ctx.stroke()

      // Animated Glowing Tracer Dot on Cooperation Curve
      const t = (time * 0.3) % 1
      const p0 = { x: screenX + 70, y: chartY + 300 }
      const p1 = { x: screenX + 220, y: chartY + 280 }
      const p2 = { x: screenX + 400, y: chartY + 160 }
      const p3 = { x: screenX + 40 + chartW - 40, y: chartY + 95 }
      const u = 1 - t
      const tx = u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x
      const ty = u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y

      ctx.save()
      ctx.shadowColor = "#34d399"
      ctx.shadowBlur = 14
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(tx, ty, 6, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // Chart 2: PPO Policy & Value Loss Convergence
      ctx.fillStyle = "#131a2a"
      ctx.beginPath()
      ctx.roundRect(screenX + 60 + chartW, chartY, chartW, chartH, 14)
      ctx.fill()

      ctx.fillStyle = "#ffffff"
      ctx.fillText("PPO Value Loss Convergence (Ray RLlib)", screenX + 88 + chartW, chartY + 38)

      for (let g = 0; g < 5; g++) {
        const gy = chartY + 80 + g * 60
        ctx.beginPath()
        ctx.moveTo(screenX + 88 + chartW, gy)
        ctx.lineTo(screenX + 60 + chartW * 2 - 30, gy)
        ctx.stroke()
      }

      // Loss Curve (Descending steeply then stabilizing)
      ctx.strokeStyle = "#818cf8"
      ctx.lineWidth = 3.5
      ctx.beginPath()
      ctx.moveTo(screenX + 90 + chartW, chartY + 90)
      ctx.bezierCurveTo(
        screenX + 240 + chartW, chartY + 260,
        screenX + 420 + chartW, chartY + 285,
        screenX + 60 + chartW * 2 - 40, chartY + 295
      )
      ctx.stroke()

      // Pytest Console Output
      const termY = chartY + chartH + 25
      ctx.fillStyle = "#090d16"
      ctx.beginPath()
      ctx.roundRect(screenX + 40, termY, screenW - 80, 200, 10)
      ctx.fill()

      ctx.fillStyle = "#38bdf8"
      ctx.font = "bold 13px Monaco, monospace"
      ctx.fillText("calpoly-csse:~/marl-research $ pytest tests/test_coordination.py -v", screenX + 64, termY + 35)
      ctx.fillStyle = "#34d399"
      ctx.fillText("tests/test_coordination.py::test_pettingzoo_action_spaces PASSED [25%]", screenX + 64, termY + 68)
      ctx.fillText("tests/test_coordination.py::test_centralized_critic_value_loss PASSED [50%]", screenX + 64, termY + 98)
      ctx.fillText("tests/test_coordination.py::test_policy_entropy_stabilization PASSED [75%]", screenX + 64, termY + 128)
      ctx.fillText("tests/test_coordination.py::test_wandb_telemetry_streaming PASSED [100%]", screenX + 64, termY + 158)
      ctx.fillStyle = "#facc15"
      ctx.fillText(`======================== 18 passed in 1.14s ======================== ${cursor}`, screenX + 64, termY + 185)
    } else if (activeRoleIndex === 2) {
      // 03 / 04: Foundation for California Community Colleges - Technology Solutions Research Intern
      // Statewide Student Financial Aid Analytics Platform (116 Campuses, FAFSA Completion Rate Tracking, Low-Income Grants)
      drawMacOSTopBar(ctx, screenX, screenY, screenW, "Statewide Student Financial Aid Analytics · Foundation for CCC", time)

      ctx.fillStyle = "#0f172a"
      ctx.fillRect(screenX, screenY + 96, screenW, screenH - 96)

      // Header summary banner
      ctx.fillStyle = "#1e293b"
      ctx.beginPath()
      ctx.roundRect(screenX + 40, screenY + 120, screenW - 80, 100, 12)
      ctx.fill()

      ctx.fillStyle = "#38bdf8"
      ctx.font = "bold 30px -apple-system, sans-serif"
      ctx.fillText("68.4%", screenX + 70, screenY + 170)
      ctx.fillStyle = "#94a3b8"
      ctx.font = "14px -apple-system, sans-serif"
      ctx.fillText("Statewide FAFSA Completion (+14.2% YoY)", screenX + 70, screenY + 198)

      ctx.fillStyle = "#34d399"
      ctx.font = "bold 30px -apple-system, sans-serif"
      ctx.fillText("$148.2M", screenX + 440, screenY + 170)
      ctx.fillStyle = "#94a3b8"
      ctx.fillText("Low-Income Cal Grants Allocated", screenX + 440, screenY + 198)

      ctx.fillStyle = "#f59e0b"
      ctx.font = "bold 30px -apple-system, sans-serif"
      ctx.fillText("116 Campuses", screenX + 800, screenY + 170)
      ctx.fillStyle = "#94a3b8"
      ctx.fillText("California Community Colleges Synced", screenX + 800, screenY + 198)

      // Regional Bar Chart
      const chartX = screenX + 40
      const chartY = screenY + 250
      const chartW = screenW - 80
      const chartH = 340

      ctx.fillStyle = "#1e293b"
      ctx.beginPath()
      ctx.roundRect(chartX, chartY, chartW, chartH, 14)
      ctx.fill()

      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 16px -apple-system, sans-serif"
      ctx.fillText("FAFSA & Cal Grant Completion Rate by California Region (1.8M Enrolled Students)", chartX + 30, chartY + 38)

      const regions = [
        { name: "Bay Area (28 Campuses)", rate: 74, color: "#38bdf8" },
        { name: "Los Angeles Metro (21 Campuses)", rate: 71, color: "#60a5fa" },
        { name: "San Diego / Imperial (10 Campuses)", rate: 69, color: "#818cf8" },
        { name: "Central Valley (16 Campuses)", rate: 65, color: "#34d399" },
        { name: "Inland Empire (12 Campuses)", rate: 63, color: "#f59e0b" },
      ]

      regions.forEach((reg, r) => {
        const ry = chartY + 70 + r * 50
        ctx.fillStyle = "#cbd5e1"
        ctx.font = "500 14px -apple-system, sans-serif"
        ctx.fillText(reg.name, chartX + 30, ry + 20)

        // Bar background
        const barStartX = chartX + 340
        const barMaxW = chartW - 460
        ctx.fillStyle = "#334155"
        ctx.beginPath()
        ctx.roundRect(barStartX, ry + 6, barMaxW, 22, 6)
        ctx.fill()

        // Bar fill
        const barW = (reg.rate / 100) * barMaxW
        ctx.fillStyle = reg.color
        ctx.beginPath()
        ctx.roundRect(barStartX, ry + 6, barW, 22, 6)
        ctx.fill()

        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 14px Monaco, monospace"
        ctx.fillText(`${reg.rate}%`, barStartX + barW + 16, ry + 22)
      })

      // Bottom SQL Query Console
      const sqlY = chartY + chartH + 25
      ctx.fillStyle = "#090d16"
      ctx.beginPath()
      ctx.roundRect(chartX, sqlY, chartW, 240, 10)
      ctx.fill()

      ctx.fillStyle = "#38bdf8"
      ctx.font = "bold 13px Monaco, monospace"
      ctx.fillText("-- FoundationCCC Enterprise Data Pipeline: FAFSA Cross-Campus Aggregation", chartX + 24, sqlY + 36)
      ctx.fillStyle = "#e2e8f0"
      ctx.fillText("SELECT r.region_name, COUNT(DISTINCT s.campus_id) as campuses, AVG(s.fafsa_rate) as completion_pct", chartX + 24, sqlY + 68)
      ctx.fillText("FROM ccc_student_aid_records s JOIN ccc_districts r ON s.district_id = r.id", chartX + 24, sqlY + 98)
      ctx.fillText("WHERE s.academic_year = '2025-2026' GROUP BY r.region_name ORDER BY completion_pct DESC;", chartX + 24, sqlY + 128)
      ctx.fillStyle = "#34d399"
      ctx.fillText(`>> Query executed in 24ms · 116 campus records aggregated · FERPA / Data Privacy compliant ${cursor}`, chartX + 24, sqlY + 168)
    } else {
      // 04 / 04: Extern - AI Document Insights Extern
      // Document Intelligence & Contract Extraction RAG Platform (LangChain, ChromaDB, Cosine Similarity, PDF Grounding)
      drawMacOSTopBar(ctx, screenX, screenY, screenW, "Document Intelligence & Legal Extraction RAG Engine · Extern AI", time)

      ctx.fillStyle = "#0c1017"
      ctx.fillRect(screenX, screenY + 96, screenW, screenH - 96)

      // Query Bar
      ctx.fillStyle = "#161b24"
      ctx.beginPath()
      ctx.roundRect(screenX + 30, screenY + 115, screenW - 60, 60, 10)
      ctx.fill()

      ctx.fillStyle = "#38bdf8"
      ctx.font = "bold 15px Monaco, monospace"
      ctx.fillText(`QUERY: Extract early termination penalties, indemnification clauses, and cure windows ${cursor}`, screenX + 54, screenY + 152)

      // Split View: Synthesized Answer on Left, Highlighted PDF on Right
      const halfW = (screenW - 80) / 2
      const paneY = screenY + 195
      const paneH = screenH - 225

      // Left: Synthesized Answer
      ctx.fillStyle = "#131720"
      ctx.beginPath()
      ctx.roundRect(screenX + 30, paneY, halfW, paneH, 12)
      ctx.fill()

      ctx.fillStyle = "#34d399"
      ctx.font = "bold 14px -apple-system, sans-serif"
      ctx.fillText("✓ Synthesized Answer (Vector Similarity: 0.941 · Confidence: 98.9%)", screenX + 54, paneY + 36)

      ctx.fillStyle = "#8b949e"
      ctx.font = "12px -apple-system, sans-serif"
      ctx.fillText("Under Section 14.2 of the Master Commercial Lease Agreement:", screenX + 54, paneY + 68)

      const answerPoints = [
        "1. Liquidated Damages: Upon early termination prior to Month 36, tenant shall pay a fee equal to 6 months base rent plus the unamortized portion of tenant improvement allowances ($125,000).",
        "2. Indemnification Obligations: Tenant holds Landlord harmless from and against all liabilities, claims, damages, and defense costs arising from premises alterations or tenant operations.",
        "3. Cure Window: Landlord must issue 30 days written notice before executing default liquidation.",
      ]

      answerPoints.forEach((pt, p) => {
        ctx.fillStyle = "#e2e8f0"
        ctx.font = "13px -apple-system, sans-serif"
        ctx.fillText(pt, screenX + 54, paneY + 106 + p * 64, halfW - 48)
      })

      // Grounding Verification Box
      ctx.fillStyle = "#1e293b"
      ctx.beginPath()
      ctx.roundRect(screenX + 54, paneY + 320, halfW - 48, 120, 8)
      ctx.fill()

      ctx.fillStyle = "#38bdf8"
      ctx.font = "bold 12px Monaco, monospace"
      ctx.fillText("EXACT CITATION VERIFICATION", screenX + 74, paneY + 348)
      ctx.fillStyle = "#cbd5e1"
      ctx.font = "12px Monaco, monospace"
      ctx.fillText("Source: Master_Commercial_Lease_Agreement_Final.pdf - Page 35, Paragraph 4 (Lines 112-128)", screenX + 74, paneY + 376)
      ctx.fillText("Embedding Model: text-embedding-3-large · Chunk Size: 512 tokens · Overlap: 64 tokens", screenX + 74, paneY + 404)

      // Right: Authentic Highlighted PDF Document Viewer
      const rightX = screenX + 50 + halfW
      ctx.fillStyle = "#f8fafc"
      ctx.beginPath()
      ctx.roundRect(rightX, paneY, halfW, paneH, 12)
      ctx.fill()

      ctx.fillStyle = "#64748b"
      ctx.font = "bold 13px -apple-system, sans-serif"
      ctx.fillText("Master_Lease_Agreement.pdf (p. 35)", rightX + 24, paneY + 36)

      // Fake PDF lines with yellow amber highlighter over Section 14.2
      for (let l = 0; l < 18; l++) {
        const ly = paneY + 70 + l * 26
        if (l >= 4 && l <= 8) {
          // Highlighted clause
          ctx.fillStyle = "rgba(254, 240, 138, 0.75)"
          ctx.fillRect(rightX + 24, ly - 14, halfW - 48, 22)
          ctx.fillStyle = "#0f172a"
          ctx.font = "bold 12px Monaco, monospace"
        } else {
          ctx.fillStyle = "#94a3b8"
          ctx.font = "12px Monaco, monospace"
        }
        ctx.fillText(`SECTION 14.${l + 1}: Default, remedies, and reciprocal indemnifications between tenant and landlord...`, rightX + 28, ly)
      }
    }
  } else if (state === "gitex" || state === "guppty") {
    // REAL PROJECT INTERFACES (Gitex & Guppty)
    const isGitex = state === "gitex"
    drawMacOSTopBar(
      ctx,
      screenX,
      screenY,
      screenW,
      isGitex ? "Gitex · Codebase Intelligence & Q&A Assistant" : "Guppty · Rust Compiler & Bytecode VM",
      time
    )

    ctx.fillStyle = "#0d1117"
    ctx.fillRect(screenX, screenY + 96, screenW, screenH - 96)

    if (isGitex) {
      // Gitex Desktop Interface
      const sbW = 340
      ctx.fillStyle = "#131722"
      ctx.fillRect(screenX, screenY + 96, sbW, screenH - 96)

      ctx.fillStyle = "#8b949e"
      ctx.font = "bold 12px Monaco, monospace"
      ctx.fillText("WORKSPACE FILES", screenX + 28, screenY + 135)

      const files = ["src/main.ts", "src/ast/traversal.ts", "src/api/gemini.ts", "src/index.html", "tests/integration.spec.ts"]
      files.forEach((f, fi) => {
        ctx.fillStyle = fi === 1 ? "#38bdf8" : "#94a3b8"
        ctx.font = "14px Monaco, monospace"
        ctx.fillText(f, screenX + 32, screenY + 175 + fi * 40)
      })

      const gMainX = screenX + sbW + 30
      ctx.fillStyle = "#161b24"
      ctx.beginPath()
      ctx.roundRect(gMainX, screenY + 120, screenW - sbW - 60, 60, 10)
      ctx.fill()

      ctx.fillStyle = "#e2e8f0"
      ctx.font = "bold 15px -apple-system, sans-serif"
      ctx.fillText(`How does the AST traversal resolve circular dependencies? ${cursor}`, gMainX + 24, screenY + 156)

      // Gemini Response Box
      ctx.fillStyle = "#121620"
      ctx.beginPath()
      ctx.roundRect(gMainX, screenY + 200, screenW - sbW - 60, 480, 12)
      ctx.fill()

      ctx.fillStyle = "#38bdf8"
      ctx.font = "bold 14px -apple-system, sans-serif"
      ctx.fillText("✨ Gemini 2.0 Flash Analysis (Streaming)", gMainX + 30, screenY + 240)

      ctx.fillStyle = "#cbd5e1"
      ctx.font = "14px Monaco, monospace"
      ctx.fillText("// DependencyGraph.ts - Tarjan's Strongly Connected Components", gMainX + 30, screenY + 280)
      ctx.fillText("export function detectCycles(graph: Graph): CycleReport {", gMainX + 30, screenY + 310)
      ctx.fillText("  const visited = new Set<NodeId>();", gMainX + 30, screenY + 340)
      ctx.fillText("  const recursionStack = new Set<NodeId>();", gMainX + 30, screenY + 370)
      ctx.fillText("  return graph.nodes.map(node => dfs(node, visited, recursionStack));", gMainX + 30, screenY + 400)
      ctx.fillText("}", gMainX + 30, screenY + 430)

      ctx.fillStyle = "#34d399"
      ctx.fillText("✓ Sentry Telemetry: 0 runtime errors detected · CI/CD: Pipeline Passing", gMainX + 30, screenY + 490)
    } else {
      // Guppty Compiler Interface
      ctx.fillStyle = "#090d14"
      ctx.fillRect(screenX + 30, screenY + 120, screenW - 60, screenH - 150)
      ctx.strokeStyle = "#1e293b"
      ctx.strokeRect(screenX + 30, screenY + 120, screenW - 60, screenH - 150)

      ctx.fillStyle = "#f59e0b"
      ctx.font = "bold 15px Monaco, monospace"
      ctx.fillText("gupptyc v0.4.1 (Rust 1.82.0-nightly compiler & runtime)", screenX + 60, screenY + 160)

      ctx.fillStyle = "#38bdf8"
      ctx.fillText("guppty:~/projects/guppty $ cargo run --release -- --emit=bytecode src/runtime.gp", screenX + 60, screenY + 200)

      ctx.fillStyle = "#34d399"
      ctx.fillText("[1/3] Lexing source tokens: 1,842 tokens generated (0.8ms)", screenX + 60, screenY + 240)
      ctx.fillText("[2/3] AST Parser: Complete AST syntax tree generated (1.4ms)", screenX + 60, screenY + 270)
      ctx.fillText("[3/3] Bytecode VM: Executing 348 instructions in sandbox...", screenX + 60, screenY + 300)

      ctx.fillStyle = "#a78bfa"
      ctx.fillText(">> Output: Execution finished with exit code 0 in 4.2ms", screenX + 60, screenY + 350)
      ctx.fillStyle = "#e2e8f0"
      ctx.fillText(`guppty:~/projects/guppty $ ${cursor}`, screenX + 60, screenY + 390)
    }
  }

  // Draw Camera Notch at Top Center of Display
  const notchW = 160
  const notchH = 32
  const notchX = screenX + (screenW - notchW) / 2
  const notchY = screenY

  ctx.fillStyle = "#050608"
  ctx.beginPath()
  ctx.roundRect(notchX, notchY, notchW, notchH, [0, 0, 10, 10])
  ctx.fill()

  // Camera lens dot and ambient sensor inside notch
  ctx.fillStyle = "#0a192f"
  ctx.beginPath()
  ctx.arc(screenX + screenW / 2 - 16, screenY + 15, 4.5, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = "#00ff88"
  ctx.beginPath()
  ctx.arc(screenX + screenW / 2 + 16, screenY + 15, 2.5, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}
