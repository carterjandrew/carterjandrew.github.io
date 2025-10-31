import { motion } from "framer-motion"
import { FC, useEffect, useRef, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useTransition } from "../hooks/contextHooks"
import {Logo} from "./logo"
import { Canvas } from "@react-three/fiber"
import { WebGLRenderer } from "three"
import { PerspectiveCamera } from "@react-three/drei"
import { EffectComposer } from "@react-three/postprocessing"
import { LensDistortion } from "./effects/lensDistortion"

type NavBarProps = {
	style?: React.CSSProperties
}

const SpinningLogo: FC<HTMLCanvasElement> = (props) => {
	const glRef = useRef<WebGLRenderer>()
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
		<Canvas
			onCreated={({gl}) => {
				glRef.current = gl;
				setBackgroundColor(darkMode)
			}}
			style={{
				height: "50px"
			}}
			camera={{ fov: 1}}
		>
			<Logo
				scale={0.8}
				rotation-x={Math.PI/2}
			>
				<meshBasicMaterial color={darkMode ? "white": "black"} />
			</Logo>
			<EffectComposer>
				<LensDistortion
					amount={0.03}
				/>
			</EffectComposer>
		</Canvas>
	)
}

const NavBar: React.FC<NavBarProps> = ({ style }) => {
	const location = useLocation()
	const [delayedLocation,] = useState(location)
	const [transition,] = useTransition()

	const links = ['resume', 'blog', 'projects', 'about']

	return (
		<motion.div
			id='navbar'
			initial={{ y: '-100%' }}
			animate={{ y: 0, transition: transition }}
			exit={{ y: '-100%', transition: transition }}
			style={style}
		>
			<div id='inner-navbar'>
				<motion.div whileHover={{ opacity: .5 }} style={{ overflow: 'auto' }}>
					<NavLink to="/" style={{border: "none"}}>
						<SpinningLogo />
					</NavLink>
				</motion.div>
				<div style={{ flex: 1, display: "flex", gap: '--default-padding' }} >
					{delayedLocation.pathname}
				</div>
				{links.map((link) => {
					const path = `/${link}`
					const name = link.charAt(0).toUpperCase() + link.slice(1)
					const className = delayedLocation.pathname.split('/')[1] === link ? 'delayed-active' : ''
					return (
						<motion.div 
						key={link}
						whileHover={{ opacity: .5 }} style={{ overflow: 'auto' }}>
							<NavLink key={link} to={path} className={className}>{name === 'About' ? "Get In Touch" : name}</NavLink>
						</motion.div>
					)
				})}
			</div>
		</motion.div>
	)
}

export default NavBar
