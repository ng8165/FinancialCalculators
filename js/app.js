// register service worker
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('[ServiceWorker] Registration Successful! Scope: ', registration.scope);
        }, function(err) {
            console.log('[ServiceWorker] Registration Failed... Error: ', err);
        });
    });
}
*/

const menu = document.getElementById("menu");
const navPages = document.getElementById("navpages");

menu.addEventListener("click", function() {
    navPages.classList.toggle("show");
});

function addPanda() {
    if (window.localStorage.getItem("pandaShow") === "true") {
        document.getElementById("footer").innerHTML += '<img class="footerimage" id="footerimg" src="images/panda.png" alt="Panda Footer Image">';
    }
}

