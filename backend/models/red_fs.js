// JS Model that interacts with the DB for all RedFS functionality

const db = require('../config/db.js');

class RedFS {
    static async uploadFile(metadata) {
        console.log(metadata)
    }

    static async deleteFile() {
        
    }
}

module.exports = RedFS;