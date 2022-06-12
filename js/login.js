const localStorage = window.localStorage;
const demo = document.getElementById("demo");

demo.addEventListener("click", function() {
    localStorage.setItem("demo", "true");
    window.location.href = "/";
});