import { useEffect, useMemo } from "react";
import { Box, Newline, render, Text, Transform } from "ink";
import { flags, jestFlags } from "./cli/args";
import { Progress } from "./cli/components/progress";
import { Logo } from "./cli/components/logo";
import { Params } from "./cli/components/params";
import { List } from "./cli/components/list";
import { extractTree } from "./api";
import { useTestsList } from "./cli/hooks/useTestsList";
import { JestError } from "./cli/components/jestError";
import { saveToClipboard } from "./cli/clipboard";
import { useFormattedLinesByFile } from "./cli/hooks/useFormattedLinesByFile";

const results = extractTree({
	packageManager:
		flags.packageManager !== "auto" ? flags.packageManager : undefined,
	cwd: flags.workingDir,
	extras: jestFlags.join(" "),
	maxBuffer: flags.maxBuffer,
});

const TestsResults = () => {
	const state = useTestsList(results);
	const formattedItems = useFormattedLinesByFile(state.data);

	useEffect(() => {
		if (formattedItems.length > 0 && flags.copyToClipboard) {
			saveToClipboard(formattedItems);
		}
	}, [formattedItems]);

	if (state.loading) {
		return <Progress text="Working on your tests list" />;
	}

	if (state.error) {
		return <JestError error={state.error} />;
	}

	return <List formattedItems={formattedItems} />;
};

const App = () => {
	return (
		<Box flexDirection="column">
			<Logo />
			<Params />
			<TestsResults />
		</Box>
	);
};

render(<App />);
