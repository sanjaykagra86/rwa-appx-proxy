const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Global CORS + Header Injection Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  // ✅ Default headers in case forwarded to any internal route
  req.headers['referer'] = 'https://appx-play.akamai.net.in/';
  req.headers['user-agent'] = 'Mozilla/5.0';

  next();
});

// ✅ Root endpoint only
app.get('/', (req, res) => {
  res.send('✅ AppX Server Running (No Proxy, Default Headers Set)');
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 AppX server running on port ${PORT}`);
});
