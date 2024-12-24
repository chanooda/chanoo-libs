import { debounce } from './debounce';
import { delay } from './delay';

describe('debounce', () => {
  it('debounce 함수가 실행되어야 한다.', async () => {
    const func = jest.fn();

    const debouncedFunction = debounce(func, 50);

    debouncedFunction();
    debouncedFunction();
    debouncedFunction();

    await delay(100);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('대기시간동안 함수가 호출되면 안된다.', async () => {
    const func = jest.fn();

    const debouncedFunc = debounce(func, 50);

    debouncedFunc();

    await delay(50 / 2);

    expect(func).not.toHaveBeenCalled();

    await delay(50 / 2 + 1);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('debounced 함수가 호출되면 대기시간이 초기화되어야 한다.', async () => {
    const func = jest.fn();

    const debouncedFunc = debounce(func, 50);

    debouncedFunc();
    await delay(48);
    debouncedFunc();
    await delay(48);
    debouncedFunc();

    expect(func).not.toHaveBeenCalled();
    await delay(50);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('debounced 함수의 cancel 메서드를 통해 호출을 취소할 수 있어야 한다.', async () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 50);

    debouncedFunc();

    debouncedFunc.cancel();

    await delay(51);

    expect(func).not.toHaveBeenCalled();
  });

  it('debounced 함수의 flush 메서드를 통해 함수를 즉시 실행할 수 있어야 한다.', async () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 50);

    debouncedFunc();

    debouncedFunc.flush();

    expect(func).toHaveBeenCalled();
  });

  it('대기 시간이 종료된다면 debounced 함수를 호출할 수 있어야 한다.', async () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 50);

    debouncedFunc();
    await delay(50);
    debouncedFunc();
    await delay(50);

    expect(func).toHaveBeenCalledTimes(2);
  });

  it('debounced 함수가 호출되지 않으면, cancel 메서드를 호출해도 아무일이 없어야 한다.', () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 50);

    expect(() => {
      return debouncedFunc.cancel();
    }).not.toThrow();
  });

  it('abortController를 이용해 debounced 함수가 중단되어야 한다.', async () => {
    const func = jest.fn();
    const controller = new AbortController();
    const signal = controller.signal;
    const debouncedFunc = debounce(func, 50, { signal });

    debouncedFunc();
    controller.abort();
    await delay(50);

    expect(func).not.toHaveBeenCalled();
  });

  it('이미 abort된 signal을 넘겨받은 debounced 함수는 호출되지 않아야 한다.', async () => {
    const func = jest.fn();
    const controller = new AbortController();
    const signal = controller.signal;
    controller.abort();

    const debouncedFunc = debounce(func, 50, { signal: signal });

    debouncedFunc();

    await delay(50);

    expect(func).not.toHaveBeenCalled();
  });
});
