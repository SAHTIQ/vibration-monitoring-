# Smart Portable Vibration Monitoring System with Multi-Gadget Tracking

A modern, elegant web application for real-time monitoring of multiple vibration detection devices in an industrial IoT environment.

## 🌟 Features

- **Multi-Device Support**: Add and monitor unlimited vibration monitoring devices
- **Real-Time Data**: Live vibration data updates every second
- **Smart Alerts**: Automatic warning and danger alerts based on vibration thresholds
- **Beautiful Dashboard**: Dark theme with blue gradient UI and smooth animations
- **Live Charts**: Real-time line charts for each device showing last 30 data points
- **Status Indicators**: Color-coded status (Green/Yellow/Red) with blinking alerts
- **Device Statistics**: Track max/average vibration values and last 5 readings
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🎨 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Python Flask
- **Visualization**: Chart.js
- **Styling**: Modern CSS with animations and gradients

## 📋 Requirements

- Python 3.7+
- pip (Python package manager)
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Installation & Setup

### 1. Clone or Download the Project

```bash
cd resonex
```

### 2. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the Flask Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

### 4. Open in Browser

- Navigate to `http://localhost:5000`
- The dashboard will load with the dark theme

## 📱 Usage Guide

### Adding a Device

1. Enter a device name in the input field (e.g., "Motor A", "Machine 1")
2. Click the "Add New Device" button or press Enter
3. A new card will appear in the grid with real-time vibration data

### Monitoring Devices

- **Current Vibration**: Large display showing current m/s² value
- **Status Indicator**: Color-coded dot showing device status
  - 🟢 Green: Normal operation (< 1.5 m/s²)
  - 🟡 Yellow: Warning level (1.5 - 2.5 m/s²)
  - 🔴 Red: Danger zone (2.5 - 3.5 m/s²)
  - 🔴 Red (blinking): Critical (> 3.5 m/s²)

### Alert System

When vibration exceeds thresholds:
- Device card border glows with warning/danger colors
- Status changes to "⚠ Warning Level" or "🔴 Danger Zone"
- Red alert box appears with "ABNORMAL VIBRATION" message and blinking effect
- Global "Devices in Alert" counter updates

### Dashboard Statistics

- **Total Devices**: Number of monitored devices
- **Devices in Alert**: Count of devices with abnormal vibrations
- **System Status**: Overall system health indicator

### Device Card Information

Each card displays:
- Device name and ID
- Current vibration value
- Status indicator with text
- Real-time line chart (last 30 points)
- Last 5 readings in badges
- Max and Average vibration statistics

### Deleting a Device

- Click the "✕" button in the top-right corner of any device card
- Confirm deletion when prompted
- Device card and chart will be removed

## 📊 API Endpoints

### Backend API Routes

**POST /api/add_device**
- Add a new monitoring device
- Request: `{ "name": "Device Name" }`
- Response: `{ "success": true, "device_id": 0, "device": {...} }`

**GET /api/get_data**
- Get current data for all devices
- Response: 
```json
{
  "devices": [
    {
      "id": 0,
      "name": "Motor A",
      "current_vibration": 1.23,
      "status": "normal",
      "data_points": [...],
      "last_readings": [...],
      "max_vibration": 3.45,
      "avg_vibration": 1.50
    }
  ],
  "total_devices": 1,
  "devices_in_alert": 0,
  "timestamp": "2024-01-01T12:00:00"
}
```

**DELETE /api/delete_device/<device_id>**
- Delete a specific device
- Response: `{ "success": true, "message": "Device deleted successfully" }`

**GET /api/devices**
- Get list of all devices with metadata
- Response: `{ "devices": [{"id": 0, "name": "Motor A", "created_at": "..."}] }`

**POST /api/reset**
- Reset all devices (clear all data)
- Response: `{ "success": true, "message": "All devices reset" }`

## 🔧 Configuration

### Vibration Thresholds (in app.py)

```python
NORMAL_THRESHOLD = 1.5      # Normal operation
WARNING_THRESHOLD = 2.5     # Warning level
ALERT_THRESHOLD = 3.5       # Critical alert
```

### Data Points to Store

```python
MAX_DATA_POINTS = 60  # Keep last 60 data points per device
```

### Update Interval (in script.js)

```javascript
UPDATE_INTERVAL = 1000  // Update every 1 second (in milliseconds)
```

## 📈 Data Simulation

The system generates realistic vibration data using:
- **Sine Wave**: Base oscillation pattern (~ 0.8 m/s²)
- **Random Noise**: Gaussian noise (μ=0, σ=0.3)
- **Occasional Spikes**: 10% chance of generating abnormal values (1.5-3.0 m/s²)
- **Device Offset**: Small variation per device for realistic diversity

## 🎨 UI Design Details

### Color Scheme
- Primary Blue: `#1e88e5`
- Secondary Blue: `#0d47a1`
- Accent Cyan: `#00bcd4`
- Dark Background: `#0a0e27`
- Success Green: `#4caf50`
- Warning Yellow: `#ff9800`
- Danger Red: `#f44336`

### Animations
- Fade-in effects for cards and sections
- Pulse animations for icons and alerts
- Shimmer effect on card top borders
- Smooth transitions on all interactive elements
- Glowing effects on status indicators

### Responsive Breakpoints
- Desktop: 1024px+ (multi-column grid)
- Tablet: 768px - 1023px (2-column or single column)
- Mobile: < 768px (single column layout)

## 🔒 Security Notes

- CORS enabled for local development
- Flask debug mode enabled (disable in production)
- No authentication required (add for production use)

## 🐛 Troubleshooting

**Port Already in Use**
```bash
# Use different port
python -c "from app import app; app.run(debug=True, port=5001)"
```

**CORS Errors**
- Ensure Flask-CORS is installed: `pip install Flask-CORS`
- Check that both frontend and backend are running

**Charts Not Displaying**
- Verify Chart.js CDN is accessible
- Check browser console for errors (F12)

**No Data Updates**
- Check browser console for fetch errors
- Verify backend is running: `http://localhost:5000/api/get_data`
- Ensure UPDATE_INTERVAL is set correctly in script.js

## 📝 File Structure

```
resonex/
├── app.py                 # Flask backend application
├── index.html             # HTML template
├── style.css              # CSS styling
├── script.js              # Frontend JavaScript logic
├── requirements.txt       # Python dependencies
└── README.md              # This file
```

## 🚀 Production Deployment

For production use:

1. **Disable Debug Mode**
```python
if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=5000)
```

2. **Add HTTPS Support**
```bash
pip install python-dotenv
# Configure SSL certificates
```

3. **Use Production WSGI Server**
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

4. **Add Authentication**
- Implement user login
- Add role-based access control
- Secure API endpoints

5. **Database Integration**
- Store historical data in PostgreSQL/MongoDB
- Add data export functionality

## 📄 License

This project is open-source and available for educational and commercial use.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review browser console errors (F12)
3. Verify backend is running with `curl http://localhost:5000/api/get_data`

## 🎯 Future Enhancements

- Historical data storage and analysis
- Advanced filtering and search
- Export data to CSV/PDF
- Multiple dashboard views
- Device grouping and categories
- Machine learning-based anomaly detection
- Mobile app version
- Real-time notifications via WebSocket
- Device configuration interface

---

**Created with ❤️ for Industrial IoT Monitoring**
