var e=(e,t,n,r)=>{let i=1/Math.tan(e/2),a=1/(n-r);return new Float32Array([i/t,0,0,0,0,i,0,0,0,0,(r+n)*a,-1,0,0,2*r*n*a,0])},t=(e,t)=>{let n=(e,t)=>e.map((e,n)=>e-t[n]),r=e=>{let t=Math.hypot(...e);return e.map(e=>e/t)},i=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],a=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],o=r(n(e,t)),s=r(i([0,1,0],o)),c=i(o,s);return new Float32Array([s[0],c[0],o[0],0,s[1],c[1],o[1],0,s[2],c[2],o[2],0,-a(s,e),-a(c,e),-a(o,e),1])};function n(n,{seed:r=0,reduce:i=!1,vague:a=!0,souris:o=!1}={}){let s=n.getContext(`webgl2`,{alpha:!0,premultipliedAlpha:!0,antialias:!1,powerPreference:`low-power`});if(!s)return null;let c=(e,t)=>{let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n},l=s.createProgram();if(s.attachShader(l,c(s.VERTEX_SHADER,`#version 300 es
precision highp float;
in vec3 aGrid;
uniform mat4 uProj, uView;
uniform float uTime, uDensity, uScan, uDpr, uSeed;
uniform vec2 uSize, uMargin, uRes;
uniform float uFlot, uForce, uTrailOn;
uniform sampler2D uTrail;   // traînée du pointeur : rg = direction du geste, b = intensité
uniform vec4 uHoles[8];
uniform int uHoleN;
out float vAlpha;
out float vRed;

float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y) * 2.0 - 1.0;
}
float fbm(vec2 p) {
  float s = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) { s += a * noise(p); p = m * p; a *= 0.5; }
  return s;
}
float relief(vec2 xz) { return fbm(vec2(xz.x, xz.y + uTime) * 0.12 + uSeed) * 4.4; }
// 1 loin des textes, presque 0 dedans ; uMargin = largeur du fondu, en coordonnées d'écran normalisées
float clairiere(vec2 p) {
  float f = 1.0;
  for (int i = 0; i < 8; i++) {
    if (i >= uHoleN) break;
    vec4 r = uHoles[i];
    vec2 d = max(r.xy - p, p - r.zw) / uMargin;
    f *= mix(0.06, 1.0, smoothstep(0.0, 1.0, max(d.x, d.y)));
  }
  return f;
}

void main() {
  // Profondeur de 5 à 5 + uSize.y devant la caméra ; largeur proportionnelle à la profondeur (le champ de vision
  // s'élargit avec la distance), pour une densité à l'écran à peu près égale de l'avant à l'horizon.
  float z = 5.0 + aGrid.y * uSize.y;
  vec2 xz = vec2(aGrid.x * (3.0 + z * uSize.x), z);
  float h = relief(xz);
  // Pente : deux échantillons voisins donnent la normale, éclairée de biais depuis la gauche
  float e = 0.35;
  vec3 n = normalize(vec3(h - relief(xz + vec2(e, 0.0)), e, h - relief(xz + vec2(0.0, e))));
  float ombre = 1.0 - clamp(dot(n, normalize(vec3(-0.7, 0.55, 0.2))), 0.0, 1.0);

  vec4 view = uView * vec4(xz.x, h, -xz.y, 1.0);
  gl_Position = uProj * view;
  float d = -view.z;
  vec2 ndc = gl_Position.xy / gl_Position.w;

  // Respiration : chaque point oscille de moins d'un pixel autour de sa place, chacun à sa phase
  float ph = aGrid.z * 6.2831853;
  vec2 depl = vec2(sin(uTime * 1.9 + ph), cos(uTime * 1.4 + ph * 1.7)) * uFlot;
  // Pinceau : dans la traînée, le point suit le geste, avec un écart propre à lui (direction et amplitude tirées)
  if (uTrailOn > 0.5) {
    vec4 tr = textureLod(uTrail, clamp(ndc * 0.5 + 0.5, 0.0, 1.0), 0.0);
    vec2 vel = (tr.rg - 0.5) * 2.0;
    float a = fract(aGrid.z * 43.17) * 6.2831853;
    vec2 dir = vel * 0.85 + vec2(cos(a), sin(a)) * (0.25 + 0.6 * length(vel));
    depl += dir * tr.b * uForce * (0.3 + 1.1 * fract(aGrid.z * 7.31));
  }
  gl_Position.xy += depl / (uRes * 0.5) * gl_Position.w;

  float on = smoothstep(aGrid.z, aGrid.z + 0.06, uDensity);
  float loin = smoothstep(1.0, 0.55, aGrid.y);                           // fondu vers l'horizon
  float pres = smoothstep(-1.0, -0.8, gl_Position.y / gl_Position.w);    // et juste au bord bas de l'écran
  float bande = exp(-pow((aGrid.y - uScan) * 22.0, 2.0));
  float niv = fract(h * 1.4);
  float courbe = smoothstep(0.07, 0.0, min(niv, 1.0 - niv));
  vRed = bande;
  vAlpha = (on * (0.16 + 0.55 * ombre + 0.75 * courbe) + bande * 0.6) * loin * pres * clairiere(gl_Position.xy / gl_Position.w);
  gl_PointSize = clamp(uDpr * 9.0 / d, uDpr * 1.0, uDpr * 2.2) * (1.0 + bande * 0.5);
}`)),s.attachShader(l,c(s.FRAGMENT_SHADER,`#version 300 es
precision mediump float;
in float vAlpha;
in float vRed;
uniform vec3 uInk, uRed;
out vec4 o;
void main() {
  float r = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.3, r) * vAlpha;
  if (a < 0.004) discard;
  vec3 c = mix(uInk, uRed, clamp(vRed * 1.6, 0.0, 1.0));
  o = vec4(c * a, a);
}`)),s.linkProgram(l),!s.getProgramParameter(l,s.LINK_STATUS))return null;s.useProgram(l);let u=229400,d=new Float32Array(u*3),f=0,p=1234567,m=()=>(p=p*16807%2147483647)/2147483647;for(let e=0;e<370;e++)for(let t=0;t<620;t++)d[f++]=-1+2*(t+m())/620,d[f++]=((e+m())/370)**1.2,d[f++]=m();let h=s.createVertexArray();s.bindVertexArray(h);let g=s.createBuffer();s.bindBuffer(s.ARRAY_BUFFER,g),s.bufferData(s.ARRAY_BUFFER,d,s.STATIC_DRAW);let _=s.getAttribLocation(l,`aGrid`);s.enableVertexAttribArray(_),s.vertexAttribPointer(_,3,s.FLOAT,!1,0,0);let v=e=>s.getUniformLocation(l,e),y={proj:v(`uProj`),view:v(`uView`),time:v(`uTime`),density:v(`uDensity`),scan:v(`uScan`),dpr:v(`uDpr`),seed:v(`uSeed`),size:v(`uSize`),ink:v(`uInk`),red:v(`uRed`),holes:v(`uHoles`),holeN:v(`uHoleN`),margin:v(`uMargin`),res:v(`uRes`),flot:v(`uFlot`),force:v(`uForce`),trail:v(`uTrail`),trailOn:v(`uTrailOn`)};s.uniform2f(y.size,.55,34),s.uniform1f(y.seed,r),s.uniform3f(y.ink,8/255,8/255,8/255),s.uniform3f(y.red,237/255,51/255,39/255),s.uniformMatrix4fv(y.view,!1,t([0,6.2,0],[0,.4,-18])),s.enable(s.BLEND),s.blendFunc(s.ONE,s.ONE_MINUS_SRC_ALPHA);let b=Math.min(devicePixelRatio||1,1.5),x=()=>{let t=Math.round(n.clientWidth*b),r=Math.round(n.clientHeight*b);(n.width!==t||n.height!==r)&&(n.width=t,n.height=r,s.viewport(0,0,t,r),s.uniformMatrix4fv(y.proj,!1,e(34*Math.PI/180,t/r,.1,80)),s.uniform2f(y.res,t,r))};s.uniform1f(y.dpr,b);let S=o&&!i;s.uniform1f(y.flot,S?.7*b:0),s.uniform1f(y.force,22*b),s.uniform1i(y.trail,0),s.uniform1f(y.trailOn,0);let C=null;if(S){let e=s.createProgram();if(s.attachShader(e,c(s.VERTEX_SHADER,`#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`)),s.attachShader(e,c(s.FRAGMENT_SHADER,`#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uPrev;
uniform vec2 uA, uB, uVel;
uniform float uRad, uAspect, uDecay, uAmt;
out vec4 o;
void main() {
  vec4 p = texture(uPrev, vUv);
  vec2 v = (p.rg - 0.5) * 2.0 * uDecay;   // direction codée autour de 0,5 (texture 8 bits)
  float i = p.b * uDecay;
  vec2 pa = vUv - uA, ba = uB - uA;
  pa.x *= uAspect; ba.x *= uAspect;
  float t = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0);
  vec2 d = pa - ba * t;
  float g = exp(-dot(d, d) / (uRad * uRad)) * uAmt;
  v = mix(v, uVel, clamp(g * 2.0, 0.0, 1.0));
  o = vec4(v * 0.5 + 0.5, min(1.0, i + g), 1.0);
}`)),s.linkProgram(e),s.getProgramParameter(e,s.LINK_STATUS)){let t=s.createVertexArray();s.bindVertexArray(t);let n=s.createBuffer();s.bindBuffer(s.ARRAY_BUFFER,n),s.bufferData(s.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),s.STATIC_DRAW);let r=s.getAttribLocation(e,`aPos`);s.enableVertexAttribArray(r),s.vertexAttribPointer(r,2,s.FLOAT,!1,0,0),s.bindVertexArray(h);let i=t=>s.getUniformLocation(e,t);C={prog:e,vao:t,tex:[],fbo:[],w:0,h:0,lu:0,T:{prev:i(`uPrev`),a:i(`uA`),b:i(`uB`),vel:i(`uVel`),rad:i(`uRad`),aspect:i(`uAspect`),decay:i(`uDecay`),amt:i(`uAmt`)}}}}let w=()=>{if(!C)return;let e=Math.max(16,Math.round(160*n.height/Math.max(1,n.width)));if(C.w!==160||C.h!==e){C.tex.forEach(e=>s.deleteTexture(e)),C.fbo.forEach(e=>s.deleteFramebuffer(e)),C.tex=[],C.fbo=[];for(let t=0;t<2;t++){let t=s.createTexture();s.bindTexture(s.TEXTURE_2D,t),s.texImage2D(s.TEXTURE_2D,0,s.RGBA8,160,e,0,s.RGBA,s.UNSIGNED_BYTE,null),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE);let n=s.createFramebuffer();s.bindFramebuffer(s.FRAMEBUFFER,n),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,t,0),s.clearColor(.5,.5,0,1),s.clear(s.COLOR_BUFFER_BIT),C.tex.push(t),C.fbo.push(n)}s.bindFramebuffer(s.FRAMEBUFFER,null),C.w=160,C.h=e,C.lu=0}},T=0,E=.55,D=-1,O=1,k=0,A=0,j=0,M=!1,N=-1,P=0,F=0,I=0,L=0,R=!1,z={vx:0,vy:0,amt:0},B=1,V=()=>{if(!C)return;w();let e=C.lu,t=1-e;s.useProgram(C.prog),s.bindVertexArray(C.vao),s.bindFramebuffer(s.FRAMEBUFFER,C.fbo[t]),s.viewport(0,0,C.w,C.h),s.disable(s.BLEND),s.activeTexture(s.TEXTURE0),s.bindTexture(s.TEXTURE_2D,C.tex[e]),s.uniform1i(C.T.prev,0),s.uniform2f(C.T.a,I,L),s.uniform2f(C.T.b,P,F),s.uniform2f(C.T.vel,z.vx,z.vy),s.uniform1f(C.T.rad,70/Math.max(1,n.clientHeight)),s.uniform1f(C.T.aspect,n.width/Math.max(1,n.height)),s.uniform1f(C.T.decay,B),s.uniform1f(C.T.amt,z.amt),s.drawArrays(s.TRIANGLE_STRIP,0,4),s.bindFramebuffer(s.FRAMEBUFFER,null),s.viewport(0,0,n.width,n.height),s.enable(s.BLEND),C.lu=t,I=P,L=F,s.useProgram(l),s.bindVertexArray(h),s.bindTexture(s.TEXTURE_2D,C.tex[t]),s.uniform1f(y.trailOn,1)},H=()=>{x(),V(),s.uniform1f(y.time,k),s.uniform1f(y.density,T),s.uniform1f(y.scan,D),s.clearColor(0,0,0,0),s.clear(s.COLOR_BUFFER_BIT),s.drawArrays(s.POINTS,0,u)},U=e=>{let t=Math.min(.05,A?(e-A)/1e3:0);if(A=e,k+=t*.55,T+=(E-T)*(1-Math.exp(-t*2.2)),D>-1&&(D+=O*t*.75,(D>1.2||D<-.2)&&(D=-1)),C){let e=n.clientWidth||1,r=n.clientHeight||1,i=(P-I)*e,a=(F-L)*r,o=t>0?Math.hypot(i,a)/t:0,s=R&&o>20?Math.min(1,o/1400):0;z={vx:o>0?i/Math.hypot(i,a)*s:0,vy:o>0?a/Math.hypot(i,a)*s:0,amt:s*.45},z.amt=isFinite(z.amt)?z.amt:0,B=Math.exp(-t*3.2)}H(),j=M?requestAnimationFrame(U):0};return{setStep(e,t){if(e===N)return;let n=N;if(N=e,E=.55+.45*e/Math.max(1,t-1),i){T=E,H();return}a&&n>=0&&(O=e>n?1:-1,D=O>0?-.1:1.1)},start(){if(i){T=E,H();return}M||(M=!0,A=0,j=requestAnimationFrame(U))},setHoles(e){let t=n.clientWidth||1,r=n.clientHeight||1,i=new Float32Array(32);e.slice(0,8).forEach((e,n)=>i.set([e.left/t*2-1,1-e.bottom/r*2,e.right/t*2-1,1-e.top/r*2],n*4)),s.uniform4fv(y.holes,i),s.uniform1i(y.holeN,Math.min(8,e.length)),s.uniform2f(y.margin,56/t*2,56/r*2),M||H()},setMouse(e,t){if(!C)return;if(e===null||t===void 0){R=!1;return}let r=n.clientWidth||1,i=n.clientHeight||1;P=e/r,F=1-t/i,R||(I=P,L=F),R=!0},stop(){M=!1,cancelAnimationFrame(j),j=0},destroy(){this.stop(),s.deleteBuffer(g),s.deleteVertexArray(h),s.deleteProgram(l),C&&(C.tex.forEach(e=>s.deleteTexture(e)),C.fbo.forEach(e=>s.deleteFramebuffer(e)),s.deleteProgram(C.prog),s.deleteVertexArray(C.vao)),s.getExtension(`WEBGL_lose_context`)?.loseContext()}}}export{n as creerReleve};