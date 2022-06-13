const localStorage = window.localStorage;

if (localStorage.getItem("defaultPage") != null && localStorage.getItem("pandaShow") != null) {
    window.location = localStorage.getItem("defaultPage") + ".html";
} else {
    localStorage.setItem("defaultPage", "mortgage");
    localStorage.setItem("pandaShow", "false");
    window.location = localStorage.getItem("defaultPage") + ".html";
}