var input_canvas = document.getElementById("additive-input-canvas");
var input_ctx = input_canvas.getContext("2d");

var output_canvas = document.getElementById("output-canvas");
var output_ctx = output_canvas.getContext("2d");

var angle_input = document.getElementById("additive-angle");
var scale_input = document.getElementById("additive-scale");
var depth_input = document.getElementById("additive-depth");

var mouseDown = false;

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
        return mouseX >= this.x - 5 && mouseX <= this.x + this.size + 5 &&
                mouseY >= this.y - 5 && mouseY <= this.y + this.size + 5;
    }
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

    var new_pixel = new Pixel(mouseX, mouseY, 2, "black", input_ctx)
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
        var new_pixel = new Pixel(mouseX, mouseY, 2, "black", input_ctx)
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
        new Pixel(25, 50, 5, "red", input_ctx),
        new Pixel(75, 50, 5, "orange", input_ctx)
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
    output_pixels = pixels.map(pixel => ({ ...pixel }));
    angle = angle_input.value * (Math.PI / 180); // For converting to radians
    scale_factor = scale_input.value;
    depth = depth_input.value;

    output_ctx.clearRect(0, 0, output_canvas.width, output_canvas.height);
    console.log("[START]: Generating additive fractal with values:")
    console.log(`[INFO]: - Centers: (${centers[0].x}, ${centers[0].y}), (${centers[1].x}, ${centers[1].y})`);
    console.log(`[INFO]: - Pixel count: ${output_pixels.length}`);
    console.log(`[INFO]: - Turning angle: ${angle}`);
    console.log(`[INFO]: - Scaling factor: ${scale_factor}`);
    console.log(`[INFO]: - Recurson depth: ${depth}`);   
    
    var mv = {x: centers[1].x - centers[0].x, y: centers[1].y - centers[0].y}
    current_center = new Pixel(
        (output_canvas.width / 2) - 1,
        (output_canvas.height / 2) - 1, 
        2, 
        "black", 
        output_ctx
    ); 

    current_scale = 1
    for (let i=0; i<depth; i++) {
        console.log(`[INFO]: Starting iteration ${i+1}`)
        output_ctx.fillStyle = "red"
        output_ctx.fillRect(current_center.x, current_center.y, 4, 4)
        console.log(`${output_pixels[0].x} ${output_pixels[0].y}`)
        console.log(`${current_center.x} ${current_center.y}`)
        for (let i=0; i<output_pixels.length; i++) {
            output_pixels[i].ctx = output_ctx;
            output_pixels[i].x = (output_pixels[i].x + current_center.x - centers[0].x);
            output_pixels[i].y = (output_pixels[i].y + current_center.y - centers[0].y);
            output_pixels[i].draw();
            output_pixels[i].x -= current_center.x;
            output_pixels[i].y -= current_center.y;
        }
        

        current_center.x += mv.x;
        current_center.y += mv.y;
        current_scale *= scale_factor;
    }
        
    console.log("[FINISH]: Completed fractal.")
}

resetInputCanvas();