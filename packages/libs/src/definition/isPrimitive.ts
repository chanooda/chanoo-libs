export const isPrimitive = (
  value: unknown
): value is null | undefined | boolean | number | string | symbol | bigint => {
  return value === null || (typeof value !== 'object' && typeof value !== 'function');
};
