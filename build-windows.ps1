<#
build-windows.ps1 - Build Blackbox AI installer for Windows (MSI/EXE)
Run this script from an elevated PowerShell prompt (recommended) on a Windows machine.
Outputs: packages/desktop/src-tauri/target/bundles/
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir

Write-Host "=============================================="
Write-Host "  Blackbox AI - Windows Build Script"
Write-Host "=============================================="

# Detect architecture
$arch = $env:PROCESSOR_ARCHITECTURE
if ($arch -eq 'AMD64') {
    $rustTarget = 'x86_64-pc-windows-msvc'
    $ocBinary = 'blackbox_ai-windows-x64'
}
elseif ($arch -eq 'ARM64') {
    $rustTarget = 'aarch64-pc-windows-msvc'
    $ocBinary = 'blackbox_ai-windows-arm64'
}
else {
    Write-Error "Unsupported architecture: $arch"
    exit 1
}

Write-Host "Architecture : $arch"
Write-Host "Rust target  : $rustTarget"

# ---------------------------------------------------------------------------
# Step 1: Ensure Visual Studio Build Tools (MSVC)
# ---------------------------------------------------------------------------
Write-Host ""
Write-Host "[Step 1] Checking Visual Studio Build Tools (MSVC)..."
$vswhere = "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe"
$hasVS = $false
if (Test-Path $vswhere) {
    $vsInstall = & $vswhere -latest -products * -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath 2>$null
    if ($vsInstall) { $hasVS = $true }
}
if (-not $hasVS) {
    Write-Warning @"
Visual Studio Build Tools with C++ workload not detected.
The MSVC Rust target requires it. Install from:
  https://visualstudio.microsoft.com/visual-cpp-build-tools/
Select 'Desktop development with C++' workload, then re-run this script.
"@
    $ans = Read-Host "Continue anyway? (y/N)"
    if ($ans -ne 'y' -and $ans -ne 'Y') { exit 1 }
} else {
    Write-Host "[OK] Visual Studio Build Tools found."
}

# ---------------------------------------------------------------------------
# Step 2: Ensure Rust toolchain
# ---------------------------------------------------------------------------
Write-Host ""
Write-Host "[Step 2] Checking Rust toolchain..."
if (-not (Get-Command rustup -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Rust via bundled rustup-init.exe..."
    $rustupInit = Join-Path $scriptDir 'packages\desktop\rustup-init.exe'
    if (Test-Path $rustupInit) {
        & $rustupInit -y --default-toolchain stable --no-modify-path
    } else {
        Write-Host "Bundled rustup-init.exe not found, downloading from win.rustup.rs..."
        $tmpRustup = Join-Path $env:TEMP 'rustup-init.exe'
        (New-Object System.Net.WebClient).DownloadFile('https://win.rustup.rs/x86_64', $tmpRustup)
        & $tmpRustup -y --default-toolchain stable --no-modify-path
    }
    $env:PATH = "$env:USERPROFILE\.cargo\bin;" + $env:PATH
    Write-Host "[OK] Rust installed."
} else {
    Write-Host "Rust already present: $(rustc --version)"
}

# Add the required target triple (rustup writes info to stderr; suppress to avoid false errors)
$prevEAP = $ErrorActionPreference
$ErrorActionPreference = 'Continue'
& rustup target add $rustTarget 2>&1 | Out-Null
$ErrorActionPreference = $prevEAP
Write-Host "[OK] Rust target ready: $rustTarget"

# ---------------------------------------------------------------------------
# Step 3: Ensure Bun runtime
# ---------------------------------------------------------------------------
Write-Host ""
Write-Host "[Step 3] Checking Bun runtime..."
if (-not (Get-Command bun -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Bun via official Windows installer..."
    try {
        iex ((New-Object System.Net.WebClient).DownloadString('https://bun.sh/install.ps1'))
        $env:PATH = "$env:USERPROFILE\.bun\bin;" + $env:PATH
        Write-Host "[OK] Bun installed."
    } catch {
        Write-Error "Failed to install Bun automatically. Please install Bun (https://bun.sh) and re-run this script."
        exit 1
    }
} else {
    Write-Host "Bun present: $(bun --version)"
}

# ---------------------------------------------------------------------------
# Step 4: Install project dependencies
# ---------------------------------------------------------------------------
Write-Host ""
Write-Host "[Step 4] Installing project dependencies..."
bun install
Write-Host "[OK] Dependencies installed."

# ---------------------------------------------------------------------------
# Step 5: Build CLI sidecar binary
# ---------------------------------------------------------------------------
Write-Host ""
Write-Host "[Step 5] Building CLI sidecar binary..."
Set-Location (Join-Path $scriptDir 'packages\desktop')
$env:RUST_TARGET = $rustTarget
bun run scripts/predev.ts
Write-Host "[OK] CLI sidecar built and copied."

# ---------------------------------------------------------------------------
# Step 6: Build Tauri desktop app
# ---------------------------------------------------------------------------
Write-Host ""
Write-Host "[Step 6] Building Tauri desktop app (this may take several minutes)..."
$env:RUST_TARGET = $rustTarget
bun run tauri build --config src-tauri/tauri.prod.conf.json --target $rustTarget

# ---------------------------------------------------------------------------
# Collect bundles
# ---------------------------------------------------------------------------
Write-Host ""
Write-Host "[Step 7] Collecting build artifacts..."
$env:RUST_TARGET = $rustTarget
Set-Location (Join-Path $scriptDir 'packages\desktop')
bun run scripts/copy-bundles.ts

Set-Location $scriptDir
Write-Host ""
Write-Host "=============================================="
Write-Host "  BUILD COMPLETE!"
Write-Host "  Output: packages/desktop/src-tauri/target/bundles/"
Write-Host "=============================================="
Write-Host ""
Get-ChildItem -Path 'packages\desktop\src-tauri\target\bundles' -Force -ErrorAction SilentlyContinue | Format-Table Name, Length
