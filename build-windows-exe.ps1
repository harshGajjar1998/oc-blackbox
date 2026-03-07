$ErrorActionPreference = "Stop"

function Require-Command {
  param(
    [Parameter(Mandatory = $true)][string]$Name,
    [Parameter(Mandatory = $true)][string]$InstallHint
  )

  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    Write-Error "Missing required command: '$Name'. $InstallHint"
  }
}

Write-Host "[1/5] Validating prerequisites..." -ForegroundColor Cyan
Require-Command -Name "bun" -InstallHint "Install Bun from https://bun.sh and reopen the terminal."
Require-Command -Name "rustc" -InstallHint "Install Rust via rustup: winget install Rustlang.Rustup"
Require-Command -Name "cargo" -InstallHint "Install Rust via rustup: winget install Rustlang.Rustup"

# Tauri on Windows needs the MSVC linker available in PATH.
if (-not (Get-Command "cl.exe" -ErrorAction SilentlyContinue)) {
  Write-Warning "MSVC compiler (cl.exe) not found in PATH."
  Write-Warning "Install Visual Studio 2022 Build Tools with 'Desktop development with C++' and Windows SDK."
  Write-Warning "After install, run this script from a 'Developer PowerShell for VS 2022' terminal."
}

Write-Host "[2/5] Moving to repository root..." -ForegroundColor Cyan
Set-Location "C:\Users\Pavitra\Desktop\sandbox\oc-blackbox"

Write-Host "[3/5] Installing dependencies..." -ForegroundColor Cyan
bun install

Write-Host "[4/5] Building Windows NSIS installer (.exe)..." -ForegroundColor Cyan
bun run --cwd packages/desktop tauri build --bundles nsis

Write-Host "[5/5] Build complete. Output folder:" -ForegroundColor Green
Write-Host "packages/desktop/src-tauri/target/release/bundle/nsis" -ForegroundColor Green
