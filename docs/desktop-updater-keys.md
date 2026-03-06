# Desktop updater keys and release setup

This project uses Tauri updater signatures. The app verifies updates using a public key (`pubkey`) and releases are signed using a private key.

## 1) Generate keys (Windows PowerShell)

Run once on a trusted machine:

```powershell
$keyPath = "$env:USERPROFILE\.tauri\blackbox-updater.key"
bun --cwd packages/desktop tauri signer generate -w "$keyPath"
```

What you get:

- Private key file at `$keyPath` (secret, never commit)
- Public key printed in terminal (safe to commit)

## 2) Configure app public key

Set updater public key in:

- `packages/desktop/src-tauri/tauri.beta.conf.json` → `plugins.updater.pubkey`

Important:

- Replace the current value with your own generated public key before production releases.

## 3) Set signing env vars locally (release build)

```powershell
$keyPath = "$env:USERPROFILE\.tauri\blackbox-updater.key"
$env:TAURI_SIGNING_PRIVATE_KEY = Get-Content $keyPath -Raw
$env:TAURI_SIGNING_PRIVATE_KEY_PASSWORD = Read-Host "Enter updater key password"
```

Then build with updater config:

```powershell
bun --cwd packages/desktop tauri build --config src-tauri/tauri.beta.conf.json
```

## 4) Publish updater artifacts

Upload generated installer artifacts and `latest.json` to your GitHub release used by endpoint.

Current endpoint:

- `https://github.com/harshGajjar1998/oc-blackbox/releases/latest/download/latest.json`

If `latest.json` is missing or unsigned, update checks/install will fail.

## 5) Production key storage policy

Recommended:

- Store private key and password in CI secret storage (GitHub Actions Secrets/Environment Secrets)
- Never store private key in repository or plaintext files inside project
- Restrict who can trigger release workflows

Secrets to create:

- `TAURI_SIGNING_PRIVATE_KEY`
- `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`

## 6) Key rotation (future)

Use safe rotation to avoid breaking existing users:

1. Generate new keypair.
2. Update app config to include new public key.
3. Publish a bridge release signed with old key (so existing users can install it).
4. After users move to bridge version, sign new releases with new private key.
5. Remove old key secrets from CI.

## 7) Branch-based update channels

Updater does not track Git branches directly. It tracks release endpoints.

For branch-like behavior, create channels:

- `stable`: endpoint points to stable release feed
- `beta`/`dev`: endpoint points to separate release feed (separate repo, tag pattern, or release stream)

Then build each app flavor with corresponding updater endpoint and key.
