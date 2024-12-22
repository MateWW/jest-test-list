describe("Jest Global Test Definition APIs", () => {
  const greet = (name: string) => `Hello, ${name}!`;
  const sum = (x: number, y: number) => x + y;

  // Lifecycle hooks
  beforeAll(() => console.log("beforeAll: Runs before all tests"), 1000);
  afterAll(() => console.log("afterAll: Runs after all tests"), 1000);
  beforeEach(() => console.log("beforeEach: Runs before each test"), 1000);
  afterEach(() => console.log("afterEach: Runs after each test"), 1000);

  // describe.each - Array-based
  describe.each([
    [1, 1, 2],
    [2, 3, 5],
    [3, 5, 8],
  ])("describe.each (Array): Adding %i and %i", (a, b, expected) => {
    it(`should return ${expected}`, () => {
      expect(a + b).toBe(expected);
    });
  });

  // describe.each - Template-literal-based
  describe.each`
    a    | b    | expected
    ${1} | ${2} | ${3}
    ${3} | ${4} | ${7}
    ${5} | ${6} | ${11}
    `("describe.each (Template): Adding $a and $b", ({a, b, expected}) => {
    it(`should return ${expected}`, () => {
      expect(a + b).toBe(expected);
    });
  });

  // describe.only.each - Array-based
  describe.only.each([
    ["Alice", "Hello, Alice!"],
    ["Bob", "Hello, Bob!"],
  ])("describe.only.each (Array): Greeting %s", (name, expectedGreeting) => {
    it(`should return "${expectedGreeting}"`, () => {
      expect(greet(name)).toBe(expectedGreeting);
    });
  });

  // describe.only.each - Template-literal-based
  describe.only.each`
    name    | greeting
    ${"Alice"} | ${"Hello, Alice!"}
    ${"Bob"}   | ${"Hello, Bob!"}
  `("describe.only.each (Template): Greeting $name", ({ name, greeting }) => {
    it(`should return "${greeting}"`, () => {
      expect(greet(name)).toBe(greeting);
    });
  });

  // describe.skip.each - Array-based
  describe.skip.each([
    ["Monday", "Tuesday"],
    ["Wednesday", "Thursday"],
  ])("describe.skip.each (Array): Skipping weekdays %s and %s", (day1, day2) => {
    it(`will not run for ${day1} and ${day2}`, () => {
      expect([day1, day2]).toContain("Friday");
    });
  });

  // describe.skip.each - Template-literal-based
  describe.skip.each`
    day1        | day2
    ${"Monday"} | ${"Tuesday"}
    ${"Friday"} | ${"Saturday"}
  `("describe.skip.each (Template): Skipping $day1 and $day2", ({ day1, day2 }) => {
    it(`will not run for ${day1} and ${day2}`, () => {
      expect([day1, day2]).toContain("Sunday");
    });
  });

  // it.concurrent.each - Array-based
  it.concurrent.each([
    [1, 2, 3],
    [4, 5, 9],
  ])("it.concurrent.each (Array): %i + %i = %i", async (a, b, expected) => {
    await expect(sum(a, b)).toBe(expected);
  });

  // it.concurrent.each - Template-literal-based
  it.concurrent.each`
    a    | b    | expected
    ${1} | ${2} | ${3}
    ${3} | ${5} | ${8}
  `("it.concurrent.each (Template): Adding $a and $b", async ({ a, b, expected }) => {
    await expect(sum(a, b)).toBe(expected);
  });

  // it.concurrent.only.each - Array-based
  it.concurrent.only.each([
    [3, 2, 5],
    [10, 15, 25],
  ])("it.concurrent.only.each (Array): %i + %i = %i", async (a, b, expected) => {
    
    await expect(sum(a, b)).toBe(expected);
  });

  // it.concurrent.only.each - Template-literal-based
  it.concurrent.only.each`
    a     | b     | expected
    ${10} | ${20} | ${30}
    ${15} | ${25} | ${40}
  `("it.concurrent.only.each (Template): Adding $a and $b", async ({ a, b, expected }) => {
    await expect(sum(a, b)).toBe(expected);
  });

  // it.concurrent.skip.each - Array-based
  it.concurrent.skip.each([
    [6, 3, 9],
    [7, 8, 15],
  ])("it.concurrent.skip.each (Array): Skips %i + %i = %i", async (a, b, expected) => {
    await expect(sum(a, b)).toBe(expected);
  });

  // it.concurrent.skip.each - Template-literal-based
  it.concurrent.skip.each`
    a    | b    | expected
    ${2} | ${3} | ${5}
    ${4} | ${6} | ${10}
  `("it.concurrent.skip.each (Template): Adding $a and $b", async ({ a, b, expected }) => {
    await expect(sum(a, b)).toBe(expected);
  });
  
  // it.each - Array-based
  it.each([
    [5, 5, 10],
    [10, 10, 20],
  ])("it.each (Array): %i + %i = %i", (a, b, expected) => {
    expect(a + b).toBe(expected);
  });

  // it.each - Template-literal-based
  it.each`
    a     | b     | expected
    ${10} | ${15} | ${25}
    ${20} | ${30} | ${50}
  `("it.each (Template): Adding $a and $b", ({ a, b, expected }) => {
    expect(a + b).toBe(expected);
  });


  // it.failing
  it.failing("it.failing: Known failing test", () => {
    expect(() => {
      throw new Error("Expected failure");
    }).toThrow("Expected failure");
  });

  // it.failing.each
  it.failing.each([
    [1, 2],
    [3, 4],
  ])("it.failing.each: Always fails with %i and %i", (a, b) => {
    throw new Error(`This test fails with ${a} and ${b}`);
  });

  // it.failing.each - Template-literal-based
  it.failing.each`
    a    | b
    ${1} | ${2}
    ${3} | ${4}
  `("it.failing.each (Template): Always fails with $a and $b", ({ a, b }) => {
    throw new Error(`This test fails with ${a} and ${b}`);
  });


  // it.only.failing
  it.only.failing("it.only.failing: Exclusive failing test", () => {
    throw new Error("Exclusive failing test");
  });

  // it.skip.failing
  it.skip.failing("it.skip.failing: Skipped failing test", () => {
    throw new Error("This will not run");
  });

  it.only.each([
    ["apple", "APPLE"],
    ["banana", "BANANA"],
  ])("it.only.each: Uppercase %s to %s", (input, expected) => {
    expect(input.toUpperCase()).toBe(expected);
  });

  // it.skip.each - Template-literal-based
  it.skip.each`
    x     | y     | expected
    ${100}| ${50} | ${150}
  `("it.skip.each (Template): $x + $y", ({ x, y, expected }) => {
    expect(x + y).toBe(expected)
  });
});