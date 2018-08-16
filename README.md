# THREE SHADERTOY
A simple THREE.js template code that make use of [three-shadertoy-material](https://www.npmjs.com/package/three-shadertoy-material) to render on a mesh. You can edit the sourcecode or load shaders dynamically using shadertoy.com Api. Type the url of shader from shadertoy.com.  This is still an experimental feature. Only public+api shaders can be loaded dynamically. Corresponding  npm module [three-shadertoy-material-loader](https://www.npmjs.com/package/three-shadertoy-material-loader).


Here is the sample rendering by a  shadertoy code copied from https://en.wikipedia.org/wiki/Shadertoy (as of 31 Jul 18)



https://shakthi.github.io/threejs-shadertoy/dist/

```glsl

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // input: pixel coordinates
    vec2 p = (-iResolution.xy + 2.0*fragCoord)/iResolution.y;

    // angle of each pixel to the center of the screen
    float a = atan(p.y,p.x);
    
    // modified distance metric
    float r = pow( pow(p.x*p.x,4.0) + pow(p.y*p.y,4.0), 1.0/8.0 );
    
    // index texture by (animated inverse) radious and angle
    vec2 uv = vec2( 1.0/r + 0.2*iTime, a );

    // pattern: cosines
    float f = cos(12.0*uv.x)*cos(6.0*uv.y);

    // color fetch: palette
    vec3 col = 0.5 + 0.5*sin( 3.1416*f + vec3(0.0,0.5,1.0) );
    
    // lighting: darken at the center    
    col = col*r;
    
    // output: pixel color
    fragColor = vec4( col, 1.0 );
}

```

And the screenshot of the `THREE.PlaneGeometry` 

![alt text](https://raw.githubusercontent.com/Shakthi/threejs-shadertoy/master/wikishader.png)

Other plublic+api shader demo
--------
- https://shakthi.github.io/threejs-shadertoy/dist/?urllink=https%3A%2F%2Fwww.shadertoy.com%2Fview%2FMtdyzf
- https://shakthi.github.io/threejs-shadertoy/dist/?urllink=https%3A%2F%2Fwww.shadertoy.com%2Fview%2F4tVXRV
- https://shakthi.github.io/threejs-shadertoy/dist/?urllink=https%3A%2F%2Fwww.shadertoy.com%2Fview%2FXldczj


