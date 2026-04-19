# 🏗️ System Architecture - Smart Vibration Monitoring System

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT BROWSER                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              index.html (UI Template)                 │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │  Header, Control Panel, Device Grid, Footer      │ │  │
│  │  │  Device Card Template (hidden)                   │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │           style.css (Styling & Animations)            │  │
│  │  Dark Theme | Gradients | Responsive Grid            │  │
│  │  Animations | Status Colors | Glowing Effects        │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              script.js (JavaScript Logic)             │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │ Event Listeners                                  │ │  │
│  │  │ ├─ addDevice()                                  │ │  │
│  │  │ ├─ deleteDevice()                               │ │  │
│  │  │ └─ Keyboard/Mouse handlers                      │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │ API Communication (Every 1 second)               │ │  │
│  │  │ ├─ fetch('/api/get_data')                       │ │  │
│  │  │ ├─ fetch('/api/add_device')                     │ │  │
│  │  │ └─ fetch('/api/delete_device')                  │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │ UI Updates                                       │ │  │
│  │  │ ├─ updateDeviceCard()                           │ │  │
│  │  │ ├─ updateChartData()                            │ │  │
│  │  │ ├─ updateGlobalStats()                          │ │  │
│  │  │ └─ showNotification()                           │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │ Chart.js Integration                            │ │  │
│  │  │ ├─ Chart objects stored in 'charts' dict        │ │  │
│  │  │ ├─ Real-time data updates                       │ │  │
│  │  │ └─ Color-coded by status                        │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
           │
           │ HTTP/HTTPS (JSON)
           │ Every 1 second
           ↓
┌─────────────────────────────────────────────────────────────┐
│                    FLASK BACKEND                            │
│  (Python - app.py)                                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │          REST API Routes (Flask)                     │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │ GET  /api/get_data                              │ │  │
│  │  │ POST /api/add_device                            │ │  │
│  │  │ DEL  /api/delete_device/<id>                    │ │  │
│  │  │ GET  /api/devices                               │ │  │
│  │  │ POST /api/reset                                 │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │          Data Management (In-Memory)                │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │ devices = {                                      │ │  │
│  │  │   device_id: {                                   │ │  │
│  │  │     'name': 'Motor A',                           │ │  │
│  │  │     'data': [1.2, 1.3, ...],                    │ │  │
│  │  │     'status': 'normal',                          │ │  │
│  │  │     'created_at': '...'                          │ │  │
│  │  │   }                                              │ │  │
│  │  │ }                                                │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │        Data Generation Engine                       │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │ generate_vibration_data(device_id):             │ │  │
│  │  │                                                   │ │  │
│  │  │ vibration = |                                    │ │  │
│  │  │   sin(t/5) * 0.8 +        [Sine Wave]           │ │  │
│  │  │   N(0, 0.3) +              [Noise]              │ │  │
│  │  │   Spike(1.5-3.0) +         [Anomaly 10%]        │ │  │
│  │  │   (id % 10) * 0.1          [Device Offset]      │ │  │
│  │  │ |                                                │ │  │
│  │  │                                                   │ │  │
│  │  │ Result: Realistic vibration data                │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         Threshold & Status Logic                    │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │ if value < 1.5:   status = 'normal'   (🟢)      │ │  │
│  │  │ elif value < 2.5:  status = 'warning' (🟡)      │ │  │
│  │  │ elif value < 3.5:  status = 'danger'  (🔴)      │ │  │
│  │  │ else:              status = 'critical' (🔴)     │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         Response Formatting                         │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │ JSON Response includes:                          │ │  │
│  │  │ - All devices with current values                │ │  │
│  │  │ - Last 60 data points per device                 │ │  │
│  │  │ - Status for each device                         │ │  │
│  │  │ - Global stats (total, alerts)                   │ │  │
│  │  │ - Timestamp                                      │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Configuration                          │  │
│  │  NORMAL_THRESHOLD = 1.5                             │  │
│  │  WARNING_THRESHOLD = 2.5                            │  │
│  │  ALERT_THRESHOLD = 3.5                              │  │
│  │  MAX_DATA_POINTS = 60                               │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
┌──────────────────┐
│  Browser Opens   │
│  Dashboard Page  │
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│ Load HTML, CSS,  │
│ JavaScript       │
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│ script.js runs   │
│ initializeEvents │
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│ startDataUpdate()│
│ Every 1 second   │
└────────┬─────────┘
         │
         ├─→ fetchAndUpdateData()
         │   ├─→ GET /api/get_data
         │   │   ├─→ Backend generates data for all devices
         │   │   ├─→ Calculates status for each device
         │   │   └─→ Returns JSON response
         │   │
         │   └─→ updateGlobalStats()
         │   └─→ updateDeviceCard() for each device
         │       ├─→ updateCardContent()
         │       │   ├─→ Update vibration value
         │       │   ├─→ Update status indicator
         │       │   ├─→ Update alert box if needed
         │       │   ├─→ Update last 5 readings
         │       │   └─→ Update max/avg stats
         │       │
         │       └─→ updateChartData()
         │           └─→ Chart.js update
         │
         └─→ Repeat every 1 second...


