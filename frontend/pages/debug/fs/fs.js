
const fileInput = document.getElementById("fileToUpload");
const chooseBtn = document.getElementById("chooseBtn");
const fileName = document.getElementById("fileName");

chooseBtn.addEventListener("click", () => {
    fileInput.click(); // open file picker
});

fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
        fileName.textContent = fileInput.files[0].name;
    } else {
        fileName.textContent = "No file selected";
    }
});
