import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react'
import LazyMdx, { LazyMdxProps, MdxMappingItem } from '../components/lazyMdx';
import { AnimatePresence, Variants } from 'framer-motion';
import EmptyTrigger from '../components/emptyTrigger';
import FourOhFour from './404';


const projectPreviewElements: MdxMappingItem[] = Object.entries(import.meta.glob('../project-previews/**.mdx')).map(([key, mdxFunction]) => ({
	path: key.replace('../project-previews/', '')
		.replace('.mdx', ''),
	element: <LazyMdx
		key={key}
		importHook={mdxFunction as LazyMdxProps['importHook']}
	/>,
}));

export default function ProjectsIndex() {
	const navigate = useNavigate()
	const locaiton = useLocation()
	const [delayedLocation, setDelayedLocation] = useState(locaiton)
	const [currentSlug, setCurrentSlug] = useState<string>()
	const [targetSlug, setTargetSlug] = useState<string>()
	const projectName = useMemo(() => delayedLocation.pathname.replace('/projects/', ''), [delayedLocation])

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
		setDelayedLocation(locaiton)
	}, [])

	useEffect(() => {
		console.log("Target slug update to:", targetSlug)
		if(!currentSlug) setCurrentSlug(targetSlug)
	}, [targetSlug])

	if (delayedLocation.pathname === '/projects') return (
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
							{projectPreviewElements.find(({ path }) => path === currentSlug)!.element}
						</motion.div>
					) : (
						<EmptyTrigger trigger={() => setCurrentSlug(targetSlug)} />
					)}
				</AnimatePresence>
			</div>
			<div id='blog-index'>
				{projectPreviewElements.map(({ path }) => {
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
	if(!(projectPreviewElements.findIndex(({path}) => path === projectName) + 1)) return <FourOhFour />
	return (
		<div id='blog-md-wrapper'>
			<Outlet />
		</div>
	)
}
