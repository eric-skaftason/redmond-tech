async function uploadFile(file) {
    const formData = new FormData();
    formData.append("upload", file);

    const res = await fetch("/api/rfs/upload", {
        method: "POST",
        body: formData
    });

    if (!res.ok) throw new Error("Upload failed");

    // await loadFiles(); // refresh table after upload
}

async function loadResourcesInFolder(folder_id = null) {

    console.log('loading resources...');

    // Send request
    const res = await fetch(`/api/rfs?folder_id=${folder_id}`);
    const res_data = await res.json();

    const folders = res_data.data.root_folders

    const tbody = document.getElementById("fileTableBody");
    tbody.innerHTML = ""; // clear existing rows

    folders.forEach(folder => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${folder.folder_name}</td>
            <td>${folder.created_at}</td>
            <td>${folder.owner_id}</td>
            <td>${folder.permission_level}</td>
            <td></td>
        `;

        tr.addEventListener('click', () => {
            loadResourcesInFolder(folder.folder_id);
        });

        tbody.appendChild(tr);
    });
}
loadResourcesInFolder();

// File upload
const fileInput = document.getElementById("fileToUpload");
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