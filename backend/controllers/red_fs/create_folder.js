// Creates a folder

const createFolder = require('../../services/red_fs/create_folder.js');

module.exports = async (req, res) => {
    try {
        const { folder_name, parent_folder_id = null } = req.body;
        
        const session_token = req.cookies.session_token;

        await createFolder(session_token, folder_name, parent_folder_id);

        res.status(201).json({ message: "Folder created!" });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: `Server error: ${error.message}` });
    }
}