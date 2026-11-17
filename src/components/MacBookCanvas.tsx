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

    // Authentic Liquid Retina Display Shape: Rounded top corners, square bottom chin corners
    function createDisplayShape(
      w: number,
      h: number,
      topR: number,
      botR: number = 0.005,
    ) {
      const shape = new THREE.Shape()
      const hw = w / 2
      const hh = h / 2
      shape.moveTo(-hw + botR, -hh)
      shape.lineTo(hw - botR, -hh)
      if (botR > 0) {
        shape.quadraticCurveTo(hw, -hh, hw, -hh + botR)
      }
      shape.lineTo(hw, hh - topR)
      shape.quadraticCurveTo(hw, hh, hw - topR, hh)
      shape.lineTo(-hw + topR, hh)
      shape.quadraticCurveTo(-hw, hh, -hw, hh - topR)
      shape.lineTo(-hw, -hh + botR)
      if (botR > 0) {
        shape.quadraticCurveTo(-hw, -hh, -hw + botR, -hh)
      }
      shape.closePath()
      return shape
    }

    // Authentic Apple Camera Notch Shape with smooth corner fillets (Callout 2)
    function createNotchShape(w: number, h: number, cornerR: number) {
      const shape = new THREE.Shape()
      const hw = w / 2
      shape.moveTo(-hw, h)
      shape.lineTo(hw, h)
      shape.lineTo(hw, cornerR)
      shape.quadraticCurveTo(hw, 0, hw - cornerR, 0)
      shape.lineTo(-hw + cornerR, 0)
      shape.quadraticCurveTo(-hw, 0, -hw, cornerR)
      shape.lineTo(-hw, h)
      shape.closePath()
      return shape
    }

    const laptopGroup = new THREE.Group()

    // Rounded Pro-style enclosure, matching the supplied front and side references.
    const width = 3.25
    const depth = 2.15
    const baseThickness = 0.065
    const cornerRadius = 0.12

    // Authentic Apple Anodized Aluminum PBR Material (Space Gray / Midnight Unibody)
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
      color: 0x949aa5,
      metalness: 0.95,
      roughness: 0.32,
      bumpMap: grain,
      bumpScale: 0.0006,
      envMapIntensity: 0.95,
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

    // Precision Machined Front Center Thumb Scoop (Callout 1 matching Apple hardware reference)
    const scoopWidth = 0.42
    const scoopHeight = 0.015
    const scoopDepth = 0.022
    const scoopShape = createRoundedRect(scoopWidth, scoopDepth, 0.008)
    const scoopGeom = new THREE.ExtrudeGeometry(scoopShape, {
      depth: scoopHeight,
      bevelEnabled: true,
      bevelThickness: 0.003,
      bevelSize: 0.003,
      bevelSegments: 4,
    })
    scoopGeom.center()
    scoopGeom.rotateX(Math.PI / 2)
    const scoopMat = new THREE.MeshStandardMaterial({
      color: 0x4e5460,
      metalness: 0.88,
      roughness: 0.35,
      bumpMap: grain,
      bumpScale: 0.0003,
      envMapIntensity: 0.75,
    })
    const scoopMesh = new THREE.Mesh(scoopGeom, scoopMat)
    scoopMesh.position.set(0, baseThickness / 2 + 0.002, depth / 2 - 0.006)
    baseGroup.add(scoopMesh)

    const scoopWell = new THREE.Mesh(
      new THREE.CylinderGeometry(0.005, 0.005, 0.36, 16).rotateZ(Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0x16181e }),
    )
    scoopWell.position.set(0, baseThickness / 2 + 0.004, depth / 2 - 0.005)
    baseGroup.add(scoopWell)

    // Keyboard Well (Recessed dark anodized tray)
    const kbWidth = 2.62
    const kbDepth = 1.07
    const kbShape = createRoundedRect(kbWidth, kbDepth, 0.04)
    const kbGeom = new THREE.ExtrudeGeometry(kbShape, {
      depth: 0.005,
      bevelEnabled: false,
    })
    kbGeom.center()
    kbGeom.rotateX(Math.PI / 2)
    const kbTrayMat = new THREE.MeshStandardMaterial({
      color: 0x181a20,
      metalness: 0.75,
      roughness: 0.52,
      bumpMap: grain,
      bumpScale: 0.0004,
      envMapIntensity: 0.4,
    })
    const kbTray = new THREE.Mesh(kbGeom, kbTrayMat)
    kbTray.position.set(0, 0.038, -0.3)
    baseGroup.add(kbTray)

    // Deep velvety matte black Apple Magic Keyboard keycaps
    const keyMat = new THREE.MeshStandardMaterial({
      color: 0x151619,
      roughness: 0.65,
      metalness: 0.02,
      envMapIntensity: 0.15,
    })

    const keyGeometries = new Map<string, THREE.BufferGeometry>()
    const getKeyGeo = (w: number, d: number, r: number = 0.0035) => {
      const sig = `${w.toFixed(4)}_${d.toFixed(4)}`
      if (!keyGeometries.has(sig)) {
        keyGeometries.set(sig, new RoundedBoxGeometry(w, 0.014, d, 4, r))
      }
      return keyGeometries.get(sig)!
    }

    const labelCanvas = document.createElement("canvas")
    const textureScale =
      window.innerWidth > 760 && renderer.capabilities.maxTextureSize >= 4096
        ? 2
        : 1
    labelCanvas.width = 2048 * textureScale
    labelCanvas.height = 900 * textureScale
    const labels = labelCanvas.getContext("2d")!
    labels.scale(textureScale, textureScale)
    labels.fillStyle = "rgba(240, 242, 248, 0.94)"
    labels.textAlign = "center"
    labels.textBaseline = "middle"

    // Helper to draw text onto the label plane
    const drawLabel = (
      text: string,
      worldX: number,
      worldZ: number,
      isSmall: boolean = false,
    ) => {
      const u = ((worldX + kbWidth / 2) / kbWidth) * 2048
      const v = ((worldZ + 0.3 + kbDepth / 2) / kbDepth) * 900
      labels.font = isSmall
        ? '600 16px -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
        : '600 24px -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
      labels.fillText(text, u, v)
    }

    const keyGap = 0.022
    const usableW = kbWidth - 0.08 // 2.54

    // Rows 0 to 4
    const standardRows = [
      // Row 0: Function keys (half height)
      {
        keys: [
          "esc",
          "F1",
          "F2",
          "F3",
          "F4",
          "F5",
          "F6",
          "F7",
          "F8",
          "F9",
          "F10",
          "F11",
          "F12",
          "touchid",
        ],
        weights: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        height: 0.062,
      },
      // Row 1: Numbers
      {
        keys: [
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
        weights: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.4],
        height: 0.122,
      },
      // Row 2: QWERTY
      {
        keys: [
          "tab",
          "Q",
          "W",
          "E",
          "R",
          "T",
          "Y",
          "U",
          "I",
          "O",
          "P",
          "[",
          "]",
          "\\",
        ],
        weights: [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5],
        height: 0.122,
      },
      // Row 3: Home row
      {
        keys: [
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
        weights: [1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.8],
        height: 0.122,
      },
      // Row 4: Shift row
      {
        keys: [
          "shift",
          "Z",
          "X",
          "C",
          "V",
          "B",
          "N",
          "M",
          ",",
          ".",
          "/",
          "shift",
        ],
        weights: [2.3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.3],
        height: 0.122,
      },
    ]

    standardRows.forEach((rowDef, ri) => {
      const sumW = rowDef.weights.reduce((a, b) => a + b, 0)
      const totalGaps = (rowDef.keys.length - 1) * keyGap
      const unit = (usableW - totalGaps) / sumW
      let currX = -usableW / 2
      const z = -0.3 - kbDepth / 2 + 0.083 + ri * 0.172

      rowDef.keys.forEach((label, ki) => {
        const kw = rowDef.weights[ki] * unit
        const kx = currX + kw / 2

        if (label === "touchid") {
          // Touch ID button with sensor ring
          const key = new THREE.Mesh(getKeyGeo(kw, rowDef.height), keyMat)
          key.position.set(kx, 0.043, z)
          baseGroup.add(key)
          const touchRing = new THREE.Mesh(
            new THREE.RingGeometry(0.018, 0.021, 32).rotateX(-Math.PI / 2),
            new THREE.MeshStandardMaterial({
              color: 0x4a4e58,
              metalness: 0.9,
              roughness: 0.25,
            }),
          )
          touchRing.position.set(kx, 0.0505, z)
          baseGroup.add(touchRing)
        } else {
          const key = new THREE.Mesh(getKeyGeo(kw, rowDef.height), keyMat)
          key.position.set(kx, 0.043, z)
          baseGroup.add(key)
          drawLabel(label, kx, z, label.length > 2 || label.startsWith("F"))
        }

        currX += kw + keyGap
      })
    })

    // Row 5: Bottom row with Inverted-T Arrow Cluster (10 columns total)
    const row5Z = -0.3 - kbDepth / 2 + 0.083 + 5 * 0.172
    const row5Weights = [1.0, 1.0, 1.0, 1.25, 5.4, 1.25, 1.0, 1.0, 1.0, 1.0]
    const row5SumW = row5Weights.reduce((a, b) => a + b, 0)
    const row5TotalGaps = 9 * keyGap
    const row5Unit = (usableW - row5TotalGaps) / row5SumW
    let r5X = -usableW / 2

    const row5Labels = [
      "fn",
      "control",
      "option",
      "command",
      " ",
      "command",
      "option",
    ]
    row5Labels.forEach((label, ki) => {
      const kw = row5Weights[ki] * row5Unit
      const kx = r5X + kw / 2
      const key = new THREE.Mesh(getKeyGeo(kw, 0.122), keyMat)
      key.position.set(kx, 0.043, row5Z)
      baseGroup.add(key)
      if (label.trim()) {
        drawLabel(label, kx, row5Z, true)
      }
      r5X += kw + keyGap
    })

    // Inverted-T Arrow keys in columns 7, 8, 9
    const arrowColW = row5Weights[7] * row5Unit
    const arrowH = 0.054
    const arrowZOffset = 0.033

    // Left Arrow (Column 7, bottom half)
    const leftArrowX = r5X + arrowColW / 2
    const leftArrowKey = new THREE.Mesh(getKeyGeo(arrowColW, arrowH), keyMat)
    leftArrowKey.position.set(leftArrowX, 0.043, row5Z + arrowZOffset)
    baseGroup.add(leftArrowKey)
    drawLabel("◀", leftArrowX, row5Z + arrowZOffset, true)
    r5X += arrowColW + keyGap

    // Up / Down Column (Column 8)
    const midArrowX = r5X + arrowColW / 2
    // Up Arrow (top half)
    const upArrowKey = new THREE.Mesh(getKeyGeo(arrowColW, arrowH), keyMat)
    upArrowKey.position.set(midArrowX, 0.043, row5Z - arrowZOffset)
    baseGroup.add(upArrowKey)
    drawLabel("▲", midArrowX, row5Z - arrowZOffset, true)

    // Down Arrow (bottom half)
    const downArrowKey = new THREE.Mesh(getKeyGeo(arrowColW, arrowH), keyMat)
    downArrowKey.position.set(midArrowX, 0.043, row5Z + arrowZOffset)
    baseGroup.add(downArrowKey)
    drawLabel("▼", midArrowX, row5Z + arrowZOffset, true)
    r5X += arrowColW + keyGap

    // Right Arrow (Column 9, bottom half)
    const rightArrowX = r5X + arrowColW / 2
    const rightArrowKey = new THREE.Mesh(getKeyGeo(arrowColW, arrowH), keyMat)
    rightArrowKey.position.set(rightArrowX, 0.043, row5Z + arrowZOffset)
    baseGroup.add(rightArrowKey)
    drawLabel("▶", rightArrowX, row5Z + arrowZOffset, true)

    // Label texture & plane
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
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1,
      }),
    )
    labelPlane.position.set(0, 0.0503, -0.3)
    baseGroup.add(labelPlane)

    // Force Touch Glass Trackpad with Hairline Gap (Clean solid deck matching reference image, no speaker grilles)
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

    // Liquid Retina XDR Display with authentic Apple 4K Wallpaper & Menu Bar
    const textureLoader = new THREE.TextureLoader()
    const screenTexture = textureLoader.load("/macbook-desktop.png", (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      tex.generateMipmaps = true
      tex.minFilter = THREE.LinearMipmapLinearFilter
      tex.magFilter = THREE.LinearFilter
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy()
      tex.needsUpdate = true
      renderer.render(scene, camera)
    })
    screenTexture.colorSpace = THREE.SRGBColorSpace
    screenTexture.generateMipmaps = true
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter
    screenTexture.magFilter = THREE.LinearFilter
    screenTexture.anisotropy = renderer.capabilities.getMaxAnisotropy()

    // Authentic Liquid Retina Display Geometry (Rounded top corners, square bottom chin)
    const screenW = width - 0.12
    const screenH = depth - 0.12
    const screenShape = createDisplayShape(screenW, screenH, 0.045, 0.005)
    const screenPlaneGeom = new THREE.ShapeGeometry(screenShape, 32)
    const positions = screenPlaneGeom.getAttribute("position")
    const screenUV = new Float32Array(positions.count * 2)
    for (let i = 0; i < positions.count; i++) {
      screenUV[i * 2] = positions.getX(i) / screenW + 0.5
      screenUV[i * 2 + 1] = positions.getY(i) / screenH + 0.5
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

    // Ultra-slim display bezel matching Apple Liquid Retina panel
    const bezelShape = createDisplayShape(
      width - 0.04,
      depth - 0.04,
      0.088,
      0.01,
    )
    const bezel = new THREE.Mesh(
      new THREE.ShapeGeometry(bezelShape, 32).rotateX(Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0x08090d, side: THREE.DoubleSide }),
    )
    bezel.position.set(0, -0.024, depth / 2)
    lidContent.add(bezel)

    // Iconic Apple Camera Notch (Callout 2 with smooth filleted corners)
    const notchW = 0.35
    const notchH = 0.068
    const notchCornerR = 0.013
    const notchShape = createNotchShape(notchW, notchH, notchCornerR)
    const notchGeom = new THREE.ShapeGeometry(notchShape, 24).rotateX(
      Math.PI / 2,
    )
    const notchMat = new THREE.MeshBasicMaterial({
      color: 0x08090d,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    })
    const notchMesh = new THREE.Mesh(notchGeom, notchMat)
    notchMesh.position.set(0, -0.0272, depth - 0.06 - notchH)
    lidContent.add(notchMesh)

    // Integrated FaceTime HD camera lens centered inside the notch
    const webcam = new THREE.Mesh(
      new THREE.CircleGeometry(0.0078, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0x0c101c,
        metalness: 0.9,
        roughness: 0.12,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
      }),
    )
    webcam.rotation.x = Math.PI / 2
    webcam.position.set(0, -0.0274, depth - 0.094)
    lidContent.add(webcam)

    // Camera pupil iris reflection
    const webcamPupil = new THREE.Mesh(
      new THREE.CircleGeometry(0.0035, 24),
      new THREE.MeshBasicMaterial({ color: 0x142036 }),
    )
    webcamPupil.rotation.x = Math.PI / 2
    webcamPupil.position.set(0, -0.0275, depth - 0.094)
    lidContent.add(webcamPupil)

    // Ambient light / True Tone sensor dot inside notch
    const cameraSensor = new THREE.Mesh(
      new THREE.CircleGeometry(0.0022, 16),
      new THREE.MeshBasicMaterial({ color: 0x122418 }),
    )
    cameraSensor.rotation.x = Math.PI / 2
    cameraSensor.position.set(0.03, -0.0274, depth - 0.094)
    lidContent.add(cameraSensor)

    // Microphone pinhole dot inside notch
    const micPinhole = new THREE.Mesh(
      new THREE.CircleGeometry(0.0016, 12),
      new THREE.MeshBasicMaterial({ color: 0x040507 }),
    )
    micPinhole.rotation.x = Math.PI / 2
    micPinhole.position.set(-0.03, -0.0274, depth - 0.094)
    lidContent.add(micPinhole)

    // Ultra-clear Liquid Retina optical glass with subtle anti-reflective coating
    const glass = new THREE.Mesh(
      screenPlaneGeom.clone(),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        vertexShader: `varying vec3 n; varying vec3 v; varying vec2 tex;
      void main(){vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);v=normalize(-p.xyz);tex=uv;gl_Position=projectionMatrix*p;}`,
        fragmentShader: `varying vec3 n;varying vec3 v;varying vec2 tex;
      void main(){float f=pow(1.-abs(dot(normalize(n),normalize(v))),3.5);float strip=smoothstep(.1,.5,tex.x+tex.y*.25)*(1.-smoothstep(.65,1.2,tex.x+tex.y*.25));gl_FragColor=vec4(.45,.65,1.,f*.14+strip*.018);}`,
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
      y: -0.42,
      scale: 1.22,
      rx: 0.16,
      ry: 0.36,
      rz: -0.05,
      lid: -1.82,
      cy: 0.65,
      cz: 5.3,
      lookY: 0.1,
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
          const side = mobile ? 0 : 0.14
          const lower = mobile ? -0.75 : -0.42
          const size = mobile ? 1.05 : 1.18
          const initial = {
            x: 0,
            y: mobile ? -0.55 : -0.42,
            scale: mobile ? 1.08 : 1.22,
            rx: 0.16,
            ry: 0.36,
            rz: -0.05,
            lid: -1.82,
            cy: 0.65,
            cz: 5.3,
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
              rx: 0.14,
              ry: -0.22,
              rz: 0.04,
              lid: -1.8,
              cy: 0.65,
              cz: 5.3,
              lookY: 0.1,
              stage: 1,
            },
            {
              x: -side * 0.5,
              y: lower,
              scale: size,
              rx: 0.15,
              ry: 0.22,
              rz: -0.04,
              lid: -1.82,
              cy: 0.65,
              cz: 5.3,
              lookY: 0.1,
              stage: 2,
            },
            {
              x: side,
              y: lower,
              scale: size,
              rx: 0.14,
              ry: -0.18,
              rz: 0.03,
              lid: -1.8,
              cy: 0.65,
              cz: 5.3,
              lookY: 0.1,
              stage: 3,
            },
            {
              x: -side * 0.5,
              y: lower,
              scale: size,
              rx: 0.15,
              ry: 0.2,
              rz: -0.03,
              lid: -1.82,
              cy: 0.65,
              cz: 5.3,
              lookY: 0.1,
              stage: 4,
            },
            {
              x: 0,
              y: mobile ? -0.45 : -0.36,
              scale: mobile ? 1.04 : 1.18,
              rx: 0.14,
              ry: 0.28,
              rz: -0.04,
              lid: -1.78,
              cy: 0.65,
              cz: 5.3,
              lookY: 0.1,
              stage: 5,
            },
            {
              x: mobile ? 0 : 0.06,
              y: lower,
              scale: size,
              rx: 0.12,
              ry: -0.14,
              rz: 0.02,
              lid: -1.8,
              cy: 0.65,
              cz: 5.3,
              lookY: 0.1,
              stage: 6,
            },
            {
              x: mobile ? 0 : -0.06,
              y: lower,
              scale: size,
              rx: 0.12,
              ry: 0.14,
              rz: -0.02,
              lid: -1.8,
              cy: 0.65,
              cz: 5.3,
              lookY: 0.1,
              stage: 7,
            },
            {
              x: 0,
              y: mobile ? -0.58 : -0.44,
              scale: mobile ? 1.06 : 1.2,
              rx: 0.15,
              ry: 0.28,
              rz: -0.04,
              lid: -1.82,
              cy: 0.65,
              cz: 5.3,
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
              // Silky smooth, continuous perspective transitions between roles — no full 360 spins, never closed off
              timeline!.to(
                state,
                {
                  ...shot,
                  duration,
                },
                start,
              )
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
      lidGroup.rotation.x = state.lid
      screenMesh.visible = true
      glass.visible = true
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
      screenGlowLight.intensity = screen === "wallpaper" ? 0.55 : 0.25
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
