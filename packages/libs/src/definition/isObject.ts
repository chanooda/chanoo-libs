import { getObjectType } from '../_internal';

export const isObject = (value: unknown): value is object => getObjectType(value) === 'Object';
