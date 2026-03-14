import { $ } from "bun"

export const SIDECAR_BINARIES: Array<{ rustTarget: string; ocBinary: string; assetExt: string }> = [
  {
    rustTarget: "aarch64-apple-darwin",
    ocBinary: "blackbox-ai-darwin-arm64",
    assetExt: "zip",
  },
  {
    rustTarget: "x86_64-apple-darwin",
    ocBinary: "blackbox-ai-darwin-x64",
    assetExt: "zip",
  },
  {
    rustTarget: "x86_64-pc-windows-msvc",
    ocBinary: "blackbox-ai-windows-x64-baseline",
    assetExt: "zip",
  },
  {
    rustTarget: "x86_64-unknown-linux-gnu",
    ocBinary: "blackbox-ai-linux-x64-baseline",
    assetExt: "tar.gz",
  },
  {
    rustTarget: "aarch64-unknown-linux-gnu",
    ocBinary: "blackbox-ai-linux-arm64",
    assetExt: "tar.gz",
  },
]

function hostRustTarget() {
  if (process.platform === "darwin") {
    if (process.arch === "arm64") return "aarch64-apple-darwin"
    if (process.arch === "x64") return "x86_64-apple-darwin"
  }

  if (process.platform === "win32") {
    return "x86_64-pc-windows-msvc"
  }

  if (process.platform === "linux") {
    if (process.arch === "arm64") return "aarch64-unknown-linux-gnu"
    if (process.arch === "x64") return "x86_64-unknown-linux-gnu"
  }

  return undefined
}

export const RUST_TARGET = Bun.env.TAURI_ENV_TARGET_TRIPLE ?? Bun.env.RUST_TARGET ?? hostRustTarget()

export function getCurrentSidecar(target = RUST_TARGET) {
  if (!target) throw new Error("Unable to resolve Rust target for this machine")

  const binaryConfig = SIDECAR_BINARIES.find((b) => b.rustTarget === target)
  if (!binaryConfig) throw new Error(`Sidecar configuration not available for Rust target '${target}'`)

  return binaryConfig
}

export async function copyBinaryToSidecarFolder(source: string, target = RUST_TARGET) {
  await $`mkdir -p src-tauri/sidecars`
  const dest = windowsify(`src-tauri/sidecars/opencode-cli-${target}`)
  await $`cp ${source} ${dest}`

  console.log(`Copied ${source} to ${dest}`)
}

export function windowsify(path: string) {
  if (path.endsWith(".exe")) return path
  return `${path}${process.platform === "win32" ? ".exe" : ""}`
}
