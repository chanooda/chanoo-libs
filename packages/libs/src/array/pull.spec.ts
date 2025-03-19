import { pull } from './pull';

describe('pull', () => {
  it('대상 array에 존재하는 값들을 제거한다.', () => {
    const arr = [1, 2, 3];
    pull(arr, [2]);

    expect(arr).toEqual([1, 3]);
  });

  it('대상 array에 중복으로 존재하는 값들을 제거한다.', () => {
    const arr = [1, 2, 3, 2, 2, 2];
    pull(arr, [2]);

    expect(arr).toEqual([1, 3]);
  });

  it('대상 array에 존재하지 않는 값들을 제거한다.', () => {
    const arr = [1, 2, 3];
    pull(arr, [4]);

    expect(arr).toEqual([1, 2, 3]);
  });

  it('제거할 배열 목록에 undefined가 들어있으면 무시한다.', () => {
    const arr = [1, 2, 3];
    pull(arr, [undefined]);

    expect(arr).toEqual([1, 2, 3]);
  });
});
