const wireframe_title = document.getElementById("wireframe_title");
const wireframe_img = document.getElementById("wireframe_img");

function updateWireframe(){
    if (window.innerWidth > 740) {
        wireframe_title.textContent = "Desktop View:";
        wireframe_img.setAttribute("src", "images/desktop.png");
    } else {
        wireframe_title.textContent = "Mobile View:";
        wireframe_img.setAttribute("src", "images/mobile.png");
    }
}

updateWireframe();

window.addEventListener("resize", updateWireframe);