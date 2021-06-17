precision highp float;

// Attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

// Uniforms
uniform mat4 worldViewProjection;
uniform mat4 projection;
uniform mat4 worldView;
uniform vec3 cameraPosition;

uniform float flakeScale;

// Varying
varying vec4 mvPosition;
varying vec3 worldNormal;
varying vec3 cameraToVertex;
varying vec2 vUv;
varying vec2 flakeUv;

void main() {
  mvPosition = worldViewProjection * vec4( position, 1.0 );
  worldNormal = mat3( worldView[ 0 ].xyz, worldView[ 1 ].xyz, worldView[ 2 ].xyz ) * normal;
  vec4 worldPosition = worldView * vec4( position, 1.0 );
  cameraToVertex = normalize(worldPosition.xyz - cameraPosition);
  vUv = uv;
  flakeUv = uv * flakeScale;
  gl_Position = mvPosition;
}
