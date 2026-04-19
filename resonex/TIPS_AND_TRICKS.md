# 💡 Tips & Tricks - Smart Vibration Monitoring System

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Enter** | Add device (when input is focused) |
| **Tab** | Move to next form element |
| **Ctrl+C** | Stop the server (in terminal) |
| **F12** | Open browser developer tools |
| **F5** | Refresh dashboard |
| **Escape** | Close any dialogs |

---

## 🎯 Pro Tips

### 1. Quick Device Addition
- Use keyboard: Type name → Press Enter
- Faster than clicking button each time
- Input field auto-clears after success

### 2. Monitor Critical Devices
- Add devices in order of importance
- Critical devices appear at top of grid
- Check alerts first thing in morning

### 3. Use Descriptive Names
**Good:**
- "Motor A - Production Line"
- "Pump B (Coolant System)"
- "Compressor C [Air Supply]"

**Avoid:**
- "M1", "P", "ABC" (too vague)
- Symbols: "Motor#1" (may cause issues)
- Very long names: >50 characters

### 4. Set Up Alert Threshold Reminders
- Normal < 1.5 m/s² (Green)
- Warning 1.5-2.5 m/s² (Yellow)
- Danger > 2.5 m/s² (Red)

Write these down for team reference!

### 5. Browser Console Debugging
```javascript
// View all current devices
Object.keys(devices)

// Check specific device data
devices[0]

// Get current chart
charts[0]

// Manual refresh
fetchAndUpdateData()
```

---

## 🔍 Troubleshooting Tips

### Dashboard Not Updating?
1. **Check Network Tab (F12)**
   - Look for `/api/get_data` requests
   - Should see requests every 1 second
   - Check response status (should be 200)

2. **Check Console for Errors**
   - F12 → Console tab
   - Look for red error messages
   - Note the exact error

3. **Verify Backend**
   ```bash
   curl http://localhost:5000/api/get_data
   ```
   - Should return JSON data
   - If error, backend may be crashed

### Devices Not Adding?
1. Check for confirmation notification
2. Look at Console for errors
3. Verify backend response:
   ```bash
   curl -X POST http://localhost:5000/api/add_device \
     -H "Content-Type: application/json" \
     -d '{"name":"Test"}'
   ```

### Charts Not Showing?
1. Verify Chart.js loaded
   - Console: `typeof Chart` should show "function"
2. Check canvas element exists
   - F12 → Elements → Find `<canvas>`
3. Look for JavaScript errors in console

### Browser Memory Growing?
1. Close and reopen dashboard
2. Check Number of devices
3. Limit to <50 devices for stability

---

## 📊 Data Analysis Tips

### Understanding the Graphs
- **X-axis**: Time progression (left = older, right = newer)
- **Y-axis**: Vibration intensity (m/s²)
- **Smooth curves**: Normal operation
- **Spikes**: Abnormal events

### Reading Last 5 Readings
- Left to right: oldest to newest
- Trend upward: Getting worse
- Stable: Consistent operation
- Spikes: Anomalies detected

### Using Statistics
- **Max**: Highest vibration recorded
- **Avg**: Average vibration level
- Use these to detect trends over time

---

## 🎨 Customization Tips

### Change Alert Colors
**File: `style.css`**
```css
:root {
  --success-green: #4caf50;      /* Green status */
  --warning-yellow: #ff9800;     /* Yellow status */
  --danger-red: #f44336;         /* Red status */
}
```

### Adjust Update Speed
**File: `script.js`**
```javascript
UPDATE_INTERVAL = 500  // Faster: 500ms
UPDATE_INTERVAL = 2000 // Slower: 2 seconds
```

### Modify Thresholds
**File: `app.py`**
```python
NORMAL_THRESHOLD = 1.0    # Change normal limit
WARNING_THRESHOLD = 2.0   # Change warning limit
ALERT_THRESHOLD = 3.0     # Change danger limit
```

### Add Device Descriptions
**File: `index.html` (in template)**
```html
<div class="device-description"></div>
```

Then update in `script.js`:
```javascript
card.querySelector('.device-description').textContent = 
  device.description;
```

---

## 🚀 Performance Optimization

### Reduce CPU Usage
1. Decrease update frequency:
   ```javascript
   UPDATE_INTERVAL = 2000  // Every 2 seconds
   ```

2. Reduce chart points:
   ```python
   MAX_DATA_POINTS = 30  # Instead of 60
   ```

3. Disable animations for slow browsers:
   - Comment out animations in `style.css`

### Improve Responsiveness
1. Increase update speed (for snappier feel)
2. Use Chrome for best performance
3. Close other tabs to free memory

