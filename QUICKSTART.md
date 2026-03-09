# Quick Start Guide - Blackbox AI Desktop

## For You (Current Machine)

### First Time Setup
```bash
cd ~/Documents/oc-blackbox/dev-v2.0/oc-blackbox
bun install
```

### Run the App (Development)
```bash
bun run dev:desktop
```
Opens the app with live reload capability. Changes to code auto-refresh.

### Run the App (Production Build)
```bash
bun run --cwd packages/desktop tauri build
open "packages/desktop/src-tauri/target/release/bundle/dmg/"
```

---

## For Others (After Cloning)

### Minimal Setup (3 Steps)
```bash
# 1. Clone and checkout the branch
git clone https://github.com/harshGajjar1998/oc-blackbox.git
cd oc-blackbox
git checkout Mac-Dev-v2.0

# 2. Install dependencies
bun install

# 3. Run the app
bun run dev:desktop
```

### If They Don't Have Bun
```bash
# Install Bun first (one-time)
curl -fsSL https://bun.sh/install | bash

# Then follow the 3 steps above
```

---

## Development Commands Summary

| Command | What It Does |
|---------|-------------|
| `bun install` | Install all dependencies |
| `bun run dev:desktop` | Run app with live reload |
| `bun run dev:web` | Run web app only |
| `bun run typecheck` | Check TypeScript errors |
| `bun run --cwd packages/desktop tauri build` | Build production app |

---

## Build Artifacts Location

- **macOS App**: `packages/desktop/src-tauri/target/release/bundle/macos/Blackbox AI Dev.app`
- **macOS DMG**: `packages/desktop/src-tauri/target/release/bundle/dmg/Blackbox AI Dev_1.2.14_aarch64.dmg`
- **Web Build**: `packages/app/dist/`

---

## Troubleshooting Quick Fixes

| Issue | Fix |
|-------|-----|
| "bun: command not found" | Add to PATH: `export PATH="$HOME/.bun/bin:$PATH"` |
| Port 5173 busy | Port auto-increments or use dev tools in Tauri |
| Dependencies fail to install | Run `bun cache clean && bun install` |
| Tauri build fails | Run `rustup update && cargo clean` |

---

## Current Status

✅ App Running: `bun run dev:desktop`  
✅ All Dependencies Installed  
✅ Mac-Dev-v2.0 Branch: Ready for use  
✅ Git User: `harshGajjar1988`  

---

## Next Steps

1. **Test the App**: Verify all features work correctly
2. **Create PR**: Ready to merge into main branch
3. **Document Features**: Add feature docs as needed
4. **CI/CD Setup**: Configure automated builds if needed

See `SETUP_GUIDE.md` for detailed documentation.
