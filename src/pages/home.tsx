import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react';
import {Canvas, ThreeElements, useFrame} from '@react-three/fiber'
import { Backdrop, Environment, Fisheye } from "@react-three/drei"

function Box(props: ThreeElements['mesh']) {
				const meshRef = useRef<THREE.Mesh>(null!)
				useFrame((_, delta) => (meshRef.current.rotation.y += delta))
				return (
								<mesh
  								{...props}
  								ref={meshRef}
								>
  								<boxGeometry args={[1,1,1]} />
  								<meshStandardMaterial color={'red'} />
								</mesh>
				)
}

export default function Home() {
	const glRef = useRef<THREE.WebGLRenderer>()
	const [darkMode, setDarkMode] = useState(isDarkMode())
	function setBackgroundColor(darkMode: boolean){
		if(!glRef.current) return
		if(!window.matchMedia) return
		const color = darkMode ? "#000000": "#ffffff"
		glRef.current.setClearColor(color, 1)
	}
	function isDarkMode(){
		if(!window.matchMedia) return false;
		return window.matchMedia('(prefers-color-scheme: dark)').matches
	}
	useEffect(() => {
		const listener = (e: MediaQueryListEvent) => setDarkMode(e.matches)
		window.matchMedia(
			'(prefers-color-scheme: dark)'
		).addEventListener("change", listener)
		return () => {
			window.matchMedia(
				'(prefers-color-scheme: dark)'
			).removeEventListener("change", listener)
		}
	}, [])
	useEffect(() => {
		setBackgroundColor(darkMode)
	}, [darkMode])
	return (
		<>
			<div id='bigname' style={{ display: 'flex', width: '100%', flexGrow: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingLeft: '30%' }}>
				<Canvas 
					flat 
					onCreated={({gl}) => {
						glRef.current = gl;
						setBackgroundColor()
					}}
					style={{
						zIndex: -1,
						position: "absolute",
						top: 0, bottom: 0, left: 0, right: 0,
					}}
				>
					<Fisheye>
						<ambientLight intensity={Math.PI / 2} />
						<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
						<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
						<Box 
							position={[0,0,0]} 
							scale={5}
						/>
					</Fisheye>
				</Canvas>
			</div>
		</>
	)
}
