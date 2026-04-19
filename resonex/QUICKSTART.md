# 🚀 Quick Start Guide

## For Windows Users

### Method 1: Using Batch Scripts (Easiest)

1. **Open Command Prompt** in the project folder
2. **Run setup** (first time only):
   ```batch
   setup.bat
   ```

3. **Start the application**:
   ```batch
   run.bat
   ```

4. **Open in browser**:
   - Navigate to: http://localhost:5000
   - You should see the beautiful dashboard!

---

## For macOS & Linux Users

### Prerequisites
Make sure you have Python 3.7+ installed:
```bash
python3 --version
```

### Installation Steps

1. **Navigate to project folder**:
   ```bash
   cd resonex
   ```

2. **Create virtual environment** (optional but recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**:
   ```bash
   python3 app.py
   ```

5. **Open in browser**:
   - Navigate to: http://localhost:5000

---

## Testing the Application

### 1. Add Your First Device
- Type "Machine 1" in the input field
- Click "Add New Device" or press Enter
- Watch as the card appears with live data!

### 2. Add More Devices
- Add "Motor A", "Pump B", "Compressor C", etc.
- Each device gets independent real-time data
- Watch the charts update every second

### 3. Monitor Alerts
- Vibration values change automatically
- When value exceeds 2.5, device shows warning (yellow)
- When value exceeds 3.5, device shows danger (red with blinking alert)
- Global "Devices in Alert" counter updates in real-time

### 4. Explore the Dashboard
- Check "Last 5 Readings" badges
- View Max and Average values
- Watch the smooth line charts update
- Delete devices and see UI update

---

## Troubleshooting

### Port 5000 Already in Use
If you get an error about port 5000 being in use:

**Windows:**
```batch
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
lsof -i :5000
kill -9 <PID>
```

Or modify app.py to use a different port:
```python
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)  # Change 5001 to any available port
```

### Python/Flask Not Found
Make sure you have Python installed:
1. Download from: https://www.python.org/downloads/
2. During installation, check "Add Python to PATH"
3. Restart your terminal

### Dependencies Not Installing
Try upgrading pip first:
```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

---

## API Testing (Advanced)

### Test Backend with curl

Get all device data:
```bash
curl http://localhost:5000/api/get_data
```

Add a new device:
```bash
curl -X POST http://localhost:5000/api/add_device \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Test Device\"}"
```

---

## Performance Tips

- The system can handle 50+ devices comfortably
- Data updates every 1 second (configurable in script.js)
- Charts show last 60 data points (configurable in app.py)
- For monitoring, keep browser active for best performance

---

## Next Steps

1. Customize thresholds in `app.py`:
   - `NORMAL_THRESHOLD = 1.5`
   - `WARNING_THRESHOLD = 2.5`
   - `ALERT_THRESHOLD = 3.5`

2. Modify colors in `style.css`:
   - Search for `:root` section
   - Update color values as needed

3. Deploy to production:
   - Use Gunicorn instead of Flask dev server
   - Add database backend for persistent storage
   - Implement user authentication

---

## Getting Help

Check browser console for errors:
1. Press F12 or Right-click → Inspect
2. Go to Console tab
3. Look for error messages
4. Check Network tab for API call issues

---

**Happy monitoring! 🎉**
