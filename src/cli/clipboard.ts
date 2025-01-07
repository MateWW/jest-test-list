import clipboard from "clipboardy";

export function saveToClipboard(formattedResults: string) {
	clipboard.writeSync(formattedResults);
}
