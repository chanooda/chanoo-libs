interface DelayArgs {
  abortType?: 'continue' | 'error';
  signal?: AbortSignal;
}

const REJECT_ERROR = 'delay - signal aborted error';

/**
 *
 * @param {number} ms 대기 시간 (ms)
 * @param {DelayArgs} options delay 옵션 객체
 * @param {AbortSignal} options.signal - delay를 중단할 AbortSignal
 * @param {DelayArgs["abortType"]} options.abortType - delay를 중단할 때에 reject할지 resolve할지 결정
 * @returns {Promise<void>}
 *
 * @example
 * console.log('start');
 * delay(1000);
 * console.log('end');
 */
export const delay = (
  ms: number,
  { signal, abortType = 'error' }: DelayArgs = {}
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const abort = () => {
      if (abortType === 'error') {
        reject(new Error(REJECT_ERROR));
      }

      if (abortType === 'continue') {
        resolve();
      }
    };

    const abortHandler = () => {
      clearTimeout(timeId);
      abort();
    };

    if (signal?.aborted) return abort();

    const timeId = setTimeout(() => {
      signal?.removeEventListener('abort', abortHandler);
      resolve();
    }, ms);

    signal?.addEventListener('abort', abortHandler, { once: true });
  });
};
