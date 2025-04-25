import { mergeObject } from './mergeObject';

describe('mergeObject', () => {
  it('should merge two objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    const result = mergeObject(obj1, obj2);
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });
  it('should merge nested objects', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { b: { d: 3 }, e: 4 };
    const result = mergeObject(obj1, obj2);
    expect(result).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 });
  });
  it('value가 array인 object가 병합되어야 한다. ', () => {
    const obj1 = { a: 1, b: [1, 2] };
    const obj2 = { b: [3, 4], c: 4 };
    const result = mergeObject(obj1, obj2);
    expect(result).toEqual({ a: 1, b: [3, 4], c: 4 });
  });
});
