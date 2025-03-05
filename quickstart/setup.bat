@echo off
echo 🚀 Setting up Peer Review Resource Center project...

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js (version 16 or higher).
    echo    Visit: https://nodejs.org/
    goto :eof
)

:: Check if Hugo is installed
where hugo >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ Hugo is not installed. Please install Hugo (extended version recommended).
    echo    Visit: https://gohugo.io/installation/
    goto :eof
)

:: Install dependencies
echo 📦 Installing Node.js dependencies...
call npm install

echo 🔍 Checking Hugo modules...
call hugo mod get -u

echo ✅ Setup complete! You can now run the site with:
echo    hugo server -D
echo.
echo    Then visit: http://localhost:1313/SingleProject/ 