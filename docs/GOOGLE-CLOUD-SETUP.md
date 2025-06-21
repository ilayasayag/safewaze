# Google Cloud Console Setup for SafeWaze

## 🎯 **EXACT Steps to Fix All Issues**

### Step 1: Enable Billing (Fixes "For development purposes only")

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Select your project** (or create one if needed)
3. **Click on "Billing" in the left menu**
4. **Link a billing account**:
   - Click "Link a billing account"
   - Add a credit card (Google provides $300 free credits)
   - This removes the development watermark

### Step 2: Enable Required APIs

**Go to APIs & Services → Library** and enable these **exact APIs**:

1. **Maps JavaScript API** ✅ (for map display)
2. **Geocoding API** ✅ (for address conversion) 
3. **Directions API** ⚠️ **← YOU NEED THIS ONE** (for navigation)
4. **Places API** (optional, for enhanced search)

**Direct Links**:
- Maps JavaScript API: https://console.cloud.google.com/apis/library/maps-backend.googleapis.com
- Directions API: https://console.cloud.google.com/apis/library/directions-backend.googleapis.com
- Geocoding API: https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com

### Step 3: API Key Configuration

1. **Go to APIs & Services → Credentials**
2. **Find your API key** (the one you gave me)
3. **Click "Edit" (pencil icon)**
4. **API restrictions → Restrict key**
5. **Select these APIs**:
   - Maps JavaScript API
   - Directions API
   - Geocoding API
   - Places API

### Step 4: Set Usage Quotas (Optional)

1. **Go to APIs & Services → Quotas**
2. **Set daily limits** to prevent unexpected charges:
   - Maps JavaScript API: 25,000 requests/day
   - Directions API: 2,500 requests/day
   - Geocoding API: 40,000 requests/day

## 🔧 **Browser Location Fix**

### For Chrome:
1. **Click the 🔒 icon** in address bar
2. **Location → Allow**
3. **Refresh the page**

### For Firefox:
1. **Click the shield icon** in address bar  
2. **Location → Allow**
3. **Refresh the page**

### Alternative Method:
1. **Chrome Settings → Privacy and security → Site Settings**
2. **Location → Add your site → Allow**

## 💡 **Test After Setup**

Once you've completed the above steps:

1. **Refresh SafeWaze demo page**
2. **Allow location when prompted**
3. **Check that map loads without watermark**
4. **Click shelter markers → "Get Directions" should work**
5. **Test "🚨 Simulate Alert" button**

## 📋 **Checklist - Complete These:**

- [ ] **Billing enabled** in Google Cloud Console
- [ ] **Directions API enabled** (most important!)
- [ ] **Maps JavaScript API enabled**
- [ ] **Geocoding API enabled**
- [ ] **API key restrictions configured**
- [ ] **Browser location permission granted**
- [ ] **Page refreshed after changes**

## ⚠️ **Important Notes**

1. **Billing is required** for production features (directions, etc.)
2. **Free tier provides generous limits** - you won't be charged for testing
3. **Changes take 1-2 minutes** to propagate
4. **Refresh the page** after making changes
5. **Location must be HTTPS or localhost** to work in browsers

## 🆘 **If Still Not Working**

1. **Wait 2-3 minutes** after enabling APIs
2. **Hard refresh** the page (Ctrl+F5 or Cmd+Shift+R)
3. **Check browser console** for specific error messages
4. **Try incognito/private browsing** mode
5. **Make sure all 3 APIs are enabled**: Maps JavaScript, Directions, Geocoding

---

**The main issue is likely that the Directions API is not enabled. This is the most commonly missed step!**
