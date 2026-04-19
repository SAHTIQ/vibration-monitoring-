@echo off
REM Setup script for Smart Vibration Monitoring System

echo.
echo ========================================
echo Smart Vibration Monitoring System Setup
echo ========================================
echo.

REM Check Python installation
echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.7+ from https://www.python.org/
    pause
    exit /b 1
)

echo ✓ Python found

REM Install dependencies
echo.
echo Installing dependencies...
python -m pip install --quiet -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo ✓ Dependencies installed successfully

REM Show instructions
echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the application:
echo.
echo   1. Run: python app.py
echo   2. Open browser: http://localhost:5000
echo.
echo The dashboard will be available at:
echo   http://localhost:5000
echo.
echo To stop the server, press Ctrl+C in the terminal
echo.
pause
