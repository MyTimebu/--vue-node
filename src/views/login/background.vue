<template>
  <div class="zong">
    <canvas id="canvass" width="1400" height="600" />
    <div class="waves" />
  </div>
</template>

<script>

export default {
  data() {
    return {}
  },
  created() {},
  mounted() {
    this.test()
    this.test2()
  },
  methods: {
    test() {
      var canvas = document.querySelector('#canvass')
      console.log(canvas)

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Initialize the GL context
      var gl = canvas.getContext('webgl')
      if (!gl) {
        console.error('Unable to initialize WebGL.')
      }

      // Time step
      var dt = 0.015
      // Time
      var time = 0.0

      //* ************* Shader sources **************

      var vertexSource = `
        attribute vec2 position;
        void main() {
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `

      var fragmentSource = `
        precision highp float;

        uniform float width;
        uniform float height;
        vec2 resolution = vec2(width, height);

        uniform float time;

        //Base values modified with depth later
        float intensity = 1.0;
        float radius = 0.05;

        //Distance functions from 
        //https://www.iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm
        float triangleDist(vec2 p){ 
          const float k = sqrt(3.0);
          p.x = abs(p.x) - 1.0;
          p.y = p.y + 1.0/k;
          if( p.x+k*p.y>0.0 ) p=vec2(p.x-k*p.y,-k*p.x-p.y)/2.0;
          p.x -= clamp( p.x, -2.0, 0.0 );
          return -length(p)*sign(p.y);
        }

        float boxDist(vec2 p){
          vec2 d = abs(p)-1.0;
          return length(max(d,vec2(0))) + min(max(d.x,d.y),0.0);
        }

        float circleDist( vec2 p){
          return length(p) - 1.0;
        }

        //https://www.shadertoy.com/view/3s3GDn
        float getGlow(float dist, float radius, float intensity){
          return pow(radius/dist, intensity);
        }

        void main(){
            
          vec2 uv = gl_FragCoord.xy/resolution.xy;
          float widthHeightRatio = resolution.x/resolution.y;
          vec2 centre;
          vec2 pos;
          
          float t = time * 0.05;
            
          float dist;
          float glow;
          vec3 col = vec3(0);
            
          //The spacing between shapes
          float scale = 500.0;
          //Number of shapes
          const float layers = 15.0;
            
          float depth;
          vec2 bend;
            
          vec3 purple = vec3(0.611, 0.129, 0.909);
          vec3 green = vec3(0.133, 0.62, 0.698);
            
          float angle;
          float rotationAngle;
          mat2 rotation;
            
          //For movement of the anchor point in time
          float d = 2.5*(sin(t) + sin(3.0*t));

          //Create an out of frame anchor point where all shapes converge to    
          vec2 anchor = vec2(0.5 + cos(d), 0.5 + sin(d));
            
          //Create light purple glow at the anchor loaction
          pos = anchor - uv;
          pos.y /= widthHeightRatio;
          dist = length(pos);
          glow = getGlow(dist, 0.2, 1.9);
          col += glow * vec3(0.7,0.6,1.0);
            
          for(float i = 0.0; i < layers; i++){
                
            //Time varying depth information depending on layer
            depth = fract(i/layers + t);

            //Move the focus of the camera in a circle
            centre = vec2(0.5 + 0.2 * sin(t), 0.5 + 0.2 * cos(t));
                
            //Position shapes between the anchor and the camera focus based on depth
            bend = mix(anchor, centre, depth);
              
            pos = bend - uv;
            pos.y /= widthHeightRatio;

            //Rotate shapes
            rotationAngle = 3.14 * sin(depth + fract(t) * 6.28) + i;
            rotation = mat2(cos(rotationAngle), -sin(rotationAngle), 
            sin(rotationAngle),  cos(rotationAngle));
                
            pos *= rotation;
                
            //Position shapes according to depth
            pos *= mix(scale, 0.0, depth);
              
            float m = mod(i, 3.0);
            if(m == 0.0){
              dist = abs(boxDist(pos));
            }else if(m == 1.0){
              dist = abs(triangleDist(pos));
            }else{
              dist = abs(circleDist(pos));
            }
              
            //Get glow from base radius and intensity modified by depth
            glow = getGlow(dist, radius+(1.0-depth)*2.0, intensity + depth);
                
            //Find angle along shape and map from [-PI; PI] to [0; 1]
            angle = (atan(pos.y, pos.x)+3.14)/6.28;
            //Shift angle depending on layer and map to [1...0...1]
            angle = abs((2.0*fract(angle + i/layers)) - 1.0);
                
            //White core
            //col += 10.0*vec3(smoothstep(0.03, 0.02, dist));
                
            //Glow according to angle value
            col += glow * mix(green, purple, angle);
          }
            
          //Tone mapping
          col = 1.0 - exp(-col);
            
          //Output to screen
          gl_FragColor = vec4(col,1.0);
        }
      `

      //* ************* Utility functions **************

      window.addEventListener('resize', onWindowResize, false)

      function onWindowResize() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.uniform1f(widthHandle, window.innerWidth)
        gl.uniform1f(heightHandle, window.innerHeight)
      }

      // Compile shader and combine with source
      function compileShader(shaderSource, shaderType) {
        var shader = gl.createShader(shaderType)
        gl.shaderSource(shader, shaderSource)
        gl.compileShader(shader)
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          const obj = { 'Shader compile failed with: ': gl.getShaderInfoLog(shader) }
          throw obj
        }
        return shader
      }

      // From https://codepen.io/jlfwong/pen/GqmroZ
      // Utility to complain loudly if we fail to find the attribute/uniform
      function getAttribLocation(program, name) {
        var attributeLocation = gl.getAttribLocation(program, name)
        if (attributeLocation === -1) {
          const obj = { 'Cannot find attribute ': name }
          throw obj
        }
        return attributeLocation
      }

      function getUniformLocation(program, name) {
        var attributeLocation = gl.getUniformLocation(program, name)
        if (attributeLocation === -1) {
          const obj = { 'Cannot find uniform ': name }
          throw obj
        }
        return attributeLocation
      }

      //* ************* Create shaders **************

      // Create vertex and fragment shaders
      var vertexShader = compileShader(vertexSource, gl.VERTEX_SHADER)
      var fragmentShader = compileShader(fragmentSource, gl.FRAGMENT_SHADER)

      // Create shader programs
      var program = gl.createProgram()
      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)

      gl.useProgram(program)

      // Set up rectangle covering entire canvas
      var vertexData = new Float32Array([
        -1.0, 1.0, 	// top left
        -1.0, -1.0, 	// bottom left
        1.0, 1.0, 	// top right
        1.0, -1.0 	// bottom right
      ])

      // Create vertex buffer
      var vertexDataBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW)

      // Layout of our data in the vertex buffer
      var positionHandle = getAttribLocation(program, 'position')

      gl.enableVertexAttribArray(positionHandle)
      gl.vertexAttribPointer(positionHandle,
        2, 				// position is a vec2 (2 values per component)
        gl.FLOAT, // each component is a float
        false, 		// don't normalize values
        2 * 4, 		// two 4 byte float components per vertex (32 bit float is 4 bytes)
        0 				// how many bytes inside the buffer to start from
      )

      // Set uniform handle
      var timeHandle = getUniformLocation(program, 'time')
      var widthHandle = getUniformLocation(program, 'width')
      var heightHandle = getUniformLocation(program, 'height')

      gl.uniform1f(widthHandle, window.innerWidth)
      gl.uniform1f(heightHandle, window.innerHeight)
      function draw() {
        // Update time
        time += dt
        // Send uniforms to program
        gl.uniform1f(timeHandle, time)
        // Draw a triangle strip connecting vertices 0-4
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        requestAnimationFrame(draw)
      }
      draw()
    },
    test2() {
      class ShaderProgram {
        constructor(holder, options = {}) {
          options = Object.assign({
            antialias: false,
            depthTest: false,
            mousemove: false,
            autosize: true,
            side: 'front',
            vertex: `
              precision highp float;

              attribute vec4 a_position;
              attribute vec4 a_color;

              uniform float u_time;
              uniform vec2 u_resolution;
              uniform vec2 u_mousemove;
              uniform mat4 u_projection;

              varying vec4 v_color;

              void main() {

                gl_Position = u_projection * a_position;
                gl_PointSize = (10.0 / gl_Position.w) * 100.0;

                v_color = a_color;

              }`,
            fragment: `
              precision highp float;

              uniform sampler2D u_texture;
              uniform int u_hasTexture;

              varying vec4 v_color;

              void main() {

                if ( u_hasTexture == 1 ) {

                  gl_FragColor = v_color * texture2D(u_texture, gl_PointCoord);

                } else {

                  gl_FragColor = v_color;

                }

              }`,
            uniforms: {},
            buffers: {},
            camera: {},
            texture: null,
            onUpdate: () => {},
            onResize: () => {}
          }, options)

          const uniforms = Object.assign({
            time: { type: 'float', value: 0 },
            hasTexture: { type: 'int', value: 0 },
            resolution: { type: 'vec2', value: [0, 0] },
            mousemove: { type: 'vec2', value: [0, 0] },
            projection: { type: 'mat4', value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] }
          }, options.uniforms)

          const buffers = Object.assign({
            position: { size: 3, data: [] },
            color: { size: 4, data: [] }
          }, options.buffers)

          const camera = Object.assign({
            fov: 60,
            near: 1,
            far: 10000,
            aspect: 1,
            z: 100,
            perspective: true
          }, options.camera)

          const canvas = document.createElement('canvas')
          const gl = canvas.getContext('webgl', { antialias: options.antialias })

          if (!gl) return false

          this.count = 0
          this.gl = gl
          this.canvas = canvas
          this.camera = camera
          this.holder = holder
          this.onUpdate = options.onUpdate
          this.onResize = options.onResize
          this.data = {}

          holder.appendChild(canvas)

          this.createProgram(options.vertex, options.fragment)

          this.createBuffers(buffers)
          this.createUniforms(uniforms)

          this.updateBuffers()
          this.updateUniforms()

          this.createTexture(options.texture)

          gl.enable(gl.BLEND)
          gl.enable(gl.CULL_FACE)
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
          gl[ options.depthTest ? 'enable' : 'disable' ](gl.DEPTH_TEST)
          if (options.autosize) {
            window.addEventListener('resize', e => this.resize(e), false)
          }
          if (options.mousemove) {
            window.addEventListener('mousemove', e => this.mousemove(e), false)
          }
          this.resize()
          this.update = this.update.bind(this)
          this.time = { start: performance.now(), old: performance.now() }
          this.update()
        }
        mousemove(e) {
          const x = e.pageX / this.width * 2 - 1
          const y = e.pageY / this.height * 2 - 1
          this.uniforms.mousemove = [x, y]
        }
        resize(e) {
          const holder = this.holder
          const canvas = this.canvas
          const gl = this.gl
          const width = this.width = holder.offsetWidth
          const height = this.height = holder.offsetHeight
          const aspect = this.aspect = width / height
          const dpi = this.dpi = devicePixelRatio
          canvas.width = width * dpi
          canvas.height = height * dpi
          canvas.style.width = width + 'px'
          canvas.style.height = height + 'px'
          gl.viewport(0, 0, width * dpi, height * dpi)
          gl.clearColor(0, 0, 0, 0)
          this.uniforms.resolution = [width, height]
          this.uniforms.projection = this.setProjection(aspect)
          this.onResize(width, height, dpi)
        }
        setProjection(aspect) {
          const camera = this.camera
          if (camera.perspective) {
            camera.aspect = aspect
            const fovRad = camera.fov * (Math.PI / 180)
            const f = Math.tan(Math.PI * 0.5 - 0.5 * fovRad)
            const rangeInv = 1.0 / (camera.near - camera.far)

            const matrix = [
              f / camera.aspect, 0, 0, 0,
              0, f, 0, 0,
              0, 0, (camera.near + camera.far) * rangeInv, -1,
              0, 0, camera.near * camera.far * rangeInv * 2, 0
            ]
            matrix[14] += camera.z
            matrix[15] += camera.z
            return matrix
          } else {
            return [
              2 / this.width, 0, 0, 0,
              0, -2 / this.height, 0, 0,
              0, 0, 1, 0,
              -1, 1, 0, 1
            ]
          }
        }
        createShader(type, source) {
          const gl = this.gl
          const shader = gl.createShader(type)
          gl.shaderSource(shader, source)
          gl.compileShader(shader)
          if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return shader
          } else {
            console.log(gl.getShaderInfoLog(shader))
            gl.deleteShader(shader)
          }
        }
        createProgram(vertex, fragment) {
          const gl = this.gl
          const vertexShader = this.createShader(gl.VERTEX_SHADER, vertex)
          const fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragment)
          const program = gl.createProgram()
          gl.attachShader(program, vertexShader)
          gl.attachShader(program, fragmentShader)
          gl.linkProgram(program)
          if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
            gl.useProgram(program)
            this.program = program
          } else {
            console.log(gl.getProgramInfoLog(program))
            gl.deleteProgram(program)
          }
        }
        createUniforms(data) {
          const gl = this.gl
          const uniforms = this.data.uniforms = data
          const values = this.uniforms = {}
          Object.keys(uniforms).forEach(name => {
            const uniform = uniforms[name]
            uniform.location = gl.getUniformLocation(this.program, 'u_' + name)
            Object.defineProperty(values, name, {
              set: value => {
                uniforms[name].value = value
                this.setUniform(name, value)
              },
              get: () => uniforms[name].value
            })
          })
        }
        setUniform(name, value) {
          const gl = this.gl
          const uniform = this.data.uniforms[name]
          uniform.value = value
          switch (uniform.type) {
            case 'int': {
              gl.uniform1i(uniform.location, value)
              break
            }
            case 'float': {
              gl.uniform1f(uniform.location, value)
              break
            }
            case 'vec2': {
              gl.uniform2f(uniform.location, ...value)
              break
            }
            case 'vec3': {
              gl.uniform3f(uniform.location, ...value)
              break
            }
            case 'vec4': {
              gl.uniform4f(uniform.location, ...value)
              break
            }
            case 'mat2': {
              gl.uniformMatrix2fv(uniform.location, false, value)
              break
            }
            case 'mat3': {
              gl.uniformMatrix3fv(uniform.location, false, value)
              break
            }
            case 'mat4': {
              gl.uniformMatrix4fv(uniform.location, false, value)
              break
            }
          }

          // ivec2       : uniform2i,
          // ivec3       : uniform3i,
          // ivec4       : uniform4i,
          // sampler2D   : uniform1i,
          // samplerCube : uniform1i,
          // bool        : uniform1i,
          // bvec2       : uniform2i,
          // bvec3       : uniform3i,
          // bvec4       : uniform4i,
        }
        updateUniforms() {
          const gl = this.gl
          console.log(gl)
          const uniforms = this.data.uniforms
          Object.keys(uniforms).forEach(name => {
            const uniform = uniforms[name]
            this.uniforms[name] = uniform.value
          })
        }
        createBuffers(data) {
          const gl = this.gl
          console.log(gl)
          const buffers = this.data.buffers = data
          const values = this.buffers = {}
          Object.keys(buffers).forEach(name => {
            const buffer = buffers[name]
            buffer.buffer = this.createBuffer('a_' + name, buffer.size)
            Object.defineProperty(values, name, {
              set: data => {
                buffers[name].data = data
                this.setBuffer(name, data)
                if (name === 'position') {
                  this.count = buffers.position.data.length / 3
                }
              },
              get: () => buffers[name].data
            })
          })
        }
        createBuffer(name, size) {
          const gl = this.gl
          const program = this.program
          const index = gl.getAttribLocation(program, name)
          const buffer = gl.createBuffer()
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
          gl.enableVertexAttribArray(index)
          gl.vertexAttribPointer(index, size, gl.FLOAT, false, 0, 0)
          return buffer
        }
        setBuffer(name, data) {
          const gl = this.gl
          const buffers = this.data.buffers

          if (name == null && !gl.bindBuffer(gl.ARRAY_BUFFER, null)) return

          gl.bindBuffer(gl.ARRAY_BUFFER, buffers[name].buffer)
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)
        }
        updateBuffers() {
          const gl = this.gl
          const buffers = this.buffers
          Object.keys(buffers).forEach((name, index) => {
            buffers[index] = ''
          })
          this.setBuffer(null)
          console.log(gl)
        }
        createTexture(src) {
          const gl = this.gl
          const texture = gl.createTexture()
          gl.bindTexture(gl.TEXTURE_2D, texture)
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]))
          this.texture = texture
          if (src) {
            this.uniforms.hasTexture = 1
            this.loadTexture(src)
          }
        }
        loadTexture(src) {
          const gl = this.gl
          const texture = this.texture
          const textureImage = new Image()
          textureImage.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, texture)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
            // gl.generateMipmap(gl.TEXTURE_2D)
          }
          textureImage.src = src
        }
        update() {
          const gl = this.gl
          const now = performance.now()
          const elapsed = (now - this.time.start) / 5000
          const delta = now - this.time.old
          this.time.old = now
          this.uniforms.time = elapsed
          if (this.count > 0) {
            gl.clear(gl.COLORBUFFERBIT)
            gl.drawArrays(gl.POINTS, 0, this.count)
          }
          this.onUpdate(delta)
          requestAnimationFrame(this.update)
        }
      }
      const pointSize = 2.5
      const waves = new ShaderProgram(document.querySelector('.waves'), {
        texture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAb1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8v0wLRAAAAJHRSTlMAC/goGvDhmwcExrVjWzrm29TRqqSKenRXVklANSIUE8mRkGpv+HOfAAABCElEQVQ4y4VT13LDMAwLrUHteO+R9f/fWMfO6dLaPeKVEECRxOULWsEGpS9nULDwia2Y+ALqUNbAWeg775zv+sA4/FFRMxt8U2FZFCVWjR/YrH4/H9sarclSKdPMWKzb8VsEeHB3m0shkhVCyNzeXeAQ9Xl4opEieX2QCGnwGbj6GMyjw9t1K0fK9YZunPXeAGsfJtYjwzxaBnozGGorYz0ypK2HzQSYx1y8DgSRo2ewOiyh2QWOEk1Y9OrQV0a8TiBM1a8eMHWYnRMy7CZ4t1CmyRkhSUvP3gRXyHOCLBxNoC3IJv//ZrJ/kxxUHPUB+6jJZZHrpg6GOjnqaOmzp4NDR48OLxn/H27SRQ08S0ZJAAAAAElFTkSuQmCC',
        uniforms: {
          size: { type: 'float', value: pointSize },
          field: { type: 'vec3', value: [0, 0, 0] },
          speed: { type: 'float', value: 5 }
        },
        vertex: `
          #define M_PI 3.1415926535897932384626433832795

          precision highp float;

          attribute vec4 a_position;
          attribute vec4 a_color;

          uniform float u_time;
          uniform float u_size;
          uniform float u_speed;
          uniform vec3 u_field;
          uniform mat4 u_projection;

          varying vec4 v_color;

          void main() {

            vec3 pos = a_position.xyz;

            pos.y += (
              cos(pos.x / u_field.x * M_PI * 8.0 + u_time * u_speed) +
              sin(pos.z / u_field.z * M_PI * 8.0 + u_time * u_speed)
            ) * u_field.y;

            gl_Position = u_projection * vec4( pos.xyz, a_position.w );
            gl_PointSize = ( u_size / gl_Position.w ) * 100.0;

            v_color = a_color;

          }`,
        fragment: `
          precision highp float;

          uniform sampler2D u_texture;

          varying vec4 v_color;

          void main() {

            gl_FragColor = v_color * texture2D(u_texture, gl_PointCoord);

          }`,
        onResize(w, h, dpi) {
          const position = []
          const color = []
          const width = 400 * (w / h)
          const depth = 400
          const height = 3
          const distance = 5
          for (let x = 0; x < width; x += distance) {
            for (let z = 0; z < depth; z += distance) {
              position.push(-width / 2 + x, -30, -depth / 2 + z)
              color.push(0, 1 - (x / width) * 1, 0.5 + x / width * 0.5, z / depth)
            }
          }
          this.uniforms.field = [width, height, depth]
          this.buffers.position = position
          this.buffers.color = color
          this.uniforms.size = (h / 400) * pointSize * dpi
        }
      })
      console.log(waves)
    }
  }
}
</script>

<style lang="scss" scoped>
// @import url('./style.css');
// .zong {
//   margin: 0;
//   overflow: hidden;
//   // background-repeat: no-repeat;
// }
.waves{
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
}
</style>
