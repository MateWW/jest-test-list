import { exec } from "node:child_process";
import { detect } from "detect-package-manager";
import type {
	ExtendedTreeItem,
	JestExecError,
	TestsByFile,
	TreeItem,
} from "./types";
import { createRequire } from "node:module";

function bindParent(tree: TreeItem[], parent?: TreeItem): ExtendedTreeItem[] {
	return tree.map((item) => {
		if ("children" in item) {
			return { ...item, parent, children: bindParent(item.children, item) };
		}
		return { ...item, parent };
	});
}

function hydrateResults(result: string) {
	const lines = result.trim().split("\n");
	const items = JSON.parse(lines[lines.length - 1]) as [string, TreeItem[]][];
	return items.map(([filePath, tree]) => ({
		filePath,
		testsTree: bindParent(tree),
	}));
}

interface ExtractTreeOptions {
	packageManager?: string;
	maxBuffer?: number;
	extras?: string;
	cwd?: string;
}

export async function extractTree(options: ExtractTreeOptions = {}) {
	const cwd = options.cwd ?? process.cwd();
	const localRequire = globalThis.require || createRequire(import.meta.url);
	const reporterPath = localRequire.resolve("./reporter");
	const runnerPath = localRequire.resolve("./runner");
	const packageManager = options.packageManager ?? (await detect({ cwd }));
	return new Promise<TestsByFile[]>((resolve, reject) =>
		exec(
			`${packageManager} jest --reporters ${reporterPath} --testRunner ${runnerPath} ${options.extras ?? ""}`,
			{ cwd, maxBuffer: options.maxBuffer },
			(err, stdout, stderr) => {
				if (err) {
					reject({
						error: err,
						stdout,
						stderr,
					} satisfies JestExecError);
					return;
				}
				resolve(hydrateResults(stdout));
			},
		),
	);
}
