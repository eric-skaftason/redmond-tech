const express = require('express');
const router = express.Router();

const accounts = require('./accounts.js');
router.use('/accounts', accounts);

const file_sharing = require('./file_sharing.js');
router.use('/file_sharing', file_sharing);

module.exports = router;