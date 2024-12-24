#!/usr/bin/env node
const importLocal = require('import-local');

if (!importLocal(__filename)) {
  import('jest-test-list/cli');
}