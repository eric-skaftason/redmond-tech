const express = require('express');
const router = express.Router();

// Create account
const create_account = require('../../controllers/accounts/create_account.js');
router.post('/new', create_account);

module.exports = router;