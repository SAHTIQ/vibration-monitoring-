// Global Variables
const API_BASE = '/api';
const UPDATE_INTERVAL = 1000; // 1 second
let charts = {};
let devices = {};
let updateInterval;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    startDataUpdate();
});

// Event Listeners
function initEventListeners() {
    const addBtn = document.getElementById('addBtn');
    const deviceName = document.getElementById('deviceName');

    addBtn.addEventListener('click', addDevice);
    deviceName.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addDevice();
    });
}

// Add Device
async function addDevice() {
    const nameInput = document.getElementById('deviceName');
    const name = nameInput.value.trim();

    if (!name) {
        showNotification('Please enter a device name', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/add_device`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            const data = await response.json();
            showNotification(`Device "${name}" added successfully!`, 'success');
            nameInput.value = '';
            nameInput.focus();
            
            // Fetch updated data
            await fetchAndUpdateData();
        } else {
            showNotification('Failed to add device', 'error');
        }
    } catch (error) {
        console.error('Error adding device:', error);
        showNotification('Error adding device', 'error');
    }
}

// Delete Device
async function deleteDevice(deviceId) {
    if (!confirm('Are you sure you want to delete this device?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/delete_device/${deviceId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showNotification('Device deleted successfully', 'success');
            if (charts[deviceId]) {
                charts[deviceId].destroy();
                delete charts[deviceId];
            }
            delete devices[deviceId];
            await fetchAndUpdateData();
        }
    } catch (error) {
        console.error('Error deleting device:', error);
        showNotification('Error deleting device', 'error');
    }
}

// Fetch and Update Data
async function fetchAndUpdateData() {
    try {
        const response = await fetch(`${API_BASE}/get_data`);
        const data = await response.json();

        // Update global stats
        updateGlobalStats(data);

        // Update or create device cards
        for (const device of data.devices) {
            updateDeviceCard(device);
        }

        // Remove deleted devices from UI
        const existingIds = new Set(data.devices.map(d => d.id));
        document.querySelectorAll('.device-card').forEach(card => {
            const deviceId = parseInt(card.getAttribute('data-device-id'));
            if (!existingIds.has(deviceId)) {
                card.remove();
            }
        });

        // Show/hide empty state
        updateEmptyState(data.devices.length === 0);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Update Global Stats
function updateGlobalStats(data) {
    document.getElementById('totalDevices').textContent = data.total_devices;
    document.getElementById('alertDevices').textContent = data.devices_in_alert;

    // Update system status
    const statusElement = document.getElementById('systemStatus');
    if (data.devices_in_alert > 0) {
        statusElement.textContent = '🔴 Alert Active';
        statusElement.style.color = 'var(--danger-red)';
    } else if (data.total_devices === 0) {
        statusElement.textContent = '⚪ Idle';
        statusElement.style.color = 'var(--text-secondary)';
    } else {
        statusElement.textContent = '🟢 Operational';
        statusElement.style.color = 'var(--success-green)';
    }
}

// Update Empty State
function updateEmptyState(isEmpty) {
    const grid = document.getElementById('devicesGrid');
    const emptyState = grid.querySelector('.empty-state');

    if (isEmpty) {
        if (!emptyState) {
            grid.innerHTML = `
                <div class="empty-state">
                    <p class="empty-icon">📊</p>
                    <p class="empty-text">No devices added yet. Add your first device to get started!</p>
                </div>
            `;
        }
    } else {
        if (emptyState) {
            emptyState.remove();
        }
    }
}

// Update Device Card
function updateDeviceCard(device) {
    const grid = document.getElementById('devicesGrid');
    let card = document.querySelector(`[data-device-id="${device.id}"]`);

    if (!card) {
        // Create new card
        card = createDeviceCard(device);
        grid.appendChild(card);
    }

    // Update card data
    updateCardContent(card, device);
    updateChartData(device);

    // Update card styling based on status
    card.className = `device-card status-${device.status}`;
}

// Create Device Card
function createDeviceCard(device) {
    const template = document.getElementById('deviceCardTemplate');
    const clone = template.content.cloneNode(true);

    const card = clone.querySelector('.device-card');
    card.setAttribute('data-device-id', device.id);

    // Setup delete button
    const deleteBtn = clone.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', () => deleteDevice(device.id));

    return clone;
}

// Update Card Content
function updateCardContent(card, device) {
    // Device name and ID
    card.querySelector('.device-name').textContent = device.name;
    card.querySelector('.device-id').textContent = `#${device.id}`;

    // Vibration value
    card.querySelector('.vibration-value').textContent = device.current_vibration.toFixed(2);

    // Status indicator and text
    const statusIndicator = card.querySelector('.status-indicator');
    const statusText = card.querySelector('.status-text');

    statusIndicator.className = 'status-indicator';
    statusText.className = 'status-text';

    switch (device.status) {
        case 'normal':
            statusIndicator.classList.add('normal');
            statusText.classList.add('normal');
            statusText.textContent = '✓ System Normal';
            break;
        case 'warning':
            statusIndicator.classList.add('warning');
            statusText.classList.add('warning');
            statusText.textContent = '⚠ Warning Level';
            break;
        case 'danger':
            statusIndicator.classList.add('danger');
            statusText.classList.add('danger');
            statusText.textContent = '🔴 Danger Zone';
            break;
        case 'critical':
            statusIndicator.classList.add('danger');
            statusText.classList.add('danger');
            statusText.textContent = '🔴 Critical';
            break;
    }

    // Alert box
    const alertBox = card.querySelector('.alert-box');
    if (device.status === 'danger' || device.status === 'critical') {
        alertBox.innerHTML = `⚠️ ABNORMAL VIBRATION<br><small>${device.current_vibration.toFixed(2)} m/s²</small>`;
        alertBox.classList.add('show');
    } else {
        alertBox.classList.remove('show');
    }

    // Last 5 readings
    const readingsList = card.querySelector('.readings-list');
    readingsList.innerHTML = device.last_readings
        .map(reading => `<span class="reading-badge">${reading.toFixed(2)}</span>`)
        .join('');

    // Statistics
    card.querySelector('.max-value').textContent = device.max_vibration.toFixed(2);
    card.querySelector('.avg-value').textContent = device.avg_vibration.toFixed(2);
}

// Create or Update Chart
function updateChartData(device) {
    const canvasId = `chart-${device.id}`;
    let canvas = document.querySelector(`[data-device-id="${device.id}"] .vibration-chart`);

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Generate labels (time points)
    const labels = device.data_points.map((_, i) => i);

    // Determine chart color based on status
    let borderColor = '#4caf50';
    let backgroundColor = 'rgba(76, 175, 80, 0.1)';
    let pointBackgroundColor = '#4caf50';

    switch (device.status) {
        case 'warning':
            borderColor = '#ff9800';
            backgroundColor = 'rgba(255, 152, 0, 0.1)';
            pointBackgroundColor = '#ff9800';
            break;
        case 'danger':
        case 'critical':
            borderColor = '#f44336';
            backgroundColor = 'rgba(244, 67, 54, 0.1)';
            pointBackgroundColor = '#f44336';
            break;
    }

    if (charts[device.id]) {
        // Update existing chart
        charts[device.id].data.labels = labels;
        charts[device.id].data.datasets[0].data = device.data_points;
        charts[device.id].data.datasets[0].borderColor = borderColor;
        charts[device.id].data.datasets[0].backgroundColor = backgroundColor;
        charts[device.id].data.datasets[0].pointBackgroundColor = pointBackgroundColor;
        charts[device.id].update('none');
    } else {
        // Create new chart
        charts[device.id] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `${device.name} - Vibration (m/s²)`,
                    data: device.data_points,
                    borderColor: borderColor,
                    backgroundColor: backgroundColor,
                    borderWidth: 2.5,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointBackgroundColor: pointBackgroundColor,
                    pointBorderColor: borderColor,
                    pointBorderWidth: 0,
                    pointHoverRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    filler: {
                        propagate: true
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        borderColor: borderColor,
                        borderWidth: 1,
                        padding: 10,
                        titleFont: { size: 12 },
                        bodyFont: { size: 11 },
                        callbacks: {
                            label: (context) => {
                                return `Vibration: ${context.parsed.y.toFixed(2)} m/s²`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            font: { size: 10 }
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            font: { size: 10 }
                        }
                    }
                }
            }
        });
    }
}

// Start Data Update Loop
function startDataUpdate() {
    fetchAndUpdateData();
    updateInterval = setInterval(fetchAndUpdateData, UPDATE_INTERVAL);
}

// Stop Data Update
function stopDataUpdate() {
    clearInterval(updateInterval);
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'error' ? 'rgba(244, 67, 54, 0.9)' : type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(30, 136, 229, 0.9)'};
        color: white;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        backdrop-filter: blur(10px);
        border: 1px solid ${type === 'error' ? 'rgba(244, 67, 54, 1)' : type === 'success' ? 'rgba(76, 175, 80, 1)' : 'rgba(30, 136, 229, 1)'};
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(300px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(300px);
        }
    }
`;
document.head.appendChild(style);

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    stopDataUpdate();
});
