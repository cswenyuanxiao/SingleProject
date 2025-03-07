#!/bin/bash

# Print colorful messages
print_message() {
    echo -e "\033[1;34m$1\033[0m"
}

print_error() {
    echo -e "\033[1;31m$1\033[0m"
}

print_success() {
    echo -e "\033[1;32m$1\033[0m"
}

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Change to the script directory
cd "$SCRIPT_DIR"

# Check if Hugo is installed
if ! command -v hugo &> /dev/null; then
    print_error "Hugo is not installed. Please install Hugo first."
    print_error "You can install it using: brew install hugo"
    exit 1
fi

# Check if config file exists
if [ ! -f "hugo.toml" ]; then
    print_error "hugo.toml not found in the current directory."
    print_error "Make sure you're in the correct Hugo project directory."
    exit 1
fi

# Start Hugo server
print_message "Starting Hugo server..."
print_message "The website will be available at http://localhost:1313"
print_message "Press Ctrl+C to stop the server"

# Start Hugo with development settings
hugo server -D --disableFastRender -p 1313 --bind "127.0.0.1" -b "http://localhost:1313" 