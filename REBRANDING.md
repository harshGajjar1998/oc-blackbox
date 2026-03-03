# Blackbox AI — Re-branding Reference Document

> **Original project:** `opencode` (by anomalyco)  
> **Re-branded to:** `Blackbox AI`  
> **Repository:** `https://github.com/harshGajjar1998/oc-blackbox`  
> **Last updated:** 2025-07-11  
> **Status:** Phase 1 & Phase 2 complete ✅

---

## Table of Contents

1. [Overview](#overview)
2. [All Completed Changes](#all-completed-changes)
3. [Intentionally Untouched Files](#intentionally-untouched-files)
4. [Technical Constraints Explained](#technical-constraints-explained)
5. [Recommended Future Steps](#recommended-future-steps)

---

## Overview

This document tracks the complete re-branding effort from `opencode` → `Blackbox AI`. It serves as a reference for:
- Every file that was changed and exactly what was changed
- Every file that was **intentionally left untouched** and why
- The technical constraints that prevent certain renames without a full rebuild

---

## All Completed Changes

### Phase 1 — User-Facing & Storage Changes

---

#### 1. `install` (root install script)

| Before | After |
|--------|-------|
| `APP=opencode` | `APP=blackbox-ai` |
| `OpenCode Installer` | `Blackbox AI Installer` |
| `INSTALL_DIR=$HOME/.opencode/bin` | `INSTALL_DIR=$HOME/.blackbox-ai/bin` |
| `Installing opencode version:` | `Installing Blackbox AI version:` |
| `Installing opencode from:` | `Installing Blackbox AI from:` |
| `mv "$tmp_dir/opencode"` | `mv "$tmp_dir/blackbox-ai"` |
| `chmod 755 "${INSTALL_DIR}/opencode"` | `chmod 755 "${INSTALL_DIR}/blackbox-ai"` |
| `if command -v opencode` | `if command -v blackbox-ai` |
| `opencode --version` | `blackbox-ai --version` |
| `echo "opencode # Run command"` | `echo "blackbox-ai # Run command"` |
| `https://opencode.ai/install` | `https://blackbox.ai/install` |
| `https://opencode.ai/docs` | `https://blackbox.ai/docs` |
| `anomalyco/opencode` GitHub URLs | `harshGajjar1998/oc-blackbox` |
| `# opencode` PATH comment | `# blackbox-ai` |
| `OpenCode includes free models` | `Blackbox AI includes free models` |

---

#### 2. `packages/desktop/src/i18n/en.ts` (and all 14 other locales: ar, br, bs, da, de, es, fr, ja, ko, no, pl, ru, zh, zht)

| Before | After |
|--------|-------|
| `"use the 'opencode' command"` | `"use the 'blackbox-ai' command"` |

All 15 locale files updated: `en.ts`, `ar.ts`, `br.ts`, `bs.ts`, `da.ts`, `de.ts`, `es.ts`, `fr.ts`, `ja.ts`, `ko.ts`, `no.ts`, `pl.ts`, `ru.ts`, `zh.ts`, `zht.ts`

---

#### 3. `packages/desktop/src/i18n/index.ts`

| Before | After |
|--------|-------|
| `Store.load("opencode.global.dat")` | `Store.load("blackboxai.global.dat")` |

---

#### 4. `packages/desktop/src-tauri/tauri.conf.json`

| Before | After |
|--------|-------|
| `"identifier": "ai.opencode.desktop.dev"` | `"identifier": "ai.blackboxai.desktop.dev"` |
| `"schemes": ["opencode"]` | `"schemes": ["blackboxai"]` |

---

#### 5. `packages/desktop/src-tauri/src/cli.rs`

| Before | After |
|--------|-------|
| `CLI_INSTALL_DIR = ".opencode/bin"` | `CLI_INSTALL_DIR = ".blackbox-ai/bin"` |
| `CLI_BINARY_NAME = "opencode"` | `CLI_BINARY_NAME = "blackbox-ai"` |
| `"BIN=\"$HOME/.opencode/bin/opencode\""` (WSL path) | `"BIN=\"$HOME/.blackbox-ai/bin/blackbox-ai\""` |
| `curl -fsSL https://opencode.ai/install` | `curl -fsSL https://blackbox.ai/install` |
| `opencode-install.sh` (temp script name) | `blackbox-ai-install.sh` |
| `"Failed to spawn OpenCode Server"` (panic msg) | `"Failed to spawn Blackbox AI Server"` |

---

#### 6. `packages/desktop/src-tauri/src/constants.rs`

| Before | After |
|--------|-------|
| `SETTINGS_STORE = "opencode.settings.dat"` | `SETTINGS_STORE = "blackboxai.settings.dat"` |

---

#### 7. `packages/desktop/src-tauri/src/logging.rs`

| Before | After |
|--------|-------|
| `"opencode-desktop_{timestamp}.log"` | `"blackboxai-desktop_{timestamp}.log"` |

---

#### 8. `packages/desktop/src-tauri/src/linux_display.rs`

| Before | After |
|--------|-------|
| `"ai.opencode.desktop.dev"` | `"ai.blackboxai.desktop.dev"` |
| `"ai.opencode.desktop"` | `"ai.blackboxai.desktop"` |

---

#### 9. `packages/blackbox_ai/src/global/index.ts`

| Before | After |
|--------|-------|
| `const app = "opencode"` | `const app = "blackboxai"` |

**Effect:** All XDG data/config/cache directories now use `blackboxai` instead of `opencode` (e.g., `~/.local/share/blackboxai/`, `~/.config/blackboxai/`).

---

#### 10. `packages/blackbox_ai/src/storage/db.ts`

| Before | After |
|--------|-------|
| `"opencode.db"` (×3: Path export, log.info, BunDatabase constructor) | `"blackboxai.db"` |

---

#### 11. `packages/desktop/src-tauri/src/lib.rs`

| Before | After |
|--------|-------|
| `fn opencode_db_path()` | `fn blackboxai_db_path()` |
| `data_home.join("opencode").join("opencode.db")` | `data_home.join("blackboxai").join("blackboxai.db")` |
| `"Failed to spawn OpenCode Server"` | `"Failed to spawn Blackbox AI Server"` |

---

#### 12. `packages/blackbox_ai/src/server/server.ts`

| Before | After |
|--------|-------|
| `title: "opencode"` (×2 — in `/doc` route and `openapi()` fn) | `title: "Blackbox AI"` |
| `description: "opencode api"` (×2) | `description: "Blackbox AI API"` |

---

#### 13. `packages/blackbox_ai/src/server/mdns.ts`

| Before | After |
|--------|-------|
| `"opencode.local"` | `"blackboxai.local"` |
| `` `opencode-${port}` `` | `` `blackboxai-${port}` `` |

---

### Phase 2 — Post-Testing Audit Fixes

---

#### 14. `packages/blackbox_ai/src/index.ts`

| Before | After |
|--------|-------|
| `.scriptName("opencode")` | `.scriptName("blackbox-ai")` — CLI help text & usage output |
| `Log.Default.info("opencode", {...})` | `Log.Default.info("blackbox-ai", {...})` — startup log label |
| `path.join(Global.Path.data, "opencode.db")` | `path.join(Global.Path.data, "blackboxai.db")` — **CRITICAL**: DB migration marker must match `db.ts` |

> **Why the DB marker is critical:** On first run, the CLI checks if `blackboxai.db` exists to decide whether to run the one-time JSON→SQLite migration. If this string didn't match `db.ts`, the migration would re-run on every startup.

---

#### 15. `packages/blackbox_ai/src/mcp/index.ts`

| Before | After |
|--------|-------|
| `name: "opencode"` (×4 — remote transport, local transport, OAuth startAuth, all `new Client({...})` calls) | `name: "blackbox-ai"` — MCP client identity sent to MCP servers |
| `Run: opencode mcp auth ${key}` (user-facing toast) | `Run: blackbox-ai mcp auth ${key}` |
| `cmd === "opencode"` (local MCP binary detection) | `cmd === "blackbox-ai"` |

---

### Summary Table — All Changed Files

| # | File | Type of Change |
|---|------|----------------|
| 1 | `install` | Binary name, install dir, URLs, messages |
| 2–16 | `packages/desktop/src/i18n/*.ts` (15 files) | CLI install message string |
| 17 | `packages/desktop/src/i18n/index.ts` | Global store filename |
| 18 | `packages/desktop/src-tauri/tauri.conf.json` | App identifier, deep-link scheme |
| 19 | `packages/desktop/src-tauri/src/cli.rs` | Install dir, binary name, WSL path, URL, temp script |
| 20 | `packages/desktop/src-tauri/src/constants.rs` | Settings store filename |
| 21 | `packages/desktop/src-tauri/src/logging.rs` | Log filename prefix |
| 22 | `packages/desktop/src-tauri/src/linux_display.rs` | App identifier strings |
| 23 | `packages/blackbox_ai/src/global/index.ts` | XDG data directory name |
| 24 | `packages/blackbox_ai/src/storage/db.ts` | Database filename (×3) |
| 25 | `packages/desktop/src-tauri/src/lib.rs` | DB path function name + path strings |
| 26 | `packages/blackbox_ai/src/server/server.ts` | API title + description (×2 each) |
| 27 | `packages/blackbox_ai/src/server/mdns.ts` | mDNS service name + instance name |
| 28 | `packages/blackbox_ai/src/index.ts` | CLI script name, startup log, DB migration marker |
| 29 | `packages/blackbox_ai/src/mcp/index.ts` | MCP client name (×4), toast message, binary check |

---

## Intentionally Untouched Files

The following files contain `opencode` references that were **deliberately not changed** to keep the application running correctly. Each entry explains the reason.

---

### 🔴 Category 1: Rust ↔ TypeScript Communication Protocol

These are the env vars and credentials used by the Tauri desktop shell (Rust) to communicate with the Node.js sidecar process. Both sides must match exactly.

#### `OPENCODE_*` Environment Variables

**Files containing these (not changed):**
- `packages/blackbox_ai/src/flag.ts` — defines `Flag.OPENCODE_SERVER_PASSWORD`, `Flag.OPENCODE_SERVER_USERNAME`, `Flag.OPENCODE_CLIENT`, `Flag.OPENCODE_PORT`, etc.
- `packages/desktop/src-tauri/src/cli.rs` — sets `OPENCODE_SERVER_PASSWORD`, `OPENCODE_SERVER_USERNAME`, `OPENCODE_CLIENT`, `OPENCODE_PORT`
- `packages/blackbox_ai/src/server/server.ts` — reads `Flag.OPENCODE_SERVER_USERNAME`, `Flag.OPENCODE_SERVER_PASSWORD`
- `packages/blackbox_ai/src/session/llm.ts` — reads `Flag.OPENCODE_CLIENT`

**Why not changed:** These env vars are the **IPC protocol** between the Rust shell and the TypeScript sidecar. Changing one side without the other causes authentication failure → app won't start.

#### Basic Auth Username `"opencode"`

**Files containing this (not changed):**
- `packages/desktop/src-tauri/src/cli.rs` — `("OPENCODE_SERVER_USERNAME", "opencode".to_string())`
- `packages/blackbox_ai/src/server/server.ts` — `Flag.OPENCODE_SERVER_USERNAME ?? "opencode"`
- `packages/desktop/src-tauri/src/server.rs` — `req.basic_auth("opencode", Some(password))`

**Why not changed:** The username is part of the HTTP Basic Auth handshake. Must match on both sides simultaneously.

---

### 🔴 Category 2: Sidecar Binary Name

#### `opencode-cli` sidecar

**Files containing this (not changed):**
- `packages/desktop/src-tauri/tauri.conf.json` — `"externalBin": ["sidecars/opencode-cli"]`
- `packages/desktop/src-tauri/src/cli.rs` — `.join("opencode-cli")`
- `packages/desktop/src-tauri/sidecars/opencode-cli-x86_64-pc-windows-msvc.exe` — compiled binary

**Why not changed:** The sidecar is a compiled executable. Tauri's `externalBin` mechanism requires the filename to match exactly (including platform triple suffix). Renaming requires rebuilding the entire Tauri app with the new binary name.

---

### 🔴 Category 3: JavaScript Bridge

#### `window.__OPENCODE__`

**Files containing this (not changed):**
- `packages/desktop/src-tauri/src/windows.rs` — injects `window.__OPENCODE__ ??= {}`
- `packages/app/src/app.tsx` — TypeScript interface declaration
- `packages/desktop/src/index.tsx` — reads `window.__OPENCODE__?.wsl`, `.deepLinks`, `.updaterEnabled`

**Why not changed:** This is the JavaScript bridge between the Tauri WebView initialization script (Rust) and the SolidJS app (TypeScript). Changing one side without the other causes `undefined` reads → silent failures in WSL detection, deep links, and updater.

---

### 🟡 Category 4: HTTP API Protocol Headers

#### `x-opencode-directory` header

**Files containing this (not changed):**
- `packages/blackbox_ai/src/server/server.ts` — `c.req.header("x-opencode-directory")`
- `packages/sdk/js/src/client.ts` — sets `"x-opencode-directory"` header

**Why not changed:** This is an API protocol header used by all SDK clients. Changing it breaks all existing SDK integrations. Requires a coordinated SDK version bump.

#### `x-opencode-project`, `x-opencode-session`, `x-opencode-request`, `x-opencode-client` headers

**Files containing this (not changed):**
- `packages/blackbox_ai/src/session/llm.ts` — sets these headers on AI provider requests

**Why not changed:** Internal protocol headers. Low user visibility; changing them requires SDK coordination.

---

### 🟡 Category 5: npm Package Names

#### `@opencode-ai/*` packages

**Packages not renamed:**
- `@opencode-ai/app`, `@opencode-ai/ui`, `@opencode-ai/sdk`, `@opencode-ai/util`, `@opencode-ai/plugin`, `@opencode-ai/script`

**Files containing these (not changed):** Hundreds of `import` statements across all TypeScript source files.

**Why not changed:** Renaming npm packages requires updating every import statement, republishing to npm, and updating the bun workspace config. Low user visibility (internal imports only).

---

### 🟡 Category 6: Rust Crate Names

#### `opencode-desktop`, `opencode_lib`

**Files containing these (not changed):**
- `packages/desktop/src-tauri/Cargo.toml`
- `packages/desktop/src-tauri/src/logging.rs` — `EnvFilter::new("opencode_lib=debug,opencode_desktop=debug")`
- `packages/desktop/src-tauri/src/main.rs` — `use opencode_lib::...`

**Why not changed:** Rust crate names are used in `use` statements throughout the Rust source. The `EnvFilter` strings reference crate names for log filtering. Requires a full `cargo build` after renaming.

---

### 🟡 Category 7: User Config File Keys

#### `config.provider?.["opencode"]` provider config key

**Files containing this (not changed):**
- `packages/blackbox_ai/src/provider/provider.ts` — reads `config.provider?.["opencode"]?.options?.apiKey`

**Why not changed:** This reads from the user's `opencode.json` config file under the `"opencode"` provider key. Changing it would silently break all existing user configurations that have API keys set for the opencode provider.

---

### 🟡 Category 8: External Plugin & Extension Names

#### External plugin names

**Not changed:**
- `"opencode-anthropic-auth@0.0.13"` — external npm plugin
- `"opencode-openai-codex-auth"` — external npm plugin  
- `"opencode-copilot-auth"` — external npm plugin
- `@gitlab/opencode-gitlab-auth` — external GitLab package

**Why not changed:** These are third-party package names on npm. We don't control them.

#### VSCode extension ID

**Not changed:**
- `"sst-dev.opencode"` in `packages/blackbox_ai/src/ide/index.ts`

**Why not changed:** This is the published VS Code Marketplace extension ID. We cannot rename it without republishing.

---

### 🟡 Category 9: Git Branch Prefix

#### `opencode/${name}` worktree branch prefix

**File containing this (not changed):**
- `packages/blackbox_ai/src/worktree/index.ts` — `const branch = \`opencode/${name}\``

**Why not changed:** This creates git branches in the user's repository. Changing it would create branches with a different prefix going forward but wouldn't affect existing branches. Low risk but also low user visibility — left unchanged to avoid unexpected git branch naming changes.

---

### 🟡 Category 10: `.opencode` Config Directory

#### `.opencode/` project-level config directory

**Files containing this (not changed):**
- `packages/blackbox_ai/src/session/index.ts` — `path.join(Instance.worktree, ".opencode", "plans")`
- `packages/blackbox_ai/src/skill/skill.ts` — scans `.opencode/skill/` directories
- `packages/blackbox_ai/src/file/ripgrep.ts` — skips `.opencode` in file searches
- `packages/blackbox_ai/src/project/project.ts` — `path.join(dotgit, "opencode")` project ID file

**Why not changed:** The `.opencode/` directory is the **project-level configuration directory** that users create in their repositories. Renaming it would break all existing user projects that have `.opencode/` directories with config files, skills, and plans.

---

### 🟡 Category 11: User-Agent & API Title Headers

#### `"User-Agent": \`opencode/${VERSION}\``

**Files containing this (not changed):**
- `packages/blackbox_ai/src/plugin/copilot.ts` — sent to GitHub Copilot API
- `packages/blackbox_ai/src/plugin/codex.ts` — sent to OpenAI API
- `packages/blackbox_ai/src/session/llm.ts` — sent to AI providers
- `packages/blackbox_ai/src/provider/provider.ts` — sent to various AI providers

**Why not changed:** These are HTTP headers sent to external AI provider APIs. Changing the User-Agent is low risk but also low priority — external APIs don't validate this value.

#### `"X-Title": "opencode"`, `originator: "opencode"`

**Files containing this (not changed):**
- `packages/blackbox_ai/src/provider/provider.ts` — sent to OpenRouter, Cerebras, etc.
- `packages/blackbox_ai/src/plugin/codex.ts` — sent to OpenAI

**Why not changed:** These are metadata headers sent to AI providers for analytics/routing. No functional impact.

---

## Technical Constraints Explained

### The Two-Process Architecture

The desktop app uses a **two-process architecture** that makes protocol-level renames risky:

```
┌─────────────────────────────────────┐
│  Tauri Desktop Shell (Rust)         │
│  Blackbox AI.exe                    │
│                                     │
│  Sets env vars:                     │
│  - OPENCODE_SERVER_PASSWORD  ──┐    │
│  - OPENCODE_SERVER_USERNAME  ──┤    │
│  - OPENCODE_CLIENT=desktop   ──┤    │
│  - OPENCODE_PORT             ──┤    │
│                                │    │
│  Spawns sidecar:               │    │
│  opencode-cli.exe serve        │    │
└──────────────┬─────────────────┘    │
               │ HTTP (localhost)     │
               │ Basic Auth ──────────┘
               ▼
┌─────────────────────────────────────┐
│  Sidecar (Node.js/Bun)              │
│  opencode-cli.exe                   │
│                                     │
│  Reads env vars:                    │
│  - OPENCODE_SERVER_PASSWORD         │
│  - OPENCODE_SERVER_USERNAME         │
│  - OPENCODE_CLIENT                  │
│                                     │
│  Serves HTTP API on localhost       │
└─────────────────────────────────────┘
```

Any rename of the communication protocol requires **simultaneous changes on both sides** and a **full rebuild** of both the Rust binary and the TypeScript sidecar.

---

## Recommended Future Steps

### Already Done ✅
- All 29 user-facing files updated (binary names, install dirs, store filenames, DB filenames, log filenames, app identifiers, mDNS names, API titles, CLI script name, MCP client name)

### Next: Protocol Changes (Medium Risk — Requires Coordinated Rebuild)
1. Rename `OPENCODE_*` env vars → `BLACKBOXAI_*` (change `flag.ts` + `cli.rs` simultaneously)
2. Rename basic auth username `"opencode"` → `"blackboxai"` (change `cli.rs` + `server.ts` + `server.rs`)
3. Rename `window.__OPENCODE__` → `window.__BLACKBOXAI__` (change `windows.rs` + `app.tsx` + `index.tsx`)
4. Rename `x-opencode-directory` header (requires SDK version bump + client update)

### Next: Binary/Package Renames (High Risk — Requires Full Rebuild)
1. Rename sidecar binary `opencode-cli` → `blackboxai-cli` (rename file + update `tauri.conf.json` + `cli.rs` + rebuild)
2. Rename npm packages `@opencode-ai/*` → `@blackboxai/*` (global import replacement + republish)
3. Rename Rust crates `opencode_lib` → `blackboxai_lib` (update `Cargo.toml` + all `use` statements + rebuild)

### Next: Config & External Assets
1. Rename `.opencode/` project config dir → `.blackboxai/` (with migration for existing users)
2. Rename `opencode/${branch}` git branch prefix → `blackboxai/${branch}`
3. Republish VS Code extension with new command IDs
4. Update User-Agent headers to `blackbox-ai/${VERSION}`

---

*Document maintained by: Blackbox AI Engineering*
