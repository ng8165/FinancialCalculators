document.addEventListener("keyup", function(event) {
    // if enter key is pressed, simulate a submit button click to initiate calculations
    if (event.keyCode === 13) {
        document.getElementById("submit").click();
    }
});

document.getElementById("submit").onclick = function() {
    var taxFree = document.getElementById("taxFree").value;
    var fedBracket = document.getElementById("fedBracket").value;
    var stateBracket = document.getElementById("stateBracket").value;

    if (taxFree == "" || fedBracket == "" || stateBracket == "") {
        // inputs are incomplete
        alert("Please enter all fields.");
        return;
    }

    // remove % character and parse into a number
    taxFree = parseNumber(taxFree);
    var fedTaxExempt = parseNumber(fedBracket);
    var fedStateTaxExempt = parseNumber(stateBracket);

    // check if any parses failed
    if (isNaN(taxFree) || isNaN(fedTaxExempt) || isNaN(fedStateTaxExempt)) {
        alert("Please remove any letters or special characters in the fields.");
        resetInputs();
        return;
    }

    // restrictions for size of the inputs
    if (taxFree < -12 || taxFree > 12) {
        alert("The tax-free yield must be between -12% and 12%.");
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

    // add (and calculate if necessary) the results and add to div
    document.getElementById("taxFreeResult").innerHTML = "Tax Free: " + taxFree.toFixed(3) + "%";

    fedTaxExempt = taxFree*100/(100-fedTaxExempt);
    document.getElementById("fedTaxExempt").innerHTML = "Federal Tax Exempt: " + fedTaxExempt.toFixed(3) + "%";

    fedStateTaxExempt = fedTaxExempt*100/(100-fedStateTaxExempt);
    document.getElementById("fedStateTaxExempt").innerHTML = "Federal & State Tax Exempt: " + fedStateTaxExempt.toFixed(3) + "%";

    document.getElementById("summary").innerHTML = "A " + taxFree.toFixed(3) + "% tax-free return is equivalent to a tax-equivalent yield of " + fedStateTaxExempt.toFixed(3) + "%.";

    document.getElementById("result").setAttribute("style", "visibility: visible");

    generateChart(taxFree.toFixed(3), fedTaxExempt.toFixed(3), fedStateTaxExempt.toFixed(3));
}

function parseNumber(percentage) {
    if (percentage.charAt(percentage.length-1) == '%') {
        return parseFloat(percentage.substring(0, percentage.length-1));
    } else {
        return parseFloat(percentage);
    }
}

function resetInputs() {
    document.getElementById("taxFree").value = "5%";
    document.getElementById("fedBracket").value = "7%";
    document.getElementById("stateBracket").value = "7%";
}

function generateChart(taxFree, fedTaxExempt, fedStateTaxExempt) {
    Chart.defaults.global.defaultFontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    Chart.defaults.global.defaultFontColor = "#000000";

    document.getElementById("chart").setAttribute("style", "visibility:visible");

    let myChart = document.getElementById("myChart").getContext("2d");
    myChart.canvas.parentNode.style.width = '700px';
    myChart.canvas.parentNode.style.height = '350px';

    new Chart(myChart, {
        type: "bar", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: {
            labels: ["Tax Free", "Federal Tax Exempt", "Federal & State Tax Exempt"],
            datasets: [{
                data: [
                    taxFree,
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
                        callback: function(value, index, values) {
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