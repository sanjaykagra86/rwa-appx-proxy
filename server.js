const express = require('express');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// ✅ Optional Root message
app.get('/', (req, res) => {
  res.send('✅ AppX Proxy API is Running!');
});

// ✅ Main Proxy Endpoint
app.get('/api/proxy', (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send('Missing URL');

  const decodedUrl = decodeURIComponent(url);

  request({
    url: decodedUrl,
    headers: {
      'Referer': 'https://appx-play.akamai.net.in/',
      'User-Agent': 'Mozilla/5.0'
    }
  })
  .on('error', err => res.status(500).send('Proxy Error: ' + err.message))
  .pipe(res);
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Proxy server listening on port ${PORT}`);
});
