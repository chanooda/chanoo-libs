/* eslint-disable @typescript-eslint/no-explicit-any */

import { isObject } from '../definition/isObject';
import type { DeepMerge } from '../types';

export function mergeObject<T extends object, U extends object>(
  target: T,
  source: U
): DeepMerge<T, U> {
  const result = { ...target } as any;

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = (result as any)[key];

      if (isObject(sourceValue) && isObject(targetValue)) {
        result[key] = mergeObject(targetValue, sourceValue);
      } else {
        result[key] = sourceValue;
      }
    }
  }

  return result;
}
