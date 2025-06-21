# SafeWaze - Emergency-Aware Navigation System

🛡️ **Real-time emergency navigation system for Israel with Pikud HaOref API integration**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](package.json)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](package.json)

## 🚨 Overview

SafeWaze is a life-saving emergency navigation application designed specifically for Israel's security environment. It integrates real-time missile alert data from Pikud HaOref (Home Front Command) with interactive mapping and shelter navigation to help users stay safe during emergencies.

## ✨ Key Features

- 🚨 **Real-time Emergency Alerts** - Live Pikud HaOref API integration
- 🗺️ **Interactive Maps** - Google Maps with shelter locations
- 🏠 **Shelter Navigation** - Distance-based recommendations with directions
- 📱 **Mobile-First Design** - Responsive, PWA-ready interface
- 🔊 **Voice Alerts** - Text-to-speech emergency notifications
- 🌐 **Multi-language** - Hebrew, English, Arabic, Russian support
- 📞 **Emergency Services** - One-tap access to Israeli emergency numbers

## 📁 Project Structure

```
safewaze/
├── src/                    # Source files
│   ├── index.html         # Main application
│   ├── test-demo.html     # Development interface with testing controls
│   ├── app.js             # Core application logic
│   └── style.css          # Responsive design and styling
├── docs/                   # Documentation
│   ├── SETUP-GUIDE.md     # Detailed setup instructions
│   ├── GOOGLE-CLOUD-SETUP.md  # Google Cloud Console configuration
│   └── TROUBLESHOOTING.md # Common issues and solutions
├── tests/                  # Testing files
│   ├── api-test.js        # Browser-based API testing
│   └── api-test-node.js   # Node.js API testing (bypasses CORS)
├── temp/                   # Temporary files (not for production)
├── package.json           # Project configuration
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## 🚀 Quick Start

### **Requirements**
- Node.js 14+ (for testing)
- Modern web browser
- Google Maps API key (optional for full functionality)

### **Installation**
```bash
# Clone the repository
git clone https://github.com/your-username/safewaze.git
cd safewaze

# Install dependencies (if any)
npm install
```

### **Running the Application**
```bash
# Open main application
npm run dev
# or manually open src/index.html

# Run API tests
npm test

# Open demo interface
open src/test-demo.html
```

## 🔧 Configuration

### **Google Maps API Setup** (Optional)
1. Get API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable required APIs:
   - Maps JavaScript API
   - Directions API
   - Geocoding API
3. Update API key in `src/app.js`:

```javascript
config: {
    googleMapsApiKey: 'YOUR_API_KEY_HERE'
}
```

**Detailed setup guide**: See [`docs/GOOGLE-CLOUD-SETUP.md`](docs/GOOGLE-CLOUD-SETUP.md)

## 🧪 Testing & Development

### **Demo Interface**
- Open `src/test-demo.html` for interactive testing
- Use demo controls to test all features
- Monitor browser console for API status

### **API Testing**
```bash
# Test APIs directly (bypasses browser CORS)
node tests/api-test-node.js

# Browser-based testing
open tests/api-test.js
```

### **Features Testing**
- **Alert Simulation**: Use "🚨 Simulate Alert" button
- **Voice Testing**: Click "🔊 Test Voice" 
- **Shelter System**: Try "🏠 Show Shelters"
- **Emergency Services**: Test all 4 emergency buttons

## 📊 API Integration Status

### **✅ Pikud HaOref API**
- **Endpoint**: `https://api.tzevaadom.co.il/notifications`
- **Status**: Working (200 OK) - tested via Node.js
- **Browser**: CORS-restricted (requires backend proxy)
- **Response**: `[]` when no alerts, `["location1", "location2"]` when active

### **✅ Google Maps API**
- **Maps JavaScript API**: Working ✅
- **Directions API**: Working ✅ (24 min route tested)
- **Geocoding API**: Needs enabling ⚠️

## 📱 Browser Support

| Browser | Desktop | Mobile | Status |
|---------|---------|--------|--------|
| Chrome | 80+ | ✅ | Recommended |
| Firefox | 75+ | ✅ | Full support |
| Safari | 13+ | ✅ | Full support |
| Edge | 80+ | ✅ | Full support |

## 🚀 Deployment

### **Development**
- Serve files locally
- Use `localhost` for location services
- Check `docs/SETUP-GUIDE.md` for details

### **Production**
1. **HTTPS hosting** (required for location services)
2. **Backend proxy** for Pikud HaOref API
3. **Google Cloud billing** for full Maps functionality
4. **Domain restrictions** for API keys

## 📞 Emergency Services (Israel)

| Service | Number | Description |
|---------|--------|-------------|
| Police | 100 | Israel Police emergency line |
| Medical | 101 | Magen David Adom (MDA) |
| Fire | 102 | Fire and Rescue Services |
| Home Front | 104 | Pikud HaOref information line |

## 🔒 Security & Privacy

- **No data storage**: Location data stays on device
- **HTTPS only**: Secure API communications
- **Privacy-first**: Minimal data collection
- **Open source**: Transparent and auditable

## 🤝 Contributing

SafeWaze is built to save lives. Contributions welcome:

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### **Areas for Contribution**
- Additional shelter databases
- Multi-language translations
- Accessibility improvements
- Mobile app development
- Backend proxy implementation

## 📋 NPM Scripts

```bash
npm start       # Start the application
npm test        # Run API tests
npm run dev     # Open demo interface
npm run build   # Build for production (future)
```

## 📚 Documentation

- **Setup Guide**: [`docs/SETUP-GUIDE.md`](docs/SETUP-GUIDE.md)
- **Google Cloud Setup**: [`docs/GOOGLE-CLOUD-SETUP.md`](docs/GOOGLE-CLOUD-SETUP.md)
- **Troubleshooting**: [`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Emergency**: Always contact local emergency services first
- **Technical Issues**: [Create an issue](https://github.com/your-username/safewaze/issues)
- **Documentation**: Check the `docs/` folder

## 🎯 Roadmap

### **Phase 1** (Current)
- ✅ Core emergency navigation functionality
- ✅ Real API integration and testing
- ✅ Responsive web application

### **Phase 2** (Next)
- 🔄 Backend proxy server
- 🔄 Real-time shelter database
- 🔄 Enhanced PWA features

### **Phase 3** (Future)
- 🔄 Mobile app development
- 🔄 Advanced route optimization
- 🔄 Community features

---

**🛡️ SafeWaze - Keeping Israel Safe, One Alert at a Time**

*Built with ❤️ for the safety and security of all people in Israel*
