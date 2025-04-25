import { deepGetValuesByKey } from './deepGetValuesByKey';

describe('deepGetValuesByKey', () => {
  it('인자로 받은 key에 해당하는 값을 찾는다.', () => {
    const obj = { a: 1, b: { c: 2 } };
    const result = deepGetValuesByKey(obj, 'c');
    expect(result).toEqual([2]);
  });

  it('key에 해당하는 값이 배열이면 배열을 반환한다.', () => {
    const obj = { a: 1, b: { c: [2, 3] } };
    const result = deepGetValuesByKey(obj, 'c');
    expect(result).toEqual([[2, 3]]);
  });

  it('key에 해당하는 값이 객체면 객체를 반환한다.', () => {
    const obj = { a: 1, b: { c: { d: 2 } } };
    const result = deepGetValuesByKey(obj, 'c');
    expect(result).toEqual([{ d: 2 }]);
  });

  it('key에 해당하는 값이 없으면 빈배열을 반환한다.', () => {
    const obj = { a: 1, b: { c: 2 } };
    const result = deepGetValuesByKey(obj, 'd');
    expect(result).toEqual([]);
  });

  it('key에 해당하는 값이 여러가지면 모든 값을 반환한다.', () => {
    const obj = { a: 1, b: { c: 2, d: 3 }, c: { e: 4 }, s: { c: [1, 2, { c: ['a', 'b'] }] } };
    const result = deepGetValuesByKey(obj, 'c');
    console.log(result);
    expect(result).toEqual([2, { e: 4 }, [1, 2, { c: ['a', 'b'] }], ['a', 'b']]);
  });
});
