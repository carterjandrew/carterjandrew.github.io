import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useBlog } from '../hooks/contextHooks'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import LazyMdx, { LazyMdxProps, MdxMappingItem } from '../components/lazyMdx';
import EmptyTrigger from '../components/emptyTrigger';
import FourOhFour from './404';

const blogPreviewElements: MdxMappingItem[] = Object.entries(import.meta.glob('../blog-previews/**.mdx')).map(([key, mdxFunction]) => ({
	path: key.replace('../blog-previews/', '').replace('.mdx', ''),
	element: <LazyMdx importHook={mdxFunction as LazyMdxProps['importHook']} />,
}));

export default function BlogIndex() {
	const navigate = useNavigate()
	const locaiton = useLocation()
	const blog = useBlog()
	const [delayedLocation, setDelayedLocation] = useState(locaiton)
	const [currentSlug, setCurrentSlug] = useState<string>()
	const [targetSlug, setTargetSlug] = useState<string>()
	const blogName = useMemo(() => delayedLocation.pathname.replace('/blog/', ''), [delayedLocation])
	const itemExists = useMemo(
		() => blogPreviewElements.findIndex(
			({ path }) => path === blogName
		) != -1
		, [blogName]
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
		setDelayedLocation(locaiton)
	}, [])

	useEffect(() => {
		if (!currentSlug) setCurrentSlug(targetSlug)
	}, [targetSlug])

	if (delayedLocation.pathname === '/blog') return (
		<div id='blog-wrapper'>
			<div id='blog-preview-wrapper' style={{ flex: 1 }}>
				<AnimatePresence mode='wait'>
					{targetSlug && targetSlug === currentSlug ? (
						<motion.div
							initial={{ opacity: 0, filter: 'blur(50px)' }}
							animate={{ opacity: 1, filter: 'blur(0px)' }}
							exit={{ opacity: 0, filter: 'blur(10px)' }}
							style={{ maxHeight: '100%' }}
						>
							{blogPreviewElements.find(({ path }) => path === currentSlug)!.element}
						</motion.div>
					) : (
						<EmptyTrigger trigger={() => setCurrentSlug(targetSlug)} />
					)}
				</AnimatePresence>
			</div>
			<div id='blog-index'>
				{blog.map(({ path }) => (
					<motion.button
						key={path}
						onClick={() => navigate(path)}
						onMouseEnter={() => setTargetSlug(path)}
						onMouseLeave={() => setTargetSlug(undefined)}
						variants={buttonVariants}
						animate={targetSlug ? path === targetSlug ? 'hover' : 'nonHover' : 'normal'}
					>{path}</motion.button>
				))}
			</div>
		</div >
	)
	if (!itemExists) return <FourOhFour />
	return (
		<div id='blog-md-wrapper'>
			<Outlet />
		</div>
	)
}
