import"./modulepreload-polyfill-B5Qt9EMX.js";import"./commonScript-CIR72vPk.js";const m=document.getElementsByTagName("canvas")[0];fe();let l={SIM_RESOLUTION:128,DYE_RESOLUTION:1024,DENSITY_DISSIPATION:3,VELOCITY_DISSIPATION:.25,PRESSURE:.3,PRESSURE_ITERATIONS:20,CURL:20,SPLAT_RADIUS:.8,SPLAT_FORCE:2500,SHADING:!0,COLOR_UPDATE_SPEED:8,PAUSED:!1,BLOOM:!0,BLOOM_ITERATIONS:6,BLOOM_RESOLUTION:256,BLOOM_INTENSITY:.3,BLOOM_THRESHOLD:.8,BLOOM_SOFT_KNEE:.6,SUNRAYS:!0,SUNRAYS_RESOLUTION:196,SUNRAYS_WEIGHT:.3};function J(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color=[30,0,300]}let y=[],K=[];y.push(new J);const{gl:t,ext:T}=pe(m);he()&&(l.DYE_RESOLUTION=512);T.supportLinearFiltering||(l.DYE_RESOLUTION=512,l.SHADING=!1,l.BLOOM=!1,l.SUNRAYS=!1);function pe(e){const i={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1};let r=e.getContext("webgl2",i);const o=!!r;o||(r=e.getContext("webgl",i)||e.getContext("experimental-webgl",i));let a,u;o?(r.getExtension("EXT_color_buffer_float"),u=r.getExtension("OES_texture_float_linear")):(a=r.getExtension("OES_texture_half_float"),u=r.getExtension("OES_texture_half_float_linear")),r.clearColor(0,0,0,1);const n=o?r.HALF_FLOAT:a.HALF_FLOAT_OES;let s,f,E;return o?(s=_(r,r.RGBA16F,r.RGBA,n),f=_(r,r.RG16F,r.RG,n),E=_(r,r.R16F,r.RED,n)):(s=_(r,r.RGBA,r.RGBA,n),f=_(r,r.RGBA,r.RGBA,n),E=_(r,r.RGBA,r.RGBA,n)),ga("send","event",o?"webgl2":"webgl",s==null?"not supported":"supported"),{gl:r,ext:{formatRGBA:s,formatRG:f,formatR:E,halfFloatTexType:n,supportLinearFiltering:u}}}function _(e,i,r,o){if(!ge(e,i,r,o))switch(i){case e.R16F:return _(e,e.RG16F,e.RG,o);case e.RG16F:return _(e,e.RGBA16F,e.RGBA,o);default:return null}return{internalFormat:i,format:r}}function ge(e,i,r,o){let a=e.createTexture();e.bindTexture(e.TEXTURE_2D,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,i,4,4,0,r,o,null);let u=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,u),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a,0),e.checkFramebufferStatus(e.FRAMEBUFFER)==e.FRAMEBUFFER_COMPLETE}function he(){return/Mobi|Android/i.test(navigator.userAgent)}class Te{constructor(i,r){this.vertexShader=i,this.fragmentShaderSource=r,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(i){let r=0;for(let a=0;a<i.length;a++)r+=ct(i[a]);let o=this.programs[r];if(o==null){let a=v(t.FRAGMENT_SHADER,this.fragmentShaderSource,i);o=ne(this.vertexShader,a),this.programs[r]=o}o!=this.activeProgram&&(this.uniforms=ue(o),this.activeProgram=o)}bind(){t.useProgram(this.activeProgram)}}class p{constructor(i,r){this.uniforms={},this.program=ne(i,r),this.uniforms=ue(this.program)}bind(){t.useProgram(this.program)}}function ne(e,i){let r=t.createProgram();return t.attachShader(r,e),t.attachShader(r,i),t.linkProgram(r),t.getProgramParameter(r,t.LINK_STATUS)||console.trace(t.getProgramInfoLog(r)),r}function ue(e){let i=[],r=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<r;o++){let a=t.getActiveUniform(e,o).name;i[a]=t.getUniformLocation(e,a)}return i}function v(e,i,r){i=xe(i,r);const o=t.createShader(e);return t.shaderSource(o,i),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)||console.trace(t.getShaderInfoLog(o)),o}function xe(e,i){if(i==null)return e;let r="";return i.forEach(o=>{r+="#define "+o+`
`}),r+e}const g=v(t.VERTEX_SHADER,`
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`),Ee=v(t.VERTEX_SHADER,`
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        float offset = 1.33333333;
        vL = vUv - texelSize * offset;
        vR = vUv + texelSize * offset;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`),ye=v(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
        sum += texture2D(uTexture, vL) * 0.35294117;
        sum += texture2D(uTexture, vR) * 0.35294117;
        gl_FragColor = sum;
    }
