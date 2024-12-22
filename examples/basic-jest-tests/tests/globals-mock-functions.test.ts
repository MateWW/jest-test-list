// Import modules
const myModule = require('../myModule');

// Test suite demonstrating advanced Jest functionalities
describe('Advanced Jest methods test suite', () => {
  let obj = { prop: 42, method: () => 'original implementation', computed: 0 };

  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
  jest.replaceProperty(obj, 'prop', 100);


  test('jest.fn', () => {
    const mockFn = jest.fn(() => 'mock implementation');
    expect(mockFn()).toBe('mock implementation');
  });

  test('jest.isMockFunction', () => {
    const mockFn = jest.fn();
    expect(jest.isMockFunction(mockFn)).toBe(true);
    expect(jest.isMockFunction(obj.method)).toBe(false);
  });

  test('jest.replaceProperty', () => {
    jest.replaceProperty(obj, 'prop', 100);
    expect(obj.prop).toBe(100);
    jest.replaceProperty(obj, 'prop', 42);
    expect(obj.prop).toBe(42);
  });

  test('jest.spyOn (method)', () => {
    const spy = jest.spyOn(obj, 'method');
    obj.method?.();
    expect(spy).toHaveBeenCalled();
  });

  test('jest.spyOn (getter)', () => {
    Object.defineProperty(obj, 'computed', {
      get: () => 10,
    });
    const spy = jest.spyOn(obj, 'computed', 'get');
    const value = obj.computed;
    expect(spy).toHaveBeenCalled();
    expect(value).toBe(10);
  });

  test('jest.clearAllMocks', () => {
    const mockFn = jest.fn();
    mockFn();
    jest.clearAllMocks();
    expect(mockFn).not.toHaveBeenCalled();
  });

  test('jest.resetAllMocks', () => {
    const mockFn = jest.fn(() => 'initial');
    mockFn.mockImplementation(() => 'modified');
    jest.resetAllMocks();
    expect(mockFn()).toBeUndefined();
  });

  test('jest.restoreAllMocks', () => {
    const spy = jest.spyOn(obj, 'method').mockImplementation(() => 'mocked');
    expect(obj.method()).toBe('mocked');
    jest.restoreAllMocks();
    jest.clearAllMocks();
    expect(obj.method()).toBe('original implementation');
    expect(spy).not.toHaveBeenCalled();
  });
});
