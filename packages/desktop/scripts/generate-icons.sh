#!/usr/bin/env bash
# generate-icons.sh
#
# Generates all required Tauri icon sizes from the Blackbox AI mark SVG.
#
# Prerequisites:
#   - Rust + Cargo installed
#   - Tauri CLI installed: cargo install tauri-cli
#   - The source SVG at packages/identity/mark.svg (dark, 275x313)
#
# Usage (run from repo root):
#   bash packages/desktop/scripts/generate-icons.sh [dev|beta|prod]
#
# The script generates icons into packages/desktop/src-tauri/icons/<variant>/
# matching the paths referenced in tauri.conf.json / tauri.beta.conf.json / tauri.prod.conf.json

set -euo pipefail

VARIANT="${1:-dev}"
ICON_DIR="packages/desktop/src-tauri/icons/${VARIANT}"
SOURCE_SVG="packages/identity/mark.svg"

echo "Generating icons for variant: ${VARIANT}"
echo "Source SVG: ${SOURCE_SVG}"
echo "Output dir: ${ICON_DIR}"

# Tauri CLI generates all required sizes from a single 1024x1024 PNG.
# Step 1: Convert SVG → 1024x1024 PNG using Inkscape (if available) or rsvg-convert.
TEMP_PNG="packages/identity/icon-1024.png"

if command -v inkscape &>/dev/null; then
  echo "Using Inkscape to rasterize SVG..."
  inkscape --export-type=png --export-width=1024 --export-height=1024 \
    --export-filename="${TEMP_PNG}" "${SOURCE_SVG}"
elif command -v rsvg-convert &>/dev/null; then
  echo "Using rsvg-convert to rasterize SVG..."
  rsvg-convert -w 1024 -h 1024 -o "${TEMP_PNG}" "${SOURCE_SVG}"
elif command -v convert &>/dev/null; then
  echo "Using ImageMagick to rasterize SVG..."
  convert -background none -resize 1024x1024 "${SOURCE_SVG}" "${TEMP_PNG}"
else
  echo "ERROR: No SVG rasterizer found."
  echo "Install one of: inkscape, librsvg (rsvg-convert), or ImageMagick (convert)"
  exit 1
fi

echo "Rasterized to: ${TEMP_PNG}"

# Step 2: Run tauri icon to generate all sizes.
echo "Running: cargo tauri icon ${TEMP_PNG} --output ${ICON_DIR}"
cd packages/desktop
cargo tauri icon "../../${TEMP_PNG}" --output "src-tauri/icons/${VARIANT}"
cd ../..

echo ""
echo "Done! Icons written to ${ICON_DIR}"
echo "Files generated:"
ls -la "${ICON_DIR}/"
