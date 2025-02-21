import { useMemo, useState } from "react"
import { FaPlay, FaStepForward } from "react-icons/fa"
import { IoIosRefresh } from "react-icons/io"
import { LuRefreshCw } from "react-icons/lu"
import { TbRefresh } from "react-icons/tb"

export default function Pom() {
	const [studyTime, setStudy] = useState(25 * 60)
	const [breakTime, setBreakTime] = useState(5 * 60)
	const [studying, setStudying] = useState(true)
	const [currentTimer, setCurrentTimer] = useState(3 * studyTime / 4)
	const [numSessions, setNumSessions] = useState(2)

	const progress = useMemo(() => {
		if (studying) return currentTimer / studyTime
		return currentTimer / breakTime
	}, [currentTimer, studying])

	return (
		<div style={{
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			gap: '5vh'
		}}>
			<div style={{
				width: '52vh',
				height: '52vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<svg style={{
					width: '52vh',
					height: '52vh',
					position: 'absolute',
					overflow: 'visible'
				}}>
					<filter id="glow">
						<feGaussianBlur stdDeviation="10" result="coloredBlur" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
					<circle
						r='25vh'
						cx='26vh'
						cy='26vh'
						strokeWidth='2vh'
						fill='transparent'
						style={{
							strokeLinecap: 'round',
							stroke: 'var(--highlight-color)',
							strokeDashoffset: `${50 * Math.PI * 0.25}vh`,
							strokeDasharray: `${progress * Math.PI * 50}vh ${(1 - progress) * Math.PI * 50}vh`,
						}}
						filter='url(#glow)'
					/>
				</svg>
				<p style={{
					zIndex: 100,
					fontWeight: 900,
					fontSize: '10vh',
					margin: 0
				}}>11:45</p>
				<div style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyItems: 'center',
					gap: '1vh'
				}}>
					{Array.from({ length: 4 }, (_, index) => (
						<div style={{
							width: '2vh',
							height: '2vh',
							borderRadius: '50%',
							borderColor: 'var(--foreground-color)',
							border: 'solid',
							borderWidth: '0.35vh',
							backgroundColor: numSessions >= index + 1 ? 'var(--foreground-color)' : undefined
						}} />
					))}
				</div>
			</div>
			<div style={{
				display: 'flex',
				flexDirection: 'row',
				padding: 0,
				gap: 10,
				justifyContent: 'space-between',
				alignItems: 'center',
				width: '50vh'
			}}>
				<button
					style={{
						all: 'unset',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 10,
						padding: 10,
						border: 'solid',
						borderWidth: 2,
						borderColor: 'var(--foreground-color)'
					}}>
					<TbRefresh size={24}/>
					<p>Reset</p>
				</button>
				<button
					style={{
						all: 'unset',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 10,
						padding: 10,
						border: 'solid',
						borderWidth: 2,
						borderColor: 'var(--foreground-color)'
					}}>
					<FaPlay />
					<p>Start</p>
				</button>
				<button
					style={{
						all: 'unset',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 10,
						padding: 10,
						border: 'solid',
						borderWidth: 2,
						borderColor: 'var(--foreground-color)'
					}}>
					<FaStepForward />
					<p>Skip</p>
				</button>
			</div>
		</div>
	)
}
