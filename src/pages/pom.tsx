import { useEffect, useMemo, useRef, useState } from "react"
import { FaPause, FaPlay, FaStepForward } from "react-icons/fa"
import { TbRefresh } from "react-icons/tb"

export default function Pom() {
	const [studyTime, setStudy] = useState(10)
	const [breakTime, setBreakTime] = useState(10)
	const [studying, setStudying] = useState(true)
	const [currentTimer, setCurrentTimer] = useState(studyTime)
	const [paused, setPaused] = useState(true)
	const [numSessions, setNumSessions] = useState(0)
	const [studyStatus, setStudyStatus] = useState('Ready to begin?')
	const renderTime = useRef<number>(studyTime)
	const renderMins = useRef<number>(0)
	const renderSecs= useRef<number>(0)
	const renderProgress = useRef<number>(1)
	const interval = useRef<number>()

	const progress = useMemo(() => {
		if (studying) return currentTimer / studyTime
		return currentTimer / breakTime
	}, [currentTimer, studying])

	const [currentMins, currentSecs] = useMemo(() => {
		const cm = Math.floor(currentTimer / 60)
		const numSecs = currentTimer % 60
		const cs = numSecs < 10 ? `0${numSecs}` : numSecs
		return [cm, cs]
	}, [currentTimer])

	useEffect(() => {
		if (paused) {
			clearInterval(interval.current)
			interval.current = undefined
			setStudyStatus('Paused')
		}
		else {
			interval.current = setInterval(() => {
				setCurrentTimer(ct => ct - 1)
			}, 1000)
			setStudyStatus('Studying')
		}
	}, [paused])

	function findRenderTimestamps(){
		const cm = Math.floor(render/ 60)
		const numSecs = currentTimer % 60
		const cs = numSecs < 10 ? `0${numSecs}` : numSecs
		return [cm, cs]
	}

	function interpolateRenderedTime(){
			const diff: number = currentTimer - renderTime.current
			const diffAbs: number = Math.abs(diff)
			if (diffAbs === 0){
					return
			}
			else if (diffAbs > 1){
					renderTime.current = currentTimer
			} else {
					renderTime.current += diff / 10
			}
			requestAnimationFrame(interpolateRenderedTime)
	}

	useEffect(() => {
			interpolateRenderedTime()
	}, [currentTimer])

	useEffect(() => {
		if (currentTimer > 0) return
		if (studying) {
			setNumSessions((numSessions + 1) % 5)
			setCurrentTimer(breakTime)
			setStudyStatus('Break time')
		} else {
			setCurrentTimer(studyTime)
			setStudyStatus('Studing again')
		}
		setStudying(!studying)
	}, [currentTimer])

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
					fontWeight: 900,
					fontSize: '3vh',
					margin: 0
				}}>{studyStatus}</p>
				<p style={{
					fontWeight: 900,
					fontSize: '10vh',
					margin: 0
				}}>{`${currentMins}:${currentSecs}`}</p>
				<div style={{
					padding: '1vh',
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
					<TbRefresh size={24} />
					<p>Reset</p>
				</button>
				<button
					onClick={() => setPaused(!paused)}
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
					{paused ? (<FaPlay />) : (<FaPause />)}
					<p style={{ userSelect: 'none' }}>{paused ? 'Start' : 'Pause'}</p>
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
