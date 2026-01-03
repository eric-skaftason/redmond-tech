export async function isValidString(target_username, permission_level, folder_id) {
    const res = await fetch(`/api/rfs/add_permission`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            target_username: target_username,
            permission_level: permission_level,
            folder_id: folder_id
        })
    });

    const res_data = await res.json();

    if (!res.ok) {
        console.error(res_data.message);
        return false;
    } else {
        console.log(res_data.message);
        return true;
    }
    
}