# Fix: Windows EXE fails on different machine ("Failed to get server status")

## Root Cause
`serve()` in `cli.rs` panics via `.expect()` when the sidecar binary fails to spawn.
This panic drops `server_ready_tx` without sending, causing the generic "Failed to get server status" error.

## Steps

- [x] Understand codebase and identify root cause
- [x] Fix `cli.rs`: add `.exe` on Windows in `get_sidecar_path`, make `serve()` return `Result`
- [x] Fix `server.rs`: make `spawn_local_server()` return `Result`
- [x] Fix `lib.rs`: add `ServerConnection::Failed` variant, handle errors gracefully
- [x] Rebuild the Tauri app to produce new EXE
- [ ] User tests the EXE on a different machine
