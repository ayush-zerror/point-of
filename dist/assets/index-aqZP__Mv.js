import"./modulepreload-polyfill-B5Qt9EMX.js";import"./commonScript-CIR72vPk.js";const d=document.getElementsByTagName("canvas")[0];de();let l={SIM_RESOLUTION:128,DYE_RESOLUTION:1024,DENSITY_DISSIPATION:3,VELOCITY_DISSIPATION:.25,PRESSURE:.3,PRESSURE_ITERATIONS:20,CURL:20,SPLAT_RADIUS:.8,SPLAT_FORCE:2500,SHADING:!0,COLOR_UPDATE_SPEED:8,PAUSED:!1,BLOOM:!0,BLOOM_ITERATIONS:6,BLOOM_RESOLUTION:256,BLOOM_INTENSITY:.3,BLOOM_THRESHOLD:.8,BLOOM_SOFT_KNEE:.6,SUNRAYS:!0,SUNRAYS_RESOLUTION:196,SUNRAYS_WEIGHT:.3};function J(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color=[30,0,300]}let R=[],K=[];R.push(new J);const{gl:t,ext:T}=ge(d);Te()&&(l.DYE_RESOLUTION=512);T.supportLinearFiltering||(l.DYE_RESOLUTION=512,l.SHADING=!1,l.BLOOM=!1,l.SUNRAYS=!1);function ge(e){const i={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1};let r=e.getContext("webgl2",i);const o=!!r;o||(r=e.getContext("webgl",i)||e.getContext("experimental-webgl",i));let a,n;o?(r.getExtension("EXT_color_buffer_float"),n=r.getExtension("OES_texture_float_linear")):(a=r.getExtension("OES_texture_half_float"),n=r.getExtension("OES_texture_half_float_linear")),r.clearColor(0,0,0,1);const u=o?r.HALF_FLOAT:a.HALF_FLOAT_OES;let s,f,E;return o?(s=_(r,r.RGBA16F,r.RGBA,u),f=_(r,r.RG16F,r.RG,u),E=_(r,r.R16F,r.RED,u)):(s=_(r,r.RGBA,r.RGBA,u),f=_(r,r.RGBA,r.RGBA,u),E=_(r,r.RGBA,r.RGBA,u)),ga("send","event",o?"webgl2":"webgl",s==null?"not supported":"supported"),{gl:r,ext:{formatRGBA:s,formatRG:f,formatR:E,halfFloatTexType:u,supportLinearFiltering:n}}}function _(e,i,r,o){if(!he(e,i,r,o))switch(i){case e.R16F:return _(e,e.RG16F,e.RG,o);case e.RG16F:return _(e,e.RGBA16F,e.RGBA,o);default:return null}return{internalFormat:i,format:r}}function he(e,i,r,o){let a=e.createTexture();e.bindTexture(e.TEXTURE_2D,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,i,4,4,0,r,o,null);let n=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a,0),e.checkFramebufferStatus(e.FRAMEBUFFER)==e.FRAMEBUFFER_COMPLETE}function Te(){return/Mobi|Android/i.test(navigator.userAgent)}class xe{constructor(i,r){this.vertexShader=i,this.fragmentShaderSource=r,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(i){let r=0;for(let a=0;a<i.length;a++)r+=st(i[a]);let o=this.programs[r];if(o==null){let a=m(t.FRAGMENT_SHADER,this.fragmentShaderSource,i);o=ue(this.vertexShader,a),this.programs[r]=o}o!=this.activeProgram&&(this.uniforms=le(o),this.activeProgram=o)}bind(){t.useProgram(this.activeProgram)}}class p{constructor(i,r){this.uniforms={},this.program=ue(i,r),this.uniforms=le(this.program)}bind(){t.useProgram(this.program)}}function ue(e,i){let r=t.createProgram();return t.attachShader(r,e),t.attachShader(r,i),t.linkProgram(r),t.getProgramParameter(r,t.LINK_STATUS)||console.trace(t.getProgramInfoLog(r)),r}function le(e){let i=[],r=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<r;o++){let a=t.getActiveUniform(e,o).name;i[a]=t.getUniformLocation(e,a)}return i}function m(e,i,r){i=Ee(i,r);const o=t.createShader(e);return t.shaderSource(o,i),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)||console.trace(t.getShaderInfoLog(o)),o}function Ee(e,i){if(i==null)return e;let r="";return i.forEach(o=>{r+="#define "+o+`
`}),r+e}const g=m(t.VERTEX_SHADER,`
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
`),Re=m(t.VERTEX_SHADER,`
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
`),ye=m(t.FRAGMENT_SHADER,`
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
`),Se=m(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
`),De=m(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`),be=m(t.FRAGMENT_SHADER,`
    precision mediump float;

    uniform vec4 color;

    void main () {
        gl_FragColor = color;
    }
`),Ae=m(t.FRAGMENT_SHADER,`
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
`),_e=`
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
`,Le=m(t.FRAGMENT_SHADER,`
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
`),we=m(t.FRAGMENT_SHADER,`
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
`),Ue=m(t.FRAGMENT_SHADER,`
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
`),Fe=m(t.FRAGMENT_SHADER,`
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
`),Be=m(t.FRAGMENT_SHADER,`
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
`),Oe=m(t.FRAGMENT_SHADER,`
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
`),Pe=m(t.FRAGMENT_SHADER,`
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
    }`,T.supportLinearFiltering?null:["MANUAL_FILTERING"]),Ne=m(t.FRAGMENT_SHADER,`
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
`),Me=m(t.FRAGMENT_SHADER,`
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
`),Ie=m(t.FRAGMENT_SHADER,`
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
`),Ce=m(t.FRAGMENT_SHADER,`
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
`),Xe=m(t.FRAGMENT_SHADER,`
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
`),v=(t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),(e,i=!1)=>{e==null?(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)):(t.viewport(0,0,e.width,e.height),t.bindFramebuffer(t.FRAMEBUFFER,e.fbo)),i&&(t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT)),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)});let h,c,j,$,b,Q,U=[],Y,ce,te=He("LDR_LLL1_0.png");const B=new p(Re,ye),re=new p(g,Se),H=new p(g,De);new p(g,be);new p(g,Ae);const P=new p(g,Le),O=new p(g,we),N=new p(g,Ue),ie=new p(g,Fe),V=new p(g,Be),D=new p(g,Oe),x=new p(g,Pe),k=new p(g,Ne),q=new p(g,Me),F=new p(g,Ie),M=new p(g,Ce),I=new p(g,Xe),A=new xe(g,_e);function se(){let e=G(l.SIM_RESOLUTION),i=G(l.DYE_RESOLUTION);const r=T.halfFloatTexType,o=T.formatRGBA,a=T.formatRG,n=T.formatR,u=T.supportLinearFiltering?t.LINEAR:t.NEAREST;t.disable(t.BLEND),h==null?h=W(i.width,i.height,o.internalFormat,o.format,r,u):h=oe(h,i.width,i.height,o.internalFormat,o.format,r,u),c==null?c=W(e.width,e.height,a.internalFormat,a.format,r,u):c=oe(c,e.width,e.height,a.internalFormat,a.format,r,u),j=y(e.width,e.height,n.internalFormat,n.format,r,t.NEAREST),$=y(e.width,e.height,n.internalFormat,n.format,r,t.NEAREST),b=W(e.width,e.height,n.internalFormat,n.format,r,t.NEAREST),ze(),Ye()}function ze(){let e=G(l.BLOOM_RESOLUTION);const i=T.halfFloatTexType,r=T.formatRGBA,o=T.supportLinearFiltering?t.LINEAR:t.NEAREST;Q=y(e.width,e.height,r.internalFormat,r.format,i,o),U.length=0;for(let a=0;a<l.BLOOM_ITERATIONS;a++){let n=e.width>>a+1,u=e.height>>a+1;if(n<2||u<2)break;let s=y(n,u,r.internalFormat,r.format,i,o);U.push(s)}}function Ye(){let e=G(l.SUNRAYS_RESOLUTION);const i=T.halfFloatTexType,r=T.formatR,o=T.supportLinearFiltering?t.LINEAR:t.NEAREST;Y=y(e.width,e.height,r.internalFormat,r.format,i,o),ce=y(e.width,e.height,r.internalFormat,r.format,i,o)}function y(e,i,r,o,a,n){t.activeTexture(t.TEXTURE0);let u=t.createTexture();t.bindTexture(t.TEXTURE_2D,u),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,n),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,n),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,r,e,i,0,o,a,null);let s=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,s),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,u,0),t.viewport(0,0,e,i),t.clear(t.COLOR_BUFFER_BIT);let f=1/e,E=1/i;return{texture:u,fbo:s,width:e,height:i,texelSizeX:f,texelSizeY:E,attach(w){return t.activeTexture(t.TEXTURE0+w),t.bindTexture(t.TEXTURE_2D,u),w}}}function W(e,i,r,o,a,n){let u=y(e,i,r,o,a,n),s=y(e,i,r,o,a,n);return{width:e,height:i,texelSizeX:u.texelSizeX,texelSizeY:u.texelSizeY,get read(){return u},set read(f){u=f},get write(){return s},set write(f){s=f},swap(){let f=u;u=s,s=f}}}function Ge(e,i,r,o,a,n,u){let s=y(i,r,o,a,n,u);return re.bind(),t.uniform1i(re.uniforms.uTexture,e.attach(0)),v(s),s}function oe(e,i,r,o,a,n,u){return e.width==i&&e.height==r||(e.read=Ge(e.read,i,r,o,a,n,u),e.write=y(i,r,o,a,n,u),e.width=i,e.height=r,e.texelSizeX=1/i,e.texelSizeY=1/r),e}function He(e){let i=t.createTexture();t.bindTexture(t.TEXTURE_2D,i),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),t.texImage2D(t.TEXTURE_2D,0,t.RGB,1,1,0,t.RGB,t.UNSIGNED_BYTE,new Uint8Array([255,255,255]));let r={texture:i,width:1,height:1,attach(a){return t.activeTexture(t.TEXTURE0+a),t.bindTexture(t.TEXTURE_2D,i),a}},o=new Image;return o.onload=()=>{r.width=o.width,r.height=o.height,t.bindTexture(t.TEXTURE_2D,i),t.texImage2D(t.TEXTURE_2D,0,t.RGB,t.RGB,t.UNSIGNED_BYTE,o)},o.src=e,r}function Ve(){let e=[];l.SHADING&&e.push("SHADING"),l.BLOOM&&e.push("BLOOM"),l.SUNRAYS&&e.push("SUNRAYS"),A.setKeywords(e)}Ve();se();let ae=Date.now(),C=0;fe();function fe(){const e=ke();de()&&se(),qe(e),We(),l.PAUSED||Ke(e),je(null),requestAnimationFrame(fe)}function ke(){let e=Date.now(),i=(e-ae)/1e3;return i=Math.min(i,.016666),ae=e,i}function de(){let e=L(d.clientWidth),i=L(d.clientHeight);return d.width!=e||d.height!=i?(d.width=e,d.height=i,!0):!1}function qe(e){C+=e*l.COLOR_UPDATE_SPEED,C>=1&&(C=lt(C,0,1),R.forEach(i=>{i.color=Z()}))}function We(){K.length>0&&tt(K.pop()),R.forEach(e=>{e.moved&&(e.moved=!1,et(e))})}function Ke(e){t.disable(t.BLEND),q.bind(),t.uniform2f(q.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(q.uniforms.uVelocity,c.read.attach(0)),v($),F.bind(),t.uniform2f(F.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(F.uniforms.uVelocity,c.read.attach(0)),t.uniform1i(F.uniforms.uCurl,$.attach(1)),t.uniform1f(F.uniforms.curl,l.CURL),t.uniform1f(F.uniforms.dt,e),v(c.write),c.swap(),k.bind(),t.uniform2f(k.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(k.uniforms.uVelocity,c.read.attach(0)),v(j),H.bind(),t.uniform1i(H.uniforms.uTexture,b.read.attach(0)),t.uniform1f(H.uniforms.value,l.PRESSURE),v(b.write),b.swap(),M.bind(),t.uniform2f(M.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(M.uniforms.uDivergence,j.attach(0));for(let r=0;r<l.PRESSURE_ITERATIONS;r++)t.uniform1i(M.uniforms.uPressure,b.read.attach(1)),v(b.write),b.swap();I.bind(),t.uniform2f(I.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(I.uniforms.uPressure,b.read.attach(0)),t.uniform1i(I.uniforms.uVelocity,c.read.attach(1)),v(c.write),c.swap(),x.bind(),t.uniform2f(x.uniforms.texelSize,c.texelSizeX,c.texelSizeY),T.supportLinearFiltering||t.uniform2f(x.uniforms.dyeTexelSize,c.texelSizeX,c.texelSizeY);let i=c.read.attach(0);t.uniform1i(x.uniforms.uVelocity,i),t.uniform1i(x.uniforms.uSource,i),t.uniform1f(x.uniforms.dt,e),t.uniform1f(x.uniforms.dissipation,l.VELOCITY_DISSIPATION),v(c.write),c.swap(),T.supportLinearFiltering||t.uniform2f(x.uniforms.dyeTexelSize,h.texelSizeX,h.texelSizeY),t.uniform1i(x.uniforms.uVelocity,c.read.attach(0)),t.uniform1i(x.uniforms.uSource,h.read.attach(1)),t.uniform1f(x.uniforms.dissipation,l.DENSITY_DISSIPATION),v(h.write),h.swap()}function je(e){l.BLOOM&&Je(h.read,Q),l.SUNRAYS&&(Qe(h.read,h.write,Y),Ze(Y,ce,1)),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.enable(t.BLEND),$e(e)}function $e(e){let i=t.drawingBufferWidth,r=t.drawingBufferHeight;if(A.bind(),l.SHADING&&t.uniform2f(A.uniforms.texelSize,1/i,1/r),t.uniform1i(A.uniforms.uTexture,h.read.attach(0)),l.BLOOM){t.uniform1i(A.uniforms.uBloom,Q.attach(1)),t.uniform1i(A.uniforms.uDithering,te.attach(2));let o=ct(te,i,r);t.uniform2f(A.uniforms.ditherScale,o.x,o.y)}l.SUNRAYS&&t.uniform1i(A.uniforms.uSunrays,Y.attach(3)),v(e)}function Je(e,i){if(U.length<2)return;let r=i;t.disable(t.BLEND),P.bind();let o=l.BLOOM_THRESHOLD*l.BLOOM_SOFT_KNEE+1e-4,a=l.BLOOM_THRESHOLD-o,n=o*2,u=.25/o;t.uniform3f(P.uniforms.curve,a,n,u),t.uniform1f(P.uniforms.threshold,l.BLOOM_THRESHOLD),t.uniform1i(P.uniforms.uTexture,e.attach(0)),v(r),O.bind();for(let s=0;s<U.length;s++){let f=U[s];t.uniform2f(O.uniforms.texelSize,r.texelSizeX,r.texelSizeY),t.uniform1i(O.uniforms.uTexture,r.attach(0)),v(f),r=f}t.blendFunc(t.ONE,t.ONE),t.enable(t.BLEND);for(let s=U.length-2;s>=0;s--){let f=U[s];t.uniform2f(O.uniforms.texelSize,r.texelSizeX,r.texelSizeY),t.uniform1i(O.uniforms.uTexture,r.attach(0)),t.viewport(0,0,f.width,f.height),v(f),r=f}t.disable(t.BLEND),N.bind(),t.uniform2f(N.uniforms.texelSize,r.texelSizeX,r.texelSizeY),t.uniform1i(N.uniforms.uTexture,r.attach(0)),t.uniform1f(N.uniforms.intensity,l.BLOOM_INTENSITY),v(i)}function Qe(e,i,r){t.disable(t.BLEND),ie.bind(),t.uniform1i(ie.uniforms.uTexture,e.attach(0)),v(i),V.bind(),t.uniform1f(V.uniforms.weight,l.SUNRAYS_WEIGHT),t.uniform1i(V.uniforms.uTexture,i.attach(0)),v(r)}function Ze(e,i,r){B.bind();for(let o=0;o<r;o++)t.uniform2f(B.uniforms.texelSize,e.texelSizeX,0),t.uniform1i(B.uniforms.uTexture,e.attach(0)),v(i),t.uniform2f(B.uniforms.texelSize,0,e.texelSizeY),t.uniform1i(B.uniforms.uTexture,i.attach(0)),v(e)}function et(e){let i=e.deltaX*l.SPLAT_FORCE,r=e.deltaY*l.SPLAT_FORCE;ve(e.texcoordX,e.texcoordY,i,r,e.color)}function tt(e){for(let i=0;i<e;i++){const r=Z();r.r*=10,r.g*=10,r.b*=10;const o=Math.random(),a=Math.random(),n=1e3*(Math.random()-.5),u=1e3*(Math.random()-.5);ve(o,a,n,u,r)}}function ve(e,i,r,o,a){D.bind(),t.uniform1i(D.uniforms.uTarget,c.read.attach(0)),t.uniform1f(D.uniforms.aspectRatio,d.width/d.height),t.uniform2f(D.uniforms.point,e,i),t.uniform3f(D.uniforms.color,r,o,0),t.uniform1f(D.uniforms.radius,rt(l.SPLAT_RADIUS/100)),v(c.write),c.swap(),t.uniform1i(D.uniforms.uTarget,h.read.attach(0)),t.uniform3f(D.uniforms.color,a.r,a.g,a.b),v(h.write),h.swap()}function rt(e){let i=d.width/d.height;return i>1&&(e*=i),e}document.addEventListener("mousemove",e=>{const i=d.getBoundingClientRect(),r=L(e.clientX-i.left),o=L(e.clientY-i.top);let a=R.find(n=>n.id===-1);a||(a=new J,R.push(a)),me(a,r,o)});document.addEventListener("touchstart",e=>{e.preventDefault();const i=e.targetTouches,r=d.getBoundingClientRect();for(;i.length>=R.length;)R.push(new J);for(let o=0;o<i.length;o++){let a=L(i[o].clientX-r.left),n=L(i[o].clientY-r.top);it(R[o+1],i[o].identifier,a,n)}},{passive:!1});document.addEventListener("touchmove",e=>{e.preventDefault();const i=e.targetTouches,r=d.getBoundingClientRect();for(let o=0;o<i.length;o++){let a=R[o+1];if(!a.down)continue;let n=L(i[o].clientX-r.left),u=L(i[o].clientY-r.top);me(a,n,u)}},{passive:!1});window.addEventListener("touchend",e=>{const i=e.changedTouches;for(let r=0;r<i.length;r++){let o=R.find(a=>a.id==i[r].identifier);o!=null&&ot(o)}});window.addEventListener("keydown",e=>{e.code==="KeyP"&&(l.PAUSED=!l.PAUSED),e.key===" "&&K.push(parseInt(Math.random()*20)+5)});function it(e,i,r,o){e.id=i,e.down=!0,e.moved=!1,e.texcoordX=r/d.width,e.texcoordY=1-o/d.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=Z()}function me(e,i,r){e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=i/d.width,e.texcoordY=1-r/d.height,e.deltaX=at(e.texcoordX-e.prevTexcoordX),e.deltaY=nt(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0}function ot(e){e.down=!1}function at(e){let i=d.width/d.height;return i<1&&(e*=i),e}function nt(e){let i=d.width/d.height;return i>1&&(e/=i),e}function Z(){let e=ut(Math.random(),1,1);return e.r*=.15,e.g*=.15,e.b*=.15,e}function ut(e,i,r){let o,a,n,u,s,f,E,w;switch(u=Math.floor(e*6),s=e*6-u,f=r*(1-i),E=r*(1-s*i),w=r*(1-(1-s)*i),u%6){case 0:o=r,a=w,n=f;break;case 1:o=E,a=r,n=f;break;case 2:o=f,a=r,n=w;break;case 3:o=f,a=E,n=r;break;case 4:o=w,a=f,n=r;break;case 5:o=r,a=f,n=E;break}return{r:o,g:a,b:n}}function lt(e,i,r){let o=r-i;return(e-i)%o+i}function G(e){let i=t.drawingBufferWidth/t.drawingBufferHeight;i<1&&(i=1/i);let r=Math.round(e),o=Math.round(e*i);return t.drawingBufferWidth>t.drawingBufferHeight?{width:o,height:r}:{width:r,height:o}}function ct(e,i,r){return{x:i/e.width,y:r/e.height}}function L(e){let i=window.devicePixelRatio||1;return Math.floor(e*i)}function st(e){if(e.length==0)return 0;let i=0;for(let r=0;r<e.length;r++)i=(i<<5)-i+e.charCodeAt(r),i|=0;return i}new Swiper(".mySwiper",{slidesPerView:1.2,spaceBetween:10,loop:!0,freeMode:!0,centeredSlides:!1,freeModeMomentum:!0,freeModeMomentumRatio:.5,freeModeMomentumBounce:!1,speed:600});gsap.registerPlugin(TextPlugin);const ne=["creativity? ","design innovation?","circular design?","storytelling?","brand loyalty?","human-centered design?","creative disruption?","emotional design?","design thinking?","design ethics?","design for social impact?","beauty in functional design?","AI as a creative partner?","emotion in brand design?"],ee=document.querySelector(".thirdh");let X=0;function ft(e,i){let r=gsap.timeline({onComplete:i});for(let o=0;o<=e.length;o++)r.to(ee,{text:e.substring(0,o),duration:.05,ease:"none"});return r}function dt(e,i){let r=gsap.timeline({onComplete:i});for(let o=e.length;o>=0;o--)r.to(ee,{text:e.substring(0,o),duration:.03,ease:"none"});return r}function pe(){const e=ee.textContent,i=ne[X];dt(e,()=>{ft(i,()=>{setTimeout(()=>{X=X===ne.length-1?0:X+1,pe()},2e3)})})}pe();const S=document.querySelector("#cursor");window.addEventListener("mousemove",function(e){gsap.to(S,{top:e.clientY,left:e.clientX}),gsap.to("#small-cursor",{top:e.clientY,left:e.clientX,duration:0}),gsap.to("#playCur",{top:e.clientY,left:e.clientX,transform:"translate(-50%,-50%)",duration:0})});document.querySelectorAll(".cursor-scale").forEach(function(e){e.addEventListener("mouseenter",function(i){gsap.to(S,{width:"2.5vw",height:"2.5vw"})})});document.querySelectorAll(".cursor-scale").forEach(function(e){e.addEventListener("mouseleave",function(i){gsap.to(S,{width:"1.2vw",height:"1.2vw"})})});document.querySelector("#page6").addEventListener("mouseenter",function(e){gsap.to(S,{width:"4vw",height:"4vw",backgroundColor:"white"}),S.innerHTML="Drag"});document.querySelector("#page6").addEventListener("mouseleave",function(e){gsap.to(S,{width:"1.5vw",height:"1.5vw",backgroundColor:"transparent"}),S.innerHTML=""});var z=!0;document.querySelectorAll("#page6 .video-container video").forEach(function(e){e.addEventListener("mouseenter",function(i){gsap.to("#playCur",{opacity:1,duration:.2}),S.innerHTML="",z?(document.querySelector("#playCur").classList.add("ri-play-fill"),document.querySelector("#playCur").classList.remove("ri-pause-fill")):(document.querySelector("#playCur").classList.add("ri-pause-fill"),document.querySelector("#playCur").classList.remove("ri-play-fill"))})});document.querySelectorAll("#page6 .video-container video").forEach(function(e){e.addEventListener("mouseleave",function(i){gsap.to("#playCur",{opacity:0,duration:.2}),S.innerHTML="Drag"})});document.querySelectorAll("#page6 .video-container video").forEach(function(e){e.addEventListener("click",function(i){z?(e.muted=!1,z=!1):(e.muted=!0,z=!0)})});function vt(){var e="";document.querySelector("#page2-text").textContent.split(" ").forEach(o=>{e+=`<span> ${o}</span>`}),document.querySelector("#page2-text").innerHTML=e;var i=gsap.timeline({scrollTrigger:{trigger:"#page2",scroller:"body",start:"top 10%",end:"top 0%",scrub:1}});i.to("#circle2",{opacity:1,duration:.8},"a").to("#navbar",{opacity:0,pointerEvents:"none",duration:.2},"a").to("#navbar-black",{opacity:1,pointerEvents:"all",duration:.2},"a");var r=gsap.timeline({scrollTrigger:{trigger:"#page2",scroller:"body",start:"top 0%",end:"top -140%",scrub:1,pin:!0,anticipatePin:1}});r.to(document.querySelectorAll("#page2-text span"),{opacity:1,stagger:.2}).to("#circle2",{width:"1.5vw",height:"1.5vw",duration:8,autoRound:!1},"a").to("#navbar-black",{opacity:0,pointerEvents:"none",duration:.2},"b").to("#navbar",{opacity:1,pointerEvents:"all",duration:.2},"b")}vt();function mt(){const e=document.querySelector("#page3"),i=document.querySelector("#h1height"),r=document.querySelector("#h1height2");let o=i.getBoundingClientRect().top-e.getBoundingClientRect().top+i.offsetHeight/2,a=r.getBoundingClientRect().top-i.getBoundingClientRect().top-.2;var n=gsap.timeline({scrollTrigger:{trigger:"#page3",scroller:"body",start:"top 100%",end:"top 5%",scrub:1}});n.to("#circle2",{top:o,transform:"translate(-50%,-50%) scale(1)",duration:3});var u=gsap.timeline({scrollTrigger:{trigger:"#page3",scroller:"body",start:"top top",end:"+=2000",scrub:!0,pin:!0}});u.to("#ser2,#ser3,#ser4,#ser5,#ser6",{filter:"blur(4px)",opacity:.4,duration:.5},"a").to("#para1",{opacity:.5,duration:.4},"a").to("#circle2",{top:o+a*1,transform:"translate(-50%,-50%) scale(1)",duration:.8,delay:1},"b").to("#ser1,#ser3,#ser4,#ser5,#ser6",{filter:"blur(4px)",opacity:.4,duration:.5,delay:1},"b").to("#ser2",{filter:"blur(0px)",opacity:1,duration:.5,delay:1},"b").to("#para1",{opacity:0,duration:.4,delay:1},"b").to("#para2",{opacity:.5,duration:.4,delay:1.4},"b").to("#circle2",{top:o+a*2,transform:"translate(-50%,-50%) scale(1)",duration:.8,delay:1},"c").to("#ser1,#ser2,#ser4,#ser5,#ser6",{filter:"blur(4px)",opacity:.4,duration:.5,delay:1},"c").to("#ser3",{filter:"blur(0px)",opacity:1,duration:.5,delay:1},"c").to("#para2",{opacity:0,duration:.4,delay:1},"c").to("#para3",{opacity:.5,duration:.4,delay:1.4},"c").to("#circle2",{top:o+a*3,transform:"translate(-50%,-50%) scale(1)",duration:.8,delay:1},"d").to("#ser1,#ser2,#ser3,#ser5,#ser6",{filter:"blur(4px)",opacity:.4,duration:.5,delay:1},"d").to("#ser4",{filter:"blur(0px)",opacity:1,duration:.5,delay:1},"d").to("#para3",{opacity:0,duration:.4,delay:1},"d").to("#para4",{opacity:.5,duration:.4,delay:1.4},"d")}mt();function pt(){var e=gsap.timeline({scrollTrigger:{trigger:"#page4",scroller:"body",start:"top 100%%",end:"top 63%",scrub:!0}});e.to("#circle2",{top:"50%",transform:"translate(-50%,-50%) scale(1)",duration:2.3},"oc").to("#ser1,#ser2,#ser3,#ser4,#ser5,#ser6",{filter:"blur(0px)",opacity:1,duration:.8},"oc").to("#para6",{opacity:0,duration:.8},"oc").to("#circle2",{top:"50%",width:"0.65vw",height:"0.65vw",backgroundColor:"transparent",duration:.6});const r=document.querySelector("#project-wrapper").scrollWidth-window.innerWidth;var o=gsap.timeline({scrollTrigger:{trigger:"#page4",scroller:"body",start:"top top",end:"top -180%",scrub:1,pin:!0}});o.to("#project-wrapper",{transform:`translateX(-${r}px)`,duration:1.5,ease:"linear"},"sl").to("#circle2",{left:"-670%",duration:1},"sl").to(".view-all .cirr",{opacity:1,duration:0},"c").to(".view-all .cirr",{width:"2.5vw",height:"2.5vw",backgroundColor:"var(--secondary)",duration:.2},"s").to(".view-all .cirr i",{opacity:1,duration:.1,delay:.1},"s").to("#circle2",{left:"50%",width:"2.5vw",height:"2.5vw",backgroundColor:"var(--secondary)",duration:.5}).to(".view-all",{opacity:0,duration:.2}).to(".view-all",{display:"none",delay:.09})}pt();function gt(){gsap.timeline({scrollTrigger:{trigger:"#page5",scroller:"body",start:"top 15%",end:"top 0%",scrub:1}}).to("#navbar",{opacity:0,pointerEvents:"none",duration:.2},"a").to("#navbar-black",{opacity:1,pointerEvents:"all",duration:.2},"a"),gsap.timeline({scrollTrigger:{trigger:"#page5",scroller:"body",start:"top 0%",end:"top -400%",scrub:1,pin:!0}}).to("#page5",{opacity:1,duration:.1},"c").to("#page5",{maskSize:"200%",duration:4,delay:-.2}).to("#video-container",{clipPath:" polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:1}).to("#video-container",{transform:"translate(-50%,-50%) scale(.6) rotateY(-20deg) rotateX(-2deg)",duration:1.5}).to("#video-container",{transform:"translate(-50%,-50%) scale(.5) rotateY(-20deg) rotateY(20deg)   rotateX(-2deg) rotateX(2deg)",duration:1.5}).to("#img-over",{top:"-300%",duration:4}).to("#video-container",{transform:"translate(-50%,-50%) scale(.6) rotateY(-20deg) rotateX(-2deg)",duration:1.5}).to("#video-container",{transform:"translate(-50%,-50%)",duration:1.5})}gt();function ht(){gsap.timeline({scrollTrigger:{trigger:"#page6",scroller:"body",start:"top 0%",end:"top -5%",scrub:1}}).to("#navbar-black",{opacity:0,pointerEvents:"none",duration:.2},"a").to("#navbar",{opacity:1,pointerEvents:"all",duration:.2},"a")}ht();function Tt(){gsap.timeline({scrollTrigger:{trigger:"#footer",scroller:"body",start:"top 15%",end:"top 0%",scrub:1}}).to("#navbar",{opacity:0,pointerEvents:"none",duration:.2},"a").to("#navbar-black",{opacity:1,duration:.2,pointerEvents:"all"},"a")}Tt();
//# sourceMappingURL=index-aqZP__Mv.js.map
