import { useEffect, useState } from "react";
import { Text } from "./Text";

const progressSigns = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

interface Props {
	text: string;
}

export function Progress({ text }: Props) {
	const [position, setPosition] = useState(0);
	useEffect(() => {
		const timer = setInterval(() => {
			setPosition((position) => (position + 1) % progressSigns.length);
		}, 80);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<Text>
			{progressSigns[position]} {text}
		</Text>
	);
}
