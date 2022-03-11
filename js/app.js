// register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/FinancialCalculators/service-worker.js').then(function(registration) {
            console.log('[ServiceWorker] Registration Successful! Scope: ', registration.scope);
        }, function(err) {
            console.log('[ServiceWorker] Registration Failed... Error: ', err);
        });
    });
}

function openSubNav() {
    const dropdown = document.getElementById("dropdown");
    
    if (dropdown.style.display === "none")
        dropdown.style.display = "flex";
    else
        dropdown.style.display = "none";
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log("signed in");
    } else {
        // User is signed out.
        console.log("signed out");
        window.location = "login.html";
    }
}, function(error) {
    console.log(error);
});