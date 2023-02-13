export function FaqExpandBtn(props: {
	onToggle: () => void;
	title: string;
	expanded: boolean;
}) {
	return (
		<button
			onClick={props.onToggle}
			aria-expanded={props.expanded}
			aria-label={props.title}
			className="w-full flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-md mt-2 mb-0 ease-in-out relative z-10"
		>
			<span className="text-lg font-medium">{props.title}</span>
			<svg
				className={
					`w-5 h-5 transition-all duration-300` +
					(props.expanded ? " transform rotate-180" : "")
				}
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M19 9l-7 7-7-7"
				></path>
			</svg>
		</button>
	);
}
