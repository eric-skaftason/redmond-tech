const express = require('express');
const multer = require('multer');

const destination = '/uploads';

const storage = multer.diskStorage({
    // callback is provided by multer, this function calls it
    destination: (req, file, callback) => {
        callback(null, destination); // null means no error
    }


})