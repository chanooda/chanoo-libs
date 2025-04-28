/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Union을 Intersection으로 변환하는 타입
 * @argument U: Union 타입
 * @returns: Intersection 타입
 */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

/**
 * Union의 마지막 멤버를 뽑아내는 타입
 * @argument U: Union 타입
 * @returns: 마지막 멤버
 **/
export type LastInUnion<U> =
  UnionToIntersection<U extends any ? () => U : never> extends () => infer L ? L : never;