`),Re=v(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
`),Se=v(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`),De=v(t.FRAGMENT_SHADER,`
    precision mediump float;

    uniform vec4 color;

    void main () {
        gl_FragColor = color;
    }
`),be=v(t.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float aspectRatio;

    #define SCALE 25.0

    void main () {
        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
        float v = mod(uv.x + uv.y, 2.0);
        v = v * 0.1 + 0.8;
        gl_FragColor = vec4(vec3(v), 1.0);
    }
`),Ae=`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uSunrays;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    uniform vec2 texelSize;

    vec3 linearToGamma (vec3 color) {
        color = max(color, vec3(0));
        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
    }

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;

    #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;

        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        c *= diffuse;
    #endif

    #ifdef BLOOM
        vec3 bloom = texture2D(uBloom, vUv).rgb;
    #endif

    #ifdef SUNRAYS
        float sunrays = texture2D(uSunrays, vUv).r;
        c *= sunrays;
    #ifdef BLOOM
        bloom *= sunrays;
    #endif
    #endif

    #ifdef BLOOM
        float noise = texture2D(uDithering, vUv * ditherScale).r;
        noise = noise * 2.0 - 1.0;
        bloom += noise / 255.0;
        bloom = linearToGamma(bloom);
        c += bloom;
    #endif

        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
    }
`,_e=v(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec3 curve;
    uniform float threshold;

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float br = max(c.r, max(c.g, c.b));
        float rq = clamp(br - curve.x, 0.0, curve.y);
        rq = curve.z * rq * rq;
        c *= max(rq, br - threshold) / max(br, 0.0001);
        gl_FragColor = vec4(c, 0.0);
    }
`),we=v(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum;
    }
`),Le=v(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float intensity;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum * intensity;
    }
