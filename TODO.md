# Blackbox AI IDE — Master TODO

## Phase 1: Re-branding (opencode → Blackbox AI) ✅ COMPLETE

All user-facing strings, UI labels, and branding updated across 29 files.

### Completed Files
- [x] `packages/desktop/src/i18n/en.ts` + 14 other locale files (ar, br, bs, da, de, es, fr, ja, ko, no, pl, ru, zh, zht)
- [x] `packages/desktop/src/i18n/index.ts`
- [x] `packages/desktop/src-tauri/tauri.conf.json` — app name, identifier, window title
- [x] `packages/desktop/src-tauri/src/cli.rs` — CLI help text
- [x] `packages/desktop/src-tauri/src/constants.rs` — app constants
- [x] `packages/desktop/src-tauri/src/logging.rs` — log file names
- [x] `packages/desktop/src-tauri/src/linux_display.rs` — Linux display name
- [x] `packages/desktop/src-tauri/src/lib.rs` — Tauri app setup
- [x] `packages/blackbox_ai/src/global/index.ts` — global app name
- [x] `packages/blackbox_ai/src/storage/db.ts` — database path
- [x] `packages/blackbox_ai/src/server/server.ts` — API title "Blackbox AI"
- [x] `packages/blackbox_ai/src/server/mdns.ts` — mDNS service name
- [x] `packages/blackbox_ai/src/index.ts` — main entry
- [x] `packages/blackbox_ai/src/mcp/index.ts` — MCP server name

### NOT Changed (Protocol/Internal — intentional)
- `OPENCODE_*` env vars (flag.ts) — internal protocol, not user-facing
- `opencode-cli` sidecar binary name — binary name, not user-facing
- `window.__OPENCODE__` — internal JS global
- `x-opencode-*` HTTP headers — internal protocol
- `@opencode-ai/*` npm packages — upstream dependency names
- `.opencode/` config directory — user config dir (migration needed separately)

---

## Phase 2: Remaining Rebranding Fixes ✅ COMPLETE

- [x] Fixed all user-facing "opencode" strings in i18n files
- [x] Verified TypeScript typecheck passes for `packages/blackbox_ai`
- [x] Verified TypeScript typecheck passes for `packages/desktop`
- [x] Verified web UI at `http://localhost:3000` shows "Blackbox AI"
- [x] Verified server.ts API title confirmed "Blackbox AI"

---

## Phase 3: API Research & Requirements Analysis ✅ COMPLETE

- [x] Created `REBRANDING.md` — comprehensive re-branding reference
- [x] Created `BLACKBOXAI_REQUIREMENTS.md` v1.0 — initial requirements doc
- [x] Fetched `https://docs.blackbox.ai/api-reference/chat` — confirmed OpenAI-compatible API
- [x] Fetched `https://docs.blackbox.ai/api-reference/models/chat-models.md` — got full model list (300+)
- [x] Fetched `https://docs.blackbox.ai/api-reference/models/chat-pricing.md` — got pricing table

---

## Phase 4: Live API Testing ✅ COMPLETE

All 4 critical tests passed with API key `sk-VtGedoIpoHzL0_Kl0NRiuA`:

- [x] **Test 1:** `POST /chat/completions` (non-streaming) → HTTP 200 ✅
- [x] **Test 2:** `POST /chat/completions` (streaming SSE) → HTTP 200, `data: [DONE]` ✅
- [x] **Test 3:** `GET /v1/models` → HTTP 200, 300+ models ✅
- [x] **Test 4:** Tool calling → `finish_reason: "tool_calls"` ✅

### Key Discoveries from Testing
- [x] Models endpoint is `/v1/models` (not `/models`)
- [x] Model IDs require `blackboxai/` prefix (e.g., `blackboxai/openai/gpt-4o-mini`)
- [x] Cost data returned inline in every response (`cost`, `cost_details`)
- [x] Pricing page uses shorter IDs without `blackboxai/` prefix
- [x] Updated `BLACKBOXAI_REQUIREMENTS.md` to v3.0 with all confirmed findings

---

## Phase 5: Backend Integration — READY TO IMPLEMENT 🔴

