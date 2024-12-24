import { isPrimitive } from './isPrimitive';

describe('isPrimitive', () => {
  it('원시 값이 인자로 들어오면 true를 반환해야 한다.', () => {
    const isNull = isPrimitive(null);
    expect(isNull).toBe(true);

    const isUndefined = isPrimitive(undefined);
    expect(isUndefined).toBe(true);

    const isBoolean = isPrimitive(false);
    expect(isBoolean).toBe(true);

    const isNumber = isPrimitive(0);
    expect(isNumber).toBe(true);

    const isString = isPrimitive('');
    expect(isString).toBe(true);

    const isSymbol = isPrimitive(Symbol());
    expect(isSymbol).toBe(true);

    const isBigInt = isPrimitive(BigInt(0));
    expect(isBigInt).toBe(true);
  });

  it('원시 값이 아닌 인자로 들어오면 false를 반환해야 한다.', () => {
    const isObject = isPrimitive({});
    expect(isObject).toBe(false);

    const isFunction = isPrimitive(() => {});
    expect(isFunction).toBe(false);

    const isDate = isPrimitive(new Date());
    expect(isDate).toBe(false);

    const isArray = isPrimitive([]);
    expect(isArray).toBe(false);

    const isMap = isPrimitive(new Map());
    expect(isMap).toBe(false);

    const isSet = isPrimitive(new Set());
    expect(isSet).toBe(false);
  });
});
