const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const validUrl = require('valid-url');
const nanoid = require('nanoid').nanoid;
const urls = {};
router.use((req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'No token' });
  try {
    jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});
router.post('/shorten', (req, res) => {
  const { longUrl } = req.body;
  if (!validUrl.isWebUri(longUrl)) return res.status(400).json({ error: 'Invalid URL' });
  const shortId = nanoid(7);
  urls[shortId] = longUrl;
  res.json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
});
router.get('/:id', (req, res) => {
  const longUrl = urls[req.params.id];
  return longUrl ? res.redirect(longUrl) : res.status(404).json({ error: 'Not found' });
});
module.exports = router;
