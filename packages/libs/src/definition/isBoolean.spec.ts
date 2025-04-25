import { isBoolean } from './isBoolean';

describe('isBoolean', () => {
  it('boolean 값이 들어오면 true를 반환한다.', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  it('boolean 값이 아닌 값이 들어오면 false를 반환한다.', () => {
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean(123)).toBe(false);
    expect(isBoolean([1, 2, 3])).toBe(false);
    expect(isBoolean({})).toBe(false);
  });
});
