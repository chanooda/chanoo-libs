/**
 * 중첩된 객체에서 key와 일치하는 **모든** 값을 찾아 배열로 반환합니다.
 * @param obj 탐색할 객체 (혹은 배열)
 * @param key 찾고자 하는 프로퍼티 이름
 * @returns 일치하는 모든 값이 담긴 배열 (없으면 빈 배열)
 */
export function deepGetValuesByKey(obj: unknown, key: string): unknown[] {
  const results: unknown[] = [];

  function helper(node: unknown) {
    if (node === null || typeof node !== 'object') return;

    if (Array.isArray(node)) {
      for (const item of node) {
        helper(item);
      }
      return;
    }

    const record = node as Record<string, unknown>;
    for (const [k, v] of Object.entries(record)) {
      if (k === key) {
        results.push(v);
      }
      helper(v);
    }
  }

  helper(obj);
  return results;
}
