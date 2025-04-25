import { isObject } from './isObject';

describe('isObject', () => {
  it('순수 객체가 들어오면 true를 반환한다.', () => {
    expect(isObject({ a: 'a', 1: '2', 2: 1, b: 3 })).toBe(true);
  });

  it('순수 객체가 아닌 값이 들어오면 false를 반환한다.', () => {
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject(0)).toBe(false);
    expect(isObject(123)).toBe(false);
    expect(isObject([1, 2, 3])).toBe(false);
    expect(isObject('a')).toBe(false);
    expect(isObject(new Date())).toBe(false);
    expect(isObject(() => {})).toBe(false);
  });
});
