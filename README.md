# jest-test-list

`jest-test-list` is a powerful and flexible CLI tool for listing Jest tests in your project. With support for customizable output formats, clipboard integration, and Jest CLI options, it provides a streamlined way to inspect and manage your test suite.

---

## Features

### CLI
  - **Output Formats**: Display test lists as `inline` or in a `tree` structure.
  - **Color Control**: Enable or disable colored output.
  - **Clipboard Integration**: Copy test lists directly to your clipboard.
  - **Customizable Package Management**: Specify a package manager or allow auto-detection.
  - **Working Directory Flexibility**: Run Jest commands from any directory.
  - **Extended Jest Options**: Pass any valid Jest CLI options.

### API
  - Use the API method `extractTree` to programmatically access test lists.

---

## Installation

Install `jest-test-list` globally using npm or yarn:

```bash
npx jest-test-list
bunx jest-test-list
pnpm exec jest-test-list
```

or

```bash

```

---

## Usage

```bash
npx jest-test-list <flags> <jest-options>
```

### Options

| Option                  | Alias | Description                                              | Default              |
|-------------------------|-------|----------------------------------------------------------|----------------------|
| `--format`             | `-f` | Output format: `inline` or `tree`                       | `tree`              |
| `--noColor`            |       | Disable color output                                     | `false`             |
| `--copyToClipboard`    | `-c` | Copy the output to the clipboard                        | `false`             |
| `--packageManager`     | `-p` | Specify package manager to use (e.g., `npm`, `yarn`)    | `auto`              |
| `--workingDir`         | `-w` | Set working directory to run Jest in                    | Current directory   |
| `--maxBuffer`          |       | Set max buffer size for child process                   | `1024 * 1024` bytes |
| `-- <jest-options>`    |       | Any valid Jest CLI options                              | -                   |

---

## Examples

### Basic Usage

List all tests in the default format:
```bash
npx jest-test-list
```

### Disable Color Output

Run without color formatting:
```bash
npx jest-test-list --noColor -- <jest-options>
```

### Specify Jest Options

Pass specific Jest CLI options:
```bash
npx jest-test-list -- --runInBand -- MyTestFile.test.ts
```

### Copy to Clipboard

Copy test results directly to the clipboard:
```bash
npx jest-test-list --copyToClipboard
```

### Change Output Format

List tests in an inline format:
```bash
npx jest-test-list --format inline
```

---

### API Usage

The `jest-test-list` package provides an API method for programmatic usage:

#### `extractTree`

```typescript
interface ExtractTreeOptions {
  packageManager?: string;
  maxBuffer?: number;
  extras?: string;
  cwd?: string;
}

export async function extractTree(options: ExtractTreeOptions = {}): Promise<TestsByFile[]>;
```

#### Parameters
- `packageManager` (optional): Specify the package manager to use (e.g., `npm`, `yarn`).
- `maxBuffer` (optional): Set the maximum buffer size for the child process.
- `extras` (optional): Additional CLI arguments to pass.
- `cwd` (optional): Specify the current working directory for the Jest process.

#### Returns
A promise that resolves to an array of `TestsByFile` objects, representing the extracted test structure.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to your branch.
4. Submit a pull request with a detailed description of your changes.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Feedback & Support

For issues, feature requests, or general questions, please open an issue in the [GitHub repository](https://github.com/your-repo/jest-test-list).

