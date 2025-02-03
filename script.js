/*
    Different processes needed to be handled:
    - Additive = Start with structure and add to it
    - Reductive = Take base shape and subdivide in certain way
    - Formulaic = In a euclidian grid using algebra
*/

var method_select = document.getElementById("method-select");
var output_canvas = document.getElementById("output-canvas");
var method_name = "";

function setOutputCanvasVisibiility(state) {
    if (state == "on") {
        output_canvas.classList.remove("hidden-general");
    } else {
        output_canvas.classList.add("hidden-general");
    }
}

method_select.addEventListener("change", function() {
    method_name = this.options[this.selectedIndex].getAttribute("value");
    setOutputCanvasVisibiility("off")

    for (var target of document.getElementsByClassName("method-select-target")) {
        if (target.id == `${method_name}-method-section`) {
            target.classList.remove("hidden-method");
        } else {
            target.classList.add("hidden-method");
        }
    }
})

function generate_additive() {
    setOutputCanvasVisibiility("on")
    console.log("[INFO]: Generating fractal with method: Additive.")
}

function generate_reductive() {
    setOutputCanvasVisibiility("on")
    console.log("[INFO]: Generating fractal with method: Reductive.")
}

function generate_formulaic() {
    setOutputCanvasVisibiility("on")
    console.log("[INFO]: Generating fractal with method: Formulaic.")
}