import { isEqualWith } from './isEqualWith';

/**
 *
 * @param a 비교할 첫 번째 값
 * @param b 비교할 두 번째 값
 * @returns {boolean} 두 값이 같으면 true, 다르면 false
 */
export function isEqual(a: unknown, b: unknown): boolean {
  return isEqualWith(a, b, () => {});
}
