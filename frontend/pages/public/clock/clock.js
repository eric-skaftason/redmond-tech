function updateClock() {
    const now = new Date();

    let hours = now.getHours();    
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    document.getElementById("clock").textContent =
        `${hours}:${minutes}:${seconds}`;
}

function applyColor() {
    const colorInput = document.getElementById("colorPicker").value;
    const isValidHex = /^([0-9A-Fa-f]{6})$/.test(colorInput);

    if (isValidHex) {
        document.getElementById("clock").style.color = `#${colorInput}`;
    } else {
        alert("Please enter a valid HEX color code.");
    }
}

function goFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.querySelector("page-nav").hidden = true;
        document.querySelector(".fullScreenButton").hidden = true;
        document.querySelector(".settingsContainer").hidden = true;
    }}


document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        document.querySelector("page-nav").hidden = false;
        document.querySelector(".fullScreenButton").hidden = false;
        document.querySelector(".settingsContainer").hidden = false;
    }
});
    
document.getElementById("goFullscreen").addEventListener("click", goFullscreen);
    
updateClock();
setInterval(updateClock, 1000);