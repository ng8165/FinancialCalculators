document.addEventListener("keyup", function(event) {
    // if enter key is pressed, simulate a submit button click to initiate calculations
    if (event.code == "Enter") {
        document.getElementById("submit").click();
    }
});

document.getElementById("submit").onclick = function() {generateResults()};

function parseNumber(percentage) {
    if (percentage.charAt(percentage.length-1) == '%') {
        return parseFloat(percentage.substring(0, percentage.length-1));
    } else {
        return parseFloat(percentage);
    }
}

function resetInputs() {
    document.getElementById("taxExempt").value = "3%";
    document.getElementById("fedBracket").value = "35%";
    document.getElementById("stateBracket").value = "9.3%";
}

function generateResults() {
    var taxExempt = document.getElementById("taxExempt").value;
    var fedBracket = document.getElementById("fedBracket").value;
    var stateBracket = document.getElementById("stateBracket").value;

    // check if any fields are empty
    if (taxExempt == "" || fedBracket == "" || stateBracket == "") {
        alert("Please enter all fields.");
        return;
    }

    // remove % character and parse into a number
    taxExempt = parseNumber(taxExempt);
    var fedTaxExempt = parseNumber(fedBracket);
    var fedStateTaxExempt = parseNumber(stateBracket);

    // check if any parses failed
    if (isNaN(taxExempt) || isNaN(fedTaxExempt) || isNaN(fedStateTaxExempt)) {
        alert("Please remove any letters or special characters in the fields.");
        resetInputs();
        return;
    }

    // restrictions for size of the inputs
    if (taxExempt < -12 || taxExempt > 12) {
        alert("The tax-exempt yield must be between -12% and 12%.");
        resetInputs();
        return;
    } else if (fedTaxExempt < 0 || fedTaxExempt > 75) {
        alert("The federal marginal tax bracket must be between 0% and 75%.");
        resetInputs();
        return;
    } else if (fedStateTaxExempt < 0 || fedStateTaxExempt > 75) {
        alert("The state marginal tax bracket must be between 0% and 75%.");
        resetInputs();
        return;
    }

    // calculate new results and add them to web page
    document.getElementById("taxExemptResult").innerHTML = "Tax Exempt: " + taxExempt.toFixed(3) + "%";

    fedTaxExempt = taxExempt*100/(100-fedTaxExempt);
    document.getElementById("fedTaxExempt").innerHTML = "Federal Tax Exempt: " + fedTaxExempt.toFixed(3) + "%";

    fedStateTaxExempt = fedTaxExempt*100/(100-fedStateTaxExempt);
    document.getElementById("fedStateTaxExempt").innerHTML = "Federal & State Tax Exempt: " + fedStateTaxExempt.toFixed(3) + "%";

    document.getElementById("summary").innerHTML = "A " + taxExempt.toFixed(3) + "% tax-exempt return is equivalent to a tax-equivalent yield of " + fedStateTaxExempt.toFixed(3) + "%.";

    document.getElementById("result").setAttribute("style", "visibility: visible");

    // generate the chart
    generateChart(taxExempt.toFixed(3), fedTaxExempt.toFixed(3), fedStateTaxExempt.toFixed(3));
}

function generateChart(taxExempt, fedTaxExempt, fedStateTaxExempt) {
    Chart.defaults.global.defaultFontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    Chart.defaults.global.defaultFontColor = "#000000";

    document.getElementById("chart").setAttribute("style", "visibility:visible");
    document.getElementById("chart").innerHTML = '<canvas id="myChart"></canvas>'; // reset canvas for every generation

    let myChart = document.getElementById("myChart").getContext("2d");
    myChart.canvas.parentNode.style.width = '700px';
    myChart.canvas.parentNode.style.height = '350px';

    new Chart(myChart, {
        type: "bar",
        data: {
            labels: ["Tax Exempt", "Federal Tax Exempt", "Federal & State Tax Exempt"],
            datasets: [{
                data: [
                    taxExempt,
                    fedTaxExempt,
                    fedStateTaxExempt
                ],
                backgroundColor: [
                    "rgba(134, 177, 219, 1)",
                    "rgba(219, 184, 134, 1)",
                    "rgba(134, 219, 138, 1)"
                ],
                borderWidth: 2,
                borderColor: "#525252",
                hoverBorderWidth: 3,
                hoverBorderColor: "#000000",
                barPercentage: 0.4
            }]
        },
        options: {
            resposive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function(value) {
                            return value + "%";
                        },
                        beginAtZero: true
                    }
                }]
            },
            title: {
                display: true,
                text: "Tax-Equivalent Yield",
                fontSize: 18
            },
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem) {
                        return Number(tooltipItem.yLabel) + "%";
                    }
                }
            }
        }
    });
}