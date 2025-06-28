const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const jwt = require('jsonwebtoken');
router.post('/', async (req, res) => {
  const { email, name, rollNo, accessCode, clientID, clientSecret } = req.body;
  const client = await Client.findOne({ clientID, clientSecret, email, name, rollNo });
  if (!client || accessCode !== process.env.ACCESS_CODE) {
    return res.status(401).json({ error:'Invalid details entered'});
  }
  const token = jwt.sign({ clientID }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ access_token: token, token_type: 'Bearer' });
});
module.exports = router;
