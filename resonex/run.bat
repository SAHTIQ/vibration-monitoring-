@echo off
REM Start script for Smart Vibration Monitoring System

echo.
echo ========================================
echo Smart Vibration Monitoring System
echo ========================================
echo.

REM Check if dependencies are installed
python -c "import flask, flask_cors" >nul 2>&1
if errorlevel 1 (
    echo Installing dependencies...
    python -m pip install --quiet -r requirements.txt
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        echo Please run setup.bat first
        pause
        exit /b 1
    )
    echo ✓ Dependencies installed
)

echo.
echo Starting Flask server...
echo.
echo ========================================
echo Server is running at:
echo   http://localhost:5000
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the Flask app
python app.py
