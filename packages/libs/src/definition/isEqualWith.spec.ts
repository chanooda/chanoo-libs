import { isEqualWith } from './isEqualWith';

describe('isEqualWith', () => {
  it('custom 함수를 통해 두 값을 비교할 수 있어야한다.', () => {
    expect(isEqualWith({ a: 1, b: 2 }, { a: 1 }, (x, y) => x.a === y.a)).toBe(true);
  });
});