`),Ue=v(t.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        vec4 c = texture2D(uTexture, vUv);
        float br = max(c.r, max(c.g, c.b));
        c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
        gl_FragColor = c;
    }
`),Fe=v(t.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float weight;

    #define ITERATIONS 16

    void main () {
        float Density = 0.3;
        float Decay = 0.95;
        float Exposure = 0.7;

        vec2 coord = vUv;
        vec2 dir = vUv - 0.5;

        dir *= 1.0 / float(ITERATIONS) * Density;
        float illuminationDecay = 1.0;

        float color = texture2D(uTexture, vUv).a;

        for (int i = 0; i < ITERATIONS; i++)
        {
            coord -= dir;
            float col = texture2D(uTexture, coord).a;
            color += col * illuminationDecay * weight;
            illuminationDecay *= Decay;
        }

        gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
    }
`),Be=v(t.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
`),Oe=v(t.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;

    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;

        vec2 iuv = floor(st);
        vec2 fuv = fract(st);

        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }

    void main () {
    #ifdef MANUAL_FILTERING
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
    #else
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
    #endif
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
    }`,T.supportLinearFiltering?null:["MANUAL_FILTERING"]),Pe=v(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;

        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }

        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`),Ne=v(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
`),Me=v(t.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;

    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;

        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;

        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity += force * dt;
        velocity = min(max(velocity, -1000.0), 1000.0);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`),Ie=v(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`),Ce=v(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`),d=(t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),(e,i=!1)=>{e==null?(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)):(t.viewport(0,0,e.width,e.height),t.bindFramebuffer(t.FRAMEBUFFER,e.fbo)),i&&(t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT)),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)});let h,c,j,$,b,Q,U=[],Y,le,ee=Ge("LDR_LLL1_0.png");const B=new p(Ee,ye),te=new p(g,Re),H=new p(g,Se);new p(g,De);new p(g,be);const P=new p(g,_e),O=new p(g,we),N=new p(g,Le),re=new p(g,Ue),V=new p(g,Fe),D=new p(g,Be),x=new p(g,Oe),q=new p(g,Pe),k=new p(g,Ne),F=new p(g,Me),M=new p(g,Ie),I=new p(g,Ce),A=new Te(g,Ae);function ce(){let e=G(l.SIM_RESOLUTION),i=G(l.DYE_RESOLUTION);const r=T.halfFloatTexType,o=T.formatRGBA,a=T.formatRG,u=T.formatR,n=T.supportLinearFiltering?t.LINEAR:t.NEAREST;t.disable(t.BLEND),h==null?h=W(i.width,i.height,o.internalFormat,o.format,r,n):h=ie(h,i.width,i.height,o.internalFormat,o.format,r,n),c==null?c=W(e.width,e.height,a.internalFormat,a.format,r,n):c=ie(c,e.width,e.height,a.internalFormat,a.format,r,n),j=R(e.width,e.height,u.internalFormat,u.format,r,t.NEAREST),$=R(e.width,e.height,u.internalFormat,u.format,r,t.NEAREST),b=W(e.width,e.height,u.internalFormat,u.format,r,t.NEAREST),Xe(),ze()}function Xe(){let e=G(l.BLOOM_RESOLUTION);const i=T.halfFloatTexType,r=T.formatRGBA,o=T.supportLinearFiltering?t.LINEAR:t.NEAREST;Q=R(e.width,e.height,r.internalFormat,r.format,i,o),U.length=0;for(let a=0;a<l.BLOOM_ITERATIONS;a++){let u=e.width>>a+1,n=e.height>>a+1;if(u<2||n<2)break;let s=R(u,n,r.internalFormat,r.format,i,o);U.push(s)}}function ze(){let e=G(l.SUNRAYS_RESOLUTION);const i=T.halfFloatTexType,r=T.formatR,o=T.supportLinearFiltering?t.LINEAR:t.NEAREST;Y=R(e.width,e.height,r.internalFormat,r.format,i,o),le=R(e.width,e.height,r.internalFormat,r.format,i,o)}function R(e,i,r,o,a,u){t.activeTexture(t.TEXTURE0);let n=t.createTexture();t.bindTexture(t.TEXTURE_2D,n),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,u),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,u),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,r,e,i,0,o,a,null);let s=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,s),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,n,0),t.viewport(0,0,e,i),t.clear(t.COLOR_BUFFER_BIT);let f=1/e,E=1/i;return{texture:n,fbo:s,width:e,height:i,texelSizeX:f,texelSizeY:E,attach(L){return t.activeTexture(t.TEXTURE0+L),t.bindTexture(t.TEXTURE_2D,n),L}}}function W(e,i,r,o,a,u){let n=R(e,i,r,o,a,u),s=R(e,i,r,o,a,u);return{width:e,height:i,texelSizeX:n.texelSizeX,texelSizeY:n.texelSizeY,get read(){return n},set read(f){n=f},get write(){return s},set write(f){s=f},swap(){let f=n;n=s,s=f}}}function Ye(e,i,r,o,a,u,n){let s=R(i,r,o,a,u,n);return te.bind(),t.uniform1i(te.uniforms.uTexture,e.attach(0)),d(s),s}function ie(e,i,r,o,a,u,n){return e.width==i&&e.height==r||(e.read=Ye(e.read,i,r,o,a,u,n),e.write=R(i,r,o,a,u,n),e.width=i,e.height=r,e.texelSizeX=1/i,e.texelSizeY=1/r),e}function Ge(e){let i=t.createTexture();t.bindTexture(t.TEXTURE_2D,i),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),t.texImage2D(t.TEXTURE_2D,0,t.RGB,1,1,0,t.RGB,t.UNSIGNED_BYTE,new Uint8Array([255,255,255]));let r={texture:i,width:1,height:1,attach(a){return t.activeTexture(t.TEXTURE0+a),t.bindTexture(t.TEXTURE_2D,i),a}},o=new Image;return o.onload=()=>{r.width=o.width,r.height=o.height,t.bindTexture(t.TEXTURE_2D,i),t.texImage2D(t.TEXTURE_2D,0,t.RGB,t.RGB,t.UNSIGNED_BYTE,o)},o.src=e,r}function He(){let e=[];l.SHADING&&e.push("SHADING"),l.BLOOM&&e.push("BLOOM"),l.SUNRAYS&&e.push("SUNRAYS"),A.setKeywords(e)}He();ce();let oe=Date.now(),C=0;se();function se(){const e=Ve();fe()&&ce(),qe(e),ke(),l.PAUSED||We(e),Ke(null),requestAnimationFrame(se)}function Ve(){let e=Date.now(),i=(e-oe)/1e3;return i=Math.min(i,.016666),oe=e,i}function fe(){let e=w(m.clientWidth),i=w(m.clientHeight);return m.width!=e||m.height!=i?(m.width=e,m.height=i,!0):!1}function qe(e){C+=e*l.COLOR_UPDATE_SPEED,C>=1&&(C=ut(C,0,1),y.forEach(i=>{i.color=Z()}))}function ke(){K.length>0&&et(K.pop()),y.forEach(e=>{e.moved&&(e.moved=!1,Ze(e))})}function We(e){t.disable(t.BLEND),k.bind(),t.uniform2f(k.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(k.uniforms.uVelocity,c.read.attach(0)),d($),F.bind(),t.uniform2f(F.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(F.uniforms.uVelocity,c.read.attach(0)),t.uniform1i(F.uniforms.uCurl,$.attach(1)),t.uniform1f(F.uniforms.curl,l.CURL),t.uniform1f(F.uniforms.dt,e),d(c.write),c.swap(),q.bind(),t.uniform2f(q.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(q.uniforms.uVelocity,c.read.attach(0)),d(j),H.bind(),t.uniform1i(H.uniforms.uTexture,b.read.attach(0)),t.uniform1f(H.uniforms.value,l.PRESSURE),d(b.write),b.swap(),M.bind(),t.uniform2f(M.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(M.uniforms.uDivergence,j.attach(0));for(let r=0;r<l.PRESSURE_ITERATIONS;r++)t.uniform1i(M.uniforms.uPressure,b.read.attach(1)),d(b.write),b.swap();I.bind(),t.uniform2f(I.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(I.uniforms.uPressure,b.read.attach(0)),t.uniform1i(I.uniforms.uVelocity,c.read.attach(1)),d(c.write),c.swap(),x.bind(),t.uniform2f(x.uniforms.texelSize,c.texelSizeX,c.texelSizeY),T.supportLinearFiltering||t.uniform2f(x.uniforms.dyeTexelSize,c.texelSizeX,c.texelSizeY);let i=c.read.attach(0);t.uniform1i(x.uniforms.uVelocity,i),t.uniform1i(x.uniforms.uSource,i),t.uniform1f(x.uniforms.dt,e),t.uniform1f(x.uniforms.dissipation,l.VELOCITY_DISSIPATION),d(c.write),c.swap(),T.supportLinearFiltering||t.uniform2f(x.uniforms.dyeTexelSize,h.texelSizeX,h.texelSizeY),t.uniform1i(x.uniforms.uVelocity,c.read.attach(0)),t.uniform1i(x.uniforms.uSource,h.read.attach(1)),t.uniform1f(x.uniforms.dissipation,l.DENSITY_DISSIPATION),d(h.write),h.swap()}function Ke(e){l.BLOOM&&$e(h.read,Q),l.SUNRAYS&&(Je(h.read,h.write,Y),Qe(Y,le,1)),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.enable(t.BLEND),je(e)}function je(e){let i=t.drawingBufferWidth,r=t.drawingBufferHeight;if(A.bind(),l.SHADING&&t.uniform2f(A.uniforms.texelSize,1/i,1/r),t.uniform1i(A.uniforms.uTexture,h.read.attach(0)),l.BLOOM){t.uniform1i(A.uniforms.uBloom,Q.attach(1)),t.uniform1i(A.uniforms.uDithering,ee.attach(2));let o=lt(ee,i,r);t.uniform2f(A.uniforms.ditherScale,o.x,o.y)}l.SUNRAYS&&t.uniform1i(A.uniforms.uSunrays,Y.attach(3)),d(e)}function $e(e,i){if(U.length<2)return;let r=i;t.disable(t.BLEND),P.bind();let o=l.BLOOM_THRESHOLD*l.BLOOM_SOFT_KNEE+1e-4,a=l.BLOOM_THRESHOLD-o,u=o*2,n=.25/o;t.uniform3f(P.uniforms.curve,a,u,n),t.uniform1f(P.uniforms.threshold,l.BLOOM_THRESHOLD),t.uniform1i(P.uniforms.uTexture,e.attach(0)),d(r),O.bind();for(let s=0;s<U.length;s++){let f=U[s];t.uniform2f(O.uniforms.texelSize,r.texelSizeX,r.texelSizeY),t.uniform1i(O.uniforms.uTexture,r.attach(0)),d(f),r=f}t.blendFunc(t.ONE,t.ONE),t.enable(t.BLEND);for(let s=U.length-2;s>=0;s--){let f=U[s];t.uniform2f(O.uniforms.texelSize,r.texelSizeX,r.texelSizeY),t.uniform1i(O.uniforms.uTexture,r.attach(0)),t.viewport(0,0,f.width,f.height),d(f),r=f}t.disable(t.BLEND),N.bind(),t.uniform2f(N.uniforms.texelSize,r.texelSizeX,r.texelSizeY),t.uniform1i(N.uniforms.uTexture,r.attach(0)),t.uniform1f(N.uniforms.intensity,l.BLOOM_INTENSITY),d(i)}function Je(e,i,r){t.disable(t.BLEND),re.bind(),t.uniform1i(re.uniforms.uTexture,e.attach(0)),d(i),V.bind(),t.uniform1f(V.uniforms.weight,l.SUNRAYS_WEIGHT),t.uniform1i(V.uniforms.uTexture,i.attach(0)),d(r)}function Qe(e,i,r){B.bind();for(let o=0;o<r;o++)t.uniform2f(B.uniforms.texelSize,e.texelSizeX,0),t.uniform1i(B.uniforms.uTexture,e.attach(0)),d(i),t.uniform2f(B.uniforms.texelSize,0,e.texelSizeY),t.uniform1i(B.uniforms.uTexture,i.attach(0)),d(e)}function Ze(e){let i=e.deltaX*l.SPLAT_FORCE,r=e.deltaY*l.SPLAT_FORCE;de(e.texcoordX,e.texcoordY,i,r,e.color)}function et(e){for(let i=0;i<e;i++){const r=Z();r.r*=10,r.g*=10,r.b*=10;const o=Math.random(),a=Math.random(),u=1e3*(Math.random()-.5),n=1e3*(Math.random()-.5);de(o,a,u,n,r)}}function de(e,i,r,o,a){D.bind(),t.uniform1i(D.uniforms.uTarget,c.read.attach(0)),t.uniform1f(D.uniforms.aspectRatio,m.width/m.height),t.uniform2f(D.uniforms.point,e,i),t.uniform3f(D.uniforms.color,r,o,0),t.uniform1f(D.uniforms.radius,tt(l.SPLAT_RADIUS/100)),d(c.write),c.swap(),t.uniform1i(D.uniforms.uTarget,h.read.attach(0)),t.uniform3f(D.uniforms.color,a.r,a.g,a.b),d(h.write),h.swap()}function tt(e){let i=m.width/m.height;return i>1&&(e*=i),e}window.addEventListener("mousemove",e=>{console.log("hey");let i=w(e.offsetX),r=w(e.offsetY),o=y.find(a=>a.id===-1);o||(o=new J,y.push(o)),ve(o,i,r)});window.addEventListener("touchstart",e=>{e.preventDefault();const i=e.targetTouches;for(;i.length>=y.length;)y.push(new J);for(let r=0;r<i.length;r++){let o=w(i[r].pageX),a=w(i[r].pageY);rt(y[r+1],i[r].identifier,o,a)}});window.addEventListener("touchmove",e=>{e.preventDefault();const i=e.targetTouches;for(let r=0;r<i.length;r++){let o=y[r+1];if(!o.down)continue;let a=w(i[r].pageX),u=w(i[r].pageY);ve(o,a,u)}},!1);window.addEventListener("touchend",e=>{const i=e.changedTouches;for(let r=0;r<i.length;r++){let o=y.find(a=>a.id==i[r].identifier);o!=null&&it(o)}});window.addEventListener("keydown",e=>{e.code==="KeyP"&&(l.PAUSED=!l.PAUSED),e.key===" "&&K.push(parseInt(Math.random()*20)+5)});function rt(e,i,r,o){e.id=i,e.down=!0,e.moved=!1,e.texcoordX=r/m.width,e.texcoordY=1-o/m.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=Z()}function ve(e,i,r){e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=i/m.width,e.texcoordY=1-r/m.height,e.deltaX=ot(e.texcoordX-e.prevTexcoordX),e.deltaY=at(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0}function it(e){e.down=!1}function ot(e){let i=m.width/m.height;return i<1&&(e*=i),e}function at(e){let i=m.width/m.height;return i>1&&(e/=i),e}function Z(){let e=nt(Math.random(),1,1);return e.r*=.15,e.g*=.15,e.b*=.15,e}function nt(e,i,r){let o,a,u,n,s,f,E,L;switch(n=Math.floor(e*6),s=e*6-n,f=r*(1-i),E=r*(1-s*i),L=r*(1-(1-s)*i),n%6){case 0:o=r,a=L,u=f;break;case 1:o=E,a=r,u=f;break;case 2:o=f,a=r,u=L;break;case 3:o=f,a=E,u=r;break;case 4:o=L,a=f,u=r;break;case 5:o=r,a=f,u=E;break}return{r:o,g:a,b:u}}function ut(e,i,r){let o=r-i;return(e-i)%o+i}function G(e){let i=t.drawingBufferWidth/t.drawingBufferHeight;i<1&&(i=1/i);let r=Math.round(e),o=Math.round(e*i);return t.drawingBufferWidth>t.drawingBufferHeight?{width:o,height:r}:{width:r,height:o}}function lt(e,i,r){return{x:i/e.width,y:r/e.height}}function w(e){let i=window.devicePixelRatio||1;return Math.floor(e*i)}function ct(e){if(e.length==0)return 0;let i=0;for(let r=0;r<e.length;r++)i=(i<<5)-i+e.charCodeAt(r),i|=0;return i}new Swiper(".mySwiper",{slidesPerView:1.2,spaceBetween:10,loop:!0,freeMode:!0,centeredSlides:!1,freeModeMomentum:!0,freeModeMomentumRatio:.5,freeModeMomentumBounce:!1,speed:600});gsap.registerPlugin(TextPlugin);const ae=["creativity? ","design innovation?","circular design?","storytelling?","brand loyalty?","human-centered design?","creative disruption?","emotional design?","design thinking?","design ethics?","design for social impact?","beauty in functional design?","AI as a creative partner?","emotion in brand design?"],st=document.querySelector(".thirdh");let X=0;function me(){gsap.to(st,{duration:1.5,text:ae[X],ease:"none",onComplete:()=>{setTimeout(()=>{X=X===ae.length-1?0:X+1,me()},2e3)}})}function ft(){document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll("#title-hero h1").forEach(function(i){let r="";i.textContent.split("").forEach(function(o){o===" "?r+="<span>&nbsp;</span>":r+=`<span>${o}</span>`}),i.innerHTML=r});var e=gsap.timeline();e.to("#curtain1",{clipPath:" polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",duration:.8,delay:.4,ease:"power2.in"},"a").to("#curtain2",{clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",duration:.8,delay:.3,ease:"power2.in"},"a").to(".firsth span",{y:"-100%",stagger:{amount:.2},duration:.6,delay:.8,onComplete:function(){gsap.set(".firsth span",{y:"100%"})}},"a").to(".secondh span",{y:"-100%",stagger:{amount:.2},duration:.6,delay:.8},"a").to("#curtain2",{clipPath:" polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",duration:.8,ease:"power2.in"},"b").to(".secondh span",{y:"-200%",stagger:{amount:.2},duration:.6,delay:.2,onComplete:function(){gsap.set(".secondh span",{y:"0%"})}},"b").to(".thirdh span",{y:"-100%",stagger:{amount:.2},duration:.6,delay:.2},"b").to("#page1 h1",{duration:1,color:"var(--secondary)"},"c").to("#page1 h1 span",{duration:1,color:"var(--secondary)"},"c").to(".toph",{left:"50%",transform:"translate(-50%,0%)",duration:1},"c").to("#title-hero",{left:"50%",transform:"translate(-50%,0%)",duration:.9},"c").to("#navbar",{top:"0%",duration:.6,opacity:1},"c").to("#page1-over",{duration:.6,opacity:1,top:"50%",left:"50%",transform:"translate(-50%,-50%)",onComplete:()=>{gsap.set(".thirdh",{top:0}),me()}})})}ft();const S=document.querySelector("#cursor");window.addEventListener("mousemove",function(e){gsap.to(S,{top:e.clientY,left:e.clientX}),gsap.to("#small-cursor",{top:e.clientY,left:e.clientX,duration:0}),gsap.to("#playCur",{top:e.clientY,left:e.clientX,transform:"translate(-50%,-50%)",duration:0})});document.querySelectorAll(".cursor-scale").forEach(function(e){e.addEventListener("mouseenter",function(i){gsap.to(S,{width:"2.5vw",height:"2.5vw"})})});document.querySelectorAll(".cursor-scale").forEach(function(e){e.addEventListener("mouseleave",function(i){gsap.to(S,{width:"1.2vw",height:"1.2vw"})})});document.querySelector("#page6").addEventListener("mouseenter",function(e){gsap.to(S,{width:"4vw",height:"4vw",backgroundColor:"white"}),S.innerHTML="Drag"});document.querySelector("#page6").addEventListener("mouseleave",function(e){gsap.to(S,{width:"1.5vw",height:"1.5vw",backgroundColor:"transparent"}),S.innerHTML=""});var z=!0;document.querySelectorAll("#page6 .video-container video").forEach(function(e){e.addEventListener("mouseenter",function(i){gsap.to("#playCur",{opacity:1,duration:.2}),S.innerHTML="",z?(document.querySelector("#playCur").classList.add("ri-play-fill"),document.querySelector("#playCur").classList.remove("ri-pause-fill")):(document.querySelector("#playCur").classList.add("ri-pause-fill"),document.querySelector("#playCur").classList.remove("ri-play-fill"))})});document.querySelectorAll("#page6 .video-container video").forEach(function(e){e.addEventListener("mouseleave",function(i){gsap.to("#playCur",{opacity:0,duration:.2}),S.innerHTML="Drag"})});document.querySelectorAll("#page6 .video-container video").forEach(function(e){e.addEventListener("click",function(i){z?(e.muted=!1,z=!1):(e.muted=!0,z=!0)})});function dt(){var e="";document.querySelector("#page2-text").textContent.split(" ").forEach(o=>{e+=`<span> ${o}</span>`}),document.querySelector("#page2-text").innerHTML=e;var i=gsap.timeline({scrollTrigger:{trigger:"#page2",scroller:"body",start:"top 10%",end:"top 0%",scrub:1}});i.to("#circle2",{opacity:1,duration:.8},"a").to("#navbar",{opacity:0,pointerEvent:"none",duration:.2},"a").to("#navbar-black",{opacity:1,pointerEvent:"all",duration:.2},"a");var r=gsap.timeline({scrollTrigger:{trigger:"#page2",scroller:"body",start:"top 0%",end:"top -140%",scrub:1,pin:!0,anticipatePin:1}});r.to(document.querySelectorAll("#page2-text span"),{opacity:1,stagger:.2},"a").to("#circle2",{width:"1.5vw",height:"1.5vw",duration:8,autoRound:!1},"a").to("#navbar-black",{opacity:0,pointerEvent:"none",duration:.2},"b").to("#navbar",{opacity:1,pointerEvent:"all",duration:.2},"b")}dt();function vt(){const e=document.querySelector("#page3"),i=document.querySelector("#h1height"),r=document.querySelector("#h1height2");let o=i.getBoundingClientRect().top-e.getBoundingClientRect().top+i.offsetHeight/2,a=r.getBoundingClientRect().top-i.getBoundingClientRect().top-.2;var u=gsap.timeline({scrollTrigger:{trigger:"#page3",scroller:"body",start:"top 100%",end:"top 5%",scrub:1}});u.to("#circle2",{top:o,transform:"translate(-50%,-50%) scale(1)",duration:3});var n=gsap.timeline({scrollTrigger:{trigger:"#page3",scroller:"body",start:"top top",end:"+=3000",scrub:!0,pin:!0}});n.to("#right-content > h2",{x:300,filter:"blur(4px)",opacity:0,duration:.8,stagger:{amount:.2},delay:.2}).to("#right-content-top > h2",{transform:"translateX(0%)",opacity:1,duration:.8,stagger:{amount:.2}},"bk").to("#ser2,#ser3,#ser4,#ser5,#ser6",{filter:"blur(4px)",opacity:.4,duration:.5},"a").to("#para1",{opacity:.5,duration:.4},"a").to("#circle2",{top:o+a*1,transform:"translate(-50%,-50%) scale(1)",duration:.8,delay:1},"b").to("#ser1,#ser3,#ser4,#ser5,#ser6",{filter:"blur(4px)",opacity:.4,duration:.5,delay:1},"b").to("#ser2",{filter:"blur(0px)",opacity:1,duration:.5,delay:1},"b").to("#para1",{opacity:0,duration:.4,delay:1},"b").to("#para2",{opacity:.5,duration:.4,delay:1.4},"b").to("#circle2",{top:o+a*2,transform:"translate(-50%,-50%) scale(1)",duration:.8,delay:1},"c").to("#ser1,#ser2,#ser4,#ser5,#ser6",{filter:"blur(4px)",opacity:.4,duration:.5,delay:1},"c").to("#ser3",{filter:"blur(0px)",opacity:1,duration:.5,delay:1},"c").to("#para2",{opacity:0,duration:.4,delay:1},"c").to("#para3",{opacity:.5,duration:.4,delay:1.4},"c").to("#circle2",{top:o+a*3,transform:"translate(-50%,-50%) scale(1)",duration:.8,delay:1},"d").to("#ser1,#ser2,#ser3,#ser5,#ser6",{filter:"blur(4px)",opacity:.4,duration:.5,delay:1},"d").to("#ser4",{filter:"blur(0px)",opacity:1,duration:.5,delay:1},"d").to("#para3",{opacity:0,duration:.4,delay:1},"d").to("#para4",{opacity:.5,duration:.4,delay:1.4},"d")}vt();function mt(){var e=gsap.timeline({scrollTrigger:{trigger:"#page4",scroller:"body",start:"top 100%%",end:"top 63%",scrub:!0}});e.to("#circle2",{top:"50%",transform:"translate(-50%,-50%) scale(1)",duration:2.3},"oc").to("#ser1,#ser2,#ser3,#ser4,#ser5,#ser6",{filter:"blur(0px)",opacity:1,duration:.8},"oc").to("#para6",{opacity:0,duration:.8},"oc").to("#circle2",{top:"50%",width:"0.65vw",height:"0.65vw",backgroundColor:"transparent",duration:.6});const r=document.querySelector("#project-wrapper").scrollWidth-window.innerWidth;var o=gsap.timeline({scrollTrigger:{trigger:"#page4",scroller:"body",start:"top top",end:"top -180%",scrub:1,pin:!0}});o.to("#project-wrapper",{transform:`translateX(-${r}px)`,duration:1.5,ease:"linear"},"sl").to("#circle2",{left:"-670%",duration:1},"sl").to(".view-all .cirr",{opacity:1,duration:0},"c").to(".view-all .cirr",{width:"2.5vw",height:"2.5vw",backgroundColor:"var(--secondary)",duration:.2},"s").to(".view-all .cirr i",{opacity:1,duration:.1,delay:.1},"s").to("#circle2",{left:"50%",width:"2.5vw",height:"2.5vw",backgroundColor:"var(--secondary)",duration:.5}).to(".view-all",{opacity:0,duration:.2}).to(".view-all",{display:"none",delay:.09})}mt();function pt(){gsap.timeline({scrollTrigger:{trigger:"#page5",scroller:"body",start:"top 15%",end:"top 0%",scrub:1}}).to("#navbar",{opacity:0,pointerEvent:"none",duration:.2},"a").to("#navbar-black",{opacity:1,pointerEvent:"all",duration:.2},"a"),gsap.timeline({scrollTrigger:{trigger:"#page5",scroller:"body",start:"top 0%",end:"top -400%",scrub:1,pin:!0}}).to("#page5",{opacity:1,duration:.1},"c").to("#page5",{maskSize:"200%",duration:4,delay:-.2}).to("#video-container",{clipPath:" polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:1}).to("#video-container",{transform:"translate(-50%,-50%) scale(.6) rotateY(-20deg) rotateX(-2deg)",duration:1.5}).to("#video-container",{transform:"translate(-50%,-50%) scale(.5) rotateY(-20deg) rotateY(20deg)   rotateX(-2deg) rotateX(2deg)",duration:1.5}).to("#img-over",{top:"-300%",duration:4}).to("#video-container",{transform:"translate(-50%,-50%) scale(.6) rotateY(-20deg) rotateX(-2deg)",duration:1.5}).to("#video-container",{transform:"translate(-50%,-50%)",duration:1.5})}pt();function gt(){gsap.timeline({scrollTrigger:{trigger:"#page6",scroller:"body",start:"top 0%",end:"top -5%",scrub:1}}).to("#navbar-black",{opacity:0,pointerEvent:"none",duration:.2},"a").to("#navbar",{opacity:1,pointerEvent:"all",duration:.2},"a")}gt();function ht(){gsap.timeline({scrollTrigger:{trigger:"#footer",scroller:"body",start:"top 15%",end:"top 0%",scrub:1}}).to("#navbar",{opacity:0,pointerEvent:"none",duration:.2},"a").to("#navbar-black",{opacity:1,duration:.2,pointerEvent:"all"},"a")}ht();
//# sourceMappingURL=index-Cx5n5Pxa.js.map
