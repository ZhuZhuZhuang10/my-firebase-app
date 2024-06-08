const functions = require('firebase-functions');
const fetch = require('node-fetch');

exports.handleRequest = functions.https.onRequest(async (req, res) => {
  try {
    let url = new URL(req.url);
    url.protocol = 'http';
    url.hostname = 'test.com';
    url.port = '11111';

    let upstream = new URL(url);
    let response = await fetch(upstream, {
      method: req.method,
      headers: req.headers,
      body: req.method === 'POST' ? req.body : undefined
    });

    const responseBody = await response.text();
    res.status(response.status).send(responseBody);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});
