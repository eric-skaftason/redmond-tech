const RedFSModel = require('../../models/red_fs.js');
const AccountsModel = require('../../models/accounts.js');

module.exports = async (session_token) => {
    const { account_id } = await AccountsModel.getSession(session_token);

    const root_folders = await RedFSModel.getAccessibleRootFolders(account_id);

    return root_folders;
}