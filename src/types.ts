import type { AssertionResult, TestResult } from "@jest/test-result";
export interface ExtendedTestResult extends TestResult {
	output: TreeItem[];
}

export interface TreeItemHook extends TreeItemBase {
	type: "hook";
}
export interface TreeItemTest extends TreeItemBase {
	type: "test";
	describe: string;
}
export interface TreeItemDescribe extends TreeItemBase {
	type: "describe";
	describe: string;
	children: TreeItem[];
}

interface TreeItemBase {
	ancestors: string[];
	callPath: string[];
}

export interface TreeError {
	type: "error";
	message: string;
	error: unknown;
}

export type TreeItem =
	| TreeItemHook
	| TreeItemTest
	| TreeItemDescribe
	| TreeError;
export type ExtendedTreeItem = TreeItem & { parent?: TreeItem };

export type TestsByFile = {
	filePath: string;
	testsTree: ExtendedTreeItem[];
};

export type JestExecError = {
	error: Error;
	stdout: string;
	stderr: string;
};
