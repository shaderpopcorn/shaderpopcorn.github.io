precision highp float;

varying vec2 vUV;

uniform sampler2D textureSampler;
uniform float time;

float hash21(vec2 p){
    p = fract(p*vec2(234.34, 435.345));
    p += dot(p, p+34.32);
    return fract(p.x+p.y);}

vec4 Shader(vec2 p){
    vec4 col = vec4(0.0);
    p *= 5.0;
    p.x += time/20.0;
    vec2 q = fract(p)-0.5;
    vec2 id = floor(p);
    
    float n = hash21(id);
    //float width = mouse.x;
    //float width = .5;
    float width = sin(time/10.0)*0.25+0.5;
    
    if(n < 0.5) q.x *= -1.0;
    
    float mx = clamp(width/2.0,0.02,0.48);
    float d = abs(abs(q.x + q.y)-0.5);
    float mask = smoothstep(mx,mx-0.1,abs(d));
    col += mask;
    return col;}

void main(void) {

    vec2 uv = vUV.xy-vec2(0.5,0.5); 
    uv *= vec2(1920.0/1080.0,1.0);



    vec4 color = vec4(0.0);
    color += Shader(uv);
    if (color.g < 0.5) {
        discard;
    }
    
    vec4 texture = texture2D(textureSampler, vUV);
    color *= texture;

    

    gl_FragColor = color;
}