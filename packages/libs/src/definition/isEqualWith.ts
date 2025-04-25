import { getObjectSymbols, getObjectType } from '../_internal';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isEqualWith(
  a: any,
  b: any,
  areValuesEqual: (
    x: any,
    y: any,
    property?: PropertyKey,
    xParent?: any,
    yParent?: any,
    stack?: Map<any, any>
  ) => boolean | void
): boolean {
  return isEqualWithImpl(a, b, undefined, undefined, undefined, undefined, areValuesEqual);
}

function isEqualWithImpl(
  a: any,
  b: any,
  property: PropertyKey | undefined,
  aParent: any,
  bParent: any,
  stack: Map<any, any> | undefined,
  areValuesEqual: (
    x: any,
    y: any,
    property?: PropertyKey,
    xParent?: any,
    yParent?: any,
    stack?: Map<any, any>
  ) => boolean | void
) {
  const result = areValuesEqual(a, b, property, aParent, bParent, stack);

  if (result !== undefined) {
    return result;
  }

  if (typeof a === typeof b) {
    switch (typeof a) {
      case 'bigint':
      case 'boolean':
      case 'string':
      case 'symbol':
      case 'undefined':
      case 'function': {
        return a === b;
      }
      case 'number': {
        return a === b || Object.is(a, b);
      }
      case 'object': {
        return isObjectEqual(a, b, stack, areValuesEqual);
      }
    }
  }

  return isObjectEqual(a, b, stack, areValuesEqual);
}

function isObjectEqual(
  a: any,
  b: any,
  stack: Map<any, any> | undefined,
  areValuesEqual: (
    x: any,
    y: any,
    property?: PropertyKey,
    xParent?: any,
    yParent?: any,
    stack?: Map<any, any>
  ) => boolean | void
) {
  if (Object.is(a, b)) {
    return true;
  }

  let aObjectType = getObjectType(a);
  let bObjectType = getObjectType(b);

  if (aObjectType === 'Arguments') aObjectType = 'Object';
  if (bObjectType === 'Arguments') bObjectType = 'Object';

  if (aObjectType !== bObjectType) return false;

  switch (aObjectType) {
    case 'String':
      return a.toString() === b.toString();

    case 'Number':
      return a.valueOf() === b.valueOf();

    case 'Boolean':
    case 'Date':
    case 'Symbol':
      return Object.is(a.valueOf(), b.valueOf());

    case 'RegExp':
      return a.source === b.source && a.flags === b.flags;

    case 'Function': {
      return a === b;
    }
  }

  stack = stack ?? new Map();

  const aStack = stack.get(a);
  const bStack = stack.get(b);

  if (aStack != null && bStack != null) {
    return aStack === b;
  }

  stack.set(a, b);
  stack.set(b, a);

  try {
    switch (aObjectType) {
      case 'Map': {
        if (a.size !== b.size) {
          return false;
        }

        for (const [key, value] of a.entries()) {
          if (
            !b.has(key) ||
            !isEqualWithImpl(value, b.get(key), key, a, b, stack, areValuesEqual)
          ) {
            return false;
          }
        }

        return true;
      }

      case 'Set': {
        if (a.size !== b.size) {
          return false;
        }

        const aValues = Array.from(a.values());
        const bValues = Array.from(b.values());

        for (let i = 0; i < aValues.length; i++) {
          const aValue = aValues[i];
          const index = bValues.findIndex((bValue) => {
            return isEqualWithImpl(aValue, bValue, undefined, a, b, stack, areValuesEqual);
          });

          if (index === -1) {
            return false;
          }

          bValues.splice(index, 1);
        }

        return true;
      }

      case 'Array':
      case 'Uint8Array':
      case 'Uint8ClampedArray':
      case 'Uint16Array':
      case 'Uint32Array':
      case 'Int8Array':
      case 'Int16Array':
      case 'Int32Array':
      case 'Float32Array':
      case 'Float64Array': {
        if (typeof Buffer !== 'undefined' && Buffer.isBuffer(a) !== Buffer.isBuffer(b)) {
          return false;
        }

        if (a.length !== b.length) return false;

        for (let i = 0; i < a.length; i++) {
          if (!isEqualWithImpl(a[i], b[i], i, a, b, stack, areValuesEqual)) {
            return false;
          }
        }

        return true;
      }

      case 'ArrayBuffer': {
        if (a.byteLength !== b.byteLength) return false;

        return isObjectEqual(new Uint8Array(a), new Uint8Array(b), stack, areValuesEqual);
      }

      case 'DataView': {
        if (a.byteLength !== b.byteLength || a.byteOffset !== b.byteOffset) return false;

        return isObjectEqual(
          new Uint8Array(a.buffer),
          new Uint8Array(b.buffer),
          stack,
          areValuesEqual
        );
      }

      case 'Error': {
        return a.name === b.name && a.message === b.message;
      }

      case 'Object': {
        const areEqualInstances = isObjectEqual(
          a.constructor,
          b.constructor,
          stack,
          areValuesEqual
        );

        if (!areEqualInstances) {
          return false;
        }

        const aKeys = [...Object.keys(a), ...getObjectSymbols(a)];
        const bKeys = [...Object.keys(b), ...getObjectSymbols(b)];

        if (aKeys.length !== bKeys.length) {
          return false;
        }

        for (let i = 0; i < aKeys.length; i++) {
          const propKey = aKeys[i] as PropertyKey;
          const aProp = (a as any)[propKey];

          if (!Object.hasOwn(b, propKey)) {
            return false;
          }

          const bProp = (b as any)[propKey];

          if (!isEqualWithImpl(aProp, bProp, propKey, a, b, stack, areValuesEqual)) {
            return false;
          }
        }

        return true;
      }

      default:
        return false;
    }
  } finally {
    stack?.delete(a);
    stack?.delete(b);
  }

  return false;
}
