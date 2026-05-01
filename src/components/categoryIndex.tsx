import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, Variants } from 'framer-motion';
import EmptyTrigger from '../components/emptyTrigger';
import FourOhFour from '../pages/404';

export type NodeMappingItem = {
	path: string,
	element: ReactNode
}

interface CategoryIndexProps {
	path: string,
	previewElements: NodeMappingItem[]
}

export default function CategoryIndex({
	path, previewElements
}: CategoryIndexProps) {
	const navigate = useNavigate()
	const location = useLocation()
	const [delayedLocation, setDelayedLocation] = useState(location)
	const [currentSlug, setCurrentSlug] = useState<string>()
	const [targetSlug, setTargetSlug] = useState<string>()
	const projectName = useMemo(
		() => delayedLocation.pathname.replace('/projects/', ''),
		[delayedLocation]
	)

	const buttonVariants: Variants = {
		normal: {},
		hover: {
				scale: 1.1,
				x: '-10%'
		},
		nonHover: {
				opacity: .5
		}
	}

	useEffect(() => {
		setDelayedLocation(location)
	}, [])

	useEffect(() => {
		if(!currentSlug) setCurrentSlug(targetSlug)
	}, [targetSlug])

	if (delayedLocation.pathname === path) return (
		<div id='blog-wrapper'>
			<div id='blog-preview-wrapper' style={{ flex: 1 }}>
				<AnimatePresence mode='wait'>
					{targetSlug && currentSlug === targetSlug ? (
						<motion.div
							initial={{ opacity: 0, filter: 'blur(50px)' }}
							animate={{ opacity: 1, filter: 'blur(0px)' }}
							exit={{ opacity: 0, filter: 'blur(10px)' }}
							style={{ maxHeight: '100%', flex: 1}}
						>
							{previewElements.find(({ path }) => path === currentSlug)!.element}
						</motion.div>
					) : (
						<EmptyTrigger trigger={() => setCurrentSlug(targetSlug)} />
					)}
				</AnimatePresence>
			</div>
			<div id='blog-index'>
				{previewElements.map(({ path }) => {
					return (
					<motion.button
						key={path}
						onClick={() => navigate(path)}
						onMouseEnter={() => setTargetSlug(path)}
						onMouseLeave={() => {
							console.log("Mouse leave detected")
							setTargetSlug(undefined)
						}}
						variants={buttonVariants}
						animate={targetSlug ? path === targetSlug ? 'hover': 'nonHover' : 'normal'}
					>{path.replaceAll("-", " ")}</motion.button>
				)
				})}
			</div>
		</div >
	)
	if(!(previewElements.findIndex(({path}) => path === path) + 1)) return <FourOhFour />
	return (
		<div id='blog-md-wrapper'>
			<Outlet />
		</div>
	)
}
