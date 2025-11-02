import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useTransition } from "../hooks/contextHooks"
import Glitch from "./glitch"

type NavBarProps = {
	style?: React.CSSProperties
}

const NavBar: React.FC<NavBarProps> = ({ style }) => {
	const location = useLocation()
	const [delayedLocation,] = useState(location)
	const [transition,] = useTransition()

	const links = ['resume', 'blog', 'projects', 'about']

	// Dark mode stuff
	const [darkMode, setDarkMode] = useState(isDarkMode())
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

	return (
		<motion.div
			id='navbar'
			initial={{ y: '-100%' }}
			animate={{ y: 0, transition: transition }}
			exit={{ y: '-100%', transition: transition }}
			style={style}
		>
			<div id='inner-navbar'>
					<NavLink to="/" style={{border: "none"}}>
						<Glitch>
							<img
								src="/logo.svg"
								style={{
									filter: darkMode ? "invert(100%)" : "",
									width: "100%",
									height: "50px",
									objectFit: "contain"
								}}
							/>
						</Glitch>
					</NavLink>
				<div style={{
					flex: 1,
					display: "flex",
					gap: '--default-padding',
					position: "relative",
				}} >
					<Glitch
						scale={7}
					>
						<p style={{
							fontWeight: 900,
							textShadow: `
								0 0 5px var(--foreground-color),
								0 0 10px var(--foreground-color)
							`
						}}>
							{delayedLocation.pathname}
						</p>
					</Glitch>
				</div>
				{links.map((link) => {
					const path = `/${link}`
					const name = link.charAt(0).toUpperCase() + link.slice(1)
					const className = delayedLocation.pathname.split('/')[1] === link ? 'delayed-active' : ''
					return (
						<Glitch
							scale={className == "" ? 0 : 7}
						>
							<motion.div 
							key={link}
							whileHover={{ opacity: .5 }} style={{ overflow: 'auto' }}>
								<NavLink key={link} to={path} className={className}>{name === 'About' ? "Get In Touch" : name}</NavLink>
							</motion.div>
						</Glitch>
					)
				})}
			</div>
		</motion.div>
	)
}

export default NavBar
