import { motion } from "framer-motion"
import { MouseEventHandler, useEffect, useMemo, useRef, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useTransition } from "../hooks/contextHooks"
import Glitch from "./glitch"
import { FaChevronDown } from "react-icons/fa"
import { FaX } from "react-icons/fa6"

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
	const divRef = useRef<HTMLDivElement>()
	const [isMobile, setIsMobile] = useState(false)
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

	function isMobileScreen(){
		if(!divRef.current) return;
		setIsMobile(divRef.current.clientWidth < 600)
	}
	
	function onDivRef(div: HTMLDivElement){
		divRef.current = div
		isMobileScreen()
	}

	useEffect(() => {
		window.addEventListener('resize', isMobileScreen)
		return () => window.removeEventListener('resize', isMobileScreen)
	}, [])

	function Links(){
		return (
			<>
				{links.map((link) => (
					<NavBarLink 
						link={link} 
						delayedLocation={delayedLocation}
					/>
				))}
			</>
		)
	}

	function NavbarLogo(){
		return (
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
		)
	}

	function MobileBar(){
		const [showLinks, setShowLinks] = useState(false)

		const onMobileBarClick: MouseEventHandler<HTMLDivElement>= () => {
			setShowLinks(true)
		}
		return (
			<>
				<div id='mobile-nav-wrapper'>
					<div style={{height: "2em", background: "var(--background-color)",}} />
					<div
						id='mobile-navbar'
						onClick={onMobileBarClick}
					>
						<div style={{flex: 1}} />
						<NavbarLogo />
						<div style={{flex: 1, justifyContent: "end"}}>
							<FaChevronDown />
						</div>
					</div>
				</div>
				<div
					id='inner-navbar'
					style={{
						position: 'absolute',
						flexDirection: 'column',
						justifyContent: 'center',
						display: showLinks ? "flex": "none",
						top: 0,
						left: 0,
						width: '100vw',
						height: '100vh',
						padding: '5vw'
					}}
				>
					<div style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: 'end',
						width: '100%',
						fontSize: '2em'
					}}>
						<div
							onClick={() => setShowLinks(false)}
						>
							<FaX />
						</div>
					</div>
					<Links />
					<div style={{flex: 1}} />
				</div>
			</>
		)
	}

	function DesktopBar(){
		return (
			<>
				<div id='inner-navbar'>
					<NavLink to="/" style={{border: "none"}}>
						<NavbarLogo />
					</NavLink>
					<div style={{
						flex: 1,
						display: "flex",
						gap: '--default-padding',
						position: "relative",
					}} >
					</div>
					<Links />
				</div>
			</>
		)
	}

	return (
		<motion.div
			id='navbar'
			initial={{ y: '-100%' }}
			animate={{ y: 0, transition: transition }}
			exit={{ y: '-100%', transition: transition }}
			style={style}
			ref={onDivRef}
		>
			{isMobile ? (<MobileBar />): (<DesktopBar />)}
		</motion.div>
	)
}

export default NavBar
