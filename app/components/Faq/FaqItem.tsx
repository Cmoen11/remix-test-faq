import { useState } from "react";
import { FaqExpandBtn } from "./FaqExpandBtn";
import { FaqAnswer } from "./FaqAnswer";

export function FaqItem(props: {
	title: string;
	answer: string;
	defaultExpanded?: boolean;
}) {
	const [isExpanded, setIsExpanded] = useState(!!props.defaultExpanded);

	function toggleExpanded() {
		setIsExpanded(!isExpanded);
	}

	return (
		<div className="w-full">
			<FaqExpandBtn
				onToggle={toggleExpanded}
				title={props.title}
				expanded={isExpanded}
			/>
			<FaqAnswer answer={props.answer} expanded={isExpanded} />
		</div>
	);
}
