import type { ObjectType } from './objectType';

/**
 *
 * @param value object 세부 타입을 확인할 값
 * @returns {ObjectType} object 세부 타입
 *
 * @example
 * getObjectType(new Date) // 'Date'
 * getObjectType([]) // 'Array'
 * getObjectType(new Float32Array()) // 'Float32Array'
 */
export function getObjectType<T>(value: T): ObjectType {
  return Object.prototype.toString.call(value).slice(8, -1) as ObjectType;
}
