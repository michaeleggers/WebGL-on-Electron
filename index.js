function main() {
    const canvas = document.getElementById("glCanvas");
    let rect = canvas.getBoundingClientRect()
    console.log(rect)
    
    // Resize to current window width/height
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Initialize the GL context
    const gl = canvas.getContext("webgl");
    // Only continue if WebGL is available and working
    if (gl === null) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }    

    let red = 0.0
    let addRed = 1
    function drawFrame(nowTime) {

        window.onresize = (evnt) => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight    
        }

        // Set clear color to black, fully opaque
        gl.clearColor(red, 0.0, 1.0, 1.0);
        // gl.viewport(0, 0, 10, 10)
        if (red > 1.0) {
            addRed = -1
        }
        if (red < 0.0) {
            addRed = 1
        }
        red += addRed*0.001
        // Clear the color buffer with specified clear color
        gl.clear(gl.COLOR_BUFFER_BIT);
        requestAnimationFrame(drawFrame)
    }

    requestAnimationFrame(drawFrame)
}

window.onload = main;