document.addEventListener("keyup", function(event) {
    // if enter key is pressed (same as pressing submit), generate results
    if (event.code == "Enter") {
        generateResults();
    }
});

function parseNumber(percentage) {
    // parse the number into a float
    if (percentage.charAt(percentage.length-1) == '%') {
        // remove % if necessary
        return parseFloat(percentage.substring(0, percentage.length-1));
    } else if (percentage.charAt(0) == '$') {
        // remove $ if necessary
        return parseFloat(percentage.substring(1, percentage.length));
    } else {
        return parseFloat(percentage);
    }
}

function resetInputs() {
    document.getElementById("mortgageAmount").value = "$100000";
    document.getElementById("interestRate").value = "3.92%";
    document.getElementById("mortgagePeriod").value = "30";
}

function generateResults() {
    var principal = document.getElementById("mortgageAmount").value;
    var interest = document.getElementById("interestRate").value;
    var numYears = document.getElementById("mortgagePeriod").value;

    // check if any fields are empty
    if (principal == "" || interest == "" || numYears == "") {
        alert("Please enter all fields.");
        return;
    }

    // remove $ or % character if needed and parse into a number
    principal = parseNumber(principal);
    interest = parseNumber(interest);
    numYears = parseNumber(numYears);

    // check if any parses failed (returns NaN if failed)
    if (isNaN(principal) || isNaN(interest) || isNaN(numYears)) {
        alert("Please remove any letters or special characters in the fields.");
        resetInputs();
        return;
    }

    interest = interest / (100*12); // turn the percentage to a decimal and make it monthly
    var numMonths = numYears*12;

    // calculate new results and add them to web page
    var monthlyPayments = principal * (interest * Math.pow(interest+1, numMonths)) / (Math.pow(interest+1, numMonths) - 1);
    var totalCost = monthlyPayments * numMonths;

    document.getElementById("totalCost").innerHTML = "Total Cost: $" + Math.round(totalCost).toLocaleString();
    document.getElementById("monthlyPayments").innerHTML = "Monthly Payments: $" + Math.round(monthlyPayments).toLocaleString();

    document.getElementById("result").setAttribute("style", "visibility: visible");
}

// https://www.calculator.net/interest-rate-calculator.html?cloanamount=100000&cloanterm=30&cmonthlypay=473&x=68&y=30