# Installation TODO

## Steps

- [x] 1. Global replace `@opencode-ai` → `@blackbox-ai` in all source files under `packages/` (excluding node_modules)
- [x] 2. Run `bun install` to refresh workspace links
- [x] 3. Start the web app (`bun run --cwd packages/app dev`) — running at http://localhost:3000/ (HTTP 200 verified)
- [x] 4. Start the desktop app (`bun run --cwd packages/desktop tauri dev`) — fixed `ocBinary` names in `packages/desktop/scripts/utils.ts` (`opencode-*` → `blackbox-ai-*`), Tauri process running, sidecar server on http://127.0.0.1:64703
- [x] 5. Fix `.opencode/tool/github-pr-search.ts` — import updated `@opencode-ai/plugin` → `@blackbox-ai/plugin`
- [x] 6. Fix `.opencode/tool/github-triage.ts` — import updated `@opencode-ai/plugin` → `@blackbox-ai/plugin`
- [x] 7. Fix `packages/opencode/src/config/config.ts` — `needsInstall` and `installDependencies` skip `@blackbox-ai/plugin` npm install in local dev mode (package not yet published; resolved via workspace `node_modules`)
- [x] 8. Start opencode server (`bun run --cwd packages/opencode --conditions=browser src/index.ts serve --port 4096`) — running at http://127.0.0.1:4096, health: `{"healthy":true,"version":"local"}`
- [x] 9. Verified all services running:
  - OpenCode server (port 4096): `{"healthy":true,"version":"local"}` ✅
  - Web app (port 3000): HTTP 200 ✅
  - Desktop Vite dev server (port 1420): HTTP 200 ✅
  - `opencode-desktop.exe` process: running ✅
  - `opencode-cli` sidecar process: running on port 63244 ✅
  - API endpoints verified: `/global/health`, `/agent`, `/path`, `/skill` all return JSON ✅
