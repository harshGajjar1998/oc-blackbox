# Build Blackbox AI Desktop on a New Mac

This guide covers cloning the repo, installing dependencies, and producing a macOS desktop package (`.dmg` and `.app`).

## 1) Install system prerequisites

### Xcode Command Line Tools
```bash
xcode-select --install
```

### Homebrew (if missing)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Bun
```bash
brew install oven-sh/bun/bun
```

### Rust toolchain (cargo + rustc)
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
```

### Verify tooling
```bash
bun --version
cargo --version
rustc --version
```

---

## 2) Clone the branch and install repo dependencies

```bash
git clone -b oc-blackboxai https://github.com/harshGajjar1998/oc-blackbox.git
cd oc-blackbox
bun install
```

---

## 3) Build the desktop sidecar (required before packaging)

The desktop app bundles a sidecar binary from `packages/blackbox_ai`. Build and copy it first:

```bash
bun run --cwd packages/desktop predev
```

If you want to force-refresh sidecars:

```bash
rm -rf packages/desktop/src-tauri/sidecars
bun run --cwd packages/desktop predev
```

---

## 4) Build macOS desktop package

From repo root:

```bash
bun run --cwd packages/desktop tauri build
```

Expected output artifacts:
- `packages/desktop/src-tauri/target/release/bundle/dmg/*.dmg`
- `packages/desktop/src-tauri/target/release/bundle/macos/*.app`

---

## 5) Run in development mode (optional)

```bash
bun run dev:desktop
```

---

## Troubleshooting

### `tauri` or Rust not found
- Re-open terminal after installing Rust/Bun.
- Ensure `~/.cargo/bin` is on your `PATH`.

### Sidecar missing during build
Run:
```bash
bun run --cwd packages/desktop predev
```
then rebuild:
```bash
bun run --cwd packages/desktop tauri build
```

### Apple Silicon vs Intel target issues
By default, build targets your current Mac architecture.
If you need Intel artifacts from Apple Silicon, add:
```bash
rustup target add x86_64-apple-darwin
```
and configure the Tauri target as needed.

### App signing/notarization
This flow builds local unsigned artifacts. Distribution outside your own machine may require Apple signing/notarization setup.
