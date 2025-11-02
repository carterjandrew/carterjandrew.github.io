import { CSSProperties, ReactNode, useId } from "react"


type GlitchProps = SVGElement & {
	scale: number
	baseFreqX: number
	baseFreqY: number
	durationSec: number
	className: string
	style: CSSProperties
	children: ReactNode
}

export default function Glitch ({
	scale = 7,
  baseFreqX = 0.008,
  baseFreqY = 0.25,
  durationSec = 0.6,
  className,
  children,
}: GlitchProps){
	const uid = useId()
	const filterId = `glitchFilter-${uid}`

	return (
		<>
		<svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          {/* Noise source */}
          <feTurbulence
            type="turbulence"
            baseFrequency={`${baseFreqX} ${baseFreqY}`}
            numOctaves="2"
            seed="2"
            result="noise"
          >
            {/* Animate the noise; SMIL is widely supported in modern browsers */}
            <animate
              attributeName="seed"
              values="2;50"
              dur={`${durationSec}s`}
              repeatCount="indefinite"
            />
          </feTurbulence>

          {/* Keep horizontal displacement strong by zeroing G/B */}
          <feColorMatrix
            in="noise"
            type="matrix"
            result="xBias"
            values={`
              1 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 0 0 1 0
            `}
          />
          <feDisplacementMap
            in="SourceGraphic"
            scale={scale}
            yChannelSelector="G"
          />
        </filter>
      </svg>
			<span
				className={className}
				style={{
					filter: `url(#${filterId})`,
				}}
			>{children}</span>
		</>
	)
}
