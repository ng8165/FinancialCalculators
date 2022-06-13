if (localStorage.getItem("defaultPage") == null)
    localStorage.setItem("defaultPage", "mortgagecalc");

if (localStorage.getItem("pandaShow") == null)
    localStorage.setItem("pandaShow", "true");

if (localStorage.getItem("defaultPage") === "teycalc")
    document.getElementById("teycalcDef").checked = true;
else
    document.getElementById("mortgagecalcDef").checked = true;

if (localStorage.getItem("pandaShow") === "true")
    document.getElementById("pandaYes").checked = true;
else
    document.getElementById("pandaNo").checked = true;

const form = document.querySelector("form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (document.getElementById("teycalcDef").checked) {
        localStorage.setItem("defaultPage", "teycalc");
    } else {
        localStorage.setItem("defaultPage", "mortgagecalc");
    }

    if (document.getElementById("pandaYes").checked) {
        localStorage.setItem("pandaShow", "true");
    } else {
        localStorage.setItem("pandaShow", "false");
    }

    location.reload();
});