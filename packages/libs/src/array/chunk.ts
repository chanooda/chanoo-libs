import type { Chunk } from '../types/array.types';

export function chunk<T extends unknown[], C extends number>(arr: [...T], size: C): Chunk<T, C> {
  // 런타임 구현
  if (size <= 0) {
    // 청크 크기가 0 이하인 경우, 여기서는 빈 배열을 반환 (혹은 에러 throw)
    throw new Error('size는 0보다 커야 합니다.');
  }

  // 여기서의 result는 실제 런타임 동작을 위해 unknown[][]로 두어도 무방.
  // 추후 리턴 시 Chunk<T,C>로 단언(assert) 처리한다.
  const length = arr.length;
  const chunkCount = Math.ceil(length / size);
  const result = new Array<unknown>(chunkCount);

  let start = 0;
  let i = 0;
  while (start < length) {
    result[i++] = arr.slice(start, start + size);
    start += size;
  }

  return result as Chunk<T, C>;
}
