import { debounce } from './debounce';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ThrottleArgs {
  /**
   * @default ['leading']
   */
  edges?: ('leading' | 'trailing')[];
  signal?: AbortSignal;
}

type ThrottleReturns<F extends (...args: any[]) => void> = ((...args: Parameters<F>) => void) & {
  /**
   * 진행중인 throttle 취소
   */
  cancel: () => void;
  /**
   * throttle 즉시 실행
   */
  flush: () => void;
};

/**
 *
 * @template F - throttle 함수의 타입
 * @param {F} func - throttle 함수
 * @param {number} ms - throttle 시간
 * @param {DebounceOptions} options - throttle 옵션
 * @param {DebounceOptions["edges"]} options.edges - throttle 옵션 (leading, trailing)
 * @param {DebounceOptions["signal"]} options.signal - throttle 중단할 AbortSignal
 *
 * @returns {DebounceReturns} cancel, flush을 가지는 새로운 throttle 함수를 반환
 *
 * @example
 * const throttledFunction = throttle(() => {
 *   console.log('Function executed');
 * }, 1000);
 *
 * throttledFunction();
 *
 * throttledFunction.cancel();
 */
export function throttle<F extends (...args: any[]) => void>(
  func: F,
  ms: number,
  { signal, edges = ['leading'] }: ThrottleArgs = {}
): ThrottleReturns<F> {
  let pendingAt: number = 0;

  const debounced = debounce(func, ms, { signal, edges });

  const throttled = function (...args: Parameters<F>) {
    if (!pendingAt) {
      pendingAt = Date.now();
    } else {
      if (Date.now() - pendingAt >= ms) {
        pendingAt = Date.now();
        debounced.cancel();
        debounced(...args);
      }
    }
    debounced(...args);
  };

  throttled.cancel = debounced.cancel;
  throttled.flush = debounced.flush;

  return throttled;
}
