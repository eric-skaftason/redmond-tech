// Folder path array stores folder hierarchy of the folder the user is in
let folder_path = [{folder_id: '', folder_name: ''}]; // for root dir

// Load resources
async function loadResources(folder_path) {
    try {
        console.log('loading resources...');

        const folder_path_tail = folder_path[folder_path.length - 1];

        // Send request
        const res = await fetch(`/api/rfs/${folder_path_tail.folder_id}`);
        const res_data = await res.json();

        const resources = res_data.data.resources;

        const table_body = document.querySelector('#tbody');
        table_body.innerHTML = ''; // clear existing rows

        resources.forEach(resource => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${resource.name}</td>
                <td>${resource.created_at}</td>
                <td>${resource.owner_id}</td>
                <td>${resource.permission_level}</td>
                <td></td>
            `;
            
            table_body.appendChild(tr);

            // Add event listener to folders
            if (resource.type === 'folder') {
                tr.addEventListener('click', () => {
                    folder_path.push({folder_id: resource.id, folder_name: resource.name});
                    loadResources(folder_path);
                });
            }
        });

        // Load path data display
        const rfs_path = document.querySelector('.rfs_path');
        rfs_path.innerHTML = '';

        const rfs_path_label = document.createElement('p');
        rfs_path_label.classList.add('rfs_path_label');
        rfs_path_label.innerText = 'Current folder:';

        const rfs_path_elements = (() => {
            let elements = [];

            // For sub-directories
            for (let i = 0; i < folder_path.length; i++) {
                const rfs_path_element = document.createElement('span');
                rfs_path_element.classList.add('rfs_path_element');
                rfs_path_element.innerText = `${folder_path[i].folder_name}/`;

                rfs_path_element.addEventListener('click', () => {
                    // Slice the folder_path array to include 0 up to the i-th element (inclusive)
                    folder_path = folder_path.slice(0, i + 1);
                    loadResources(folder_path);
                });

                elements.push(rfs_path_element);
            }

            return elements;
        })();


        // Add all elements to rfs_path div
        rfs_path.append(rfs_path_label);
        rfs_path_elements.forEach(rfs_path_element => {
            rfs_path.append(rfs_path_element);
        });

    } catch (err) {
        console.error(err.message);
    }
}

// load root
loadResources(folder_path);

// File upload
const fileInput = document.querySelector('#upload');
document.getElementById("upload_file").addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', async () => {
    if (fileInput.files.length <= 0) return console.warn('Please select a file to upload.');

    const file = fileInput.files[0];
    uploadFile(file);
});


// New folder
document.querySelector('#new_folder').addEventListener('click', (event) => {
    event.preventDefault();
    
});