const express = require('express');
const router = express.Router();

const upload_middleware = require('../../middleware/upload.js');
const upload_controller = require('../../controllers/red_fs/upload.js');
router.post('/upload/:accountID/:folderID', upload_middleware, upload_controller);

module.exports = router;