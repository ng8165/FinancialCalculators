const menu = document.getElementById("menu");
const menuIcon = menu.firstChild;
const navPages = document.getElementById("navpages");
const localStorage = window.localStorage;

menu.addEventListener("click", function() {
    navPages.classList.toggle("show");
    menuIcon.innerHTML = menuIcon.innerHTML === "menu" ? "close" : "menu";
});

if (localStorage.getItem("pandaShow") === "true") {
    const img = document.createElement("img");
    img.classList.add("panda");
    img.src = "img/panda.png";
    img.alt = "Panda Image";
    document.body.append(img);
}