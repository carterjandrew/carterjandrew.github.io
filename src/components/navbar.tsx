import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useTransition } from "../hooks/contextHooks"

type NavBarProps = {
	style?: React.CSSProperties
}

const NavBar: React.FC<NavBarProps> = ({ style }) => {
	const location = useLocation()
	const [delayedLocation,] = useState(location)
	const [transition,] = useTransition()

	const links = ['blog', 'projects', 'about']
	const [time, setTime] = useState(new Date().toLocaleTimeString());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTime(new Date().toLocaleTimeString());
		}, 1000);

		// Cleanup interval on component unmount
		return () => clearInterval(intervalId);
	}, []);

	return (
		<motion.div
			id='navbar'
			initial={{ y: '-100%' }}
			animate={{ y: 0, transition: transition }}
			exit={{ y: '-100%', transition: transition }}
			style={style}
		>
			<div id='inner-navbar'>
				<motion.div whileHover={{opacity: .5}} style={{ overflow: 'auto' }}>
					<NavLink to='/' className={delayedLocation.pathname === '/' ? 'delayed-active' : ''} >Carter Andrew | {time}</NavLink>
				</motion.div>
				<div style={{ flex: 1, display: "flex", gap: '--default-padding' }} >
						{delayedLocation.pathname}
				</div>
				{links.map((link) => {
					const path = `/${link}`
					const name = link.charAt(0).toUpperCase() + link.slice(1)
					const className = delayedLocation.pathname === path ? 'delayed-active' : ''
					return (
						<motion.div whileHover={{ opacity: .5 }} style={{ overflow: 'auto' }}>
							<NavLink key={link} to={path} className={className}>{name}</NavLink>
						</motion.div>
					)
				})}
			</div>
		</motion.div>
	)
}

export default NavBar
