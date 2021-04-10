// register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/tax-yield-calc/service-worker.js').then(function(registration) {
            console.log('[ServiceWorker] Registration Successful! Scope: ', registration.scope);
        }, function(err) {
            console.log('[ServiceWorker] Registration Failed... Error: ', err);
        });
    });
}

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
    var shortCapGain = document.getElementById("shortCapGain").value;
    var fedBracket = document.getElementById("fedBracket").value;
    var stateBracket = document.getElementById("stateBracket").value;

    // check if any fields are empty
    if (taxExempt == "" || shortCapGain == "" || fedBracket == "" || stateBracket == "") {
        alert("Please enter all fields.");
        return;
    }

    // remove % character and parse into a number
    taxExempt = parseNumber(taxExempt);
    shortCapGain = parseNumber(shortCapGain);
    var fedTaxExempt = parseNumber(fedBracket);
    var fedStateTaxExempt = parseNumber(stateBracket);

    // check if any parses failed (returns NaN if failed)
    if (isNaN(taxExempt) || isNaN(shortCapGain) || isNaN(fedTaxExempt) || isNaN(fedStateTaxExempt)) {
        alert("Please remove any letters or special characters in the fields.");
        resetInputs();
        return;
    }

    // calculate new results and add them to web page
    document.getElementById("taxExemptResult").innerHTML = "Tax Exempt: " + taxExempt.toFixed(2) + "%";

    var grossReturn = taxExempt + shortCapGain;
    document.getElementById("shortCapGainResult").innerHTML = "Short Term Capital Gain: " + shortCapGain.toFixed(2) + "%";

    fedTaxExempt = taxExempt*100/(100-fedTaxExempt);
    var totalTaxEquivalentYield = fedTaxExempt + shortCapGain;
    document.getElementById("totalTaxEquivalentYield").innerHTML = "Total Tax Equivalent Yield: " + fedTaxExempt.toFixed(2) + "% + " + shortCapGain.toFixed(2) + "% = " + totalTaxEquivalentYield.toFixed(2) + "%";

    fedStateTaxExempt = fedTaxExempt*100/(100-fedStateTaxExempt);
    var fedStateTaxExemptResult = fedStateTaxExempt + shortCapGain;
    document.getElementById("fedStateTaxExempt").innerHTML = "Federal & State Tax Exempt: " + fedStateTaxExempt.toFixed(2) + "% + " + shortCapGain.toFixed(2) + "% = " + fedStateTaxExemptResult.toFixed(2) + "%";

    document.getElementById("summary").innerHTML = "A " + taxExempt.toFixed(2) + "% tax-exempt return is equivalent to a tax-equivalent yield of " + fedStateTaxExempt.toFixed(2) + "%.";

    document.getElementById("result").setAttribute("style", "visibility: visible");

    // generate the chart
    generateChart(grossReturn.toFixed(2), totalTaxEquivalentYield.toFixed(2), fedStateTaxExemptResult.toFixed(2));
}

function generateChart(grossReturn, totalTaxEquivalentYield, fedStateTaxExemptResult) {
    Chart.defaults.global.defaultFontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    Chart.defaults.global.defaultFontColor = "#000000";

    document.getElementById("chart").setAttribute("style", "visibility:visible");
    document.getElementById("chart").innerHTML = '<canvas id="myChart"></canvas>'; // reset canvas for every generation so graphs don't overlap

    let myChart = document.getElementById("myChart").getContext("2d");
    myChart.canvas.parentNode.style.width = '700px';
    myChart.canvas.parentNode.style.height = '350px';

    new Chart(myChart, {
        type: "bar",
        data: {
            labels: ["Gross Return", "Total Tax Equivalent Yield", "Federal & State Tax Exempt"],
            datasets: [{
                data: [
                    grossReturn,
                    totalTaxEquivalentYield,
                    fedStateTaxExemptResult
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