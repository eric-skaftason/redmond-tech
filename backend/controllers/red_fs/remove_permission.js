// Remove permission from an account

const remove_permission = require('../../services/red_fs/remove_permission.js');

module.exports = async (req, res) => {
    try {

        const account_id = req.account_id;
        const {target_username, folder_id} = req.body;

        await remove_permission(account_id, folder_id, target_username);
        
        res.status(201).json({ message: `Permission removed.` });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: `Server error: ${error.message}` });
    }
}