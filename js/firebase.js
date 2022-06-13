const config = {
    apiKey: "AIzaSyDtjbkA7fZvD4r2E6bVpljFHH9ZdbPRSOM",
    authDomain: "financialcalculators888.firebaseapp.com",
    projectId: "financialcalculators888",
    storageBucket: "financialcalculators888.appspot.com",
    messagingSenderId: "866944710448",
    appId: "1:866944710448:web:9001878fb7f327f44a3af5"
};

firebase.initializeApp(config);

const auth = firebase.auth();

if (!document.head.hasAttribute("login")) {
    auth.onAuthStateChanged(function(user) {
        if (document.head.hasAttribute("restricted") && localStorage.getItem("demo") === "true") {
            alert("This page is restricted.")
            window.location.href = "login.html";
        }
            
        if (localStorage.getItem("demo") !== "true" && user == null) {
            window.location.href = "login.html";
        }
    });
}