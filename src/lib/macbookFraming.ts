import { Box3, PerspectiveCamera, Quaternion, Vector3 } from "three"

/** Fit the complete product inside its own viewport, including tilted/open-lid poses. */
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
  camera.position
    .copy(center)
    .addScaledVector(direction.clone().normalize(), distance * 1.1)
  camera.lookAt(center)
  camera.updateProjectionMatrix()
  camera.updateMatrixWorld()
}
