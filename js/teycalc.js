const form = document.querySelector("form");
const result = document.querySelector(".result");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    // inputs
    let taxExempt = parseFloat(document.getElementById("taxExempt").value);
    let shortCapGain = parseFloat(document.getElementById("shortCapGain").value);
    let fedBracket = parseFloat(document.getElementById("fedBracket").value);
    let stateBracket = parseFloat(document.getElementById("stateBracket").value);

    // results
    const taxExemptResult = document.getElementById("taxExemptResult");
    const shortCapGainResult = document.getElementById("shortCapGainResult");
    const totalTaxEquivalentYieldResult = document.getElementById("totalTaxEquivalentYield");
    const fedStateTaxExemptResult = document.getElementById("fedStateTaxExempt");
    const summary = document.getElementById("summary");

    // calculate new results and add them to web page
    taxExemptResult.innerHTML = "Tax Exempt: " + taxExempt.toFixed(2) + "%";

    let grossReturn = taxExempt + shortCapGain;
    shortCapGainResult.innerHTML = "Short Term Capital Gain: " + shortCapGain.toFixed(2) + "%";

    fedBracket = taxExempt*100/(100-fedBracket);
    let totalTaxEquivalentYield = fedBracket + shortCapGain;
    totalTaxEquivalentYieldResult.innerHTML = "Total Tax Equivalent Yield: " + fedBracket.toFixed(2) + "% + " + shortCapGain.toFixed(2) + "% = " + totalTaxEquivalentYield.toFixed(2) + "%";

    stateBracket = fedBracket*100/(100-stateBracket);
    let fedStateTaxExempt = stateBracket + shortCapGain;
    console.log(typeof fedStateTaxExempt);
    fedStateTaxExemptResult.innerHTML = "Federal & State Tax Exempt: " + stateBracket.toFixed(2) + "% + " + shortCapGain.toFixed(2) + "% = " + fedStateTaxExempt.toFixed(2) + "%";

    summary.innerHTML = "A " + taxExempt.toFixed(2) + "% tax-exempt return is equivalent to a tax-equivalent yield of " + fedStateTaxExempt.toFixed(2) + "%.";

    result.classList.remove("hide");

    // generate the chart
    generateChart(grossReturn.toFixed(2), totalTaxEquivalentYield.toFixed(2), fedStateTaxExempt.toFixed(2));
});

function generateChart(grossReturn, totalTaxEquivalentYield, fedStateTaxExemptResult) {
    Chart.defaults.global.defaultFontFamily = '-apple-system, BlinkMacSystemFont, "Roboto", sans-serif';
    Chart.defaults.global.defaultFontColor = "#000000";

    const chartCont = document.getElementById("chart");

    // reset canvas for every generation so graphs don't overlap
    chartCont.innerHTML = "";
    const canvas = document.createElement("canvas");
    chartCont.append(canvas);

    const ctx = canvas.getContext("2d");
    const chart = new Chart(ctx, {
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