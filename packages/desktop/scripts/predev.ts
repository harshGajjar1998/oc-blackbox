import { $ } from "bun"
import { existsSync } from "fs"

import { copyBinaryToSidecarFolder, getCurrentSidecar, windowsify } from "./utils"

const env = Bun.env.TAURI_ENV_TARGET_TRIPLE ?? Bun.env.RUST_TARGET

const sidecarConfig = getCurrentSidecar(env)
const rustTarget = env ?? sidecarConfig.rustTarget

// Skip the CLI build if the sidecar binary already exists.
// This avoids bun cache issues (e.g. missing @aws-sdk nested packages) during dev.
const sidecarDest = windowsify(`src-tauri/sidecars/opencode-cli-${rustTarget}`)
if (existsSync(sidecarDest)) {
  console.log(`[predev] Sidecar already exists at ${sidecarDest} — skipping build.`)
  process.exit(0)
}

const binaryPath = windowsify(`../blackbox_ai/dist/${sidecarConfig.ocBinary}/bin/opencode`)

await (sidecarConfig.ocBinary.includes("-baseline")
  ? $`cd ../blackbox_ai && bun run build --single --baseline`
  : $`cd ../blackbox_ai && bun run build --single`)

await copyBinaryToSidecarFolder(binaryPath, rustTarget)
