"""
Configuration file for Smart Vibration Monitoring System
Customize these settings to match your requirements
"""

# ============================================
# VIBRATION THRESHOLDS (in m/s²)
# ============================================

# Normal operation threshold
# Below this value: Green status, "System Normal"
NORMAL_THRESHOLD = 1.5

# Warning level threshold
# Between NORMAL and this value: Yellow status, "⚠ Warning Level"
WARNING_THRESHOLD = 2.5

# Danger/Alert threshold
# Above this value: Red status, "🔴 Danger Zone"
ALERT_THRESHOLD = 3.5

# ============================================
# DATA STORAGE SETTINGS
# ============================================

# Maximum number of data points to keep per device
# Older data points will be removed when this limit is exceeded
MAX_DATA_POINTS = 60

# Update frequency in seconds
# How often devices generate new vibration readings
UPDATE_FREQUENCY = 1

# ============================================
# DATA GENERATION SETTINGS (SIMULATION)
# ============================================

# Sine wave amplitude for base vibration pattern
SINE_AMPLITUDE = 0.8

# Period of sine wave in seconds (how long one complete cycle takes)
SINE_PERIOD = 5

# Standard deviation of random noise component
NOISE_STDDEV = 0.3

# Probability of spike occurrence (0.0 to 1.0)
# 0.1 = 10% chance of abnormal spike per reading
SPIKE_PROBABILITY = 0.1

# Range for spike values [min, max]
SPIKE_RANGE = (1.5, 3.0)

# Device-specific offset multiplier
# Adds small variations between devices for realism
DEVICE_OFFSET_MULTIPLIER = 0.1

# ============================================
# FLASK SERVER SETTINGS
# ============================================

# Flask debug mode (set to False for production)
DEBUG_MODE = True

# Server host (0.0.0.0 = accessible from any network interface)
SERVER_HOST = "0.0.0.0"

# Server port
SERVER_PORT = 5000

# Enable CORS (Cross-Origin Resource Sharing)
# Required for frontend to access backend API
ENABLE_CORS = True

# ============================================
# UI/UX SETTINGS
# ============================================

# Default update interval in milliseconds (frontend)
# How often frontend fetches new data from backend
FRONTEND_UPDATE_INTERVAL = 1000  # 1 second

# Chart animation speed in milliseconds
CHART_ANIMATION_DURATION = 300

# Notification display duration in milliseconds
NOTIFICATION_DURATION = 3000

# ============================================
# EXPORT/LOGGING SETTINGS
# ============================================

# Enable data logging to file
ENABLE_LOGGING = False

# Log file path
LOG_FILE_PATH = "logs/system.log"

# Log level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
LOG_LEVEL = "INFO"

# ============================================
# ADVANCED SETTINGS
# ============================================

# Maximum number of devices allowed per session
MAX_DEVICES = 100

# Auto-clear data after X hours (0 = never auto-clear)
AUTO_CLEAR_AFTER_HOURS = 0

# Enable API request rate limiting
ENABLE_RATE_LIMITING = False

# Rate limit: requests per minute
RATE_LIMIT_PER_MINUTE = 60

# ============================================
# FEATURE FLAGS
# ============================================

# Enable historical data export
ENABLE_EXPORT = True

# Enable device grouping
ENABLE_GROUPING = False

# Enable advanced analytics
ENABLE_ANALYTICS = False

# Enable real-time notifications
ENABLE_NOTIFICATIONS = True

# Enable device comparison view
ENABLE_COMPARISON = False
