var reductive_method_select = document.getElementById("reductive-method-select");
var reductive_recursion_input = document.getElementById("reductive-depth");

var output_canvas = document.getElementById("output-canvas");
var output_ctx = output_canvas.getContext("2d")

var max_delay = 100

const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};

function generate_reductive() {
    console.log("[START]: Generating reductive fractal with values:")
    console.log(`[INFO]: - Recurson depth: ${reductive_recursion_input.value}`);
    let method = reductive_method_select.options[reductive_method_select.selectedIndex].getAttribute("value")
    if (method == "triangle") {
        console.log("[INFO]: - Shape: Sierpinski's Triangle")
        sierpinskis_triangle();
    } else if (method == "square") {
        console.log("[INFO]: - Shape: Sierpinski's Carpet")
        sierpinskis_carpet();
    }
    console.log("[FINISH]: Completed fractal.");
}

function sierpinskis_triangle() {
    function drawTriangle(ctx, x1, y1, x2, y2, x3, y3) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.fill();
    }

    async function sierpinski_t(ctx, x1, y1, x2, y2, x3, y3, depth) {
        if (depth == 0) {
            drawTriangle(ctx, x1, y1, x2, y2, x3, y3);
        } else {
            const midX12 = (x1 + x2) / 2;
            const midY12 = (y1 + y2) / 2;
            const midX23 = (x2 + x3) / 2;
            const midY23 = (y2 + y3) / 2;
            const midX31 = (x3 + x1) / 2;
            const midY31 = (y3 + y1) / 2;

            sierpinski_t(ctx, x1, y1, midX12, midY12, midX31, midY31, depth - 1);
            await delay(max_delay - (10 * reductive_recursion_input.value));
            sierpinski_t(ctx, midX12, midY12, x2, y2, midX23, midY23, depth - 1);
            await delay(max_delay - reductive_recursion_input.value);
            sierpinski_t(ctx, midX31, midY31, midX23, midY23, x3, y3, depth - 1);
            await delay(max_delay - reductive_recursion_input.value);
        }
    }

    const depth = reductive_recursion_input.value;
    const x1 = output_canvas.width / 2;
    const y1 = 0;
    const x2 = 0;
    const y2 = output_canvas.height;
    const x3 = output_canvas.width;
    const y3 = output_canvas.height;

    output_ctx.fillStyle = 'black';

    output_ctx.clearRect(0, 0, output_canvas.width, output_canvas.height);
    sierpinski_t(output_ctx, x1, y1, x2, y2, x3, y3, depth);
}

function sierpinskis_carpet() {
    function drawSquare(ctx, x, y, size) {
        ctx.fillRect(x, y, size, size);
    }

    async function sierpinskiCarpet(ctx, x, y, size, depth) {
        if (depth == 0) {
            drawSquare(ctx, x, y, size);
        } else {
            const newSize = size / 3;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    await delay(max_delay - (20 * reductive_recursion_input.value));
                    if (i !== 1 || j !== 1) {
                        sierpinskiCarpet(ctx, x + i * newSize, y + j * newSize, newSize, depth - 1);
                    }
                }
            }
        }
    }

    const depth = reductive_recursion_input.value;
    const size = output_canvas.width;

    output_ctx.fillStyle = 'black';

    output_ctx.clearRect(0, 0, output_canvas.width, output_canvas.height);
    sierpinskiCarpet(output_ctx, 0, 0, size, depth);
}