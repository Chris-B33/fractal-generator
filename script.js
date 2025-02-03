/*
    Different processes needed to be handled:
    - Additive = Start with structure and add to it
    - Reductive = Take base shape and subdivide in certain way
    - Formulaic = In a euclidian grid using algebra
*/

var method_select = document.getElementById("method-select");
var method_name = ""

method_select.addEventListener("change", function() {
    method_name = this.options[this.selectedIndex].getAttribute("value");

    for (var target of document.getElementsByClassName("method-select-target")) {
        if (target.id == method_name + "-method-section") {
            target.classList.remove("hidden");
        } else {
            target.classList.add("hidden");
        }
    }
})

function generate_additive() {
    console.log("[INFO]: Generating fractal with method: Additive.")
}

function generate_reductive() {
    console.log("[INFO]: Generating fractal with method: Reductive.")
}

function generate_formulaic() {
    console.log("[INFO]: Generating fractal with method: Formulaic.")
}