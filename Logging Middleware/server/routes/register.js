const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const crypto = require('crypto');

router.post('/', async (req, res) => {
  const { email, name, mobileno, githubUsername, rollNo, accessCode } = req.body;
  if (accessCode !== process.env.ACCESS_CODE) {
    return res.status(403).json({ error: 'Invalid access code' });
  }
  const clientID = crypto.randomBytes(8).toString('hex');
  const clientSecret = crypto.randomBytes(16).toString('hex');
  await new Client({ email, name, mobileno, githubUsername, rollNo, clientID, clientSecret }).save();
  res.json({ clientID, clientSecret });
});

module.exports = router;
