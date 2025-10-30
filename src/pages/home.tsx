import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react';
import {Canvas, ThreeElements, useFrame} from '@react-three/fiber'
import { Fisheye, useGLTF, useTexture } from "@react-three/drei"
import { NormalRGBMaterial } from '../components/horizontalDisplace';
import { extend } from '@react-three/fiber';

extend({ NormalRGBMaterial })


function Logo(props: ThreeElements['mesh']) {
	const meshRef = useRef<THREE.Mesh>(null!)
	const { nodes } = useGLTF("/threemodels/logo2.glb")
	useFrame((_, delta) => (meshRef.current.rotation.z += delta))
	return (
		<mesh 
			ref={meshRef}
			geometry={nodes["Curve001"].geometry} 
			{...props}
		/>
	)
}

export default function Home() {
	const glRef = useRef<THREE.WebGLRenderer>()
	const [darkMode, setDarkMode] = useState(isDarkMode())
	function setBackgroundColor(darkMode: boolean){
		if(!glRef.current) return
		if(!window.matchMedia) return
		if(darkMode == undefined) return
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
			<div>
				<Canvas 
					flat 
					onCreated={({gl}) => {
						glRef.current = gl;
						setBackgroundColor(darkMode)
					}}
					style={{
						zIndex: -1,
						position: "absolute",
						top: 0, bottom: 0, left: 0, right: 0,
					}}
				>
					<Fisheye
						zoom={1}
					>
						<ambientLight intensity={Math.PI / 2} />
						<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
						<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
						<Logo
							scale={35}
							rotation-x={Math.PI/2}
						>
							<normalRGBMaterial />
						</Logo>
					</Fisheye>
				</Canvas>
			</div>
		</>
	)
}
