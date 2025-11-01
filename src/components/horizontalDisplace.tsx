import { shaderMaterial } from '@react-three/drei'

// Shows the view-space normal mapped to RGB ([-1,1] -> [0,1])
export const NormalRGBMaterial = shaderMaterial(
  {
		cameraNear: 0.01,
		cameraFar: 1,
		gradientMap: null,
	},
  /* glsl */`
    varying vec3 vNormalVS;

    void main() {
      vNormalVS = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl */`
		#include <packing>

    varying vec3 vNormalVS;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform sampler2D gradientMap;

		vec3 sampleGradient(float t){
			t = clamp(t, 0.0, 1.0);
			return texture2D(gradientMap, vec2(t * 5.5 - 1.0, 0.5)).rgb;
		}

    void main() {
      vec3 n = normalize(vNormalVS);
			float viewZ = -perspectiveDepthToViewZ(
				gl_FragCoord.z, cameraNear, cameraFar 
			);
			float depth = (viewZ - cameraNear) / (cameraFar - cameraNear);
			vec3 base = mix(n, vec3(depth), 0.75);
			float t = dot(base, vec3(0.299, 0.12, 0.52));
			vec3 mapped = sampleGradient(t);
      gl_FragColor.rgb = mapped;
      gl_FragColor.a = 1.0;
    }
  `
)
