import { Box3, PerspectiveCamera, Quaternion, Vector3 } from "three"

/** Fit the product close to the user with a confident, cinematic Apple framing. */
export function frameMacBook(
  camera: PerspectiveCamera,
  bounds: Box3,
  aspect: number,
  direction: Vector3,
) {
  const center = bounds.getCenter(new Vector3())
  camera.aspect = aspect
  camera.position.copy(center).add(direction.clone().normalize())
  camera.lookAt(center)
  camera.updateMatrixWorld()
  const inverseRotation = new Quaternion().copy(camera.quaternion).invert()
  const tanY = Math.tan((camera.fov * Math.PI) / 360)
  const tanX = tanY * aspect
  let distance = camera.near * 2
  const corner = new Vector3()
  for (const x of [bounds.min.x, bounds.max.x]) {
    for (const y of [bounds.min.y, bounds.max.y]) {
      for (const z of [bounds.min.z, bounds.max.z]) {
        corner.set(x, y, z).sub(center).applyQuaternion(inverseRotation)
        distance = Math.max(
          distance,
          Math.abs(corner.x) / tanX + corner.z,
          Math.abs(corner.y) / tanY + corner.z,
        )
      }
    }
  }

  // Keep the MacBook nice, cool, and close to the user — clamp distance so it never zooms out too far
  // Distance around 3.6 - 4.2 gives that tactile, immersive keynote feel.
  const fittedDistance = distance * 0.94
  const clampedDistance = Math.max(3.6, Math.min(fittedDistance, 4.25))

  camera.position
    .copy(center)
    .addScaledVector(direction.clone().normalize(), clampedDistance)
  camera.lookAt(center)
  camera.updateProjectionMatrix()
  camera.updateMatrixWorld()
}