User Interaction - Add Device:
┌──────────────────────────┐
│ User types device name   │
│ Clicks "Add" or Enter    │
└────────┬─────────────────┘
         │
         ↓
┌──────────────────────────┐
│ JavaScript handler fires │
│ addDevice()              │
└────────┬─────────────────┘
         │
         ↓
┌──────────────────────────┐
│ POST /api/add_device     │
│ {name: "Motor A"}        │
└────────┬─────────────────┘
         │
         ↓
┌──────────────────────────┐
│ Backend creates device   │
│ Returns device ID & info │
└────────┬─────────────────┘
         │
         ↓
┌──────────────────────────┐
│ Show success notification│
│ Clear input field        │
└────────┬─────────────────┘
         │
         ↓
┌──────────────────────────┐
│ Immediately fetch data   │
│ New device card appears  │
│ Chart initializes        │
└────────┬─────────────────┘
         │
         ↓
┌──────────────────────────┐
│ Continues updating...    │
│ Real-time data flowing   │
└──────────────────────────┘
```

---

## Component Structure

```
Dashboard
├── Header
│   ├── Title: "Multi-Device Vibration Monitoring System"
│   └── Subtitle: "Real-time Industrial IoT Dashboard"
│
├── Control Panel
│   ├── Input Group
│   │   ├── Text Input (device name)
│   │   └── "Add New Device" Button
│   │
│   └── Stats Container
│       ├── Total Devices
│       ├── Devices in Alert
│       └── System Status
│
├── Dashboard Grid
│   └── Device Cards (repeated)
│       ├── Card Header
│       │   ├── Device Name
│       │   ├── Device ID
│       │   └── Delete Button
│       │
│       ├── Card Content
│       │   ├── Vibration Display
│       │   │   ├── Current Value (large)
│       │   │   └── Unit (m/s²)
│       │   │
│       │   ├── Status Section
│       │   │   ├── Status Indicator (dot)
│       │   │   └── Status Text
│       │   │
│       │   ├── Alert Box (when danger)
│       │   │
│       │   ├── Chart Container
│       │   │   └── Chart.js Line Chart
│       │   │
│       │   ├── Last 5 Readings
│       │   │   └── Reading Badges
│       │   │
│       │   └── Statistics
│       │       ├── Max Value
│       │       └── Avg Value
│       │
│       └── Status-Based Styling
│           ├── Normal (Green border)
│           ├── Warning (Yellow glow)
│           └── Danger (Red blink)
│
└── Footer
    └── Copyright information
```

---

## Event Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│                  User Actions                       │
└─────────────────────────────────────────────────────┘
         │
    ┌────┼────┐
    │    │    │
    ↓    ↓    ↓
┌────────┐ ┌──────────┐ ┌────────────┐
│Add Evt │ │Delete Ev │ │Keyboard Ev │
└───┬────┘ └────┬─────┘ └───┬────────┘
    │           │            │
    ↓           ↓            ↓
┌────────────────────────────────────┐
│   Event Handlers (script.js)       │
│   addDevice()                      │
│   deleteDevice()                   │
│   keypress handler                 │
└────────────────────────────────────┘
    │
    ↓
┌────────────────────────────────────┐
│     API Call (fetch)               │
│  POST /api/add_device              │
│  DEL /api/delete_device/<id>       │
└────────────────────────────────────┘
    │
    ↓
┌────────────────────────────────────┐
│   Backend Processing (Flask)       │
│  Request validation                │
│  Data generation                   │
│  Status calculation                │
└────────────────────────────────────┘
    │
    ↓
┌────────────────────────────────────┐
│   JSON Response                    │
│  All device data                   │
│  Status, charts, stats             │
└────────────────────────────────────┘
    │
    ↓
┌────────────────────────────────────┐
│   Frontend Processing (script.js)  │
│  Parse JSON                        │
│  Update global stats               │
│  For each device:                  │
│  ├─ Update card content            │
│  ├─ Update chart                   │
│  └─ Update styling                 │
└────────────────────────────────────┘
    │
    ↓
┌────────────────────────────────────┐
│   DOM Updates (CSS Animations)     │
│  Smooth transitions                │
│  Color changes                     │
│  Alert blinking                    │
│  Chart animations                  │
└────────────────────────────────────┘
    │
    ↓
┌────────────────────────────────────┐
│   Visual Feedback to User          │
│  Updated values                    │
│  Status indicators                 │
│  Alerts if danger                  │
│  Notifications                     │
└────────────────────────────────────┘
```

---

## Data Model

