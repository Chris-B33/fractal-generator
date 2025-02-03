var input_canvas = document.getElementById("additive-input-canvas");
var input_ctx = input_canvas.getContext("2d");
var output_canvas = document.getElementById("output-canvas");
var output_ctx = output_canvas.getContext("2d");

var angle_input = document.getElementById("additive-angle");
var scale_input = document.getElementById("additive-scale");
var depth_input = document.getElementById("additive-depth");

var centers = [
    new Pixel(50, 100, 10, "red", input_ctx),
    new Pixel(150, 100, 10, "orange", input_ctx)
]
var draggingCenter = null;
var mouseDown = false;
var pixels = [];

function Pixel(x, y, size, color, canvas_context) {
    this.x = x;
    this.y = y;
    this.size = size
    this.color = color
    this.ctx = canvas_context
    this.isHeld = false;

    this.draw = function() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x - 3, this.y - 3, this.size, this.size);
    }

    this.isMouseInside = function(mouseX, mouseY) {
        return mouseX >= this.x - 10 && mouseX <= this.x + this.size + 10 &&
                mouseY >= this.y - 10 && mouseY <= this.y + this.size + 10;
    }
    this.draw();
}

input_canvas.addEventListener("mousedown", function(event) {
    mouseDown = true;
    var mouseX = event.offsetX;
    var mouseY = event.offsetY;

    // If dragging center
    for (let i = 0; i < centers.length; i++) {
        let center = centers[i];
    
        if (center.isMouseInside(mouseX, mouseY)) {
            draggingCenter = center;
            center.isHeld = true;
            offsetX = mouseX - center.x;
            offsetY = mouseY - center.y;
            return;
        }
    }

    // If drawing
    var new_pixel = new Pixel(mouseX, mouseY, 3, "black", input_ctx)
    pixels.push(new_pixel);

    updateInputCanvas();
});

input_canvas.addEventListener("mousemove", function(event) {
    let mouseX = event.offsetX;
    let mouseY = event.offsetY;

    if (draggingCenter) {
        draggingCenter.x = mouseX - offsetX;
        draggingCenter.y = mouseY - offsetY;
    } else if (mouseDown) {
        var new_pixel = new Pixel(mouseX, mouseY, 3, "black", input_ctx)
        pixels.push(new_pixel);
    }

    updateInputCanvas();
});

input_canvas.addEventListener("mouseup", function() {
    if (draggingCenter) {
        draggingCenter.isHeld = false;
        draggingCenter = null;
    }
    mouseDown = false;
    updateInputCanvas();
});

input_canvas.addEventListener("mouseleave", function() {
    if (draggingCenter) {
        draggingCenter.isHeld = false;
        draggingCenter = null;
    }
    mouseDown = false;
    updateInputCanvas();
});

function resetInputCanvas() {
    console.log("[INFO]: Resetting input canvas.")
    centers = [
        new Pixel(50, 100, 10, "red", input_ctx),
        new Pixel(150, 100, 10, "orange", input_ctx)
    ]
    draggingCenter = null;
    pixels = [];
    updateInputCanvas();
}

function updateInputCanvas() {
    input_ctx.clearRect(0, 0, input_canvas.width, input_canvas.height);
   
    for (let i = 0; i < pixels.length; i++) {
        let pixel = pixels[i];
        pixel.draw()
    }

    for (let i = 0; i < centers.length; i++) {
        let center = centers[i];
        center.draw()
    }
}

function generate_additive() {
    // We can access center and pixels anyway.
    angle = angle_input.value;
    scale = scale_input.value;
    depth = depth_input.value;

    console.log("[INFO]: Generating additive fractal with values:")
    console.log(`[INFO]: - Centers: (${centers[0].x}, ${centers[0].y}), (${centers[1].x}, ${centers[1].y})`);
    console.log(`[INFO]: - Pixel count: ${pixels.length}`);
    console.log(`[INFO]: - Turning angle: ${angle}`);
    console.log(`[INFO]: - Scaling factor: ${scale}`);
    console.log(`[INFO]: - Recurson depth: ${depth}`);
}