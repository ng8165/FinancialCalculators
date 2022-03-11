netlifyIdentity.on("init", user => {
    if (!user) {
        window.location = "login.html";
    }
});