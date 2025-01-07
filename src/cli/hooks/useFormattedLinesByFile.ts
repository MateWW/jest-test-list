import path from "node:path";
import { useMemo } from "react";
import type { ExtendedTreeItem, TestsByFile } from "../../types";
import { flags } from "../args";
import { format, type FormattedLine } from "../format";

export type FormattedLinesByFile = {
	fileName: string;
	lines: FormattedLine[];
};

export function useFormattedLinesByFile(
	data: TestsByFile[],
): FormattedLinesByFile[] {
	return useMemo(
		() =>
			data.map((file) => ({
				fileName: path.relative(flags.workingDir, file.filePath),
				lines: format(file.testsTree),
			})),
		[data],
	);
}