### Multiple Devices Optimization
- Keep device count under 50
- Use minimal device names
- Consider splitting into multiple dashboards

---

## 🔧 Advanced Customization

### Add Device Categories
1. Modify `add_device` API to accept category
2. Add category to device template
3. Style cards by category color

### Create Device Groups
1. Add grouping logic in `script.js`
2. Create collapsible sections
3. Show summary stats per group

### Export Data
1. Add export button to UI
2. Collect data from charts
3. Generate CSV/JSON file

### Historical Trends
1. Store max/min per hour
2. Create weekly/monthly reports
3. Show trend graphs

---

## 📱 Mobile Usage Tips

### Optimal Mobile Experience
1. Single-column layout (automatic)
2. Larger touch targets
3. Swipe-friendly card interactions

### Mobile Troubleshooting
1. Ensure good internet connection
2. Browser must support ES6 (all modern)
3. Disable browser zoom for consistency
4. Landscape mode shows more cards

---

## 🔐 Security Tips

### For Local Use Only
- Current setup is for development
- No authentication implemented
- Data not encrypted

### Before Production
1. Add user authentication
2. Enable HTTPS
3. Validate all inputs
4. Rate-limit API calls
5. Use environment variables for secrets

### Securing Credentials
- Never commit `.env` files
- Use environment variables
- Rotate API keys regularly
- Use HTTPS for API calls

---

## 📈 Usage Patterns

### Daily Monitoring
```
Morning: Check alerts from overnight
Midday: Review peak vibration values
Evening: Ensure devices stable before shutdown
```

### Weekly Review
- Export data for analysis
- Check trending upward vibrations
- Plan maintenance if needed

### Monthly Maintenance
- Clean device filters/sensors
- Calibrate if needed
- Update thresholds based on data
- Archive old data

---

## 🎓 Learning Resources

### Understanding Vibration Monitoring
- Normal vs abnormal vibrations
- Predictive maintenance concepts
- Machine health indicators
- IoT in manufacturing

### API Development
- RESTful design principles
- HTTP status codes
- JSON data format
- CORS and security

### Frontend Development
- JavaScript DOM manipulation
- Chart libraries (Chart.js)
- Real-time data updates
- Responsive design

---

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Blank screen | Refresh F5, check console errors |
| No data updating | Check backend, verify port 5000 |
| Charts not rendering | Verify Chart.js loaded, check canvas |
| Device not adding | Check input value, verify backend response |
| Alerts not showing | Check vibration thresholds, refresh page |
| Memory increasing | Limit devices, close unused dashboards |
| Slow performance | Reduce update interval, use Chrome |

---

## 📝 Logging & Debugging

### Enable Verbose Logging
**In `script.js`, add logging:**
```javascript
console.log('Fetching data...');
console.log(data);
console.log('Updating device:', device.id);
```

### Check Flask Logs
Server console shows:
- Request method and path
- Response status and size
- Any errors or warnings

### Browser Console Tricks
```javascript
// Get notification history
localStorage

// Monitor API calls
// F12 → Network tab

// Performance metrics
performance.measure('updateUI')
```

---

## 💾 Backup & Recovery

### Save Dashboard State
Since data is in memory:
- Take screenshots for records
- Export data periodically
- Keep deployment notes

### Restart Without Data Loss
- Deploy database backend
- Export to CSV/JSON first
- Keep configuration files

---

## 🎯 Best Practices

✅ **Do:**
- Use descriptive device names
- Monitor trends over time
- Respond to alerts promptly
- Keep server running
- Regularly review data

❌ **Don't:**
- Use sensitive names in demo
- Leave server exposed publicly
- Ignore repeated alerts
- Run 100+ devices simultaneously
- Store production data in memory

---

## 🔗 Quick Links

- **Start Server**: `run.bat` (Windows)
- **API Docs**: Check `README.md`
- **Setup Help**: See `QUICKSTART.md`
- **Testing**: Reference `TESTING_GUIDE.md`
- **Configuration**: Edit `config.py`

---

## 📞 Getting Help

1. **Check Console**: F12 → Console tab
2. **Read Documentation**: README.md
3. **Review QUICKSTART**: Setup instructions
4. **Test API**: Use curl commands
5. **Browser Tools**: Network tab for requests

---

## 🎉 Pro User Checklist

- [ ] Can add/delete devices in <5 seconds
- [ ] Understand all 3 alert levels
- [ ] Can read and interpret charts
- [ ] Know how to check backend
- [ ] Can debug console errors
- [ ] Familiar with all API endpoints
- [ ] Set up on multiple machines
- [ ] Customized for your environment
- [ ] Trained team members
- [ ] Documented your setup

---

**Master the Dashboard! 🚀**

More questions? Check the comprehensive documentation files.
