import { delay } from './delay';

describe('delay', () => {
  it('0.1초 delay가 제대로 동작하는지 테스트', async () => {
    const start = performance.now();
    await delay(100);
    const end = performance.now();
    expect(end - start).toBeGreaterThanOrEqual(99);
  });

  it('abortController를 통해 delay가 제대로 중단되는지 테스트 (abortType = error) ', async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => {
      controller.abort();
    }, 10);

    await expect(delay(1000, { signal })).rejects.toThrow();
  });

  it('abortController를 통해 delay가 제대로 중단되는지 테스트 (abortType = continue) ', async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const spy = jest.spyOn(console, 'log');

    const start = performance.now();
    console.log('delay 이전');
    setTimeout(() => {
      controller.abort();
    }, 10);
    await delay(100, { signal, abortType: 'continue' });
    const end = performance.now();
    console.log('delay 이후');

    expect(end - start).toBeLessThan(99);
    expect(spy).toHaveBeenCalledWith('delay 이후');
    spy.mockRestore();
  });

  it('abort 이후 delay 실행되지 않는지 테스트', async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const spy = jest.spyOn(global, 'setTimeout');

    controller.abort();

    await expect(delay(1000, { signal })).rejects.toThrow();

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('abort 이후 cleatTimeout이 제대로 동작하는지 테스트', async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const spy = jest.spyOn(global, 'clearTimeout');
    const promise = delay(100, { signal });

    controller.abort();

    await expect(promise).rejects.toThrow();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('abort 이후 removeEventListener가 제대로 동작하는지 테스트', async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const spy = jest.spyOn(signal, 'removeEventListener');

    await delay(1000, { signal });

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
