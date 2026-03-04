# fix-nsis-bmp.ps1
# Regenerates NSIS installer BMP images as 24-bit uncompressed (BI_RGB, compression=0)
# with the correct NSIS standard dimensions.
#
# NSIS standard sizes:
#   Header image  : 150 x 57  px  (shown at top of each installer page)
#   Sidebar image : 164 x 314 px  (shown on left of Welcome/Finish pages)
#
# Run from repo root:
#   powershell -ExecutionPolicy Bypass -File fix-nsis-bmp.ps1

Add-Type -AssemblyName System.Drawing

$assetsDir = "packages/desktop/src-tauri/assets"

# ── Colour palette ──────────────────────────────────────────────────────────
$bgColor     = [System.Drawing.Color]::FromArgb(13,  13,  13)   # #0D0D0D  dark bg
$accentColor = [System.Drawing.Color]::FromArgb(0,  122, 255)   # #007AFF  blue accent
$textColor   = [System.Drawing.Color]::FromArgb(255, 255, 255)  # #FFFFFF  white text
$subColor    = [System.Drawing.Color]::FromArgb(160, 160, 160)  # #A0A0A0  grey sub-text

# ── Helper: save bitmap as 24-bit uncompressed BMP ──────────────────────────
function Save-As24BitBmp {
    param(
        [System.Drawing.Bitmap] $bmp,
        [string] $path
    )
    # Convert to Format24bppRgb to guarantee 24-bit output
    $bmp24 = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height,
                         [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp24)
    $g.DrawImage($bmp, 0, 0, $bmp.Width, $bmp.Height)
    $g.Dispose()
    $bmp24.Save($path, [System.Drawing.Imaging.ImageFormat]::Bmp)
    $bmp24.Dispose()
    Write-Host "  Saved: $path ($($bmp.Width)x$($bmp.Height) → 24-bit BMP)"
}

# ── 1. Header image: 150 x 57 ───────────────────────────────────────────────
Write-Host "Generating nsis-header.bmp (150x57)..."
$w = 150; $h = 57
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g   = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# Background
$g.Clear($bgColor)

# Accent bar on left edge (4px wide)
$g.FillRectangle((New-Object System.Drawing.SolidBrush($accentColor)), 0, 0, 4, $h)

# "Blackbox AI" title text
$fontTitle = New-Object System.Drawing.Font("Segoe UI", 11, [System.Drawing.FontStyle]::Bold)
$g.DrawString("Blackbox AI", $fontTitle,
              (New-Object System.Drawing.SolidBrush($textColor)), 12, 10)

# Sub-text
$fontSub = New-Object System.Drawing.Font("Segoe UI", 7, [System.Drawing.FontStyle]::Regular)
$g.DrawString("AI-powered coding assistant", $fontSub,
              (New-Object System.Drawing.SolidBrush($subColor)), 13, 33)

$g.Dispose()
$fontTitle.Dispose()
$fontSub.Dispose()

Save-As24BitBmp $bmp "$assetsDir/nsis-header.bmp"
$bmp.Dispose()

# ── 2. Sidebar image: 164 x 314 ─────────────────────────────────────────────
Write-Host "Generating nsis-sidebar.bmp (164x314)..."
$w = 164; $h = 314
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g   = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# Background
$g.Clear($bgColor)

# Accent bar on right edge (3px wide)
$g.FillRectangle((New-Object System.Drawing.SolidBrush($accentColor)), $w - 3, 0, 3, $h)

# Decorative accent rectangle near top
$g.FillRectangle((New-Object System.Drawing.SolidBrush($accentColor)), 20, 40, 30, 3)

# "Blackbox" large text
$fontLarge = New-Object System.Drawing.Font("Segoe UI", 14, [System.Drawing.FontStyle]::Bold)
$g.DrawString("Blackbox", $fontLarge,
              (New-Object System.Drawing.SolidBrush($textColor)), 14, 60)

# "AI" in accent colour
$fontAI = New-Object System.Drawing.Font("Segoe UI", 14, [System.Drawing.FontStyle]::Bold)
$g.DrawString("AI", $fontAI,
              (New-Object System.Drawing.SolidBrush($accentColor)), 14, 85)

# Divider line
$g.DrawLine((New-Object System.Drawing.Pen($accentColor, 1)), 14, 115, 140, 115)

# Sub-text lines
$fontSub = New-Object System.Drawing.Font("Segoe UI", 7, [System.Drawing.FontStyle]::Regular)
$g.DrawString("AI-powered", $fontSub,
              (New-Object System.Drawing.SolidBrush($subColor)), 14, 125)
$g.DrawString("coding assistant", $fontSub,
              (New-Object System.Drawing.SolidBrush($subColor)), 14, 140)

# Version text at bottom
$fontVer = New-Object System.Drawing.Font("Segoe UI", 6, [System.Drawing.FontStyle]::Regular)
$g.DrawString("v1.2.14", $fontVer,
              (New-Object System.Drawing.SolidBrush($subColor)), 14, 290)

$g.Dispose()
$fontLarge.Dispose()
$fontAI.Dispose()
$fontSub.Dispose()
$fontVer.Dispose()

Save-As24BitBmp $bmp "$assetsDir/nsis-sidebar.bmp"
$bmp.Dispose()

Write-Host ""
Write-Host "Done. Both BMP files regenerated as 24-bit uncompressed (BI_RGB)."
Write-Host "Run inspect-bmp.ps1 to verify headers."
