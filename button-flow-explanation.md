# 🚨 Simulate Alert Button - Code Flow Explanation

## How the "🚨 Simulate Alert" Button Works:

### 1. **Button Click** (in test-demo.html)
```javascript
function simulateAlert() {
    console.log('🚨 Simulating alert...');
    if (window.SafeWaze) {
        SafeWaze.triggerAlert(['Tel Aviv', 'Ramat Gan', 'Petah Tikva']);
    }
}
```

### 2. **triggerAlert Function** (line 428 in app.js)
```javascript
triggerAlert(alerts) {
    console.log('🚨 Triggering alert for:', alerts);
    
    this.state.isAlertActive = true;
    this.showAlertBanner(alerts);           // ✅ Shows red banner at top
    this.startCountdown();                  // ✅ Starts 10-minute countdown
    this.updateAlertStatus('danger');       // ✅ Changes header status to "ALERT"
    
    // Voice alert
    if (this.state.settings.voiceAlerts) {
        this.speakAlert(alerts);            // ✅ Plays voice alert
    }
    
    // Browser notification
    if (this.state.settings.pushNotifications) {
        this.showBrowserNotification(alerts); // ✅ Shows browser notification
    }
    
    // Show danger zones on map
    if (this.state.map) {
        this.showDangerZones(alerts);       // ✅ Shows red circle on map
    }
    
    // NEW: Automatically find and suggest nearest shelter during alert
    this.findAndSuggestNearestShelter();    // ✅ This is the key function!
}
```

### 3. **findAndSuggestNearestShelter Function** (line 442)
```javascript
async findAndSuggestNearestShelter() {
    if (!this.state.userLocation) {
        console.log('⚠️ No user location available for shelter recommendation');
        return;
    }
    
    // Find nearest shelter from our database
    const nearestShelter = this.findNearestShelter();
    
    if (nearestShelter) {
        const distance = nearestShelter.distance.toFixed(1);
        const message = `Nearest shelter: ${nearestShelter.name} (${distance}km away). Get directions?`;
        
        // Show immediate notification
        this.showNotification(`🏠 Nearest shelter found: ${distance}km away`, 'warning');
        
        // Show confirmation dialog for directions
        setTimeout(() => {
            const shouldNavigate = confirm(`🚨 ALERT ACTIVE!\n\n${message}`);
            if (shouldNavigate) {
                this.navigateToShelter(nearestShelter);
                this.showNotification('🧭 Directions to nearest shelter activated!', 'success');
            }
        }, 2000);  // ✅ 2-second delay before dialog
    }
}
```

### 4. **What Should Happen When You Click "🚨 Simulate Alert":**

1. **Immediate Effects:**
   - ✅ Red alert banner appears at top
   - ✅ Header status changes from "Safe" to "ALERT" (red, pulsing)
   - ✅ Countdown timer starts (10:00)
   - ✅ Voice alert plays: "Missile alert! Take shelter immediately..."
   - ✅ Orange notification appears: "🏠 Nearest shelter found: X.Xkm away"
   - ✅ Red danger zone circle appears on map (if Google Maps loaded)

2. **After 2 seconds:**
   - ✅ Confirmation dialog appears: "🚨 ALERT ACTIVE! Nearest shelter: [Name] (X.Xkm away). Get directions?"
   - If you click "OK": Directions to nearest shelter are shown
   - If you click "Cancel": Dialog closes

## 🏠 Show Shelters Button - Code Flow:

### 1. **Button Click**
```javascript
function showShelters() {
    console.log('🏠 Showing shelters...');
    if (window.SafeWaze) {
        SafeWaze.toggleShelterPanel();
    }
}
```

### 2. **toggleShelterPanel Function**
```javascript
toggleShelterPanel() {
    const panel = document.getElementById('shelterPanel');
    const isOpen = panel.classList.contains('open');
    
    if (isOpen) {
        panel.classList.remove('open');
    } else {
        this.searchAndDisplayShelters();    // ✅ Key function
        panel.classList.add('open');        // ✅ Shows panel
    }
}
```

### 3. **What Should Happen When You Click "🏠 Show Shelters":**

1. **Panel slides up from bottom** with:
   - "🔍 Searching for shelters..." (briefly)
   - List of shelters with color-coded distance badges:
     - 🟢 Green: ≤ 1km (Closest)
     - 🟠 Orange: 1-3km (Near)  
     - 🔵 Blue: 3-5km (Medium)
     - 🔴 Red: >5km (Far)
   - Distance legend at bottom
   - Color-coded markers appear on map

## 🔍 Debugging Steps:

If buttons aren't working, check:

1. **Browser console for errors** (F12)
2. **SafeWaze object exists**: Type `window.SafeWaze` in console
3. **Location is set**: Type `SafeWaze.state.userLocation` in console
4. **Functions exist**: Type `SafeWaze.triggerAlert` in console

## 🧪 Manual Testing:

You can test functions directly in console:
```javascript
// Test alert
SafeWaze.triggerAlert(['Demo City']);

// Test shelters
SafeWaze.toggleShelterPanel();

// Check state
console.log(SafeWaze.state);
