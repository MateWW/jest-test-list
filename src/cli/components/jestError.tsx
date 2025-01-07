import { Box } from "ink";
import type { JestExecError } from "../../types";
import { Text } from "./Text";

interface JestErrorProps {
	error: JestExecError;
}

export function JestError({ error }: JestErrorProps) {
	return (
		<Box flexDirection="column">
			<Text dimColor>
				We failed to execute "jest" function with the following message:
			</Text>
			<Box paddingLeft={2} flexDirection="column">
				<Text color="red">{error.error.message}</Text>
				<Text>{error.stdout}</Text>
				<Text>{error.stderr}</Text>
			</Box>
		</Box>
	);
}
