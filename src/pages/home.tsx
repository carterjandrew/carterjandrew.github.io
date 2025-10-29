import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {Canvas, useFrame} from '@react-three/fiber'

function Box(props) {
				const meshRef = useRef()
				const [hovered, setHover] = useState(false)
				const [active, setActive] = useState(false)
				useFrame((state, delta) => (meshRef.current.rotation.x += delta))

				return (
								<mesh
  								{...props}
  								ref={meshRef}
  								scale={active ? 1.5 : 1}
  								onClick={() => setActive(!active)}
  								onPointerOver={() => setHover(true)}
  								onPointerOut={() => setHover(false)}
								>
  								<boxGeometry args={[1,1,1]} />
  								<meshStandardMaterial color={hovered ? 'red': 'blue'} />
								</mesh>
				)
}

export default function Home() {
	return (
		<>
			<div id='bigname' style={{ display: 'flex', width: '100%', flexGrow: 1, justifyContent: 'center', alignItems: 'start', flexDirection: 'column', paddingLeft: '30%' }}>
				<Canvas>
				  <ambientLight intensity={Math.PI / 2} />
					<Box position={[0,0,0]} />
				</Canvas>
			</div>
		</>
	)
}
