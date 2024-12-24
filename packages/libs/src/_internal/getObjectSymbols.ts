/**
 * 열거 가능한(enumerable) symbol 목록을 가져옵니다.
 * @param object 대상 객체
 * @returns 열거 가능한(enumerable) symbol 목록
 */
export function getObjectSymbols(object: object) {
  return Object.getOwnPropertySymbols(object).filter((symbol) =>
    Object.prototype.propertyIsEnumerable.call(object, symbol)
  );
}
