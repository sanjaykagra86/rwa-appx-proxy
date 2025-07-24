const express = require('express');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;

// API endpoint to proxy m3u8 requests with Referer
app.get('/api/proxy', (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send('Missing URL');
  }

  request({
    url: decodeURIComponent(url),
    headers: {
      'Referer': 'https://appx-play.akamai.net.in/',
      'User-Agent': 'Mozilla/5.0'
    }
  })
    .on('error', err => res.status(500).send('Proxy Error: ' + err.message))
    .pipe(res);
});

app.listen(PORT, () => {
  console.log(`✅ Backend proxy server running on port ${PORT}`);
});
