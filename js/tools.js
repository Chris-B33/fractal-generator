var method_select = document.getElementById("method-select");
var output_canvas = document.getElementById("output-canvas");

output_canvas.width = window.innerWidth * 0.4;
output_canvas.height = window.innerWidth * 0.4;

function setOutputCanvasVisibiility(state) {
    if (state == "on") {
        output_canvas.classList.remove("hidden-general");
    } else {
        output_canvas.classList.add("hidden-general");
    }
}

method_select.addEventListener("change", function() {
    let method_name = this.options[this.selectedIndex].getAttribute("value");
    setOutputCanvasVisibiility("off")

    for (var target of document.getElementsByClassName("method-select-target")) {
        if (target.id == `${method_name}-method-section`) {
            target.classList.remove("hidden-method");
        } else {
            target.classList.add("hidden-method");
        }
    }
})