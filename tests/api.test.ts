import { resolve, relative } from "node:path";
import { describe, expect, test } from "bun:test";
import { extractTree } from "../dist/api";

describe("API tests", () => {
	test("should extract tree from example app", async () => {
		const result = await extractTree({
			cwd: resolve(__dirname, "../examples/basic-jest-tests"),
		});
		const resolvedFilePaths = result.map(({ filePath, ...rest }) => ({
			filePath: relative(__dirname, filePath),
			...rest,
		}));
		expect(resolvedFilePaths).toMatchSnapshot();
	});
});
