#!/bin/bash
set -e

echo "🎯 Blackbox AI Desktop - Complete Setup & Run Guide"
echo "======================================================"
echo ""
echo "This script will:"
echo "  1. Clone the repository"
echo "  2. Install dependencies"
echo "  3. Build the macOS app"
echo "  4. Launch the app"
echo ""
echo "Start? (Press Enter to continue or Ctrl+C to cancel)"
read

# Check prerequisites
echo ""
echo "📋 Checking prerequisites..."

if ! command -v bun &> /dev/null; then
    echo "❌ Bun not found. Installing..."
    curl -fsSL https://bun.sh/install | bash
    export PATH=$HOME/.bun/bin:$PATH
fi
echo "✅ Bun installed"

if ! command -v rustc &> /dev/null; then
    echo "❌ Rust not found. Installing..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source ~/.cargo/env
fi
echo "✅ Rust installed"

# Clone repo
echo ""
echo "📦 Cloning repository..."
REPO_DIR="$HOME/oc-blackbox"
if [ -d "$REPO_DIR" ]; then
    echo "⚠️  Directory $REPO_DIR already exists. Pulling latest changes..."
    cd "$REPO_DIR"
    git pull origin Mac-Dev-v2.0
else
    git clone https://github.com/harshGajjar1998/oc-blackbox.git "$REPO_DIR"
    cd "$REPO_DIR"
    git checkout Mac-Dev-v2.0
fi
echo "✅ Repository ready at $REPO_DIR"

# Install dependencies
echo ""
echo "📚 Installing dependencies (this may take 2-5 minutes)..."
bun install
echo "✅ Dependencies installed"

# Build app
echo ""
echo "🔨 Building Blackbox AI for macOS..."
cd packages/desktop
bun run tauri build
echo "✅ Build complete!"

# Launch app
echo ""
echo "🚀 Launching app..."
APP_PATH="./src-tauri/target/release/bundle/macos/Blackbox AI Dev.app"

if [ -d "$APP_PATH" ]; then
    open "$APP_PATH"
    echo "✅ App launched!"
    echo ""
    echo "📍 App bundle location:"
    echo "   $PWD/$APP_PATH"
else
    echo "❌ App bundle not found at $APP_PATH"
    exit 1
fi

echo ""
echo "🎉 All done! The Blackbox AI app is running."
echo ""
echo "Next time, you can just run:"
echo "  cd ~/oc-blackbox/packages/desktop"
echo "  open ./src-tauri/target/release/bundle/macos/Blackbox\ AI\ Dev.app"
