import type { AggregatedResult } from "@jest/test-result";
import type { Config } from "@jest/types";
import type { ExtendedTestResult, TreeItem } from "./types";

/**
 * The test runner function passed to Jest
 */
export default function SimpleReporter(this: any, globalConfig: Config.GlobalConfig | AggregatedResult) {
  const results = new Map<string, TreeItem[]>();
  this.onTestResult = (_data: any, result: ExtendedTestResult) => {
    results.set(result.testFilePath, result.output)
  };

  this.onRunComplete = (_contexts: any, _testData: AggregatedResult) => {
    const collator = Intl.Collator()
    console.log(JSON.stringify(Array.from(results.entries()).sort(([a], [b]) => collator.compare(a,b))));
  }
}