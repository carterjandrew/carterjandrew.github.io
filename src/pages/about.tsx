import { send } from "@emailjs/browser";
import { useMemo, useState } from "react"

export default function About() {
	const [returnAddress, setReturnAddress] = useState("")
	const [message, setMessage] = useState("")

	const valid = useMemo(() => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if(returnAddress.length === 0) return 'Enter your email'
		if(!emailRegex.test(returnAddress)) return 'Invalid email'
		if(message.length === 0) return 'Add some text to the message'
		return ''
	}, [returnAddress, message])

	function sendEmail() {
		const templateParams = {
			from_name: returnAddress,
			message: message
		}
		send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, templateParams)
	}
	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', gap: 20}}>
			<div id='grid'>
				<p>LinkedIn</p>
				<p><a href="https://www.linkedin.com/in/carter-james-andrew/"> click here </a></p>
				<p>Github</p>
				<p><a href="https://github.com/carterjandrew"> click here </a></p>
			</div>
			<div id='emailform'>
				<h2>Send me a message</h2>
				<input value={returnAddress} placeholder='Your email' onChange={(e) => setReturnAddress(e.target.value)} />
				<textarea value={message} placeholder='Your message' onChange={(e) => setMessage(e.target.value)} />
				<button disabled={!valid.length} onClick={sendEmail}> {valid.length ? valid : 'Send Message'} </button>
			</div>
		</div>
	)
}
