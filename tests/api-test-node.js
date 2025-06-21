// Node.js API Testing Script for SafeWaze
const https = require('https');
const http = require('http');

console.log('🧪 SafeWaze API Testing (Node.js)\n');

// Configuration
const config = {
    pikudApiUrl: 'https://api.tzevaadom.co.il/notifications',
    googleMapsApiKey: 'AIzaSyD5h2wBcWp1bgL6jkj7L2leg-hERfjD7yI'
};

// HTTP Request helper
function makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const protocol = urlObj.protocol === 'https:' ? https : http;
        
        const requestOptions = {
            hostname: urlObj.hostname,
            port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
            path: urlObj.pathname + urlObj.search,
            method: options.method || 'GET',
            headers: {
                'User-Agent': 'SafeWaze/1.0 (Node.js API Test)',
                'Accept': 'application/json',
                ...options.headers
            }
        };

        const req = protocol.request(requestOptions, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const result = {
                        status: res.statusCode,
                        headers: res.headers,
                        data: data ? JSON.parse(data) : null,
                        raw: data
                    };
                    resolve(result);
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        data: null,
                        raw: data,
                        parseError: e.message
                    });
                }
            });
        });

        req.on('error', reject);
        req.setTimeout(10000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });

        req.end();
    });
}

// Test 1: Pikud HaOref API Direct
async function testPikudApiDirect() {
    console.log('🔍 Test 1: Pikud HaOref API Direct Call');
    try {
        const result = await makeRequest(config.pikudApiUrl);
        console.log('✅ Status:', result.status);
        console.log('✅ Headers:', JSON.stringify(result.headers, null, 2));
        console.log('✅ Data:', result.data);
        
        if (result.status === 200) {
            console.log('✅ SUCCESS: Pikud HaOref API accessible');
            return { success: true, data: result.data };
        } else {
            console.log('❌ HTTP Error:', result.status);
            return { success: false, error: `HTTP ${result.status}` };
        }
    } catch (error) {
        console.log('❌ FAILED:', error.message);
        return { success: false, error: error.message };
    }
}

// Test 2: Google Maps Geocoding API
async function testGoogleGeocoding() {
    console.log('\n🔍 Test 2: Google Maps Geocoding API');
    const address = 'Tel Aviv, Israel';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${config.googleMapsApiKey}`;
    
    try {
        const result = await makeRequest(url);
        console.log('✅ Status:', result.status);
        
        if (result.status === 200 && result.data.status === 'OK') {
            const location = result.data.results[0].geometry.location;
            console.log('✅ SUCCESS: Tel Aviv coordinates:', location);
            return { success: true, location };
        } else {
            console.log('❌ API Error:', result.data?.error_message || result.data?.status);
            return { success: false, error: result.data?.error_message };
        }
    } catch (error) {
        console.log('❌ FAILED:', error.message);
        return { success: false, error: error.message };
    }
}

// Test 3: Google Maps Directions API
async function testGoogleDirections() {
    console.log('\n🔍 Test 3: Google Maps Directions API');
    const origin = '32.0853,34.7818'; // Tel Aviv center
    const destination = '32.0745,34.7749'; // Dizengoff Center
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=walking&key=${config.googleMapsApiKey}`;
    
    try {
        const result = await makeRequest(url);
        console.log('✅ Status:', result.status);
        
        if (result.status === 200 && result.data.status === 'OK') {
            const route = result.data.routes[0];
            const leg = route.legs[0];
            console.log('✅ SUCCESS: Route found');
            console.log('   Duration:', leg.duration.text);
            console.log('   Distance:', leg.distance.text);
            return { success: true, route };
        } else {
            console.log('❌ API Error:', result.data?.error_message || result.data?.status);
            return { success: false, error: result.data?.error_message };
        }
    } catch (error) {
        console.log('❌ FAILED:', error.message);
        return { success: false, error: error.message };
    }
}

// Test 4: Check CORS headers on Pikud API
async function analyzeCorsHeaders() {
    console.log('\n🔍 Test 4: CORS Headers Analysis');
    try {
        const result = await makeRequest(config.pikudApiUrl, { method: 'OPTIONS' });
        console.log('✅ OPTIONS request status:', result.status);
        console.log('✅ CORS Headers:');
        console.log('   Access-Control-Allow-Origin:', result.headers['access-control-allow-origin']);
        console.log('   Access-Control-Allow-Methods:', result.headers['access-control-allow-methods']);
        console.log('   Access-Control-Allow-Headers:', result.headers['access-control-allow-headers']);
        
        return { 
            success: true, 
            corsEnabled: !!result.headers['access-control-allow-origin'],
            allowedOrigin: result.headers['access-control-allow-origin']
        };
    } catch (error) {
        console.log('❌ CORS analysis failed:', error.message);
        return { success: false, error: error.message };
    }
}

// Test 5: Network connectivity test
async function testConnectivity() {
    console.log('\n🔍 Test 5: Network Connectivity');
    const testUrls = [
        'https://google.com',
        'https://api.github.com',
        'https://httpbin.org/get'
    ];
    
    for (const url of testUrls) {
        try {
            const start = Date.now();
            const result = await makeRequest(url, { method: 'HEAD' });
            const duration = Date.now() - start;
            console.log(`✅ ${url} - ${result.status} (${duration}ms)`);
        } catch (error) {
            console.log(`❌ ${url} - ${error.message}`);
        }
    }
}

// Main test runner
async function runAllTests() {
    console.log('🚀 Starting comprehensive API testing...\n');
    
    const results = {};
    
    // Run all tests
    results.pikudDirect = await testPikudApiDirect();
    results.geocoding = await testGoogleGeocoding();
    results.directions = await testGoogleDirections();
    results.cors = await analyzeCorsHeaders();
    await testConnectivity();
    
    // Summary
    console.log('\n📊 TEST RESULTS SUMMARY:');
    console.log('='.repeat(50));
    
    Object.entries(results).forEach(([test, result]) => {
        const status = result.success ? '✅ PASS' : '❌ FAIL';
        const error = result.error ? ` - ${result.error}` : '';
        console.log(`${status} ${test}${error}`);
    });
    
    // Analysis and recommendations
    console.log('\n🔧 ANALYSIS & SOLUTIONS:');
    console.log('='.repeat(50));
    
    if (results.pikudDirect.success) {
        console.log('✅ Pikud HaOref API is accessible from server');
        if (!results.cors.corsEnabled) {
            console.log('⚠️  CORS not enabled - requires proxy for browser access');
        }
    } else {
        console.log('❌ Pikud HaOref API is not accessible');
    }
    
    if (results.geocoding.success) {
        console.log('✅ Google Maps Geocoding API working');
    } else {
        console.log('❌ Google Maps Geocoding API failed - check API key and billing');
    }
    
    if (results.directions.success) {
        console.log('✅ Google Maps Directions API working');
    } else {
        console.log('❌ Google Maps Directions API failed - likely needs billing enabled');
    }
    
    console.log('\n✨ Testing complete!');
    return results;
}

// Run the tests
runAllTests().catch(console.error);
