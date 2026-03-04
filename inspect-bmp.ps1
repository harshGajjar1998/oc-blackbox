$files = @(
    "packages/desktop/src-tauri/assets/nsis-header.bmp",
    "packages/desktop/src-tauri/assets/nsis-sidebar.bmp"
)
foreach ($f in $files) {
    $bytes = [System.IO.File]::ReadAllBytes($f)
    $width = [BitConverter]::ToInt32($bytes, 18)
    $height = [BitConverter]::ToInt32($bytes, 22)
    $bpp = [BitConverter]::ToInt16($bytes, 28)
    $comp = [BitConverter]::ToInt32($bytes, 30)
    Write-Host "File: $f"
    Write-Host "  Size: $($bytes.Length) bytes"
    Write-Host "  Width: $width px"
    Write-Host "  Height: $height px"
    Write-Host "  BitsPerPixel: $bpp"
    Write-Host "  Compression: $comp  (0=none/RGB, 3=BITFIELDS)"
    Write-Host ""
}