```
Device Object Structure:
{
  id: 0,
  name: "Motor A",
  data: [1.2, 1.3, 1.5, ...],              // Last 60 values
  last_readings: [1.5, 1.4, 1.3, 1.2, 1.1], // Last 5 values
  status: "normal",                          // normal/warning/danger/critical
  current_vibration: 1.23,                   // Latest value
  max_vibration: 3.45,                       // Highest recorded
  avg_vibration: 1.50,                       // Average of all
  created_at: "2024-01-01T12:00:00",        // Timestamp
}

Backend Storage:
devices = {
  0: Device,
  1: Device,
  2: Device,
  ...
}

Frontend Storage:
devices = {}                    // Device data from API
charts = {                      // Chart.js instances
  0: ChartInstance,
  1: ChartInstance,
  ...
}
```

---

## State Management

```
Frontend State:
├── Global variables
│   ├── API_BASE: 'http://localhost:5000/api'
│   ├── UPDATE_INTERVAL: 1000 (ms)
│   ├── charts: {} (Chart.js instances)
│   └── devices: {} (Last received data)
│
├── DOM elements
│   ├── #devicesGrid (container)
│   ├── #deviceName (input)
│   ├── #addBtn (button)
│   ├── #totalDevices (stat)
│   ├── #alertDevices (stat)
│   └── #systemStatus (stat)
│
├── Interval
│   └── updateInterval (fetch every 1 second)
│
└── Derived state
    ├── Card visibility (cards shown/hidden)
    └── Alert triggers (alert display state)


Backend State:
├── Devices dictionary
│   └── {device_id: {device_data}}
│
├── Counters
│   └── device_counter (for new IDs)
│
└── Constants
    ├── NORMAL_THRESHOLD: 1.5
    ├── WARNING_THRESHOLD: 2.5
    ├── ALERT_THRESHOLD: 3.5
    └── MAX_DATA_POINTS: 60
```

---

## Technology Stack Dependencies

```
Frontend:
├── HTML5 (semantic markup)
├── CSS3
│   ├── Flexbox
│   ├── Grid
│   ├── Animations
│   ├── Gradients
│   └── Media queries
├── JavaScript (ES6+)
│   ├── Fetch API (async/await)
│   ├── DOM API
│   └── Event listeners
└── Chart.js 3.9.1 (CDN)
    ├── Line chart rendering
    ├── Real-time updates
    └── Responsive sizing

Backend:
├── Python 3.7+
├── Flask 2.3.3
│   ├── Route decorators
│   ├── JSON responses
│   └── CORS middleware
├── Flask-CORS 4.0.0
└── Werkzeug 2.3.7 (included)

External CDN:
└── Chart.js (JavaScript library)
```

---

## Deployment Architecture Options

```
Option 1: Local Development
┌──────────────────┐
│ Flask Dev Server │
│   :5000          │
└────────┬─────────┘
         │
    Browser
    :5000

Option 2: Docker Container
┌──────────────────────┐
│  Docker Container    │
│  ┌────────────────┐  │
│  │ Gunicorn       │  │
│  │ Flask App      │  │
│  │ :5000          │  │
│  └────────────────┘  │
└──────────────────────┘
         │
    Browser
    Port (host)

Option 3: Cloud Deployment
┌────────────────────────────────────┐
│  Cloud Provider (AWS/Azure/Heroku) │
│  ┌──────────────────────────────┐  │
│  │  Nginx Reverse Proxy         │  │
│  │  ├─ Load balancing           │  │
│  │  └─ HTTPS/SSL                │  │
│  └─────────────┬────────────────┘  │
│                │                   │
│  ┌─────────────┴─────────────┐    │
│  │ Application Servers       │    │
│  │ ├─ Gunicorn Workers       │    │
│  │ ├─ Flask App              │    │
│  │ └─ Database Connection    │    │
│  └──────────────────────────┘    │
│  ┌──────────────────────────────┐  │
│  │ PostgreSQL Database          │  │
│  │ (for persistent storage)     │  │
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
         │
    Browser
    HTTPS
```

---

## Error Handling Flow

```
┌─────────────┐
│ User Action │
└──────┬──────┘
       │
       ↓
┌────────────────────┐    Success    ┌──────────────┐
│ API Request        ├─────────────→ │ Update UI    │
│ (with try/catch)   │               │ Show success │
└────────┬───────────┘               └──────────────┘
         │
         │ Error
         ↓
┌────────────────────────┐
│ Error Caught           │
│ ├─ Log to console      │
│ ├─ Identify error type │
│ └─ Prepare message     │
└────────┬───────────────┘
         │
         ↓
┌────────────────────────┐
│ Show Notification      │
│ ├─ Error message       │
│ ├─ Red background      │
│ └─ Auto-dismiss (3s)   │
└────────┬───────────────┘
         │
         ↓
┌────────────────────────┐
│ Log to Browser Console │
│ (F12 for debugging)    │
└────────────────────────┘
```

---

This architecture ensures:
✅ Real-time data updates
✅ Responsive user interface
✅ Scalable design
✅ Error handling
✅ Clean separation of concerns
✅ Easy customization
✅ Production-ready code
