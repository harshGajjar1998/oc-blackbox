# Blackbox AI Desktop

Native Blackbox AI desktop app, built with Tauri v2.

## Prerequisites

Building the desktop app requires additional Tauri dependencies (Rust toolchain, platform-specific libraries). See the [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/) for setup instructions.

## Development

From the repo root:

```bash
bun install
bun run doctor:desktop
bun run --cwd packages/desktop tauri dev
```

You can also run desktop dev with:

```bash
bun run dev:desktop
```

The sidecar target is auto-detected on Windows/macOS/Linux, so `RUST_TARGET` does not need to be set manually.

## Build

```bash
bun run --cwd packages/desktop tauri build
```

## Troubleshooting

### Rust compiler not found

If you see errors about Rust not being found, install it via [rustup](https://rustup.rs/):

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Windows-specific prerequisites

- Install Visual Studio Build Tools with the `Desktop development with C++` workload and Windows SDK.

### macOS-specific prerequisites

- Install Xcode Command Line Tools with `xcode-select --install`.
