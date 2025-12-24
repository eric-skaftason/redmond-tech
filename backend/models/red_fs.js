// JS Model that interacts with the DB for all RedFS functionality

const db = require('../config/db.js');

class RedFS {
    static async createFolder(parent_folder_id, owner_id, folder_name, path) {
        const sql_folder = `INSERT INTO folders (parent_folder_id, owner_id, folder_name, path) VALUES (?, ?, ?, ?)`;
        
        const [result] = await db.query(sql_folder, [parent_folder_id, owner_id, folder_name, path]);
        // equivalent to const result = response[0];

        const folder_id = result.folder_id;

        const sql_folder_permissions = `INSERT INTO folders_permissions (folder_id, account_id, permission_level) VALUES (?, ?, ?)`;
        await db.query(sql_folder_permissions, [folder_id, owner_id, 4]);
        
    }

    static async uploadFile(metadata) {
        console.log(metadata)
    }

    static async deleteFile() {
        
    }
}

module.exports = RedFS;