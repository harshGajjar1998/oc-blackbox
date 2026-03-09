import { $ } from "bun"

import { copyBinaryToSidecarFolder, getCurrentSidecar, windowsify } from "./utils"

const env = Bun.env.TAURI_ENV_TARGET_TRIPLE ?? Bun.env.RUST_TARGET

const sidecarConfig = getCurrentSidecar(env)

const binaryPath = windowsify(`../blackbox_ai/dist/${sidecarConfig.ocBinary}/bin/opencode`)

await (sidecarConfig.ocBinary.includes("-baseline")
  ? $`cd ../blackbox_ai && bun run build --single --baseline`
  : $`cd ../blackbox_ai && bun run build --single`)

await copyBinaryToSidecarFolder(binaryPath, env ?? sidecarConfig.rustTarget)
