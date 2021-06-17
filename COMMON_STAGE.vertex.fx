precision highp float;

// Attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

// Uniforms
uniform mat4 worldViewProjection;
uniform float time;

// Varying
varying vec3 vPosition;
varying vec2 vUV;

void main(void) {
    vec4 p = vec4( position, 1. );
    vPosition = p.xyz;
    vUV = uv;	
	gl_Position = worldViewProjection * p;
}
