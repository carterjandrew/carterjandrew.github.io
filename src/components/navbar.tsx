import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useTransition } from "../hooks/contextHooks"
import Glitch from "./glitch"

type NavBarProps = {
	style?: React.CSSProperties
}

type NavBarLinkProps = HTMLLinkElement & {
	link: string,
	delayedLocation: { pathname: string }
}

const NavBarLink: React.FC<NavBarLinkProps> = ({link, delayedLocation, ...props}) => {
	const path = `/${link}`
	const name = link.charAt(0).toUpperCase() + link.slice(1)
	const [mouseInside, setMouseInside] = useState(false)
	const className = useMemo(() => {
		const clss = delayedLocation.pathname.split('/')[1]
		if(clss === link || mouseInside) return "delayed-active";
		return ""
	}, [mouseInside])
	const glitchScale = useMemo(() => {
		if(className != "") return 7;
		return 0;
	}, [className])
	return (
		<Glitch
			scale={glitchScale}
		>
			<NavLink 
				onMouseEnter={() => setMouseInside(true)}
				onMouseLeave={() => setMouseInside(false)}
				key={link}
				to={path}
				className={className}
				style={{
					marginTop: glitchScale == 0 ? "0" : "-7px"
				}}
			>{name === 'About' ? "Get In Touch" : name}</NavLink>
		</Glitch>
	)
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
				</div>
				{links.map((link) => (
					<NavBarLink link={link} delayedLocation={delayedLocation} />
				))}
			</div>
		</motion.div>
	)
}

export default NavBar
