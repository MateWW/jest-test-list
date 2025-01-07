import type { TreeItem } from "../types";
import { flags } from "./args";

export interface FormattedLine {
	depth: number;
	parts: FormattedPart[];
}

interface FormattedPart {
	text: string;
	color: string;
}

const colors = ["yellow", "blue", "magenta", "cyan", "white"];

function formatInline(results: TreeItem[]) {
	const lines: FormattedLine[] = [];

	function formatChildren(children: TreeItem[], line: FormattedPart[] = []) {
		for (const child of children) {
			switch (child.type) {
				case "hook":
					continue;

				case "error":
					lines.push({
						depth: 0,
						parts: [...line, { text: child.message, color: "red" }],
					});
					continue;

				case "describe": {
					const color = colors[line.length % colors.length];
					const newLine = [...line, { text: child.describe, color }];

					if ("children" in child && child.children) {
						formatChildren(child.children, newLine);
						continue;
					}

					lines.push({ depth: 0, parts: newLine });
					continue;
				}

				case "test":
					lines.push({
						depth: 0,
						parts: [...line, { text: child.describe, color: "green" }],
					});
					continue;
			}
		}
	}

	formatChildren(results);
	return lines;
}

function formatTree(results: TreeItem[]) {
	const lines: FormattedLine[] = [];

	function formatChildren(children: TreeItem[], depth = 0) {
		for (const child of children) {
			switch (child.type) {
				case "hook":
					continue;

				case "error":
					lines.push({
						depth,
						parts: [{ text: child.message, color: "red" }],
					});
					continue;

				case "describe": {
					const color = colors[depth % colors.length];
					lines.push({ depth, parts: [{ text: child.describe, color }] });

					if ("children" in child && child.children) {
						formatChildren(child.children, depth + 1);
						continue;
					}

					continue;
				}

				case "test":
					lines.push({
						depth,
						parts: [{ text: child.describe, color: "green" }],
					});
					continue;
			}
		}
	}

	formatChildren(results);
	return lines;
}

export function format(results: TreeItem[]) {
	switch (flags.format) {
		case "inline":
			return formatInline(results);
		case "tree":
			return formatTree(results);
		default:
			return [];
	}
}
