export default function Resume(){
	const link = "https://raw.githubusercontent.com/carterjandrew/resume/refs/heads/main/resume.pdf"
	return (
			<object
				data={link}
				type='application/pdf'
				width='100%'
				height='100%'
			>
				<p> Unable to display PDF file.
				 <a href={link}>Open here</a>
						</p>
			</object>
	)
}