### 5.1 — Add Blackbox AI Provider
**File:** `packages/blackbox_ai/src/provider/provider.ts`
- [ ] Add `"blackbox-ai"` entry to `CUSTOM_LOADERS`
- [ ] Use `@ai-sdk/openai-compatible` with `baseURL: "https://api.blackbox.ai"`
- [ ] Read API key from `Auth.get("blackbox-ai")` or `Env.get("BLACKBOXAI_API_KEY")`
- [ ] Support enterprise URL override from config
- [ ] Fix remaining `"X-Title": "opencode"` → `"X-Title": "Blackbox AI"` in openrouter/vercel/zenmux/kilo loaders

### 5.2 — Update Models Registry
**File:** `packages/blackbox_ai/src/provider/models.ts`
- [ ] Change models URL from `https://models.dev/api.json` to `https://api.blackbox.ai/v1/models`
- [ ] Write response adapter: Blackbox `{ data: [{ id, object, ... }] }` → models.dev `{ "id": { id, name, cost, limit, ... } }` format
- [ ] Map `blackboxai/{provider}/{model}` IDs to display names using pricing table
- [ ] Add context window sizes from pricing table
- [ ] Add cost data from pricing table (input/output per 1M tokens)

### 5.3 — Add Auth Command
**File:** `packages/blackbox_ai/src/cli/cmd/auth.ts`
- [ ] Add `"blackbox-ai"` to the list of API key auth providers
- [ ] Set dashboard URL to `https://app.blackbox.ai/dashboard`
- [ ] Support `BLACKBOXAI_API_KEY` environment variable

### 5.4 — Update User Agent
**File:** `packages/blackbox_ai/src/installation/index.ts`
- [ ] Change `USER_AGENT` from `opencode/{channel}/{version}/{client}` to `blackbox-ai/{channel}/{version}/{client}`

### 5.5 — Update Share Service (Optional)
**File:** `packages/blackbox_ai/src/share/share-next.ts`
- [ ] Either: Replace `https://opncd.ai` with Blackbox AI share service URL
- [ ] Or: Disable sharing feature until Blackbox AI provides share service

### 5.6 — Update Auto-Update Package Name
**File:** `packages/blackbox_ai/src/installation/index.ts`
- [ ] Change npm package name from `opencode-ai` to Blackbox AI package name (pending from team)

---

## Phase 6: Distribution & Packaging — PENDING TEAM INPUT 🟡

- [ ] Get npm package name from Blackbox AI team
- [ ] Get GitHub repo URL for curl-based installs
- [ ] Get Brew formula name (macOS)
- [ ] Get Chocolatey/Scoop package name (Windows)
- [ ] Update `install` script with new package name
- [ ] Update all README files with new install instructions

---

## Phase 7: Branding Assets — PENDING TEAM INPUT 🟡

- [ ] Get app icon: PNG 512×512, ICO (Windows), ICNS (macOS)
- [ ] Get tray icon: PNG 16×16, 32×32 (dark + light variants)
- [ ] Replace `packages/identity/mark*.png` and `mark*.svg` with Blackbox AI assets
- [ ] Update `packages/desktop/src-tauri/tauri.conf.json` icon paths

---

## Phase 8: Testing & Verification — AFTER PHASE 5

- [ ] Run `bun typecheck` on `packages/blackbox_ai`
- [ ] Run `bun typecheck` on `packages/desktop`
- [ ] Test `blackbox-ai auth blackbox-ai` command with real API key
- [ ] Test model list loads in UI from Blackbox AI endpoint
- [ ] Test chat completion works end-to-end in UI
- [ ] Test streaming works in UI
- [ ] Test tool calling works (file read/write, bash commands)
- [ ] Test enterprise URL override works

---

## Summary

| Phase | Status | Description |
|-------|--------|-------------|
| 1 — Rebranding | ✅ Complete | 29 files updated |
| 2 — Rebranding fixes | ✅ Complete | TypeScript checks pass |
| 3 — API Research | ✅ Complete | All docs fetched |
| 4 — Live API Testing | ✅ Complete | 4/4 tests passed |
| 5 — Backend Integration | 🔴 Ready | 6 code changes needed |
| 6 — Distribution | 🟡 Blocked | Waiting for npm package name |
| 7 — Branding Assets | 🟡 Blocked | Waiting for icon files |
| 8 — Testing | ⬜ Pending | After Phase 5 |

**Next action: Implement Phase 5 (5 files, ~100 lines of code)**
