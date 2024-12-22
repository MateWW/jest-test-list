// Import modules to be mocked
const myModule = require('../myModule');
const anotherModule = require('../anotherModule');

// Example mock module
jest.disableAutomock();

jest.setMock('../myModule', {
  someFunction: jest.fn(() => 'mocked implementation'),
});

jest.mock('../anotherModule', () => ({
  anotherFunction: jest.fn(() => 'factory implementation'),
}));

const mockedAnotherModule = jest.mocked(anotherModule);

jest.unmock('../myModule');
jest.deepUnmock('../myModule');

jest.doMock('../anotherModule', () => ({
  anotherFunction: jest.fn(() => 'new factory implementation'),
}));

jest.dontMock('../myModule');

jest.resetModules();

jest.isolateModules(() => {
  return require('../myModule');
});

jest.isolateModulesAsync(async () => {
  return require('../myModule');
});

describe('Jest methods test suite', () => {
  beforeEach(() => {
    jest.resetModules();
    console.log(myModule);
  });

  test('jest.requireActual', () => {
    const actualModule = jest.requireActual('../myModule');
    expect(actualModule.someFunction()).toBe('actual implementation');
  });

  test('jest.requireMock', () => {
    jest.mock('../myModule', () => ({
      someFunction: jest.fn(() => 'mocked implementation'),
    }));
    const mockedModule = jest.requireMock('../myModule');
    expect(mockedModule.someFunction()).toBe('mocked implementation');
  });

  test('jest.mocked', () => {
    expect(mockedAnotherModule.anotherFunction()).toBe('factory implementation');
  });

  test('jest.isolateModules', () => {
    jest.isolateModules(() => {
      const isolatedModule = require('../myModule');
      expect(isolatedModule.someFunction()).toBeDefined();
    });
  });

  test('jest.isolateModulesAsync', async () => {
    await jest.isolateModulesAsync(async () => {
      const isolatedModule = require('../myModule');
      expect(isolatedModule.someFunction()).toBeDefined();
    });
  });

  test('jest.setMock and jest.createMockFromModule', () => {
    const mockFromModule = jest.createMockFromModule('../myModule');
    jest.setMock('../myModule', mockFromModule);

    const mocked = require('../myModule');
    expect(mocked.someFunction).toBeDefined();
  });
});
