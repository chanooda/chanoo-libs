/**
 * 중첩된 객체에서 key와 일치하는 **첫 번째** 값을 찾아 반환합니다.
 * @param obj 탐색할 객체 (혹은 배열)
 * @param key 찾고자 하는 프로퍼티 이름
 * @returns 해당 key의 값 (없으면 undefined)
 */
export function deepGetValueByKey(obj: unknown, key: string): unknown | undefined {
  if (obj === null || typeof obj !== 'object') {
    return undefined;
  }

  // 배열이면 각 요소를 순회
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const found = deepGetValueByKey(item, key);
      if (found !== undefined) return found;
    }
    return undefined;
  }

  // 객체인 경우
  const record = obj as Record<string, unknown>;

  for (const k of Object.keys(record)) {
    if (k === key) return record[k];
    const found = deepGetValueByKey(record[k], key);
    if (found !== undefined) return found;
  }

  return undefined;
}
