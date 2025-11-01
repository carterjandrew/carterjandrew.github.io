import { forwardRef, useMemo } from 'react'
import { Uniform, Vector2 } from 'three'
import { Effect } from 'postprocessing'

const fragmentShader = `
	uniform float amount;

	float rand(float n) {
		return fract(sin(n) * 43758.5453123);
	}

	void mainUv(inout vec2 uv) {
		float row = floor(uv.y * resolution.y);
		float r = rand(row + time);
		r = (r - 0.5) * 2.0;
		uv.x += r * amount;
	}

	void mainImage(
		const in vec4 inputColor,
		const in vec2 uv,
		out vec4 outputColor
	) {
		outputColor = inputColor;
	}
`

let _uParam

type LensDistortionProps = {
	time: number
	amount: number
	resolution: Vector2
}

// Effect implementation
class LensDistiontionImpl extends Effect {
  constructor({ amount = 0.005 } = {}) {
    super('LensDistortion', fragmentShader, {
      uniforms: new Map([['amount', new Uniform(amount)]]),
    })

    _uParam = amount
  }

  update(renderer, inputBuffer, deltaTime) {
    this.uniforms.get('amount').value = _uParam
  }
}

// Effect component
export const LensDistortion = forwardRef<LensDistortionProps>((params, ref) => {
  const effect = useMemo(() => new LensDistiontionImpl(params), [params])
  return <primitive ref={ref} object={effect} dispose={null} />
})

