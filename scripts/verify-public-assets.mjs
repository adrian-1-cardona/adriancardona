import { readdir, readFile, stat } from "node:fs/promises"
import path from "node:path"

const root = path.resolve("public")
const failures = []
async function verify(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) await verify(file)
    else if (entry.isFile()) {
      const bytes = await readFile(file)
      if (
        bytes
          .subarray(0, 100)
          .toString()
          .startsWith("version https://git-lfs.github.com/spec")
      ) {
        failures.push(
          `${path.relative(root, file)} contains a Git LFS pointer instead of the actual asset.`,
        )
      }
    }
  }
}
await verify(root)
for (const file of [
  "macbook-desktop.png",
  "screens/gitex.jpg",
  "screens/guppty.jpg",
  "images/logos/calpoly-official.svg",
  "images/logos/foundationccc-official.svg",
  "images/logos/extern-official.png",
  "ADRIAN_CARDONA_RESUME.pdf",
]) {
  try {
    if (!(await stat(path.join(root, file))).size)
      failures.push(`${file} is empty.`)
  } catch {
    failures.push(`${file} is missing.`)
  }
}
if (failures.length) {
  console.error(`Public asset verification failed:\n${failures.join("\n")}`)
  process.exit(1)
}
console.log(
  "Public assets verified: screen images, company logos, and résumé are present; no LFS stubs.",
)
