// SafeWaze API Testing Script - Real API Calls
console.log('🧪 Starting SafeWaze API Testing...');

// Configuration
const config = {
    pikudApiUrl: 'https://api.tzevaadom.co.il/notifications',
    googleMapsApiKey: 'AIzaSyD5h2wBcWp1bgL6jkj7L2leg-hERfjD7yI',
    corsProxies: [
        'https://cors-anywhere.herokuapp.com/',
        'https://api.allorigins.win/raw?url=',
        'https://corsproxy.io/?'
    ]
};

// Test 1: Direct Pikud HaOref API Call
async function testPikudApiDirect() {
    console.log('\n🔍 Test 1: Direct Pikud HaOref API Call');
    try {
        const response = await fetch(config.pikudApiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'SafeWaze/1.0'
            }
        });
        
        console.log('✅ Response status:', response.status);
        console.log('✅ Response headers:', Object.fromEntries(response.headers.entries()));
        
        const data = await response.json();
        console.log('✅ Alert data received:', data);
        return { success: true, data };
        
    } catch (error) {
        console.log('❌ Direct API call failed:', error.message);
        return { success: false, error: error.message };
    }
}

// Test 2: Pikud API with CORS Proxies
async function testPikudApiWithProxies() {
    console.log('\n🔍 Test 2: Pikud API with CORS Proxies');
    
    for (const proxy of config.corsProxies) {
        console.log(`\nTrying proxy: ${proxy}`);
        try {
            const url = proxy + encodeURIComponent(config.pikudApiUrl);
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            console.log(`✅ Proxy ${proxy} - Status:`, response.status);
            const data = await response.json();
            console.log(`✅ Proxy ${proxy} - Data:`, data);
            return { success: true, proxy, data };
            
        } catch (error) {
            console.log(`❌ Proxy ${proxy} failed:`, error.message);
        }
    }
    
    return { success: false, error: 'All proxies failed' };
}

// Test 3: Google Maps Geocoding API
async function testGoogleMapsGeocoding() {
    console.log('\n🔍 Test 3: Google Maps Geocoding API');
    
    const testAddress = 'Tel Aviv, Israel';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(testAddress)}&key=${config.googleMapsApiKey}`;
    
    try {
        const response = await fetch(url);
        console.log('✅ Geocoding response status:', response.status);
        
        const data = await response.json();
        console.log('✅ Geocoding data:', data);
        
        if (data.status === 'OK') {
            const location = data.results[0].geometry.location;
            console.log('✅ Tel Aviv coordinates:', location);
            return { success: true, location, data };
        } else {
            console.log('❌ Geocoding error:', data.error_message);
            return { success: false, error: data.error_message };
        }
        
    } catch (error) {
        console.log('❌ Geocoding API call failed:', error.message);
        return { success: false, error: error.message };
    }
}

// Test 4: Google Maps Directions API
async function testGoogleMapsDirections() {
    console.log('\n🔍 Test 4: Google Maps Directions API');
    
    const origin = '32.0853,34.7818'; // Tel Aviv center
    const destination = '32.0745,34.7749'; // Dizengoff Center
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=walking&key=${config.googleMapsApiKey}`;
    
    try {
        const response = await fetch(url);
        console.log('✅ Directions response status:', response.status);
        
        const data = await response.json();
        console.log('✅ Directions status:', data.status);
        
        if (data.status === 'OK') {
            const route = data.routes[0];
            console.log('✅ Route found - Duration:', route.legs[0].duration.text);
            console.log('✅ Route found - Distance:', route.legs[0].distance.text);
            return { success: true, route, data };
        } else {
            console.log('❌ Directions error:', data.error_message);
            return { success: false, error: data.error_message };
        }
        
    } catch (error) {
        console.log('❌ Directions API call failed:', error.message);
        return { success: false, error: error.message };
    }
}

// Test 5: Browser Geolocation API
async function testGeolocationAPI() {
    console.log('\n🔍 Test 5: Browser Geolocation API');
    
    if (!navigator.geolocation) {
        console.log('❌ Geolocation not supported');
        return { success: false, error: 'Geolocation not supported' };
    }
    
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                resolve,
                reject,
                {
                    enableHighAccuracy: false,
                    timeout: 10000,
                    maximumAge: 600000
                }
            );
        });
        
        console.log('✅ Location acquired:', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
        });
        
        return { 
            success: true, 
            coords: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        };
        
    } catch (error) {
        console.log('❌ Geolocation failed:', error.message);
        console.log('Error code:', error.code);
        return { success: false, error: error.message, code: error.code };
    }
}

// Test 6: Network connectivity and CORS analysis
async function testNetworkConnectivity() {
    console.log('\n🔍 Test 6: Network Connectivity Analysis');
    
    const testUrls = [
        'https://httpbin.org/get',
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://api.github.com',
        config.pikudApiUrl
    ];
    
    for (const url of testUrls) {
        try {
            const startTime = Date.now();
            const response = await fetch(url, { method: 'HEAD' });
            const duration = Date.now() - startTime;
            
            console.log(`✅ ${url} - Status: ${response.status}, Time: ${duration}ms`);
            console.log(`   CORS headers:`, {
                'access-control-allow-origin': response.headers.get('access-control-allow-origin'),
                'access-control-allow-methods': response.headers.get('access-control-allow-methods')
            });
            
        } catch (error) {
            console.log(`❌ ${url} - Failed: ${error.message}`);
        }
    }
}

// Main test runner
async function runAllTests() {
    console.log('🚀 SafeWaze API Comprehensive Testing\n');
    console.log('Testing environment:', {
        userAgent: navigator.userAgent,
        location: window.location.href,
        timestamp: new Date().toISOString()
    });
    
    const results = {};
    
    // Run all tests
    results.pikudDirect = await testPikudApiDirect();
    results.pikudProxies = await testPikudApiWithProxies();
    results.geocoding = await testGoogleMapsGeocoding();
    results.directions = await testGoogleMapsDirections();
    results.geolocation = await testGeolocationAPI();
    await testNetworkConnectivity();
    
    // Summary
    console.log('\n📊 TEST RESULTS SUMMARY:');
    console.log('='.repeat(50));
    
    Object.entries(results).forEach(([test, result]) => {
        const status = result.success ? '✅ PASS' : '❌ FAIL';
        const error = result.error ? ` - ${result.error}` : '';
        console.log(`${status} ${test}${error}`);
    });
    
    console.log('\n🎯 RECOMMENDATIONS:');
    
    if (!results.pikudDirect.success) {
        console.log('• Pikud HaOref API requires CORS proxy or backend server');
    }
    
    if (!results.geolocation.success) {
        console.log('• Geolocation requires HTTPS or localhost for security');
    }
    
    if (!results.directions.success) {
        console.log('• Google Directions API may require billing enabled');
    }
    
    console.log('\n✨ Testing complete!');
    return results;
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    runAllTests().catch(console.error);
}

// Export for Node.js
if (typeof module !== 'undefined') {
    module.exports = { runAllTests, config };
}
