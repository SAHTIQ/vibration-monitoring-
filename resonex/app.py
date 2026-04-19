from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import math
import random
import time
from datetime import datetime

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app, resources={
    r"/api/*": {
        "origins": "*",
        "methods": ["GET", "POST", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Store devices and their data
devices = {}
device_counter = 0

# Vibration thresholds
NORMAL_THRESHOLD = 1.5
WARNING_THRESHOLD = 2.5
ALERT_THRESHOLD = 3.5

# Data points to keep per device
MAX_DATA_POINTS = 60


def generate_vibration_data(device_id):
    """Generate realistic vibration data with sine wave + noise + occasional spikes"""
    current_time = time.time()
    
    # Sine wave component (base vibration pattern)
    sine_value = math.sin(current_time / 5) * 0.8
    
    # Random noise component
    noise = random.gauss(0, 0.3)
    
    # Occasional spikes (10% chance)
    spike = 0 if random.random() > 0.1 else random.uniform(1.5, 3.0)
    
    # Combine components
    vibration_value = abs(sine_value + noise + spike)
    
    # Add small device-specific offset for variety
    vibration_value += (device_id % 10) * 0.1
    
    return round(vibration_value, 2)


def get_status(vibration_value):
    """Determine status based on vibration threshold"""
    if vibration_value < NORMAL_THRESHOLD:
        return "normal"
    elif vibration_value < WARNING_THRESHOLD:
        return "warning"
    elif vibration_value < ALERT_THRESHOLD:
        return "danger"
    else:
        return "critical"


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/add_device", methods=["POST"])
def add_device():
    """Add a new monitoring device"""
    global device_counter
    
    data = request.json
    device_name = data.get("name", f"Device {device_counter + 1}").strip()
    
    if not device_name:
        return jsonify({"error": "Device name cannot be empty"}), 400
    
    device_id = device_counter
    device_counter += 1
    
    devices[device_id] = {
        "id": device_id,
        "name": device_name,
        "data": [],
        "created_at": datetime.now().isoformat(),
        "last_readings": [],
        "max_vibration": 0,
        "avg_vibration": 0
    }
    
    return jsonify({
        "success": True,
        "device_id": device_id,
        "device": devices[device_id]
    }), 201


@app.route("/api/get_data", methods=["GET"])
def get_data():
    """Get current data for all devices"""
    result = {
        "devices": [],
        "total_devices": len(devices),
        "devices_in_alert": 0,
        "timestamp": datetime.now().isoformat()
    }
    
    for device_id, device_info in devices.items():
        # Generate new vibration data
        current_vibration = generate_vibration_data(device_id)
        status = get_status(current_vibration)
        
        # Update device data
        device_info["data"].append(current_vibration)
        
        # Keep only last MAX_DATA_POINTS
        if len(device_info["data"]) > MAX_DATA_POINTS:
            device_info["data"] = device_info["data"][-MAX_DATA_POINTS:]
        
        # Update last 5 readings
        device_info["last_readings"] = device_info["data"][-5:]
        
        # Update statistics
        if device_info["data"]:
            device_info["max_vibration"] = round(max(device_info["data"]), 2)
            device_info["avg_vibration"] = round(sum(device_info["data"]) / len(device_info["data"]), 2)
        
        # Count alert devices
        if status in ["danger", "critical"]:
            result["devices_in_alert"] += 1
        
        result["devices"].append({
            "id": device_id,
            "name": device_info["name"],
            "current_vibration": current_vibration,
            "status": status,
            "data_points": device_info["data"],
            "last_readings": device_info["last_readings"],
            "max_vibration": device_info["max_vibration"],
            "avg_vibration": device_info["avg_vibration"],
            "created_at": device_info["created_at"]
        })
    
    return jsonify(result), 200


@app.route("/api/devices", methods=["GET"])
def get_devices():
    """Get list of all devices"""
    device_list = [
        {
            "id": device_id,
            "name": info["name"],
            "created_at": info["created_at"]
        }
        for device_id, info in devices.items()
    ]
    
    return jsonify({"devices": device_list}), 200


@app.route("/api/delete_device/<int:device_id>", methods=["DELETE"])
def delete_device(device_id):
    """Delete a monitoring device"""
    if device_id not in devices:
        return jsonify({"error": "Device not found"}), 404
    
    device_name = devices[device_id]["name"]
    del devices[device_id]
    
    return jsonify({
        "success": True,
        "message": f"Device '{device_name}' deleted successfully"
    }), 200


@app.route("/api/reset", methods=["POST"])
def reset():
    """Reset all devices"""
    global device_counter
    devices.clear()
    device_counter = 0
    
    return jsonify({"success": True, "message": "All devices reset"}), 200


if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    debug_mode = os.environ.get("DEBUG", "True") == "True"
    app.run(debug=debug_mode, host="0.0.0.0", port=port)
