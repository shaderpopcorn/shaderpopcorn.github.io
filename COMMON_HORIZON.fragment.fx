precision highp float;

varying vec2 vUV;

uniform sampler2D textureSampler;
uniform float time;

void main(void) {
    
    vec2 uv = vUV + vec2(0.5,0.5);
    vec4 color = vec4(0.0,0.0,0.0,0.0);
    uv.x *= 40.0;
    uv.y *= 10.0;

    vec2 gv = fract(uv);
    vec2 id = floor(uv);

    float d = sin(uv.x+time);
    color = vec4(d,d,1.0,0.0);
   
    vec4 tex = texture2D(textureSampler, uv);
    color = mix(color,tex,tex.a);
    color *= 2.0;

    gl_FragColor = color;
}