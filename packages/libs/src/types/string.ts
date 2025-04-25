/**
 * Converts a camelCase string to snake_case.
 * @example
 * type Test = CamelToSnake<'fooBar'> // 'foo_bar'
 */
export type CamelToSnake<T extends string> = T extends `${infer First}${infer Rest}`
  ? `${First extends Lowercase<First> ? '' : '_'}${Lowercase<First>}${CamelToSnake<Rest>}`
  : '';

/**
 * Converts a snake_case string to camelCase.
 * @example
 * type Test = SnakeToCamel<'foo_bar'> // 'fooBar'
 */
export type SnakeToCamel<T extends string> = T extends `${infer Head}_${infer Tail}`
  ? `${Head}${Capitalize<SnakeToCamel<Tail>>}`
  : T;

/**
 * Converts a PascalCase string to kebab-case.
 * @example
 * type Test = PascalToKebab<'FooBar'> // 'foo-bar'
 */
export type PascalToKebab<T extends string> = T extends `${infer First}${infer Rest}`
  ? `${First extends Lowercase<First> ? '' : '-'}${Lowercase<First>}${PascalToKebab<Rest>}`
  : '';

/**
 * Converts a kebab-case string to PascalCase.
 * @example
 * type Test = KebabToPascal<'foo-bar'> // 'FooBar'
 */
export type KebabToPascal<T extends string> = T extends `${infer Part}-${infer Rest}`
  ? `${Capitalize<Part>}${KebabToPascal<Rest>}`
  : Capitalize<T>;

/**
 * Converts a kebab-case string to camelCase.
 * @example
 * type Test = KebabToCamel<'foo-bar'> // 'fooBar'
 */
export type KebabToCamel<T extends string> = T extends `${infer Part}-${infer Rest}`
  ? `${Part}${Capitalize<KebabToCamel<Rest>>}`
  : T;

/**
 * Converts a PascalCase string to snake_case.
 * @example
 * type Test = PascalToSnake<'FooBar'> // 'foo_bar'
 */
export type PascalToSnake<T extends string> = T extends `${infer First}${infer Rest}`
  ? `${First extends Lowercase<First> ? '' : '_'}${Lowercase<First>}${PascalToSnake<Rest>}`
  : '';

/**
 * Converts a camelCase string to PascalCase.
 * @example
 * type Test = CamelToPascal<'fooBar'> // 'FooBar'
 */
export type CamelToPascal<T extends string> = Capitalize<T>;

/**
 * Converts a PascalCase string to camelCase.
 * @example
 * type Test = PascalToCamel<'FooBar'> // 'fooBar'
 */
export type PascalToCamel<T extends string> = Uncapitalize<T>;

/**
 * Converts a camelCase string to UPPER_SNAKE_CASE.
 * @example
 * type Test = ToUpperSnakeCase<'fooBar'> // 'FOO_BAR'
 */
export type ToUpperSnakeCase<T extends string> = Uppercase<CamelToSnake<T>>;

/**
 * Converts a string to lowercase.
 * @example
 * type Test = ToLower<'FOOBAR'> // 'foobar'
 */
export type ToLower<T extends string> = Lowercase<T>;

/**
 * Converts a string to uppercase.
 * @example
 * type Test = ToUpper<'foobar'> // 'FOOBAR'
 */
export type ToUpper<T extends string> = Uppercase<T>;

/**
 * Removes a prefix from a string.
 * @example
 * type Test = RemovePrefix<'foobar', 'foo'> // 'bar'
 */
export type RemovePrefix<
  T extends string,
  Prefix extends string,
> = T extends `${Prefix}${infer Rest}` ? Rest : T;

/**
 * Removes a suffix from a string.
 * @example
 * type Test = RemoveSuffix<'foobar', 'bar'> // 'foo'
 */
export type RemoveSuffix<
  T extends string,
  Suffix extends string,
> = T extends `${infer Rest}${Suffix}` ? Rest : T;
