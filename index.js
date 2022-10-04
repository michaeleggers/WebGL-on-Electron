const vsSource = `
    attribute vec4 pos;
    
    uniform mat4 modelViewMat;
    uniform mat4 projMat;

    void main() {
        gl_Position = projMat * modelViewMat * pos;
    }
`

const fsSource = `
    void main() {
        gl_FragColor = vec4(1.0);
    }
`

function loadShader(gl, type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(`Error compiling shader: ${gl.getShaderInfoLog(shader)}`)
        gl.deleteShader(shader)
        return null
    }

    return shader
}

function initShaderProgram(gl, vsSource, fsSource) {
    const vertShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
    const fragShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

    const shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertShader)
    gl.attachShader(shaderProgram, fragShader)
    gl.linkProgram(shaderProgram)

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert(`Unable to init shader program: ${gl.getProgramInfoLog(shaderProgram)}`)
        return null
    }

    return shaderProgram
}

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
    
    // Init Shader Programs
    const rectShaderProgram = initShaderProgram(gl, vsSource, fsSource)

    const programInfo = {
        program: rectShaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(rectShaderProgram, 'pos')
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(rectShaderProgram, 'projMat'),
            modelViewMatrix: gl.getUniformLocation(rectShaderProgram, 'modelViewMat')
        }
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