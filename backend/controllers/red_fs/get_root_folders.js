// Get root folders accessible by a given account

const getRootFolders = require('../../services/red_fs/get_root_folders.js');
module.exports = async (req, res) => {
    try {
        const session_token = req.cookies.session_token;

        const root_folders = await getRootFolders(session_token);


        res.status(200).json({
            data: {
                root_folders: root_folders
            },
            message: "Data retrieved successfully!"
        });

    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: `Server error: ${error.message}` });
    }
}