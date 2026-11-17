import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"
import { gsap } from "gsap"
import { frameMacBook } from "@/lib/macbookFraming"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)
// Zero velocity and acceleration at each phase boundary avoids abrupt hinge/turn changes.
gsap.registerEase(
  "cinemaSmooth",
  (p: number) => p * p * p * (p * (p * 6 - 15) + 10),
)

const CLOSED_LID = 0

export type ScreenState = "wallpaper" | "experience" | "gitex" | "guppty" | "contact"

export default function MacBookCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [unavailable, setUnavailable] = useState(false)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 1. Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    )
    camera.position.set(0, 0.18, 4.1)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: window.innerWidth <= 760,
        alpha: true,
        powerPreference: "high-performance",
      })
    } catch {
      setUnavailable(true)
      return
    }
    // Supersample desktop views up to a 4K-wide drawing buffer, bounded by GPU memory.
    const renderLimit = Math.min(
      4096,
      renderer.capabilities.maxTextureSize,
      renderer
        .getContext()
        .getParameter(renderer.getContext().MAX_RENDERBUFFER_SIZE),
    )
    let viewWidth = container.clientWidth,
      viewHeight = container.clientHeight
    const resizeDrawingBuffer = () => {
      const w = container.clientWidth,
        h = container.clientHeight
      if (!w || !h) return
      viewWidth = w
      viewHeight = h
      const mobile = w <= 760
      const desired = mobile
        ? Math.min(window.devicePixelRatio || 1, 2.5)
        : Math.max(window.devicePixelRatio || 1, 3840 / w)
      const ratio = Math.min(
        desired,
        renderLimit / w,
        renderLimit / h,
        Math.sqrt((mobile ? 3000000 : 10000000) / (w * h)),
        3,
      )
      renderer.setPixelRatio(ratio)
      renderer.setSize(w, h)
    }
    resizeDrawingBuffer()
    renderer.autoClear = false
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.82
    container.appendChild(renderer.domElement)

    // Photorealistic Studio Environment Map (PMREM) for authentic Apple unibody reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()
    // Dark studio flags give metal contrasting reflections instead of a flat white wash.
    const studio = new THREE.Scene()
    studio.background = new THREE.Color(0x505664)
    const softbox = (
      w: number,
      h: number,
      color: number,
      intensity: number,
      position: THREE.Vector3,
    ) => {
      const panel = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(color).multiplyScalar(intensity),
          side: THREE.DoubleSide,
        }),
      )
      panel.position.copy(position)
      panel.lookAt(0, 0, 0)
      studio.add(panel)
    }
    softbox(7, 3, 0xf1f4ff, 3, new THREE.Vector3(-4, 5, 1))
    softbox(2, 8, 0xffffff, 4, new THREE.Vector3(5, 2, -3))
    softbox(9, 1, 0xc3cfff, 2, new THREE.Vector3(0, 1, 6))
    softbox(8, 6, 0x11151f, 0.5, new THREE.Vector3(0, -2, -5))
    scene.environment = pmremGenerator.fromScene(studio, 0.06).texture
    studio.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose()
        ;(object.material as THREE.Material).dispose()
      }
    })

    // 2. Studio Lighting Setup for Apple Aluminum & Glass Reflections
    const ambientLight = new THREE.AmbientLight(0xe4e8ff, 0.65)
    scene.add(ambientLight)

    // Key front light
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8)
    keyLight.position.set(2.5, 4.5, 4.0)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.set(
      window.innerWidth <= 760 ? 1024 : 2048,
      window.innerWidth <= 760 ? 1024 : 2048,
    )
    Object.assign(keyLight.shadow.camera, {
      left: -5,
      right: 5,
      top: 5,
      bottom: -5,
      near: 0.1,
      far: 20,
    })
    keyLight.shadow.normalBias = 0.012
    keyLight.shadow.bias = -0.00015
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
    const bounceLight = new THREE.DirectionalLight(0xe8eeff, 0.45)
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

    // Rounded Pro-style enclosure, matching the supplied front and side references.
    const width = 3.25
    const depth = 2.15
    const baseThickness = 0.065
    const cornerRadius = 0.12

    // Authentic Apple Anodized Aluminum PBR Material (Silver / Space Gray Unibody)
    // Fine, deterministic surface grain breaks up specular highlights at close range.
    const grainData = new Uint8Array(256 * 256 * 4)
    let grainSeed = 1729
    for (let i = 0; i < 256 * 256; i++) {
      grainSeed = (Math.imul(grainSeed, 1664525) + 1013904223) >>> 0
      const value = 110 + (grainSeed >>> 26)
      grainData.set([value, value, value, 255], i * 4)
    }
    const grain = new THREE.DataTexture(grainData, 256, 256)
    grain.wrapS = grain.wrapT = THREE.RepeatWrapping
    grain.repeat.set(7, 7)
    grain.magFilter = THREE.LinearFilter
    grain.needsUpdate = true
    const aluminumMat = new THREE.MeshStandardMaterial({
      color: 0xaaaeb5,
      metalness: 1,
      roughness: 0.36,
      bumpMap: grain,
      bumpScale: 0.0008,
      envMapIntensity: 0.85,
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
    // The keycaps sit in an actual opening, rather than on top of an uncut slab.
    const wellPoints = createRoundedRect(2.62, 1.07, 0.04)
      .getPoints(24)
      .map((point) => new THREE.Vector2(point.x, point.y + 0.3))
    baseShape.holes.push(new THREE.Path(wellPoints))
    const baseGeom = new THREE.ExtrudeGeometry(baseShape, {
      depth: baseThickness,
      bevelEnabled: true,
      bevelThickness: 0.014,
      bevelSize: 0.014,
      bevelSegments: 8,
    })
    baseGeom.center()
    baseGeom.rotateX(Math.PI / 2)
    const baseMesh = new THREE.Mesh(baseGeom, aluminumMat)
    baseGroup.add(baseMesh)
    const undersideGeometry = new THREE.ExtrudeGeometry(
      createRoundedRect(width - 0.012, depth - 0.012, cornerRadius),
      {
        depth: 0.003,
        bevelEnabled: true,
        bevelSize: 0.003,
        bevelThickness: 0.002,
        bevelSegments: 3,
      },
    )
    undersideGeometry.center()
    undersideGeometry.rotateX(Math.PI / 2)
    const underside = new THREE.Mesh(
      undersideGeometry,
      new THREE.MeshStandardMaterial({
        color: 0x9096a2,
        metalness: 1,
        roughness: 0.36,
      }),
    )
    underside.position.y = -baseThickness / 2 - 0.012
    baseGroup.add(underside)
    const screwGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.002, 16)
    const screwMat = new THREE.MeshStandardMaterial({
      color: 0x555b66,
      metalness: 1,
      roughness: 0.3,
    })
    for (const x of [-1.38, 0, 1.38])
      for (const z of [-0.88, 0.88]) {
        const screw = new THREE.Mesh(screwGeo, screwMat)
        screw.position.set(x, -0.049, z)
        baseGroup.add(screw)
      }

    // Front center thumb scoop
    const scoopGeom = new THREE.BoxGeometry(0.36, 0.012, 0.016)
    const scoopMesh = new THREE.Mesh(scoopGeom, darkTrimMat)
    scoopMesh.position.set(0, 0.032, depth / 2 - 0.004)
    baseGroup.add(scoopMesh)

    // Keyboard Well (Recessed tray)
    const kbWidth = 2.62
    const kbDepth = 1.07
    const kbShape = createRoundedRect(kbWidth, kbDepth, 0.04)
    const kbGeom = new THREE.ExtrudeGeometry(kbShape, {
      depth: 0.006,
      bevelEnabled: false,
    })
    kbGeom.center()
    kbGeom.rotateX(Math.PI / 2)
    const kbTray = new THREE.Mesh(
      kbGeom,
      new THREE.MeshBasicMaterial({ color: 0x0a0b0e }),
    )
    kbTray.position.set(0, 0.037, -0.3)
    baseGroup.add(kbTray)

    // Individual recessed keycaps retain their thickness at grazing camera angles.
    const keyRows = [
      ["esc", "☀", "☀", "▤", "⌕", "◉", "☾", "◀", "▶", "▶▶", "◖", "◖", "◖", "◉"],
      [
        "~",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "-",
        "=",
        "delete",
      ],
      ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
      [
        "caps lock",
        "A",
        "S",
        "D",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        ";",
        "'",
        "return",
      ],
      ["shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "shift"],
      [
        "fn",
        "control",
        "option",
        "command",
        " ",
        "command",
        "option",
        "◀",
        "▼",
        "▶",
      ],
    ]
    const keyMat = new THREE.MeshPhysicalMaterial({
      color: 0x101114,
      roughness: 0.72,
      metalness: 0,
      specularIntensity: 0.15,
      envMapIntensity: 0.18,
    })
    const keyGeometries = new Map<string, THREE.BufferGeometry>()
    const labelCanvas = document.createElement("canvas")
    const textureScale =
      window.innerWidth > 760 && renderer.capabilities.maxTextureSize >= 4096
        ? 2
        : 1
    labelCanvas.width = 2048 * textureScale
    labelCanvas.height = 900 * textureScale
    const labels = labelCanvas.getContext("2d")!
    labels.scale(textureScale, textureScale)
    labels.fillStyle = "#c2c4ca"
    labels.textAlign = "center"
    labels.textBaseline = "middle"
    keyRows.forEach((row, ri) => {
      const weights = row.map((_, ki) =>
        ri === 5
          ? [1, 1, 1, 1.2, 5, 1.2, 1, 1, 1, 1][ki]
          : ri === 4 && (ki === 0 || ki === row.length - 1)
            ? 2.1
            : (ri === 2 && ki === 0) ||
                (ri === 3 && (ki === 0 || ki === row.length - 1)) ||
                (ri === 1 && ki === row.length - 1)
              ? 1.5
              : 1,
      )
      const unit =
        (kbWidth - 0.08 - (row.length - 1) * 0.023) /
        weights.reduce((a, b) => a + b, 0)
      let x = -kbWidth / 2 + 0.04
      const h = ri === 0 ? 0.122 : 0.143
      const z = -0.3 - kbDepth / 2 + 0.083 + ri * 0.172
      row.forEach((label, ki) => {
        const w = weights[ki] * unit
        const signature = `${w.toFixed(4)}-${h}`
        if (!keyGeometries.has(signature))
          keyGeometries.set(
            signature,
            new RoundedBoxGeometry(w, 0.014, h, 5, 0.005),
          )
        if (ri === 5 && ki === 8) {
          x += w + 0.023
          return
        }
        const key = new THREE.Mesh(keyGeometries.get(signature)!, keyMat)
        key.position.set(x + w / 2, 0.043, z)
        baseGroup.add(key)
        labels.font = `${
          label.length > 2 ? 17 : 25
        }px "Geist Variable", sans-serif`
        labels.fillText(
          label,
          ((x + w / 2 + kbWidth / 2) / kbWidth) * 2048,
          ((z + 0.3 + kbDepth / 2) / kbDepth) * 900,
        )
        x += w + 0.023
      })
    })
    // Separate half-height arrows form the characteristic inverted-T cluster.
    const arrowGeometry = new RoundedBoxGeometry(0.146, 0.014, 0.064, 3, 0.004)
    const arrowX = kbWidth / 2 - 0.04 - 0.146 - 0.023 - 0.073
    for (const [z, label] of [
      [0.067, "▲"],
      [0.145, "▼"],
    ] as const) {
      const arrow = new THREE.Mesh(arrowGeometry, keyMat)
      arrow.position.set(arrowX, 0.043, z)
      baseGroup.add(arrow)
      labels.font = '18px "Geist Variable",sans-serif'
      labels.fillText(
        label,
        ((arrowX + kbWidth / 2) / kbWidth) * 2048,
        ((z + 0.3 + kbDepth / 2) / kbDepth) * 900,
      )
    }
    const labelTexture = new THREE.CanvasTexture(labelCanvas)
    labelTexture.colorSpace = THREE.SRGBColorSpace
    labelTexture.anisotropy = renderer.capabilities.getMaxAnisotropy()
    labelTexture.minFilter = THREE.LinearMipmapLinearFilter
    labelTexture.magFilter = THREE.LinearFilter
    const labelPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(kbWidth, kbDepth).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({
        map: labelTexture,
        transparent: true,
        depthWrite: false,
      }),
    )
    labelPlane.position.set(0, 0.0505, -0.3)
    baseGroup.add(labelPlane)

    const touchID = new THREE.Mesh(
      new THREE.CylinderGeometry(0.038, 0.038, 0.003, 40),
      new THREE.MeshPhysicalMaterial({
        color: 0x08090b,
        roughness: 0.18,
        metalness: 0.35,
        clearcoat: 1,
      }),
    )
    touchID.position.set(1.18, 0.049, -0.752)
    baseGroup.add(touchID)

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
    speakerL.position.set(-1.44, 0.048, -0.3)
    baseGroup.add(speakerL)

    const speakerR = new THREE.Mesh(speakerGeom, speakerMat)
    speakerR.position.set(1.44, 0.048, -0.3)
    baseGroup.add(speakerR)

    // Force Touch Glass Trackpad with Hairline Gap
    const tpWidth = 1.3
    const tpDepth = 0.76
    const tpShape = createRoundedRect(tpWidth, tpDepth, 0.035)
    const tpGeom = new THREE.ExtrudeGeometry(tpShape, {
      depth: 0.002,
      bevelEnabled: false,
    })
    tpGeom.center()
    tpGeom.rotateX(Math.PI / 2)
    const tpMat = new THREE.MeshStandardMaterial({
      color: 0xb1b6c1,
      metalness: 0.9,
      roughness: 0.4,
      envMapIntensity: 0.85,
    })
    const trackpad = new THREE.Mesh(tpGeom, tpMat)
    trackpad.position.set(0, 0.049, 0.62)
    baseGroup.add(trackpad)

    // Trackpad fine hairline border
    const tpBorderShape = createRoundedRect(
      tpWidth + 0.005,
      tpDepth + 0.005,
      0.037,
    )
    const tpBorderGeom = new THREE.ShapeGeometry(tpBorderShape)
    tpBorderGeom.rotateX(-Math.PI / 2)
    const tpBorderMat = new THREE.MeshBasicMaterial({ color: 0x727a87 })
    const tpBorderMesh = new THREE.Mesh(tpBorderGeom, tpBorderMat)
    tpBorderMesh.position.set(0, 0.0475, 0.62)
    baseGroup.add(tpBorderMesh)

    // Flush sockets follow the side-view reference: MagSafe, USB-C, audio, SD and HDMI.
    const socketMat = new THREE.MeshBasicMaterial({ color: 0x08090c })
    const socketRim = new THREE.MeshStandardMaterial({
      color: 0x777c85,
      metalness: 1,
      roughness: 0.23,
    })
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0x747980,
      metalness: 0.8,
      roughness: 0.3,
    })
    function socket(
      side: number,
      z: number,
      w: number,
      h: number,
      kind: "usb" | "magsafe" | "sd" | "hdmi",
    ) {
      const group = new THREE.Group()
      const faceX = side * (width / 2 + 0.0145)
      const surround = new THREE.Mesh(
        new THREE.ShapeGeometry(
          createRoundedRect(w + 0.014, h + 0.012, Math.min(h * 0.45, 0.013)),
          24,
        ),
        socketRim,
      )
      surround.rotation.y = (side * Math.PI) / 2
      surround.position.set(faceX, 0, z)
      group.add(surround)
      let holeShape = createRoundedRect(w, h, Math.min(h * 0.44, 0.01))
      if (kind === "hdmi") {
        holeShape = new THREE.Shape()
        holeShape.moveTo(-w / 2, h / 2)
        holeShape.lineTo(w / 2, h / 2)
        holeShape.lineTo(w / 2 - 0.015, -h / 2)
        holeShape.lineTo(-w / 2 + 0.015, -h / 2)
        holeShape.closePath()
      }
      const cavity = new THREE.Mesh(
        new THREE.ShapeGeometry(holeShape, 24),
        socketMat,
      )
      cavity.rotation.y = (side * Math.PI) / 2
      cavity.position.set(faceX + side * 0.0008, 0, z)
      group.add(cavity)
      if (kind === "usb" || kind === "hdmi") {
        const tongue = new THREE.Mesh(
          new THREE.BoxGeometry(0.0018, 0.004, w * 0.68),
          pinMat,
        )
        tongue.position.set(faceX + side * 0.0017, -0.001, z)
        group.add(tongue)
      }
      if (kind === "magsafe") {
        for (let i = 0; i < 5; i++) {
          const pin = new THREE.Mesh(
            new THREE.SphereGeometry(0.003, 8, 6),
            new THREE.MeshStandardMaterial({
              color: 0xcbb987,
              metalness: 1,
              roughness: 0.3,
            }),
          )
          pin.position.set(faceX + side * 0.0017, 0, z + (i - 2) * 0.021)
          group.add(pin)
        }
      }
      baseGroup.add(group)
    }
    socket(-1, -0.82, 0.18, 0.026, "magsafe")
    socket(-1, -0.55, 0.085, 0.027, "usb")
    socket(-1, -0.35, 0.085, 0.027, "usb")
    const audio = new THREE.Mesh(new THREE.CircleGeometry(0.018, 32), socketMat)
    audio.rotation.y = -Math.PI / 2
    audio.position.set(-width / 2 - 0.0158, 0, -0.14)
    baseGroup.add(audio)
    socket(1, -0.8, 0.145, 0.035, "hdmi")
    socket(1, -0.53, 0.085, 0.027, "usb")
    socket(1, -0.2, 0.255, 0.015, "sd")

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
    const hingeGeom = new THREE.CylinderGeometry(0.02, 0.02, width * 0.74, 24)
    hingeGeom.rotateZ(Math.PI / 2)
    const hingeMat = new THREE.MeshStandardMaterial({
      color: 0x0a0c0e,
      metalness: 0.85,
      roughness: 0.35,
    })
    const hinge = new THREE.Mesh(hingeGeom, hingeMat)
    hinge.position.set(0, baseThickness / 2 - 0.004, -depth / 2)
    baseGroup.add(hinge)
    for (const x of [-width * 0.36, width * 0.36]) {
      const knuckle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.027, 0.027, 0.18, 32).rotateZ(Math.PI / 2),
        aluminumMat,
      )
      knuckle.position.set(x, baseThickness / 2, -depth / 2 + 0.014)
      baseGroup.add(knuckle)
    }

    laptopGroup.add(baseGroup)

    // --- LID ASSEMBLY (Articulating Hinge) ---
    const lidGroup = new THREE.Group()
    lidGroup.position.set(0, 0.077, -depth / 2)

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
    // The rubber perimeter joins glass to the shell and leaves only a hairline closed seam.
    const gasketShape = createRoundedRect(width - 0.035, depth - 0.035, 0.09)
    gasketShape.holes.push(
      new THREE.Path(
        createRoundedRect(width - 0.12, depth - 0.12, 0.045).getPoints(32),
      ),
    )
    const gasketGeometry = new THREE.ExtrudeGeometry(gasketShape, {
      depth: 0.018,
      bevelEnabled: false,
      curveSegments: 32,
    })
    gasketGeometry.center()
    gasketGeometry.rotateX(Math.PI / 2)
    const gasket = new THREE.Mesh(
      gasketGeometry,
      new THREE.MeshStandardMaterial({ color: 0x101114, roughness: 0.85 }),
    )
    gasket.position.set(0, -0.0165, depth / 2)
    lidContent.add(gasket)
    const mark = new THREE.Shape()
    mark.moveTo(0, -0.25)
    mark.bezierCurveTo(-0.11, -0.31, -0.16, -0.27, -0.23, -0.18)
    mark.bezierCurveTo(-0.36, -0.01, -0.35, 0.16, -0.23, 0.23)
    mark.bezierCurveTo(-0.13, 0.29, -0.06, 0.23, 0, 0.23)
    mark.bezierCurveTo(0.08, 0.23, 0.16, 0.3, 0.25, 0.22)
    mark.bezierCurveTo(0.16, 0.17, 0.15, 0.04, 0.29, -0.02)
    mark.bezierCurveTo(0.24, -0.16, 0.13, -0.32, 0.06, -0.27)
    mark.bezierCurveTo(0.03, -0.25, 0.01, -0.25, 0, -0.25)
    const logoMaterial = new THREE.MeshStandardMaterial({
      color: 0x171b23,
      metalness: 1,
      roughness: 0.12,
      envMapIntensity: 1.2,
    })
    const logo = new THREE.Mesh(new THREE.ShapeGeometry(mark, 48), logoMaterial)
    logo.rotation.set(-Math.PI / 2, 0, Math.PI)
    logo.scale.setScalar(0.7)
    logo.position.set(0, lidThickness + 0.013, depth / 2)
    lidContent.add(logo)
    const leaf = new THREE.Shape()
    leaf.moveTo(-0.01, 0.28)
    leaf.bezierCurveTo(-0.02, 0.37, 0.05, 0.43, 0.13, 0.43)
    leaf.bezierCurveTo(0.14, 0.35, 0.07, 0.28, -0.01, 0.28)
    const leafMesh = new THREE.Mesh(
      new THREE.ShapeGeometry(leaf, 32),
      logoMaterial,
    )
    leafMesh.rotation.set(-Math.PI / 2, 0, Math.PI)
    leafMesh.scale.setScalar(0.7)
    leafMesh.position.copy(logo.position)
    lidContent.add(leafMesh)

    // Matte Black Display Chin
    const chinGeom = new THREE.PlaneGeometry(width - 0.03, 0.06)
    chinGeom.rotateX(Math.PI / 2)
    const chinMat = new THREE.MeshBasicMaterial({ color: 0x050608 })
    const chinMesh = new THREE.Mesh(chinGeom, chinMat)
    chinMesh.position.set(0, -0.025, 0.03)
    lidContent.add(chinMesh)

    // Liquid Retina XDR Display with authentic Apple Liquid Silk Wallpaper
    const textureLoader = new THREE.TextureLoader()
    const screenTexture = textureLoader.load("/macbook-desktop.png", (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      tex.generateMipmaps = true
      tex.minFilter = THREE.LinearMipmapLinearFilter
      tex.needsUpdate = true
      renderer.render(scene, camera)
    })
    screenTexture.colorSpace = THREE.SRGBColorSpace
    screenTexture.generateMipmaps = true
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter

    // Display plane matches lid interior face (DoubleSide ensures it is NEVER culled by camera angles)
    const screenPlaneGeom = new THREE.ShapeGeometry(
      createRoundedRect(width - 0.12, depth - 0.12, 0.045),
      32,
    )
    const positions = screenPlaneGeom.getAttribute("position")
    const screenUV = new Float32Array(positions.count * 2)
    for (let i = 0; i < positions.count; i++) {
      screenUV[i * 2] = positions.getX(i) / (width - 0.12) + 0.5
      screenUV[i * 2 + 1] = positions.getY(i) / (depth - 0.12) + 0.5
    }
    screenPlaneGeom.setAttribute("uv", new THREE.BufferAttribute(screenUV, 2))
    screenPlaneGeom.rotateX(Math.PI / 2)
    const screenPlaneMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
    })
    const screenMesh = new THREE.Mesh(screenPlaneGeom, screenPlaneMat)
    screenMesh.position.set(0, -0.026, depth / 2)
    lidContent.add(screenMesh)
    const bezel = new THREE.Mesh(
      new THREE.ShapeGeometry(
        createRoundedRect(width - 0.04, depth - 0.04, 0.09),
        32,
      ).rotateX(Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0x090a0e, side: THREE.DoubleSide }),
    )
    bezel.position.set(0, -0.024, depth / 2)
    lidContent.add(bezel)
    // Integrated FaceTime HD camera and ambient sensor neatly in the top display bezel (no obstructive notch block)
    const webcam = new THREE.Mesh(
      new THREE.CircleGeometry(0.0075, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0x111624,
        metalness: 0.8,
        roughness: 0.15,
        clearcoat: 1,
      }),
    )
    webcam.rotation.x = Math.PI / 2
    webcam.position.set(0, -0.0265, depth - 0.038)
    lidContent.add(webcam)

    const cameraSensor = new THREE.Mesh(
      new THREE.CircleGeometry(0.0025, 16),
      new THREE.MeshBasicMaterial({
        color: 0x162c1e,
      }),
    )
    cameraSensor.rotation.x = Math.PI / 2
    cameraSensor.position.set(0.024, -0.0265, depth - 0.038)
    lidContent.add(cameraSensor)
    // A low-opacity Fresnel layer supplies glass reflections without obscuring the display.
    const glass = new THREE.Mesh(
      screenPlaneGeom.clone(),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        vertexShader: `varying vec3 n; varying vec3 v; varying vec2 tex;
      void main(){vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);v=normalize(-p.xyz);tex=uv;gl_Position=projectionMatrix*p;}`,
        fragmentShader: `varying vec3 n;varying vec3 v;varying vec2 tex;
      void main(){float f=pow(1.-abs(dot(normalize(n),normalize(v))),3.);float strip=smoothstep(.1,.5,tex.x+tex.y*.25)*(1.-smoothstep(.65,1.2,tex.x+tex.y*.25));gl_FragColor=vec4(.82,.88,1.,f*.20+strip*.024);}`,
      }),
    )
    glass.position.copy(screenMesh.position)
    glass.position.y -= 0.0007
    lidContent.add(glass)

    // Ethereal Screen Glow Light (Casts soft purple/blue light onto keyboard deck matching mockup)
    const screenGlowLight = new THREE.PointLight(0x7090ff, 1.6, 2.5)
    screenGlowLight.position.set(0, -0.15, depth * 0.45)
    lidContent.add(screenGlowLight)

    lidGroup.add(lidContent)
    laptopGroup.add(lidGroup)

    laptopGroup.traverse((object) => {
      if (
        object instanceof THREE.Mesh &&
        object.material instanceof THREE.MeshStandardMaterial &&
        !object.material.transparent
      ) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
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

    // One device and one renderer remain mounted for the entire scroll story.
    const gitexTexture = textureLoader.load("/screens/gitex.jpg")
    const gupptyTexture = textureLoader.load("/screens/guppty.jpg")
    const projectTextures = { gitex: gitexTexture, guppty: gupptyTexture }
    Object.values(projectTextures).forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
    })
    screenTexture.anisotropy = renderer.capabilities.getMaxAnisotropy()
    // Compose the supplied company marks into local, high-resolution display textures.
    let disposed = false
    const companyTextures: THREE.CanvasTexture[] = []
    const marks = [
      {
        src: "/images/logos/calpoly-official.svg",
        bg: "#f7f8fa",
        caption: "Bailey College of Science and Mathematics",
        width: 1080,
      },
      {
        src: "/images/logos/calpoly-official.svg",
        bg: "#f7f8fa",
        caption: "Computer Science and Software Engineering",
        width: 1080,
      },
      {
        src: "/images/logos/foundationccc-official.svg",
        bg: "#ffffff",
        caption: "",
        width: 1430,
      },
      {
        src: "/images/logos/extern-official.png",
        bg: "#f5f4f7",
        caption: "Extern",
        width: 450,
      },
    ]
    marks.forEach((mark) => {
      const canvas = document.createElement("canvas")
      canvas.width = 2048 * textureScale
      canvas.height = 1280 * textureScale
      const ctx = canvas.getContext("2d")!
      ctx.scale(textureScale, textureScale)
      const texture = new THREE.CanvasTexture(canvas)
      texture.colorSpace = THREE.SRGBColorSpace
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
      companyTextures.push(texture)
      const paint = (logo?: HTMLImageElement) => {
        if (disposed) return
        ctx.fillStyle = mark.bg
        ctx.fillRect(0, 0, 2048, 1280)
        if (logo) {
          const ratio = Math.min(
            mark.width / logo.naturalWidth,
            600 / logo.naturalHeight,
          )
          const w = logo.naturalWidth * ratio,
            h = logo.naturalHeight * ratio
          ctx.filter = "none"
          ctx.drawImage(
            logo,
            (mark.bg === "#123b31" ? 850 : 1024) - w / 2,
            (1280 - h) / 2 - (mark.caption ? 45 : 0),
            w,
            h,
          )
          ctx.filter = "none"
        }
        if (mark.caption) {
          ctx.font = '400 35px "Geist Variable", sans-serif'
          ctx.textAlign = "center"
          ctx.fillStyle = "#000000"
          ctx.fillText(mark.caption, mark.bg === "#123b31" ? 850 : 1024, 900)
        }
        texture.needsUpdate = true
      }
      paint()
      const logo = new Image()
      logo.onload = () => {
        paint(logo)
        document.fonts.ready.then(() => paint(logo))
      }
      logo.src = mark.src
    })
    let currentScreen = "wallpaper"
    const setScreen = (name: string) => {
      if (name === currentScreen) return
      currentScreen = name
      screenPlaneMat.map = name.startsWith("company-")
        ? companyTextures[Number(name.split("-")[1])]
        : name === "gitex"
          ? gitexTexture
          : name === "guppty"
            ? gupptyTexture
            : screenTexture
      screenPlaneMat.needsUpdate = true
      container.dataset.screen = name
    }
    container.dataset.screen = "wallpaper"
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const state = {
      x: 0,
      y: -0.62,
      scale: 1,
      rx: -0.1,
      ry: 0.48,
      rz: 0.17,
      lid: -1.65,
      cy: 0.45,
      cz: 6.9,
      lookY: 0.12,
      dark: 0,
      light: 1,
      stage: 0,
      screenIndex: 0,
    }
    const lightWorld = document.querySelector<HTMLElement>(".light-world")
    const darkWorld = document.querySelector<HTMLElement>(".dark-world")
    const panels = Array.from(
      document.querySelectorAll<HTMLElement>("[data-shot]"),
    )
    const copies = panels.map((panel) =>
      panel.querySelector<HTMLElement>(
        ".opening-copy, .story-copy, .interlude-copy, .contact-copy",
      ),
    )
    const root = container.closest<HTMLElement>(".portfolio")
    root?.classList.add("has-3d")
    // Cache text geometry after fonts and viewport changes; never read layout per frame.
    let textClearance: number[] = []
    const measureText = () => {
      if (disposed) return
      textClearance = copies.map((copy) => {
        if (!copy) return 0
        const top = parseFloat(getComputedStyle(copy).top) || 0
        return top + copy.offsetHeight + (viewWidth <= 760 ? 42 : 50)
      })
    }
    measureText()
    document.fonts.ready.then(measureText)
    const textObserver = new ResizeObserver(measureText)
    copies.forEach((copy) => {
      if (copy) textObserver.observe(copy)
    })
    const lightColor = new THREE.Color(0xdee6ff)
    const nightColor = new THREE.Color(0x7185b6)
    let lastStage = -1
    let timeline: gsap.core.Timeline | undefined
    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add(
        {
          mobile: "(max-width: 760px)",
          desktop: "(min-width: 761px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (match) => {
          const mobile = !!match.conditions?.mobile
          const reduced = !!match.conditions?.reduce
          const side = mobile ? 0 : 0.16
          const lower = mobile ? -0.8 : -0.42
          const size = mobile ? 1.05 : 1.18
          const initial = {
            x: 0,
            y: mobile ? -0.65 : -0.52,
            scale: mobile ? 1.06 : 1.2,
            rx: -0.08,
            ry: 0.42,
            rz: 0.1,
            lid: -1.68,
            cy: 0.35,
            cz: 5.5,
            lookY: 0.1,
            dark: 0,
            light: 1,
            stage: 0,
            screenIndex: 0,
          }
          const shots = [
            initial,
            {
              x: side,
              y: lower,
              scale: size,
              rx: 0.08,
              ry: -0.38,
              rz: -0.06,
              lid: -1.72,
              cy: 0.75,
              cz: 5.5,
              lookY: 0.12,
              stage: 1,
            },
            {
              x: -side * 0.5,
              y: lower,
              scale: size,
              rx: 0.1,
              ry: 0.35,
              rz: 0.05,
              lid: -1.75,
              cy: 0.85,
              cz: 5.5,
              lookY: 0.12,
              stage: 2,
            },
            {
              x: side,
              y: lower,
              scale: size,
              rx: 0.06,
              ry: -0.32,
              rz: -0.05,
              lid: -1.7,
              cy: 0.75,
              cz: 5.5,
              lookY: 0.12,
              stage: 3,
            },
            {
              x: -side * 0.5,
              y: lower,
              scale: size,
              rx: 0.08,
              ry: 0.28,
              rz: 0.04,
              lid: -1.74,
              cy: 0.8,
              cz: 5.5,
              lookY: 0.12,
              stage: 4,
            },
            {
              x: 0,
              y: mobile ? -0.45 : -0.3,
              scale: mobile ? 1.02 : 1.15,
              rx: 0.08,
              ry: 0.38,
              rz: 0.04,
              lid: CLOSED_LID,
              cy: 0.95,
              cz: 5.6,
              lookY: 0.08,
              stage: 5,
            },
            {
              x: mobile ? 0 : 0.06,
              y: lower,
              scale: size,
              rx: 0.02,
              ry: 0.12,
              rz: -0.02,
              lid: -1.78,
              cy: 0.65,
              cz: 5.5,
              lookY: 0.12,
              stage: 6,
            },
            {
              x: mobile ? 0 : -0.06,
              y: lower,
              scale: size,
              rx: 0.02,
              ry: -0.12,
              rz: 0.02,
              lid: -1.78,
              cy: 0.65,
              cz: 5.5,
              lookY: 0.12,
              stage: 7,
            },
            {
              x: 0,
              y: mobile ? -0.7 : -0.58,
              scale: mobile ? 1.05 : 1.18,
              rx: 0.08,
              ry: 0.35,
              rz: 0.04,
              lid: CLOSED_LID,
              cy: 0.6,
              cz: 5.6,
              lookY: 0.1,
              dark: 1,
              light: 0.55,
              stage: 8,
            },
          ]
          Object.assign(state, initial)
          const positions = () =>
            panels.map((panel, i) =>
              i === 0
                ? 0
                : panel.offsetTop +
                  panel.offsetHeight * 0.5 -
                  window.innerHeight * 0.5,
            )
          const build = () => {
            timeline?.scrollTrigger?.kill()
            timeline?.kill()
            const stops = positions()
            const end = stops[stops.length - 1]
            timeline = gsap.timeline({
              scrollTrigger: {
                trigger: document.getElementById("story")!,
                start: "top top",
                end: () => `+=${end}`,
                scrub: reduced ? true : 1.4,
                invalidateOnRefresh: true,
              },
              defaults: { ease: reduced ? "none" : "cinemaSmooth" },
            })
            timeline.set(state, initial, 0)
            shots.slice(1).forEach((shot, index) => {
              const i = index + 1
              const start =
                i === 1
                  ? stops[i - 1] + (stops[i] - stops[i - 1]) * 0.04
                  : stops[i - 1] + (stops[i] - stops[i - 1]) * 0.04
              const duration = stops[i] - start
              const swapAt = start + duration * 0.45
              if (i === 6) timeline!.set(state, { screenIndex: 1 }, swapAt)
              if (i === 7) timeline!.set(state, { screenIndex: 2 }, swapAt)
              if (i === 8) timeline!.set(state, { screenIndex: 0 }, swapAt)
              if (!reduced) {
                if (i === 5 || i === 8) {
                  // Clean Apple close transition for interlude and contact
                  timeline!.to(
                    state,
                    {
                      ...shot,
                      lid: CLOSED_LID,
                      duration,
                    },
                    start,
                  )
                } else if (i === 6) {
                  // Smoothly open back up to reveal Gitex
                  timeline!.to(
                    state,
                    {
                      ...shot,
                      duration,
                    },
                    start,
                  )
                } else {
                  // Silky smooth, continuous perspective transitions between roles — no full 360 spins, no slamming shut
                  timeline!.to(
                    state,
                    {
                      ...shot,
                      duration,
                    },
                    start,
                  )
                }
              } else {
                timeline!.to(
                  state,
                  {
                    ...shot,
                    ...(reduced
                      ? { ry: initial.ry, rx: initial.rx, rz: initial.rz }
                      : {}),
                    duration,
                  },
                  start,
                )
              }
            })
            // Hold the final composition to the bottom without introducing a second device.
            ScrollTrigger.refresh()
          }
          build()
          const resize = () => {
            build()
          }
          window.addEventListener("resize", resize)
          return () => {
            window.removeEventListener("resize", resize)
            timeline?.scrollTrigger?.kill()
            timeline?.kill()
          }
        },
      )
      return () => media.revert()
    }, container)

    const copyOpacity = new WeakMap<HTMLElement, number>()
    let frame = 0
    let visible = !document.hidden
    const startedAt = performance.now()
    const productBounds = new THREE.Box3()
    const viewDirection = new THREE.Vector3()
    const shadowCenter = new THREE.Vector3()
    const update = () => {
      frame = requestAnimationFrame(update)
      if (!visible) return
      const t = (performance.now() - startedAt) / 1000
      const float = motion.matches ? 0 : Math.sin(t * 0.85) * 0.018
      const mobile = viewWidth <= 760
      laptopGroup.position.set(state.x, state.y + float, 0)
      laptopGroup.scale.setScalar(state.scale)
      laptopGroup.rotation.set(state.rx, state.ry, state.rz)
      lidGroup.rotation.x =
        Math.abs(state.lid) < 0.0001 ? CLOSED_LID : state.lid
      const shut = Math.abs(lidGroup.rotation.x) < 0.018
      screenMesh.visible = !shut
      glass.visible = !shut
      const stage = state.stage
      // Anticipate incoming text while it is still invisible, so framing moves smoothly.
      let textBottom = mobile ? 52 : 72
      textClearance.forEach((bottom, index) => {
        const anticipation =
          1 - THREE.MathUtils.smoothstep(Math.abs(stage - index), 0.48, 0.9)
        textBottom = Math.max(
          textBottom,
          THREE.MathUtils.lerp(mobile ? 52 : 72, bottom, anticipation),
        )
      })
      // Keep ample room for the MacBook so it stays heroically sized and close to the user
      const maxSceneTop = viewHeight * (mobile ? 0.36 : 0.28)
      const sceneTop = Math.ceil(Math.min(textBottom, maxSceneTop))
      const sceneHeight = Math.max(
        Math.floor(viewHeight * (mobile ? 0.64 : 0.74)),
        viewHeight - sceneTop,
      )
      laptopGroup.updateMatrixWorld(true)
      productBounds.setFromObject(laptopGroup)
      camera.fov = 38
      viewDirection.set(0, state.cy - state.lookY, state.cz)
      frameMacBook(
        camera,
        productBounds,
        viewWidth / Math.max(1, sceneHeight),
        viewDirection,
      )
      copies.forEach((copy, index) => {
        if (!copy) return
        const distance = Math.abs(stage - index)
        const opacity = THREE.MathUtils.clamp(
          1 - Math.max(0, distance - 0.18) / 0.3,
          0,
          1,
        )
        const roundedOpacity = Math.round(opacity * 1000) / 1000
        if (copyOpacity.get(copy) === roundedOpacity && roundedOpacity === 0)
          return
        copyOpacity.set(copy, roundedOpacity)
        copy.style.opacity = String(roundedOpacity)
        copy.style.visibility = opacity < 0.01 ? "hidden" : "visible"
        copy.style.transform = motion.matches
          ? "none"
          : `translateY(${THREE.MathUtils.clamp(index - stage, -1, 1) * 18}px)`
      })
      // Ensure the display texture is always strictly synchronized with the current section
      let screen = "wallpaper"
      if (stage >= 0.55 && stage < 4.5) {
        screen = `company-${Math.max(0, Math.min(3, Math.round(stage) - 1))}`
      } else if (stage >= 5.5 && stage < 6.5) {
        screen = "gitex"
      } else if (stage >= 6.5 && stage < 7.5) {
        screen = "guppty"
      } else {
        screen = "wallpaper"
      }
      setScreen(screen)
      shadowMat.opacity = 0.7 * (1 - state.dark)
      productBounds.getCenter(shadowCenter)
      shadowMesh.position.set(
        shadowCenter.x,
        productBounds.min.y - 0.2,
        shadowCenter.z,
      )
      fillLight.color.copy(lightColor).lerp(nightColor, state.dark)
      ambientLight.intensity = 0.65 * state.light
      keyLight.intensity = 1.8 * state.light
      rimLight.intensity = 2.4 + state.dark * 1.1
      screenGlowLight.intensity = shut
        ? 0
        : screen === "wallpaper"
          ? 0.55
          : 0.25
      if (darkWorld) darkWorld.style.opacity = String(state.dark)
      if (lightWorld) {
        lightWorld.style.opacity = String(1 - state.dark)
        lightWorld.style.transform = `translateY(${-Math.min(stage, 5) * 1.3}%)`
      }
      const nearest = Math.round(stage)
      if (nearest !== lastStage) {
        container.dataset.stage = String(nearest)
        lastStage = nearest
      }
      // Clear the full canvas, then render only below the reserved text area.
      renderer.setScissorTest(false)
      renderer.setViewport(0, 0, viewWidth, viewHeight)
      renderer.clear()
      if (sceneHeight < 64) return
      renderer.setViewport(0, 0, viewWidth, sceneHeight)
      renderer.setScissor(0, 0, viewWidth, sceneHeight)
      renderer.setScissorTest(true)
      renderer.render(scene, camera)
    }
    update()
    const resizeRenderer = () => {
      resizeDrawingBuffer()
      camera.aspect = viewWidth / viewHeight
      camera.updateProjectionMatrix()
      measureText()
    }
    const visibility = () => {
      visible = !document.hidden
    }
    window.addEventListener("resize", resizeRenderer)
    document.addEventListener("visibilitychange", visibility)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", resizeRenderer)
      document.removeEventListener("visibilitychange", visibility)
      disposed = true
      textObserver.disconnect()
      companyTextures.forEach((texture) => texture.dispose())
      context.revert()
      root?.classList.remove("has-3d")
      copies.forEach((copy) => {
        if (copy) {
          copy.style.opacity = ""
          copy.style.visibility = ""
          copy.style.transform = ""
        }
      })
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material]
          materials.forEach((material) => {
            Object.values(material).forEach((value) => {
              if (value instanceof THREE.Texture) value.dispose()
            })
            material.dispose()
          })
        }
      })
      gitexTexture.dispose()
      gupptyTexture.dispose()
      scene.environment?.dispose()
      pmremGenerator.dispose()
      keyLight.shadow.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])
  return unavailable ? (
    <div className="webgl-fallback">
      The 3D presentation needs a browser with WebGL enabled. All experience,
      projects, and contact details are available below.
    </div>
  ) : (
    <div ref={containerRef} className="macbook-canvas" aria-hidden="true" />
  )
}

function drawSpeakerGrille(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!
  ctx.fillStyle = "rgba(25,28,38,.55)"
  for (let y = 4; y < canvas.height; y += 8)
    for (let x = 4; x < canvas.width; x += 8) {
      ctx.beginPath()
      ctx.arc(x, y, 1.2, 0, Math.PI * 2)
      ctx.fill()
    }
}
