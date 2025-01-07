import clipboard from "clipboardy";
import type { FormattedLinesByFile } from "./hooks/useFormattedLinesByFile";

export function saveToClipboard(formattedResults: FormattedLinesByFile[]) {
	clipboard.writeSync(
		formattedResults
			.reduce((acc, file) => {
				const title = `${file.fileName}`;
				const lines = file.lines.map((line) => {
					const separator = " ".repeat(2 + 2 * line.depth);
					return `${separator}${line.parts.map((part) => part.text).join(" ")}`;
				});
				const content = `${title}\n${lines.join("\n")}\n\n`;
				return acc + content;
			}, "")
			.trim(),
	);
}
