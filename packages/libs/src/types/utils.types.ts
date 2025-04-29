/**
 * 배열이면 배열 내의 값, 함수면 함수 자체, Promise면 Promise의 값에 대한 type을 반환
 */
export type Unpacked<T> = T extends (infer U)[]
  ? U // T가 어떤 값의 배열이면 그 배열의 타입을 반환
  : T extends (...args: unknown[]) => infer U
    ? U // 배열이 아니고 함수 타입이면, 함수 반환 타입을 반환
    : T extends Promise<infer U>
      ? U // 배열, 함수도 아니고 프로미스 타입이면, 프로미스의 값을 반환
      : T; // 위의 모든 조건이 만족하지않으면 T 자기 자신을 반환
