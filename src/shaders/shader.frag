precision highp float;
uniform vec2 iResolution;
uniform float iTime;
varying vec2 vUv;
void  mainImage( out vec4,  vec2 fragCoord );
void main () {
    //out const vec4 outcolor;
    //mainImage(iResolution*vUv);
    vec4 outfrag;
    mainImage(outfrag,iResolution*vUv);
    gl_FragColor = outfrag;
}