/* eslint-disable @typescript-eslint/no-explicit-any */
interface DebounceOptions {
  /**
   * @default ['trailing']
   */
  edges?: ('leading' | 'trailing')[];
  signal?: AbortSignal;
}

type DebounceReturns<F extends (...args: unknown[]) => void> = ((
  ...args: Parameters<F>
) => void) & {
  /**
   * 진행중인 debounce 취소
   */
  cancel: () => void;
  /**
   * 함수를 delay 없이 즉시 실행
   */
  flush: () => void;
  /**
   * debounce 단일 실행
   */
  schedule: () => void;
};

/**
 *
 * @template F - debounce 함수의 타입
 * @param {F} fun - debounce 함수
 * @param {number} ms - debounce 시간
 * @param {DebounceOptions} options - debounce 옵션
 * @param {DebounceOptions["edges"]} options.edges - debounce 옵션 (leading, trailing)
 * @param {DebounceOptions["signal"]} options.signal - debounce 중단할 AbortSignal
 *
 * @returns {DebounceReturns} cancel, flush, schedule 을 가지는 새로운 debounce 함수를 반환
 *
 * @example
 * const debouncedFunction = debounce(() => {
 *   console.log('Function executed');
 * }, 1000);
 *
 * debouncedFunction();
 *
 * debouncedFunction.cancel();
 */
export function debounce<F extends (...args: any[]) => void>(
  fun: F,
  ms: number,
  { edges = ['trailing'], signal }: DebounceOptions = {}
): DebounceReturns<F> {
  let pendingThis: any = undefined,
    pendingArgs: Parameters<F> | null = null;
  let timeOutId: NodeJS.Timeout | null = null;

  const isTrailing = edges?.includes('trailing');
  const isLeading = edges?.includes('leading');

  const handleTimeOut = () => {
    if (isTrailing) {
      invoke();
    }

    cancel();
  };

  const invoke = () => {
    if (pendingArgs !== null) {
      fun.apply(pendingThis, pendingArgs);
      pendingArgs = null;
      pendingThis = undefined;
    }
  };

  // 즉시 debounce 재실행
  const schedule = () => {
    if (timeOutId !== null) {
      clearTimeout(timeOutId);
    }

    timeOutId = setTimeout(() => {
      timeOutId = null;

      handleTimeOut();
    }, ms);
  };

  const cancelTimer = () => {
    if (timeOutId !== null) {
      clearTimeout(timeOutId!);
      timeOutId = null;
    }
  };

  // 진행중인 debounce 취소
  const cancel = () => {
    cancelTimer();
    pendingArgs = null;
    pendingThis = undefined;
  };

  // 즉시 함수 실행
  const flush = () => {
    cancelTimer();
    invoke();
  };

  const debounced = function (this: unknown, ...args: Parameters<F>) {
    if (signal?.aborted) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    pendingThis = this;
    pendingArgs = args;

    const isFirstCall = timeOutId === null;

    schedule();

    if (isLeading && isFirstCall) {
      invoke();
    }
  };

  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.schedule = schedule;

  signal?.addEventListener('abort', cancel, { once: true });

  return debounced;
}
