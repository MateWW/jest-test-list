import meow from "meow";

const cli = meow(
	`
  Usage
  $ jest-test-list <flags> <jest-options>

  Options
    --format, -f  output "inline" or "tree" (default: "tree")
    --noColor     disable color output
    --copyToClipboard, -c  copy the output to the clipboard
    --packageManager, -p  package manager to use (default: auto)
    --workingDir, -w  working directory to run Jest in (default: cwd)
    --maxBuffer  max buffer size for the child process (default: 1024 * 1024)
    -- <jest-options> any valid Jest CLI options

  Examples
    $ jest-test-list --noColor -- <jest-options>
    $ jest-test-list --noColor -- --runInBand --copyToClipboard MyTestFile.test.ts
    $ jest-test-list -- MyTestFile.test.ts
`,
	{
		importMeta: import.meta,
		allowUnknownFlags: true,
		flags: {
			format: {
				type: "string",
				choices: ["inline", "tree"],
				default: "tree",
				shortFlag: "f",
			},
			noColor: {
				type: "boolean",
				default: false,
			},
			copyToClipboard: {
				type: "boolean",
				default: false,
				shortFlag: "c",
			},
			packageManager: {
				type: "string",
				default: "auto",
				shortFlag: "p",
			},
			workingDir: {
				type: "string",
				default: process.cwd(),
				shortFlag: "w",
			},
			maxBuffer: {
				type: "number",
				default: 1024 * 102,
			},
		},
	},
);

export const flags = cli.flags;
export const jestFlags = cli.input;
