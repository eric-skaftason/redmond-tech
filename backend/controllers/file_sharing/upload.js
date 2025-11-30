module.exports = async (req, res) => {
    try {
        const upload = require('../../services/file_sharing/upload.js');

        res.status(201).json({ message: "Logged in!" });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: `Server error: ${error.message}` });
    }
}