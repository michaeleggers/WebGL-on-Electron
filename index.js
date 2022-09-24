function main() {
    const canvas = document.getElementById("glCanvas");
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
        // Set clear color to black, fully opaque
        gl.clearColor(red, 0.9, 0.0, 1.0);
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