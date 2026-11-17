import { spawn } from "node:child_process"
import { existsSync } from "node:fs"
import path from "node:path"

const CHROME_PATH =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
const root = path.resolve("public/screens")

if (!existsSync(CHROME_PATH)) {
  console.log(
    "Chrome not found at standard macOS location. Skipping screen update.",
  )
  process.exit(0)
}

const targets = [
  {
    url: "https://gitex.dev",
    output: path.join(root, "gitex.jpg"),
    delay: 6000,
    width: 1440,
    height: 930,
  },
  {
    url: "https://adrian-1-cardona.github.io/Guppty/",
    output: path.join(root, "guppty.jpg"),
    delay: 4000,
    width: 1440,
    height: 930,
  },
]

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { stdio: "inherit" })
    proc.on("close", (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${cmd} exited with code ${code}`))
    })
  })
}

async function captureScreen({ url, output, delay, width, height }) {
  console.log(`Capturing latest screen for ${url}...`)
  const tmpPng = `/tmp/screen_capture_${Date.now()}.png`
  await run(CHROME_PATH, [
    "--headless",
    "--disable-gpu",
    `--window-size=${width},${height}`,
    `--virtual-time-budget=${delay}`,
    `--screenshot=${tmpPng}`,
    url,
  ])
  await run("sips", [
    "-s",
    "format",
    "jpeg",
    "-s",
    "formatOptions",
    "92",
    tmpPng,
    "--out",
    output,
  ])
  console.log(`Updated: ${output}`)
}

for (const target of targets) {
  try {
    await captureScreen(target)
  } catch (err) {
    console.error(`Failed to capture ${target.url}:`, err.message)
  }
}
console.log("Screens are up to date.")
