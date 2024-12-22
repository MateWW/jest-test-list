import { describe, expect, test } from "bun:test";
import {extractTree} from '../dist/api';
import {resolve} from 'path'


describe('API tests', () => {
  test('should extract tree from example app', async () => {
    expect(extractTree({cwd: resolve(__dirname, '../examples/basic-jest-tests')})).resolves.toMatchSnapshot();
  });
});