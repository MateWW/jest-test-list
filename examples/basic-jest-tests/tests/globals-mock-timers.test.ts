describe('Jest Fake Timers Methods', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('jest.useFakeTimers()', () => {
    jest.useFakeTimers();
    const callback = jest.fn();
    setTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
  });

  test('jest.useRealTimers()', () => {
    jest.useFakeTimers();
    jest.useRealTimers();
    expect(() => jest.advanceTimersByTime(1000)).toThrow();
  });

  test('jest.runAllTicks()', () => {
    const callback = jest.fn();
    Promise.resolve().then(callback);
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTicks();
    expect(callback).toHaveBeenCalled();
  });

  test('jest.runAllTimers()', () => {
    const callback = jest.fn();
    setTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
  });

  test('jest.runAllTimersAsync()', async () => {
    const callback = jest.fn();
    setTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    await jest.runAllTimersAsync();
    expect(callback).toHaveBeenCalled();
  });

  test('jest.runAllImmediates()', () => {
    const callback = jest.fn();
    setImmediate(callback);
    expect(callback).not.toHaveBeenCalled();
    jest.runAllImmediates();
    expect(callback).toHaveBeenCalled();
  });

  test('jest.advanceTimersByTime()', () => {
    const callback = jest.fn();
    setTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
  });

  test('jest.advanceTimersByTimeAsync()', async () => {
    const callback = jest.fn();
    setTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    await jest.advanceTimersByTimeAsync(1000);
    expect(callback).toHaveBeenCalled();
  });

  test('jest.runOnlyPendingTimers()', () => {
    const callback = jest.fn();
    setTimeout(callback, 1000);
    jest.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalled();
  });

  test('jest.runOnlyPendingTimersAsync()', async () => {
    const callback = jest.fn();
    setTimeout(callback, 1000);
    jest.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();
    await jest.runOnlyPendingTimersAsync();
    expect(callback).toHaveBeenCalled();
  });

  test('jest.advanceTimersToNextTimer()', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    setTimeout(callback1, 500);
    setTimeout(callback2, 1000);
    jest.advanceTimersToNextTimer();
    expect(callback1).toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
    jest.advanceTimersToNextTimer();
    expect(callback2).toHaveBeenCalled();
  });

  test('jest.advanceTimersToNextTimerAsync()', async () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    setTimeout(callback1, 500);
    setTimeout(callback2, 1000);
    await jest.advanceTimersToNextTimerAsync();
    expect(callback1).toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
    await jest.advanceTimersToNextTimerAsync();
    expect(callback2).toHaveBeenCalled();
  });

  test('jest.clearAllTimers()', () => {
    const callback = jest.fn();
    setTimeout(callback, 1000);
    jest.clearAllTimers();
    jest.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
  });

  test('jest.getTimerCount()', () => {
    setTimeout(() => {}, 1000);
    setInterval(() => {}, 1000);
    expect(jest.getTimerCount()).toBe(2);
  });

  test('jest.now()', () => {
    jest.setSystemTime(new Date('2020-01-01T00:00:00Z'));
    expect(jest.now()).toBe(new Date('2020-01-01T00:00:00Z').getTime());
  });

  test('jest.setSystemTime()', () => {
    jest.setSystemTime(new Date('2020-01-01T00:00:00Z'));
    expect(new Date().toISOString()).toBe('2020-01-01T00:00:00.000Z');
  });

  test('jest.getRealSystemTime()', () => {
    jest.setSystemTime(new Date('2020-01-01T00:00:00Z'));
    const realTime = jest.getRealSystemTime();
    expect(realTime).not.toBe(new Date('2020-01-01T00:00:00Z').getTime());
  });
});
