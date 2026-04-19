# 🧪 Testing Guide - Smart Vibration Monitoring System

## Pre-Testing Checklist

- [ ] Python 3.7+ installed
- [ ] All dependencies installed
- [ ] Flask server can start
- [ ] Browser (Chrome, Firefox, Safari, Edge)
- [ ] Port 5000 is available

---

## Unit Tests (Manual Testing)

### Test 1: Server Startup
**Steps:**
1. Run `run.bat` (Windows) or `python app.py` (Mac/Linux)
2. Wait for message: "Running on http://localhost:5000"

**Expected Result:**
- Server starts without errors
- Console shows Flask debug mode active
- No import errors

---

### Test 2: Frontend Load
**Steps:**
1. Open browser: `http://localhost:5000`
2. Wait for page to load

**Expected Result:**
- Dashboard appears with dark theme
- "No devices added yet" message visible
- All UI elements present:
  - Title: "Multi-Device Vibration Monitoring System"
  - Input field for device name
  - "Add New Device" button
  - Stats boxes (Total Devices, Devices in Alert, System Status)
  - Empty state message

---

### Test 3: Add Single Device
**Steps:**
1. Type "Test Motor 1" in device name field
2. Click "Add New Device" button
3. Wait 1-2 seconds

**Expected Result:**
- Green notification appears: "Device 'Test Motor 1' added successfully!"
- Device card appears in grid
- Card shows:
  - Device name: "Test Motor 1"
  - Device ID: "#0"
  - Current vibration value
  - Green status indicator: "✓ System Normal"
  - Line chart (starts updating)
- Stats update: "Total Devices: 1"
- "Devices in Alert" remains 0

---

### Test 4: Real-time Data Updates
**Steps:**
1. Add a device
2. Observe the card for 10 seconds
3. Watch the vibration value and chart

**Expected Result:**
- Vibration value changes every second
- Chart continuously updates with new data point
- Last 5 readings update with new values
- Max and Avg values may change
- Data appears to follow sine wave pattern with variations
- No console errors

---

### Test 5: Add Multiple Devices
**Steps:**
1. Add "Motor A"
2. Add "Pump B"
3. Add "Compressor C"
4. Add "Fan D"

