# Quick Copy-Paste Commands for Another Mac

## ⚡ TL;DR - Just Copy & Paste These Commands

### Step 1: Install Requirements (one time only)

```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash
export PATH=$HOME/.bun/bin:$PATH

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source ~/.cargo/env
```

### Step 2: Clone & Setup

```bash
# Clone the repo
git clone https://github.com/harshGajjar1998/oc-blackbox.git
cd oc-blackbox
git checkout Mac-Dev-v2.0

# Install all dependencies
bun install
```

### Step 3: Build

```bash
# Build the app
cd packages/desktop
bun run tauri build
```

Time: ~5-10 minutes

### Step 4: Run

```bash
# Launch the built app
open ./src-tauri/target/release/bundle/macos/Blackbox\ AI\ Dev.app
```

---

## 🔄 Next Time (After First Setup)

Just run this to launch the app (no rebuild needed):

```bash
cd ~/oc-blackbox/packages/desktop
open ./src-tauri/target/release/bundle/macos/Blackbox\ AI\ Dev.app
```

Or to rebuild and run:

```bash
cd ~/oc-blackbox/packages/desktop
bun run tauri build && open ./src-tauri/target/release/bundle/macos/Blackbox\ AI\ Dev.app
```

---

## 📁 App Locations After Build

```
~/oc-blackbox/packages/desktop/src-tauri/target/release/bundle/macos/Blackbox AI Dev.app
~/oc-blackbox/packages/desktop/src-tauri/target/release/bundle/dmg/Blackbox AI Dev*.dmg
```

## ⚠️ If Something Breaks

```bash
# Update Rust
rustup update

# Reinstall dependencies
cd ~/oc-blackbox
bun install

# Rebuild from scratch
cd packages/desktop
rm -rf src-tauri/target
bun run tauri build
```
