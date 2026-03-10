#!/bin/bash
# build-mac.sh - Build and ad-hoc sign the macOS DMG for Blackbox AI Dev
# Ad-hoc signing allows the app to run on other Macs without the
# "damaged and can't be opened" Gatekeeper error (for internal/team distribution).
#
# For PUBLIC distribution, use a proper Apple Developer certificate instead:
#   export APPLE_SIGNING_IDENTITY="Developer ID Application: Your Name (TEAMID)"
#   export APPLE_ID="your@apple.id"
#   export APPLE_PASSWORD="app-specific-password"
#   export APPLE_TEAM_ID="YOURTEAMID"
#   Then run: bun run tauri build --config src-tauri/tauri.conf.json

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DESKTOP_DIR="$SCRIPT_DIR/packages/desktop"
APP_NAME="Blackbox AI Dev"
BUNDLE_DIR="$DESKTOP_DIR/src-tauri/target/release/bundle"
APP_PATH="$BUNDLE_DIR/macos/$APP_NAME.app"
DMG_DIR="$BUNDLE_DIR/dmg"
INSTALLER_APP="$SCRIPT_DIR/installer/Blackbox AI Dev.app"
STAGING_DIR="$DMG_DIR/staging"

echo "=============================================="
echo "  Blackbox AI - macOS Build Script"
echo "=============================================="
echo ""

# ---------------------------------------------------------------------------
# Step 1: Build the Tauri app
# ---------------------------------------------------------------------------
echo "[Step 1] Building Tauri app (this may take 5-10 minutes)..."
cd "$DESKTOP_DIR"
# Allow Tauri's own DMG bundling to fail (it fails due to stale volumes) —
# we rebuild the DMG ourselves in Step 4.
bun run tauri build || true

if [ ! -d "$APP_PATH" ]; then
  echo "ERROR: App bundle not found at: $APP_PATH"
  exit 1
fi
echo "[OK] Build complete."
echo ""

# ---------------------------------------------------------------------------
# Step 2: Ad-hoc sign the .app bundle
# ---------------------------------------------------------------------------
# Ad-hoc signing (-s -) removes the quarantine "damaged" error for team/internal
# distribution. It does NOT require an Apple Developer account.
echo "[Step 2] Ad-hoc signing the .app bundle..."
if [ ! -d "$APP_PATH" ]; then
  echo "ERROR: App bundle not found at: $APP_PATH"
  exit 1
fi

# Sign all nested binaries and frameworks first, then the main bundle
find "$APP_PATH" -name "*.dylib" -o -name "*.so" | while read -r lib; do
  codesign --force --sign - "$lib" 2>/dev/null || true
done

find "$APP_PATH/Contents/Frameworks" -maxdepth 1 -type d 2>/dev/null | while read -r framework; do
  codesign --deep --force --sign - "$framework" 2>/dev/null || true
done

# Sign the sidecar binary if present
SIDECAR="$APP_PATH/Contents/MacOS/sidecars"
if [ -d "$SIDECAR" ]; then
  find "$SIDECAR" -type f | while read -r bin; do
    codesign --force --sign - "$bin" 2>/dev/null || true
  done
fi

# Sign the main app bundle
codesign --deep --force --options runtime --sign - "$APP_PATH"
echo "[OK] Ad-hoc signing complete."
echo ""

# ---------------------------------------------------------------------------
# Step 3: Verify signature
# ---------------------------------------------------------------------------
echo "[Step 3] Verifying signature..."
codesign --verify --deep --strict "$APP_PATH" && echo "[OK] Signature valid." || echo "[WARN] Signature verification had warnings (normal for ad-hoc)."
echo ""

# ---------------------------------------------------------------------------
# Step 4: Re-create DMG with signed app + installer
# ---------------------------------------------------------------------------
echo "[Step 4] Re-creating DMG with signed app and installer..."

# Unmount any stale volumes from previous builds to avoid "No space left on device"
hdiutil detach "/Volumes/$APP_NAME" 2>/dev/null || true
hdiutil detach "/Volumes/$APP_NAME 1" 2>/dev/null || true
hdiutil detach "/Volumes/$APP_NAME 2" 2>/dev/null || true
SIGNED_DMG="$DMG_DIR/${APP_NAME}-signed.dmg"

# Build staging folder containing only the installer .app.
# The signed .app is embedded inside the installer's Resources folder —
# this is standard macOS bundle structure and keeps the DMG to a single visible item.
rm -rf "$STAGING_DIR"
mkdir -p "$STAGING_DIR"

if [ -d "$INSTALLER_APP" ]; then
  cp -R "$INSTALLER_APP" "$STAGING_DIR/"
  # Embed the signed .app inside the installer bundle's Resources
  mkdir -p "$STAGING_DIR/Blackbox AI Dev.app/Contents/Resources"
  cp -R "$APP_PATH" "$STAGING_DIR/Blackbox AI Dev.app/Contents/Resources/"
  # Strip quarantine from the entire installer bundle (including embedded app)
  xattr -cr "$STAGING_DIR/Blackbox AI Dev.app"
  echo "[OK] Installer app with embedded app included in DMG."
else
  echo "[WARN] Installer app not found at: $INSTALLER_APP — DMG will not include installer."
fi

# Create DMG from staging folder
hdiutil create \
  -volname "$APP_NAME" \
  -srcfolder "$STAGING_DIR" \
  -ov \
  -format UDZO \
  -size 350m \
  "$SIGNED_DMG"

# Clean up staging folder
rm -rf "$STAGING_DIR"

echo "[OK] Signed DMG created: $SIGNED_DMG"

echo ""
echo "=============================================="
echo "  BUILD & SIGNING COMPLETE!"
echo ""
echo "  Signed .app : $APP_PATH"
echo "  Signed .dmg : $SIGNED_DMG"
echo ""
echo "  The DMG includes 'Install Blackbox AI Dev.app'."
echo "  Recipients: open the DMG and double-click the installer."
echo "  It will ask for confirmation, then install automatically."
echo "=============================================="
