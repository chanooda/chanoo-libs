/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEqual } from './isEqual';

describe('first', () => {
  it('원시값이 같으면 true를 반환해야 한다.', () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual(1, 2)).toBe(false);

    expect(isEqual(BigInt(20), BigInt(20))).toBe(true);
    expect(isEqual(BigInt(20), BigInt(21))).toBe(false);

    expect(isEqual('a', 'a')).toBe(true);
    expect(isEqual('a', 'b')).toBe(false);

    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(false, false)).toBe(true);
    expect(isEqual(true, false)).toBe(false);

    expect(isEqual(Symbol(2), Symbol(2))).toBe(false);
    expect(isEqual(Symbol('a'), Symbol('a'))).toBe(false);
    const a = Symbol('a');
    expect(isEqual(a, a)).toBe(true);

    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);

    expect(
      isEqual(
        () => {},
        () => {}
      )
    ).toBe(false);
    const b = () => {};
    expect(isEqual(b, b)).toBe(true);
  });

  it('Map 이 같으면 true를 반환해야 한다.', () => {
    const map1 = new Map();
    const map2 = new Map();
    expect(isEqual(map1, map2)).toBe(true);
    map1.set('a', 1);
    expect(isEqual(map1, map2)).toBe(false);
    map2.set('a', 1);
    expect(isEqual(map1, map2)).toBe(true);

    map1.set('b', { a: { b: [1, 2, { b: 3 }, [1, 2, 3], new Set([1, 4, 51, '1'])] } });
    map2.set('b', { a: { b: [1, 2, { b: 3 }, [1, 2, 3], new Set([1, 4, 51, '1'])] } });
    expect(isEqual(map1, map2)).toBe(true);
  });

  it('Set이 같으면 true를 반환해야 한다.', () => {
    const set1 = new Set();
    const set2 = new Set();

    expect(isEqual(set1, set2)).toBe(true);
    set1.add('a');
    expect(isEqual(set1, set2)).toBe(false);
    set2.add('a');
    expect(isEqual(set1, set2)).toBe(true);
    expect(isEqual(set1, set1)).toBe(true);
  });

  it('object가 같으면 true를 반환해야 한다.', () => {
    expect(isEqual({}, {})).toBe(true);
    expect(isEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(isEqual({ a: 1, b: { c: 2, d: 3, e: 4 } }, { a: 1, b: { c: 2, d: 3, e: 4 } })).toBe(
      true
    );
    expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(isEqual({ a: 1, b: { c: 2 } }, { a: 2, c: { d: 2 } })).toBe(false);
  });

  it('array가 같으면 true를 반환해야 한다.', () => {
    expect(isEqual([], [])).toBe(true);
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isEqual(['a', 'b', 'c'], ['a', 'b', 'c'])).toBe(true);
    expect(isEqual([{ a: 1 }, { b: 2 }, { c: 3 }], [{ a: 1 }, { b: 2 }, { c: 3 }])).toBe(true);
    expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(isEqual([1, 2, 3], [1, 2, 4, 5])).toBe(false);
    expect(isEqual(['a', 'b', 'c'], ['a', 'b', 'd'])).toBe(false);
    expect(isEqual([{ a: 1 }, { b: 2 }, { c: 3 }], [{ a: 1 }, { b: 2 }, { c: 4 }])).toBe(false);
  });

  it('typed array가 같으면 true를 반환해야 한다.', () => {
    const a = new Uint8Array(2);
    const b = new Uint8Array(2);
    a[0] = 1;
    b[0] = 1;
    expect(isEqual(a, b)).toBe(true);
    a[0] = 2;
    expect(isEqual(a, b)).toBe(false);

    const c = new Float32Array(2);
    const d = new Float32Array(3);
    expect(isEqual(c, d)).toBe(false);

    const e = new Int8Array(2);
    const f = new Int8Array(2);
    expect(isEqual(e, f)).toBe(true);
    f[0] = 12;
    expect(isEqual(e, f)).toBe(false);
  });

  it('DataView가 같으면 true를 반환한다.', () => {
    const a = new DataView(new ArrayBuffer(2));
    const b = new DataView(new ArrayBuffer(2));
    expect(isEqual(a, b)).toBe(true);
    a.setInt8(0, 1);
    b.setInt8(0, 1);
    expect(isEqual(a, b)).toBe(true);
    a.setInt8(0, 2);
    expect(isEqual(a, b)).toBe(false);
  });

  it('Error가 같으면 true를 반환한다.', () => {
    const a = new Error('a');
    const b = new Error('a');
    expect(isEqual(a, b)).toBe(true);
    const c = new Error('b');
    expect(isEqual(a, c)).toBe(false);
  });

  it('Date가 같으면 true를 반환해야 한다.', () => {
    const date1 = new Date('2021-01-01');
    const date2 = new Date('2021-01-01');
    expect(isEqual(date1, date2)).toBe(true);
    date1.setFullYear(2022);
    expect(isEqual(date1, date2)).toBe(false);
  });

  it('RegExp가 같으면 true를 반환해야 한다.', () => {
    expect(isEqual(/a/g, /a/g)).toBe(true);
    expect(isEqual(/a/g, /b/g)).toBe(false);
  });

  it('특수 경우 비교', () => {
    expect(isEqual(NaN, NaN)).toBe(true);
    expect(isEqual(0, -0)).toBe(true);
    expect(isEqual(-0, 0)).toBe(true);
    expect(isEqual(+0, -0)).toBe(true);
  });

  it('순환참조가 있는 경우에도 같으면 true를 반환해야 한다.', () => {
    const obj1 = { a: 'a' } as any;
    const obj2 = { a: 'a' } as any;

    obj1.self = obj1;
    obj2.self = obj2;

    expect(isEqual(obj1, obj2)).toBe(true);

    const object1: any = {
      foo: { b: { c: { d: {} } } },
      bar: { a: 2 },
    };

    const object2: any = {
      foo: { b: { c: { d: {} } } },
      bar: { a: 2 },
    };

    object1.foo.b.c.d = object1;
    object1.bar.b = object1.foo.b;

    object2.foo.b.c.d = object2;
    object2.bar.b = object2.foo.b;

    expect(isEqual(object1, object2)).toBe(true);
  });
});
