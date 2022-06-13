const form = document.querySelector("form");
const result = document.querySelector(".result");
const totalCostResult = document.getElementById("totalCost");
const monthlyPaymentsResult = document.getElementById("monthlyPayments");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // do not do what is specified in the form action

    const principal = parseFloat(document.getElementById("mortgageAmount").value);
    const interest = parseFloat(document.getElementById("interestRate").value) / (100*12); // turn the percentage to a decimal and make it monthly
    const numMonths = parseFloat(document.getElementById("mortgagePeriod").value) * 12; // take years and multiply by 12

    // calculate new results and add them to web page
    // https://www.calculator.net/interest-rate-calculator.html?cloanamount=100000&cloanterm=30&cmonthlypay=473&x=68&y=30
    const monthlyPayments = principal * (interest * Math.pow(interest+1, numMonths)) / (Math.pow(interest+1, numMonths) - 1);
    const totalCost = monthlyPayments * numMonths;

    totalCostResult.innerHTML = "Total Cost: $" + Math.round(totalCost).toLocaleString();
    monthlyPaymentsResult.innerHTML = "Monthly Payments: $" + Math.round(monthlyPayments).toLocaleString();
    result.classList.remove("hide");
});

form.addEventListener("reset", function() {
    result.classList.add("hide");
});