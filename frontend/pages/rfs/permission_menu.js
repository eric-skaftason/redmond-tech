export default class PermissionMenu {

    async getPermissions(folder_id) {
        const res = await fetch(`/api/rfs/get_permissions/${folder_id}`);
        const res_data = await res.json();

        return res_data.data.permission_data;
    }

    async open(folder_name, folder_id) {

        const permissions = await this.getPermissions(folder_id);
        const { admins, editors, viewers } = permissions;

        const permissionMenuModal = document.createElement('div');

        permissionMenuModal.innerHTML = `
            <modal-menu>
                <menu-controls>
                    <close-menu></close-menu>
                </menu-controls>

                <menu-header>
                    <menu-title>${folder_name}</menu-title>
                    <menu-text>Permission menu</menu-text>
                </menu-header>
                
                <menu-body id="menu-body"></menu-body>
            </modal-menu>
        `;

        const menuBody = permissionMenuModal.querySelector('#menu-body');

        const createList = (label, id, args, usernames = []) => {

            const labelElement = document.createElement('menu-text');
            labelElement.innerText = label;

            const list = document.createElement('list-input');
            list.setAttribute('verify-str-src', '/rfs/add_account.js');
            list.setAttribute('verify-str-args', JSON.stringify(args));
            list.id = id;

            usernames.forEach(username => {
                const item = document.createElement('list-element');
                item.innerText = username;
                list.appendChild(item);
            });

            const addElement = document.createElement('list-add-element');
            addElement.innerText = 'Add element';
            list.appendChild(addElement);

            menuBody.append(labelElement, list);
        };

        createList('Administrators', 'admins', [3, folder_id], admins.usernames);
        createList('Editors', 'editors', [2, folder_id], editors.usernames);
        createList('Viewers', 'viewers', [1, folder_id], viewers.usernames);

        document.body.append(permissionMenuModal);
    }

    
}
