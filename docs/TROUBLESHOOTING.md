# SafeWaze Troubleshooting Guide

## 🚨 Common Issues & Solutions

### 1. "For development purposes only" on Google Maps

**Problem**: Google Maps shows watermark "For development purposes only"

**Solution**: 
- This appears when billing is not enabled for your Google Cloud project
- **Action Required**: Go to Google Cloud Console → Billing → Enable billing for your project
- The API key works but has usage limits without billing
- For testing purposes, the map still functions normally

### 2. Location Access Issues

**Problem**: "Couldn't share my location" or location permission denied

**Solutions**:
- **Browser Security**: Ensure you're accessing via `https://` or `localhost`
- **Chrome**: Click the 🔒 icon in address bar → Location → Allow
- **Firefox**: Click the shield icon → Location → Allow
- **Edge**: Click the lock icon → Location permissions → Allow
- **Mobile**: Check browser location permissions in device settings

**Manual Fix**:
- Open browser settings
- Search for "Location" or "Site permissions"
- Find your site and set location to "Allow"
- Refresh the page

### 3. Alert Simulation Not Working

**Problem**: Demo alert button doesn't trigger alerts

**Solution**: 
- Open browser console (F12)
- Click "🚨 Simulate Alert" button
- Check for JavaScript errors
- The function should be available as `simulateAlert()`

**Manual Test**:
```javascript
// Run in browser console:
simulateAlert()
```

### 4. API Connection Issues

**Problem**: "Alert service unavailable. Using demo mode"

**This is Normal**: 
- The Pikud HaOref API has CORS restrictions
- The app automatically falls back to demo mode
- This doesn't affect other functionality
- Real alerts would work in production with proper server setup

### 5. Directions Not Working

**Problem**: "Get Directions" button doesn't show routes

**Possible Causes**:
- **Billing not enabled**: Google Directions API requires billing
- **API restrictions**: Check if Directions API is enabled in Google Cloud Console
- **Location issues**: Ensure your location is detected first

**Solution**:
1. Go to Google Cloud Console
2. Enable Directions API
3. Ensure billing is enabled
4. Check API quotas and usage

### 6. Browser Compatibility Issues

**Supported Browsers**:
- ✅ Chrome 80+ (Recommended)
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

**Features that need modern browsers**:
- Geolocation API
- Speech Synthesis (voice alerts)
- Fetch API
- Local Storage

## 🔧 Quick Fixes

### Reset Application
```javascript
// Clear all data and restart (run in console):
localStorage.clear();
location.reload();
```

### Force Location Request
```javascript
// Request location again (run in console):
SafeWaze.requestLocation();
```

### Test Alert System
```javascript
// Trigger demo alert (run in console):
SafeWaze.triggerAlert(['Demo City', 'Test Area']);
```

### Clear Demo Alert
```javascript
// Clear active alert (run in console):
SafeWaze.clearAlert();
```

## 📱 Mobile Issues

### iOS Safari
- Enable Location Services: Settings → Privacy → Location Services → Safari
- Allow location for the website when prompted

### Android Chrome
- Enable Location: Settings → Site Settings → Location → Allow
- Check device location services are enabled

### Mobile Testing
- Use Chrome DevTools mobile emulator
- Test with actual device for best results
- Ensure HTTPS for location services

## 🗺️ Google Maps API Setup

### Required APIs to Enable:
1. **Maps JavaScript API** - For map display
2. **Geocoding API** - For address conversion
3. **Directions API** - For navigation routes

### API Key Configuration:
1. Create API key in Google Cloud Console
2. Enable billing (required for production)
3. Set HTTP referrer restrictions
4. Add key to application

### Billing Requirements:
- **Development**: Limited free usage
- **Production**: Billing required for full features
- **Quotas**: Check daily/monthly limits

## 🔍 Debugging Steps

### 1. Check Browser Console
- Press F12 → Console tab
- Look for error messages
- SafeWaze logs detailed information

### 2. Network Tab
- F12 → Network tab
- Check if API calls are being made
- Look for failed requests

### 3. Application Tab
- F12 → Application tab
- Check Local Storage for saved settings
- Verify service worker registration

### 4. Test Functions
```javascript
// Check if SafeWaze is loaded:
console.log(SafeWaze);

// Test notification system:
SafeWaze.showNotification('Test message', 'info');

// Check current state:
console.log(SafeWaze.state);

// Test voice alerts:
SafeWaze.speakAlert(['Test Location']);
```

## 🛠️ Development Mode

### Enable Detailed Logging
```javascript
// Add to browser console for verbose logging:
SafeWaze.config.debug = true;
```

### Test All Features
1. **Location**: Click "📍 Test Location"
2. **Alerts**: Click "🚨 Simulate Alert"
3. **Voice**: Click "🔊 Test Voice"
4. **Shelters**: Click "🏠 Show Shelters"
5. **Emergency**: Test emergency service buttons

## 📞 Production Considerations

### For Live Deployment:
1. **Enable HTTPS** - Required for location services
2. **Set up proper CORS** - For API access
3. **Configure billing** - For Google Maps APIs
4. **Test on real devices** - Mobile compatibility
5. **Set up monitoring** - Error tracking

### Security:
- Restrict API keys to your domains
- Use environment variables for sensitive data
- Implement proper error handling
- Set up analytics and monitoring

## 💡 Tips for Best Results

1. **Use Chrome** for development (best developer tools)
2. **Enable location services** at device level
3. **Allow notifications** for full experience
4. **Test on localhost** for location access
5. **Check console** for detailed logs
6. **Use demo buttons** to test features

---

**Need Help?** Check the browser console for detailed error messages and use the demo controls to test individual features.
