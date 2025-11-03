const express = require('express');
const app = express();
const path = require('path');

// api
const api = require('./routes/api.js');
app.use('/api', api);


// frontend
app.use('/components', express.static(path.join(__dirname, '../frontend/components')));
const pages = require('./routes/pages.js');
app.use('/', pages); // fallback '/' - prevents needing '/pages' route


module.exports = app;