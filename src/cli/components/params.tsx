import { Box } from "ink";
import { jestFlags, flags } from "../args";
import { Text } from "./Text";

interface Props {
	selected: boolean;
}

function Selection({ selected }: Props) {
	return selected ? <Text color="green">✔</Text> : <Text color="red">✘</Text>;
}

export function Params() {
	return (
		<Box flexDirection="column" paddingBottom={1}>
			<Text dimColor>Selected options:</Text>
			<Box paddingLeft={2}>
				<Box width={22}>
					<Text>format: </Text>
				</Box>
				<Text color="blueBright">{flags.format}</Text>
			</Box>
			<Box paddingLeft={2}>
				<Box width={22}>
					<Text>no color: </Text>
				</Box>
				<Selection selected={flags.noColor} />
			</Box>
			<Box paddingLeft={2} paddingBottom={1}>
				<Box width={22}>
					<Text>copy to clipboard: </Text>
				</Box>
				<Selection selected={flags.copyToClipboard} />
			</Box>
			<Text dimColor>Jest flags:</Text>
			<Box paddingLeft={2}>
				<Text>{jestFlags.join(" ")}</Text>
			</Box>
		</Box>
	);
}
