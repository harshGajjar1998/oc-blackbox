import { $ } from "bun"
import * as path from "node:path"
import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync } from "node:fs"

import { RUST_TARGET } from "./utils"

if (!RUST_TARGET) throw new Error("RUST_TARGET not defined")

const BUNDLE_DIR = `src-tauri/target/${RUST_TARGET}/release/bundle`
const BUNDLES_OUT_DIR = path.join(process.cwd(), `src-tauri/target/bundles`)

// Create output directory if it doesn't exist
if (!existsSync(BUNDLES_OUT_DIR)) {
  mkdirSync(BUNDLES_OUT_DIR, { recursive: true })
}

// Copy bundles - handle both Windows and Unix paths
function copyBundles() {
  const bundleTypes = ['nsis', 'msi', 'deb', 'rpm', 'appimage', 'dmg']
  
  for (const bundleType of bundleTypes) {
    const bundleTypeDir = path.join(BUNDLE_DIR, bundleType)
    if (existsSync(bundleTypeDir)) {
      console.log(`Found ${bundleType} bundles in ${bundleTypeDir}`)
      
      const files = readdirSync(bundleTypeDir)
      for (const file of files) {
        const srcPath = path.join(bundleTypeDir, file)
        const destPath = path.join(BUNDLES_OUT_DIR, file)
        
        if (statSync(srcPath).isFile()) {
          console.log(`Copying ${file} to bundles directory`)
          copyFileSync(srcPath, destPath)
        }
      }
    }
  }
}

copyBundles()
console.log(`Bundles copied to: ${BUNDLES_OUT_DIR}`)
