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

  // Synchronize state and active role
  useEffect(() => {
    currentScreenStateRef.current = screenState
    activeRoleIndexRef.current = activeRoleIndex
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
    kbTexture.colorSpace = THREE.SRGBColorSpace
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

    // Liquid Retina XDR Display with authentic Apple Liquid Silk Wallpaper
    const textureLoader = new THREE.TextureLoader()
    const screenTexture = textureLoader.load("/apple_wallpaper.png", (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      tex.generateMipmaps = true
      tex.minFilter = THREE.LinearMipmapLinearFilter
      tex.needsUpdate = true
      renderer.render(scene, camera)
    })
    screenTexture.colorSpace = THREE.SRGBColorSpace
    screenTexture.generateMipmaps = true
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter
    screenTextureRef.current = screenTexture as any

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
      posY: -0.56,
      posZ: 0.0,
      scale: 0.82,
      rotX: -0.10,
      rotY: -0.40,
      rotZ: 0.04,
      lidAngle: -1.78, // ~102° open, screen standing upright and facing camera
      camY: 0.16,
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
    // Matches panel 2 of mockup: angled isometric view showing Magic Keyboard, trackpad, port, and screen with Apple wallpaper
    tl.to(
      animState,
      {
        posX: 1.65,
        posY: -0.32,
        posZ: 0.25,
        scale: 0.98,
        rotX: 0.26,
        rotY: 0.48,
        rotZ: -0.06,
        lidAngle: -1.78,
        camY: 0.35,
        camZ: 3.75,
        shadowOpacity: 0.85,
        duration: 1.0,
        ease: 'power2.inOut',
        onUpdate: updateTransforms,
      },
      0.6
    )

    // STAGE 2: Role 1 (Undergraduate Researcher @ Cal Poly CSSE)
    tl.to(
      animState,
      {
        posX: 1.62,
        posY: -0.30,
        posZ: 0.22,
        scale: 0.98,
        rotX: 0.28,
        rotY: 0.44,
        rotZ: -0.05,
        lidAngle: -1.80,
        duration: 0.7,
        ease: 'power1.inOut',
        onUpdate: updateTransforms,
      },
      1.6
    )

    // STAGE 3: Role 2 (Technology Solutions Research Intern @ Foundation for CCC)
    tl.to(
      animState,
      {
        posX: 1.65,
        posY: -0.32,
        posZ: 0.25,
        scale: 0.98,
        rotX: 0.25,
        rotY: 0.49,
        rotZ: -0.06,
        lidAngle: -1.78,
        duration: 0.7,
        ease: 'power1.inOut',
        onUpdate: updateTransforms,
      },
      2.3
    )

    // STAGE 4: Role 3 (AI Document Insights Extern @ Extern)
    tl.to(
      animState,
      {
        posX: 1.63,
        posY: -0.30,
        posZ: 0.24,
        scale: 0.98,
        rotX: 0.27,
        rotY: 0.43,
        rotZ: -0.05,
        lidAngle: -1.80,
        duration: 0.7,
        ease: 'power1.inOut',
        onUpdate: updateTransforms,
      },
      3.0
    )

    // STAGE 5: Experience into Projects & Contact (Gracefully glides out before Projects)
    tl.to(
      animState,
      {
        posX: 0.8,
        posY: -7.0,
        posZ: -0.5,
        scale: 0.0,
        rotX: 0.35,
        rotY: 0.55,
        rotZ: 0,
        lidAngle: 0.0,
        shadowOpacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onUpdate: updateTransforms,
      },
      3.6
    )

    // STAGE 6: Hold completely off-screen for Projects & Contact
    tl.to(
      animState,
      {
        posY: -7.0,
        scale: 0.0,
        shadowOpacity: 0,
        duration: 0.8,
        onUpdate: updateTransforms,
      },
      4.1
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
