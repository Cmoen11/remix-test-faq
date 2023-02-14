export function FaqAnswer(props: { answer: string; expanded: boolean }) {
	return (
		<div
			id="faq-answer"
			className={`text-black p-4 bg-gray-50 rounded-md mt-2 mb-0 ease-in-out relative z-10 overflow-hidden transition-all duration-100`}
			aria-hidden={!props.expanded}
			aria-describedby="faq-answer"
			style={
				!props.expanded
					? {
							maxHeight: 0,
							paddingTop: 0,
							paddingBottom: 0,
							marginTop: 0,
							marginBottom: 0,
					  }
					: {}
			}
		>
			{props.answer}
		</div>
	);
}
