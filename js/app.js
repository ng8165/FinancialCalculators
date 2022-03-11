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

function openSubNav() {
    const dropdown = document.getElementById("dropdown");
    
    if (dropdown.style.display === "none")
        dropdown.style.display = "flex";
    else
        dropdown.style.display = "none";
}

function addPanda() {
    if (window.localStorage.getItem("pandaShow") === "true") {
        document.getElementById("footer").innerHTML += '<img class="footerimage" id="footerimg" src="images/panda.png" alt="Panda Footer Image">';
    }
}

netlifyIdentity.on("init", user => {
    if (!user) {
        window.location = "index.html";
    } else {
        console.log(netlifyIdentity.currentUser().email);
    }
});