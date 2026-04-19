"""
Example: Pre-populate Demo Devices

This file shows how to programmatically add devices
Useful for testing and demonstrations

Usage:
1. Import this file in app.py
2. Call initialize_demo_devices() after app starts
3. Devices will appear immediately on page load
"""

def initialize_demo_devices(devices_dict):
    """
    Add demo devices to the system
    
    Args:
        devices_dict: The devices dictionary from app.py
    
    Example:
        from demo_devices import initialize_demo_devices
        initialize_demo_devices(devices)
    """
    
    demo_devices = [
        {
            "id": 0,
            "name": "Motor A - Main Drive",
            "description": "Primary production line motor"
        },
        {
            "id": 1,
            "name": "Pump B - Coolant System",
            "description": "Cooling system circulation pump"
        },
        {
            "id": 2,
            "name": "Compressor C - Air Supply",
            "description": "High-pressure air compressor"
        },
        {
            "id": 3,
            "name": "Fan D - Ventilation",
            "description": "Facility ventilation system"
        },
        {
            "id": 4,
            "name": "Conveyor E - Material Transport",
            "description": "Material handling conveyor belt"
        },
    ]
    
    device_counter = 0
    
    for device in demo_devices:
        device_id = device["id"]
        devices_dict[device_id] = {
            "id": device_id,
            "name": device["name"],
            "data": [],
            "created_at": datetime.now().isoformat(),
            "last_readings": [],
            "max_vibration": 0,
            "avg_vibration": 0,
            "description": device["description"]
        }
        device_counter = max(device_counter, device_id + 1)
    
    return device_counter


# To use this in app.py, add these lines:
"""
from demo_devices import initialize_demo_devices

# After creating devices dictionary:
devices = {}
device_counter = initialize_demo_devices(devices)

# Now devices will be pre-populated!
"""

# ============================================
# ALTERNATIVE: Minimal Setup
# ============================================

MINIMAL_DEVICES = [
    ("Motor A", "Production Line"),
    ("Pump B", "Coolant System"),
    ("Compressor C", "Air Supply"),
]

"""
To use MINIMAL_DEVICES, you can loop through and add them:

for device_name, description in MINIMAL_DEVICES:
    # Add device logic here
"""
