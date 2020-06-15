const express = require('express');
const router = express.Router();
const gAuth = require('../controllers/auth.google.controller');

router.post('/google', gAuth.authenticate);

module.exports = router;