# THREE SHADERTOY
A simple THREE.js template code that make use of three-shadertoy-material to render on a mesh


Here is the sample rendering by a default shadertoy code copied from https://www.shadertoy.com/new



https://shakthi.github.io/threejs-shadertoy/dist/

```c++
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // Time varying pixel color
    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

    // Output to screen
    fragColor = vec4(col,1.0);
}
```

Here is a screenshot of the `THREE.PlaneGeometry` with a shadertoy shader which was quoted in https://en.wikipedia.org/wiki/Shadertoy (as of 31 Jul 18)

![alt text](https://raw.githubusercontent.com/Shakthi/threejs-shadertoy/master/wikishader.png)
