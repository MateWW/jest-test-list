import { Text as NativeText } from "ink";
import { flags } from "../args";
import type { ReactNode } from "react";

interface Props {
	dimColor?: boolean;
	bold?: boolean;
	color?: string;
	children: ReactNode;
}

export function Text({ dimColor, bold, color, children }: Props) {
	if (flags.noColor) {
		return <NativeText>{children}</NativeText>;
	}
	return (
		<NativeText dimColor={dimColor} color={color} bold={bold}>
			{children}
		</NativeText>
	);
}
