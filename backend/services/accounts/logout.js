const AccountsModel = require('../../models/accounts.js');

module.exports = async (session_token) => {
    const { account_id } = await AccountsModel.getSession(session_token);

    if (!account_id) {
        const err = new Error("Session does not exist");
        err.status = 401;
        throw err;
    }

    await AccountsModel.logout(account_id);
}