# Blackbox AI Desktop App - Setup & Installation Guide

## Overview
This is a monorepo project using Bun as the package manager and Tauri for the desktop application framework.

---

## Prerequisites

### Required Tools
- **Bun** (v1.3.9+): JavaScript runtime & package manager
  - Install: `curl -fsSL https://bun.sh/install | bash`
  - Verify: `bun --version`

- **Node.js** (v18+): For compatibility with some tools
  - Install: `https://nodejs.org/` or `brew install node` (macOS)

- **Git**: For cloning the repository
  - Install: `brew install git` (macOS) or `choco install git` (Windows)

### Platform-Specific Requirements

**macOS:**
- Xcode Command Line Tools: `xcode-select --install`
- Rust (for Tauri): `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

**Windows:**
- Visual C++ Build Tools or Visual Studio Community (with C++ workload)
- WebView2 Runtime: https://developer.microsoft.com/en-us/microsoft-edge/webview2/

**Linux:**
- GCC/Clang: `sudo apt-get install build-essential`
- Webkit2GTK: `sudo apt-get install libwebkit2gtk-4.0-dev`
- OpenSSL: `sudo apt-get install libssl-dev`

---

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/harshGajjar1998/oc-blackbox.git
cd oc-blackbox
git checkout Mac-Dev-v2.0  # Check out the latest build branch
```

### 2. Install Dependencies
```bash
bun install
```
This will install all workspace dependencies and set up Husky hooks.

### 3. Verify Installation
```bash
bun --version
git --version
cargo --version  # Rust (for Tauri compilation)
```

---

## Running the Desktop App

### Development Mode (with hot reload)
```bash
bun run dev:desktop
```
This launches the Tauri development server with live reloading. The desktop app window will open automatically.

**What happens:**
- Vite dev server starts on `localhost:5173`
- Tauri dev server compiles Rust backend
- Desktop app window opens with dev tools accessible (F12)
- Changes to UI code auto-reload

### Production Build
```bash
bun run --cwd packages/desktop tauri build
```
This creates optimized builds:
- **macOS**: `packages/desktop/src-tauri/target/release/bundle/macos/Blackbox AI Dev.app`
- **macOS DMG**: `packages/desktop/src-tauri/target/release/bundle/dmg/Blackbox AI Dev_*.dmg`
- **Windows**: `.msi` installer and `.exe` files
- **Linux**: `.deb` or AppImage packages

### Run Built App (macOS)
```bash
# Open the .app directly
open "packages/desktop/src-tauri/target/release/bundle/macos/Blackbox AI Dev.app"

# Or double-click the DMG and drag to Applications folder
open "packages/desktop/src-tauri/target/release/bundle/dmg/"
```

---

## Project Structure

```
oc-blackbox/
├── packages/
│   ├── app/                 # Web app (Vite + Solid.js)
│   ├── desktop/             # Tauri desktop wrapper
│   │   ├── src/             # UI/Frontend code
│   │   ├── src-tauri/       # Rust backend
│   │   ├── vite.config.ts
│   │   └── package.json
│   ├── blackbox_ai/         # AI backend services
│   ├── ui/                  # Shared UI components
│   ├── sdk/                 # SDK packages
│   └── ...
├── .gitignore               # Excludes build artifacts, dependencies
├── package.json             # Root workspace config
├── bun.lock                 # Dependency lock file
└── tsconfig.json           # TypeScript config

Key Build Artifacts (Excluded from Git):
- node_modules/
- packages/desktop/target/       (Rust build output)
- packages/*/dist/               (Compiled code)
- packages/desktop/src-tauri/sidecars-*  (Platform-specific binaries)
```

---

## Troubleshooting

### Bun Command Not Found
```bash
# Add bun to PATH (if not done during install)
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
```

### Port 5173 Already in Use
```bash
# Kill the process on that port or use a different port
bun run --cwd packages/desktop tauri dev -- --port 5174
```

### Tauri Build Fails (macOS)
```bash
# Ensure Rust is updated
rustup update

# Clear Rust build cache if needed
cargo clean
```

### Dependencies Installation Hangs
```bash
# Try installing with verbose output
bun install --verbose

# Or clear cache and retry
bun cache clean
bun install
```

### Pre-push Hook Errors
If git pre-push hooks fail during commits, you can bypass with:
```bash
git commit -m "message" --no-verify
git push --no-verify
```

---

## Common Tasks

### TypeCheck the Project
```bash
bun run typecheck
```

### Run Web App Only
```bash
bun run dev:web
```

### Update Dependencies
```bash
bun update
bun install
```

### Clean Build Artifacts
```bash
cargo clean
rm -rf packages/*/dist
rm -rf packages/desktop/src-tauri/target
```

---

## What's New in This Build (Mac-Dev-v2.0)

✅ **macOS DMG Installer**: Created optimized DMG installer for Apple Silicon (aarch64)
✅ **Fresh Git History**: Clean repository with no build artifacts tracked
✅ **Proper .gitignore**: Excludes large binaries, node_modules, and compiled outputs
✅ **Configured Git User**: Sets `harshGajjar1988` as committer (update with your info)

---

## Environment Setup Notes

### Git Configuration (Per Machine)
```bash
# Set local user for this machine
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Verify
git config --local user.name
git config --local user.email
```

### Environment Variables (if needed)
Create `.env` file in root or use `.env.local`:
```
# Example - not required for basic dev
VITE_API_URL=http://localhost:8000
```

---

## Support

For issues or questions:
1. Check the [main README.md](./README.md)
2. Look in `packages/desktop/README.md` for desktop-specific docs
3. Review [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines

