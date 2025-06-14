/* eslint-disable @typescript-eslint/no-explicit-any */

import type { LastInUnion } from './internal.types';

/**
 * T: 원본 Tuple
 * S: Chunk 크기 (number 리터럴)
 * Temp: 현재 누적 중인 청크
 */
export type Chunk<
  T extends readonly unknown[],
  S extends number,
  Temp extends unknown[] = [],
> = T extends [infer Head, ...infer Tail]
  ? // 아직 T에 요소가 남아있는 경우
    Temp['length'] extends S
    ? // Temp의 길이가 S에 도달하면, 지금까지 모은 Temp를 하나의 청크로 확정하고
      // 남은 튜플(Tail)을 다시 처리
      [Temp, ...Chunk<[Head, ...Tail], S>]
    : // 아직 청크가 완성되지 않았다면 Head를 Temp에 추가
      Chunk<Tail, S, [...Temp, Head]>
  : // 더 이상 남은 요소가 없다면, 마지막 Temp가 비어있는지 확인
    Temp['length'] extends 0
    ? []
    : [Temp];

/**
 * Union 타입을 튜플로 변환하는 타입
 * @argument U: Union 타입
 * @argument R: 현재까지 누적된 Tuple
 * @returns: Tuple 타입
 */
export type UnionToTuple<U, R extends any[] = []> = [U] extends [never]
  ? R
  : UnionToTuple<Exclude<U, LastInUnion<U>>, [LastInUnion<U>, ...R]>;
