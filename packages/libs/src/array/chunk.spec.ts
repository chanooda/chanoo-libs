import { chunk } from './chunk';

describe('chunk', () => {
  it('size를 0이하로 주면 에러를 던진다.', () => {
    expect(() => {
      return chunk([], 0);
    }).toThrow();

    expect(() => {
      return chunk([], -1);
    }).toThrow();
  });

  it('빈배열과 올바른 size를 받으면 빈 배열을 반환한다.', () => {
    expect(chunk([], 1)).toEqual([]);
  });

  it('값이 들어있는 배열과 올바른 size를 받으면 size만큼 값을 분리하여 반환한다.', () => {
    expect(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });

  it('size가 배열의 길이보다 크면, 배열 전체를 하나의 청크로 반환한다.', () => {
    expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });
});
