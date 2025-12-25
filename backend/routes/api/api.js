const express = require('express');
const router = express.Router();

const accounts = require('./accounts.js');
router.use('/accounts', accounts);

const file_sharing = require('./red_fs.js');
router.use('/rfs', file_sharing);

const getAppInfo = require('../../utils/misc/app_info.js');
router.get('/app_info', (req, res) => {
    const app_info = getAppInfo();
    res.status(200).json({ message: "Data retrieved", data: app_info });
});

module.exports = router;