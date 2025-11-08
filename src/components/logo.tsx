import * as THREE from 'three'
import { FC, useEffect, useRef, useState } from 'react';
import {Canvas, ThreeElements, useFrame} from '@react-three/fiber'
import { useGLTF, useTexture } from "@react-three/drei"
import { NormalRGBMaterial } from '../components/horizontalDisplace';
import { extend } from '@react-three/fiber';
import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing'
import { LensDistortion } from '../components/effects/lensDistortion';

extend({ NormalRGBMaterial })

type NormalMaterialProps = {
	texture: string
}

const NormalMaterial: React.FC<NormalMaterialProps> = ({texture}) => {
	const gradient = useTexture(texture)
	gradient.wrapS = THREE.ClampToEdgeWrapping
	gradient.wrapT = THREE.ClampToEdgeWrapping
	gradient.minFilter = THREE.LinearFilter
	gradient.magFilter = THREE.LinearFilter
	gradient.generateMipmaps = false
	return (
			<normalRGBMaterial
				gradientMap={gradient}
			/>
	)
}


export const Logo: React.FC<ThreeElements['mesh']> = (props) => {
	const meshRef = useRef<THREE.Mesh>(null!)
	const { nodes } = useGLTF("/threemodels/logo2.glb")
	useFrame((_, delta) => (meshRef.current.rotation.z += delta))
	return (
		<mesh 
			ref={meshRef}
			geometry={nodes["Curve001"].geometry} 
			{...props}
		>
		</mesh>
	)
}

const FullLogo: FC<HTMLCanvasElement> = (props) => {
	return (
				<Canvas 
					flat 
					style={{
						zIndex: -1,
						position: "absolute",
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
					}}
				>
						<Logo
							scale={30}
							rotation-x={Math.PI/2}
						>
							<NormalMaterial
								texture="/gradient.png"
							/>
						</Logo>
						<EffectComposer
							multisampling={0}
							resolutionScale={0.75}
							frameBufferType={THREE.HalfFloatType}
							renderPriority={1}
						>
							<LensDistortion
								amount={0.005}
							/>
							<Noise opacity={0.4} />
							<Bloom 
								luminanceThreshold={0}
								luminanceSmoothing={0.9}
								height={100} 
								intensity={0.3}
							/>
						</EffectComposer>
				</Canvas>
	)
}

export default FullLogo
