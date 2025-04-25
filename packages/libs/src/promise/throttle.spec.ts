import { delay } from './delay';
import { throttle } from './throttle';

describe('throttle', () => {
  it('대기시간 동안 throttle 함수가 1번만 실행되어야 한다.', async () => {
    const fn = jest.fn();

    const throttled = throttle(fn, 50);

    throttled();
    throttled();
    throttled();
    throttled();

    await delay(50);

    throttled();

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('edges 옵션에 leading이 포함되면 1번 호출에 함수가 1번만 실행되어야 한다.', async () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100, { edges: ['leading'] });

    throttled();
    await delay(100);
    throttled();
    await delay(100);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('edges 옵션에 leading, trailing이 포함되면 1번째 호출에 1번, 2번째 호출부터 함수가 2번 실행되어야 한다.', async () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100, { edges: ['leading', 'trailing'] });

    throttled();
    await delay(100);
    throttled();
    await delay(100);

    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('throttled 함수에 인자가 올바르게 전달되어야 한다.', async () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);

    throttled('asd');

    expect(fn).toHaveBeenCalledWith('asd');
  });

  it('aborted 된 signal을 넘기면 함수가 실행되지 않아야 한다.', async () => {
    const fn = jest.fn();
    const controller = new AbortController();
    const throttled = throttle(fn, 100, { signal: controller.signal });
    controller.abort();

    throttled();
    throttled();

    expect(fn).not.toHaveBeenCalled();
  });
});
