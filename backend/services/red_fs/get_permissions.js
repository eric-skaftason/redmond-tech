const AccountsModel = require('../../models/accounts.js');
const RedFSModel = require('../../models/red_fs.js');

module.exports = async (account_id, folder_id) => {
    // Ensure valid folder id
    if (!await RedFSModel.isValidFolderId(folder_id)) {
        const err = new Error("Invalid folder id");
        err.status = 400;
        throw err;
    }

    // Enforce folder_id refers to a root folder
    if (!await RedFSModel.isRootFolder(folder_id)) {
        const err = new Error("Permissions cannot be associated with non-root folders");
        err.status = 403;
        throw err;
    }

    // Account must have permission level of at least 1 to access permission data
    if (await RedFSModel.getFolderPermissionLevelByAccountId(account_id, folder_id) < 1) {
        const err = new Error("Must have read permission to access permission data");
        err.status = 403;
        throw err;
    }

    const admin_ids = await RedFSModel.getAllAccountIdsByFolderPermissionLevel(folder_id, 3);
    const editor_ids = await RedFSModel.getAllAccountIdsByFolderPermissionLevel(folder_id, 2);
    const viewer_ids = await RedFSModel.getAllAccountIdsByFolderPermissionLevel(folder_id, 1);

    const idsToUsernames = async (ids) => {
        let usernames = [];
        for (const id of ids) {
            const username = await AccountsModel.getUsernameByAccountId(id);
            if (username !== null) usernames.push(username);
        }
        return usernames;
    }

    const permission_data = {
        admins: {
            usernames: await idsToUsernames(admin_ids),
            account_ids: admin_ids
        },
        editors: {
            usernames: await idsToUsernames(editor_ids),
            account_ids: editor_ids
        },
        viewers: {
            usernames: await idsToUsernames(viewer_ids),
            account_ids: viewer_ids
        }
    }

    return permission_data;
}