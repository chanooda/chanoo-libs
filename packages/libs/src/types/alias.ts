/**
 * 자바스크릡트의 기본 유형 type
 */
export type Primitive = string | number | bigint | boolean | symbol | null | undefined;

/**
 * 거짓에 관련된 값의 type (NaN)은 제외
 */
export type Falsy = false | '' | 0 | null | undefined;

/**
 * 값이 falsy 한 값인지 확인하는 type guard
 */
export const isFalsy = (val: unknown): val is Falsy => !val;

/**
 * null과 undefined
 */
export type Nullish = null | undefined;

/**
 * nullish한 값이 확인하는 type guard
 */
export const isNullish = (val: unknown): val is Nullish => val == null;
