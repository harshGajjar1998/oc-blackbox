# Desktop App Startup Troubleshooting & Solutions

## Issue Diagnosed
The desktop app was getting stuck on the loading screen because the frontend dev server (Vite) wasn't properly connecting.

## Root Cause
When running `bun run dev:desktop`, the system should:
1. Run `predev` script (builds backend/sidecar)
2. Start Vite dev server on localhost:1420
3. Start Tauri desktop app that loads from localhost:1420

However, there's a coordination issue where the Vite dev server isn't reliably starting before the Tauri app tries to connect.

---

## Solution 1: Run Backend Dev Server Only (Recommended for Now)

Build the app bundle and run it directly (no hot reload):
```bash
cd /Users/janakdevgania/Documents/oc-blackbox/dev-v2.0/oc-blackbox

# Build the app
bun run --cwd packages/desktop tauri build

# Run the built app
open "packages/desktop/src-tauri/target/release/bundle/macos/Blackbox AI Dev.app"
```

**Pros**: Works reliably, clean separation  
**Cons**: No hot reload on code changes

---

## Solution 2: Manual Two-Terminal Setup (Development)

### Terminal 1 - Start Vite Dev Server
```bash
cd /Users/janakdevgania/Documents/oc-blackbox/dev-v2.0/oc-blackbox/packages/desktop
bun run predev      # Build backend once
bunx vite           # Start Vite on localhost:1420
```
Output should show:
```
  VITE v7.1.4  ready in 223 ms
  ➜  Local:   http://localhost:1420/
```

### Terminal 2 - Start Tauri Dev App
```bash
cd /Users/janakdevgania/Documents/oc-blackbox/dev-v2.0/oc-blackbox/packages/desktop
bunx tauri dev --no-dev-server
```

**Pros**: Works reliably, full hot reload control  
**Cons**: Requires two terminals, manual setup

---

## Solution 3: Fix the Root Dev Command

The issue is in how `bun run dev:desktop` orchestrates the processes. This needs investigation/fix in Tauri configuration.

**For now**: Use Solution 1 or 2 above.

---

## Web App Only (No Desktop)

If you want to test just the web app without the desktop wrapper:
```bash
cd /Users/janakdevgania/Documents/oc-blackbox/dev-v2.0/oc-blackbox
bun run dev:web
```
Opens at http://localhost:5173/

---

## Environment Info

- **Vite Console Port**: localhost:1420
- **Vite HMR Port**: localhost:1421 (for hot module reload)
- **Web Dev Port**: http://localhost:5173/
- **Tauri Sidecar**: Compiled to `packages/desktop/src-tauri/sidecars/opencode-cli-aarch64-apple-darwin`

---

## Next Steps

**Recommended approach for development**:
1. Use Solution 2 (two terminals) for active development with hot reload
2. Or build and run (Solution 1) for testing distributable builds
3. Report the root cause issue to team for a permanent fix

---

## Reference Logs

From ~/Library/Logs/ai.opencode.desktop.dev/:
```
2026-03-09T19:23:26.297325Z  INFO opencode_lib: Initializing app
2026-03-09T19:23:26.297446Z  INFO opencode_lib: Main and loading windows created
2026-03-09T19:23:26.297555Z DEBUG opencode_lib: Showing main window without loading window
2026-03-09T19:23:26.298052Z  INFO opencode_lib: Setting up server connection
```
(Stops here - waiting for server to respond)

This reveals the app successfully initializes UI but can't connect to the dev server.
