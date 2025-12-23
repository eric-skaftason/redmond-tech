// Handles uploading files by interacting with multer

const upload = require('../config/multer.js');

module.exports = (req, res, next) => {
    try {
        if (error) return res.status(500).json({ message: `Error saving file: ${error.message}` });

        // file is an obj added by multer middleware
        const file = req.file;

        if (!file) return res.status(400).json({ message: 'No file uploaded' });

        next();
    } catch (error) {
        
    }
}