document.getElementById("submit").onclick = function() {
    var taxFree = document.getElementById("taxFree").value;
    var fedBracket = document.getElementById("fedBracket").value;
    var stateBracket = document.getElementById("stateBracket").value;
    
    if (taxFree == "" || fedBracket == "" || stateBracket == "") {
        alert("Please enter all fields.");
    } else {
        if (taxFree.charAt(taxFree.length-1) == "%") {
            taxFree = taxFree.substring(0, taxFree.length-1);
        }
        taxFree = parseFloat(taxFree);
        
        if (fedBracket.charAt(taxFree.length-1) == "%") {
            fedBracket = fedBracket.substring(0, fedBracket.length-1);
        }
        var fedTaxExempt = parseFloat(fedBracket);
        
        if (stateBracket.charAt(stateBracket.length-1) == "%") {
            stateBracket = stateBracket.substring(0, stateBracket.length-1);
        }
        var fedStateTaxExempt = parseFloat(stateBracket);
        
        
        if (taxFree < -12 || taxFree > 12) {
            alert("The tax-free yield must be between -12% and 12%.");
            document.getElementById("taxFree").value = "5%";
        } else if (fedTaxExempt < 0 || fedTaxExempt > 75) {
            alert("The federal marginal tax bracket must be between 0% and 75%.");
            document.getElementById("fedBracket").value = "7%";
        } else if (fedStateTaxExempt < 0 || fedStateTaxExempt > 75) {
            alert("The state marginal tax bracket must be between 0% and 75%.");
            document.getElementById("stateBracket").value = "7%";
        } else {
            document.getElementById("result").setAttribute("style", "visibility: visible");
        
            document.getElementById("taxFreeResult").innerHTML = "Tax Free: " + taxFree.toFixed(3) + "%";
        
            fedTaxExempt = taxFree*100/(100-fedTaxExempt);
            document.getElementById("fedTaxExempt").innerHTML = "Federal Tax Exempt: " + fedTaxExempt.toFixed(3) + "%";
        
            fedStateTaxExempt = fedTaxExempt*100/(100-fedStateTaxExempt);
            document.getElementById("fedStateTaxExempt").innerHTML = "Federal & State Tax Exempt: " + fedStateTaxExempt.toFixed(3) + "%";
        
            document.getElementById("summary").innerHTML = "A " + taxFree.toFixed(3) + "% tax-free return is equivalent to a tax-equivalent yield of " + fedStateTaxExempt.toFixed(3) + "%.";
        }
    }
}
                
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        document.getElementById("submit").click();
    }
});