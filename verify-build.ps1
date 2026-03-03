#!/usr/bin/env pwsh
<#
verify-build.ps1 - Verify the Blackbox AI build and installer
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir

Write-Host "=============================================="
Write-Host "  Blackbox AI - Build Verification"
Write-Host "=============================================="

# Check if the installer exists
$installerPath = "packages\desktop\src-tauri\target\bundles\Blackbox AI_1.2.14_x64-setup.exe"
if (Test-Path $installerPath) {
    $installer = Get-ChildItem $installerPath
    Write-Host "[OK] Installer found: $($installer.Name)"
    Write-Host "     Size: $([math]::Round($installer.Length / 1MB, 2)) MB"
    Write-Host "     Modified: $($installer.LastWriteTime)"
} else {
    Write-Warning "Installer not found at: $installerPath"
}

# Check if the raw executable exists
$exePath = "packages\desktop\src-tauri\target\x86_64-pc-windows-msvc\release\bundle\nsis\Blackbox AI_1.2.14_x64-setup.exe"
if (Test-Path $exePath) {
    Write-Host "[OK] Raw installer exists in NSIS bundle directory"
} else {
    Write-Warning "Raw installer not found in NSIS bundle directory"
}

# Check for development executable
$devExePath = "packages\desktop\src-tauri\target\release\Blackbox AI.exe"
if (Test-Path $devExePath) {
    Write-Host "[OK] Development executable found"
} else {
    Write-Warning "Development executable not found"
}

# List all available outputs
Write-Host ""
Write-Host "All built executables:"
Get-ChildItem -Path "packages\desktop\src-tauri\target" -Recurse -Name "*.exe" | Where-Object { $_ -like "*Blackbox*" -or $_ -like "*opencode*" } | Sort-Object

Write-Host ""
Write-Host "=============================================="
Write-Host "  Verification Complete"
Write-Host "=============================================="