**Expected Result:**
- All 4 devices appear in grid
- Each has unique ID (#0, #1, #2, #3)
- Each generates independent vibration data
- Charts show different patterns
- "Total Devices: 4" in stats
- All cards update simultaneously

---

### Test 6: Status Indicators - Normal (Green)
**Steps:**
1. Add a device
2. Wait and watch the vibration values
3. Look for values below 1.5 m/s²

**Expected Result:**
- Card has green status indicator (dot)
- Status text shows: "✓ System Normal"
- Card border glows slightly green
- No alert box appears
- Indicator has subtle glow animation

---

### Test 7: Status Indicators - Warning (Yellow)
**Steps:**
1. Add multiple devices
2. Wait for vibration values between 1.5 and 2.5
3. Look for yellow status

**Expected Result:**
- Card status indicator turns yellow
- Status text shows: "⚠ Warning Level"
- Card border has slight yellow glow
- No alert box (still in warning, not danger)
- Devices in Alert counter may increase

---

### Test 8: Status Indicators - Danger (Red)
**Steps:**
1. Add multiple devices and wait
2. Look for vibration spikes
3. Watch for red status and alerts

**Expected Result:**
- Card status indicator turns red
- Status text shows: "🔴 Danger Zone"
- Red alert box appears: "⚠️ ABNORMAL VIBRATION"
- Alert box blinks (alternates opacity)
- Card border glows red
- "Devices in Alert" counter increases
- Chart bars appear in red
- System Status changes to: "🔴 Alert Active"

---

### Test 9: Chart Updates
**Steps:**
1. Add a device
2. Wait 30+ seconds
3. Observe the chart

**Expected Result:**
- Chart shows smooth line
- Updates appear smooth, not jumpy
- Data points grow from left to right
- Chart maintains scrolling effect
- Max 30 data points visible
- Tooltip appears on hover
- Color matches device status (green/yellow/red)

---

### Test 10: Delete Device
**Steps:**
1. Add 2-3 devices
2. Click "✕" button on one card
3. Confirm deletion in dialog

**Expected Result:**
- Confirmation dialog appears
- After confirming, green notification: "Device deleted successfully"
- Device card disappears
- Chart is destroyed
- Total Devices count decreases
- Remaining devices continue updating

---

### Test 11: Input Validation
**Steps:**
1. Click "Add New Device" without entering text
2. Try adding device with only spaces

**Expected Result:**
- Error notification appears: "Please enter a device name"
- Device is not added
- No console errors

---

### Test 12: Keyboard Input
**Steps:**
1. Type device name in input field
2. Press Enter key

**Expected Result:**
- Device is added (same as clicking button)
- Notification appears
- Input field is cleared
- Focus returns to input field

---

### Test 13: Responsive Design - Desktop
**Steps:**
1. Resize browser to 1200px+ width
2. Observe layout

**Expected Result:**
- Multi-column grid layout
- Cards sized appropriately
- No overlapping elements
- All text readable

---

### Test 14: Responsive Design - Tablet
**Steps:**
1. Resize browser to 800px width
2. Observe layout

**Expected Result:**
- Single or 2-column grid
- Cards adjust size
- Charts remain readable
- Touch-friendly button sizes

---

### Test 15: Responsive Design - Mobile
**Steps:**
1. Resize browser to 400px width
2. Use mobile browser simulator (F12)

**Expected Result:**
- Single column layout
- Cards stack vertically
- Input field takes full width
- Button text readable
- Charts display properly
- No horizontal scroll

---

## API Tests (Using Browser Console or curl)

### Test A: GET /api/get_data
**Command:**
```bash
curl http://localhost:5000/api/get_data | json_pp
```

**Expected Result:**
```json
{
  "devices": [
    {
      "id": 0,
      "name": "Motor A",
      "current_vibration": 1.23,
      "status": "normal",
      "data_points": [...],
      ...
    }
  ],
  "total_devices": 1,
  "devices_in_alert": 0,
  "timestamp": "2024-01-01T12:00:00"
}
```

---

### Test B: POST /api/add_device
**Command:**
```bash
curl -X POST http://localhost:5000/api/add_device \
  -H "Content-Type: application/json" \
  -d '{"name":"API Test Device"}'
```

**Expected Result:**
- HTTP 201 status
- Device created with unique ID
- Device appears in next GET /api/get_data call

---

### Test C: DELETE /api/delete_device
**Command:**
```bash
curl -X DELETE http://localhost:5000/api/delete_device/0
```

**Expected Result:**
- HTTP 200 status
- Device removed from system
- Device disappears from UI and future API calls

---

## Performance Tests

### Test P1: Multiple Device Monitoring
**Steps:**
1. Add 20 devices using API or frontend
2. Monitor system for 2 minutes
3. Check browser performance (F12 → Performance tab)

**Expected Result:**
- All devices update smoothly
- Frame rate: 60 FPS (smooth scrolling)
- Memory usage stable (no leak)
- CPU usage reasonable (<50%)

---

### Test P2: Chart Performance
**Steps:**
1. Add 1 device
2. Let it run for 5 minutes
3. Check Chart.js rendering performance

**Expected Result:**
- Chart updates smoothly
- No lag or stuttering
- Data points roll smoothly from left to right

---

### Test P3: Long Session
**Steps:**
1. Keep dashboard open for 30+ minutes
2. Monitor for issues

**Expected Result:**
- System remains stable
- No memory leaks
- No console errors accumulating
- Updates continue smoothly

---

## Stress Tests

### Test S1: Rapid Device Addition
**Steps:**
1. Add 50 devices quickly (1 per second)
2. Monitor UI and console

**Expected Result:**
- All devices created successfully
- UI remains responsive
- Charts initialize properly
- No crashes

---

### Test S2: Rapid Deletion
**Steps:**
1. Add 10 devices
2. Delete all of them rapidly
3. Monitor performance

**Expected Result:**
- All devices delete successfully
- UI updates correctly
- No orphaned chart objects
- Return to empty state

---

## Error Handling Tests

### Test E1: Server Disconnection
**Steps:**
1. Start dashboard with devices
2. Stop Flask server (Ctrl+C)
3. Observe behavior

**Expected Result:**
- Console shows fetch error
- UI becomes unresponsive to add/delete
- Existing cards remain visible but frozen
- No data updates

---

### Test E2: Invalid API Response
**Steps:**
1. Modify API temporarily to send invalid JSON
2. Observe console

**Expected Result:**
- Console shows JSON parse error
- Graceful error handling
- App doesn't crash

---

## Browser Compatibility Tests

Test in:
- [ ] Chrome (Latest)
- [ ] Firefox (Latest)
- [ ] Safari (Latest)
- [ ] Edge (Latest)

**Expected Result in all browsers:**
- Dashboard displays correctly
- Animations smooth
- Charts render properly
- All features work

---

## Accessibility Tests

**Test A1: Keyboard Navigation**
- Tab through form fields
- Enter to submit form
- Arrow keys for selections

**Test A2: Screen Reader (if applicable)**
- Use browser screen reader
- Verify all elements are labeled

**Test A3: Color Contrast**
- Check text is readable on dark background
- Status indicators are distinguishable

---

## Testing Checklist Summary

### Critical Tests (Must Pass):
- [ ] Server starts without errors
- [ ] Frontend loads completely
- [ ] Can add devices
- [ ] Devices receive real-time data
- [ ] Status indicators work (green/yellow/red)
- [ ] Can delete devices
- [ ] Charts display and update
- [ ] Stats update correctly
- [ ] Responsive on mobile

### Important Tests (Should Pass):
- [ ] Alert system works (danger/critical)
- [ ] Multiple devices independent
- [ ] API endpoints functional
- [ ] Error messages display
- [ ] No console errors
- [ ] Smooth animations

### Nice-to-Have Tests:
- [ ] Performance under load
- [ ] Long session stability
- [ ] Keyboard shortcuts
- [ ] Mobile experience optimized

---

## Bug Report Template

```
Title: [Brief Description]
Severity: Critical / High / Medium / Low

Steps to Reproduce:
1. ...
2. ...
3. ...

Expected Result:
...

Actual Result:
...

Console Errors:
...

Browser/OS:
...

Screenshots:
[If applicable]
```

---

## Test Results Tracking

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| T1 | Server Startup | ✅ | |
| T2 | Frontend Load | ✅ | |
| T3 | Add Single Device | ✅ | |
| T4 | Real-time Updates | ✅ | |
| ... | ... | ... | |

---

## Sign-Off

**Tested By:** _______________
**Date:** _______________
**Overall Status:** ✅ PASS / ⚠️ ISSUES / ❌ FAIL

**Notes:**
_______________________________________________

---

**Happy Testing! 🎉**
