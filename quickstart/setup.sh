#!/bin/bash
# Hugo Project Setup Script

echo "🚀 Setting up Peer Review Resource Center project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (version 16 or higher)."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if Hugo is installed
if ! command -v hugo &> /dev/null; then
    echo "❌ Hugo is not installed. Please install Hugo (extended version recommended)."
    echo "   Visit: https://gohugo.io/installation/"
    exit 1
fi

# Install dependencies
echo "📦 Installing Node.js dependencies..."
npm install

echo "🔍 Checking Hugo modules..."
hugo mod get -u

echo "✅ Setup complete! You can now run the site with:"
echo "   hugo server -D"
echo ""
echo "   Then visit: http://localhost:1313/SingleProject/" 