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


function goFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.querySelector("page-nav").hidden = true;
        document.querySelector(".fullScreenButton").hidden = true;
    }}


document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        document.querySelector("page-nav").hidden = false;
        document.querySelector(".fullScreenButton").hidden = false;
    }
});
    
document.getElementById("goFullscreen").addEventListener("click", goFullscreen);
    
updateClock();
setInterval(updateClock, 1000);