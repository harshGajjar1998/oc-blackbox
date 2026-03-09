# Install & Run Blackbox AI on macOS (Another Machine)

Follow these step-by-step commands to clone, build, and run the Blackbox AI desktop app on a new Mac machine.

## Prerequisites

Install these tools first (if not already installed):

```bash
# Install Homebrew (if needed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Bun (JavaScript runtime)
curl -fsSL https://bun.sh/install | bash

# Install Rust (for Tauri/native compilation)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env
```

## Step 1: Clone the Repository

```bash
# Clone the repo to your machine
git clone https://github.com/harshGajjar1998/oc-blackbox.git

# Navigate into the project
cd oc-blackbox

# Checkout the Mac branch with the working build
git checkout Mac-Dev-v2.0
```

## Step 2: Install Dependencies

```bash
# Install all Node.js dependencies (this takes 2-5 minutes)
bun install
```

## Step 3: Build the Desktop App Bundle

```bash
# Build the macOS app and DMG installer
cd packages/desktop
bun run tauri build
```

This will:
- Compile the Rust backend
- Build the web UI (Solid.js)
- Create `Blackbox AI Dev.app` bundle
- Create a DMG installer file

**Build time:** ~5-10 minutes depending on machine

## Step 4: Run the Built App

**Option A: Open the compiled .app bundle (Fastest)**

```bash
open ./src-tauri/target/release/bundle/macos/Blackbox\ AI\ Dev.app
```

**Option B: Run from parent directory**

```bash
cd /path/to/oc-blackbox/packages/desktop
open ./src-tauri/target/release/bundle/macos/Blackbox\ AI\ Dev.app
```

The app window will open and load the Blackbox AI interface.

## One-Command Build & Launch

Use this shortcut to build and run in one go:

```bash
cd packages/desktop && bun run tauri build && open ./src-tauri/target/release/bundle/macos/Blackbox\ AI\ Dev.app
```

## Troubleshooting

### App stuck on loading screen
This is a known issue with debug builds. Use the release build above (Option A/B) which always works.

### "Command not found: bun"
Make sure Bun is installed:
```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash

# Add to PATH (add to ~/.zshrc or ~/.bash_profile)
export PATH=$HOME/.bun/bin:$PATH
```

### Build fails with Rust errors
Update Rust:
```bash
rustup update
```

### App won't launch (permission denied)
Fix permissions:
```bash
chmod +x ./src-tauri/target/release/bundle/macos/Blackbox\ AI\ Dev.app/Contents/MacOS/Blackbox\ AI\ Dev
open ./src-tauri/target/release/bundle/macos/Blackbox\ AI\ Dev.app
```

## File Locations

After successful build:

| File | Location |
|------|----------|
| **App Bundle** | `packages/desktop/src-tauri/target/release/bundle/macos/Blackbox AI Dev.app` |
| **DMG Installer** | `packages/desktop/src-tauri/target/release/bundle/dmg/Blackbox AI Dev_*.dmg` |
| **Binary** | `packages/desktop/src-tauri/target/release/Blackbox AI` |

## Next Steps

- **Development Mode** (with hot reload): See [DESKTOP_APP_TROUBLESHOOTING.md](./DESKTOP_APP_TROUBLESHOOTING.md)
- **Full Setup Guide**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Quick Reference**: See [QUICKSTART.md](./QUICKSTART.md)

## Quick Checklist

- [ ] Homebrew installed
- [ ] Bun installed
- [ ] Rust installed  
- [ ] Repository cloned
- [ ] `git checkout Mac-Dev-v2.0` executed
- [ ] `bun install` completed
- [ ] Build command ran successfully
- [ ] App opened and running
