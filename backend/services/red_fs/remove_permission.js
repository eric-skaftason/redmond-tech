const AccountsModel = require('../../models/accounts.js');
const RedFSModel = require('../../models/red_fs.js');

module.exports = async (account_id, folder_id, target_username) => {
    // account_id - the account performing the operation
    // target_account_id - the account having the permissions applied to

    const target_account_id = await AccountsModel.getAccountIdByUsername(target_username);

    // Ensure target account exists
    if (target_account_id === null) {
        const err = new Error("Invalid target account id");
        err.status = 400;
        throw err;
    }

    // Ensure valid folder id
    if (!await RedFSModel.isValidFolderId(folder_id)) {
        const err = new Error("Invalid folder id");
        err.status = 400;
        throw err;
    }

    // Enforce permissions only be set on a root folder
    if (!await RedFSModel.isRootFolder(folder_id)) {
        const err = new Error("Cannot set permissions on non-root folders");
        err.status = 403;
        throw err;
    }

    // If folder permission level for target account is null or undefined, then no permissions are already defined
    if (await RedFSModel.getFolderPermissionLevelByAccountId(target_account_id, folder_id) == null) {
        const err = new Error("Permissions are not defined");
        err.status = 400;
        throw err;
    }

    // Ensure account has permissions to set add permission
    // P3 (admin) can be set by P4 (owner)
    // P2 (editor) can be set by P3 (admin)
    // P2 and lower cannot set permissions
    const target_permission = await RedFSModel.getFolderPermissionLevelByAccountId(target_account_id, folder_id);
    const operator_permission = await RedFSModel.getFolderPermissionLevelByAccountId(account_id, folder_id);
    if (operator_permission < 3 || operator_permission <= target_permission) {
        const err = new Error("Insufficient permission level to perform operation");
        err.status = 403;
        throw err;
    }

    await RedFSModel.removePermission(folder_id, target_account_id);

}