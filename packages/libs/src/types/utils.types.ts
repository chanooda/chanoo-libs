/**
 * 2개의 객체 type을 합쳐 반환하는 type
 */
export type Overwrite<T, U> = Omit<T, keyof U> & U;

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

/**
 * 객체 type에서 string인 값의 key에 대한 type 반환
 */
export type StringPropertyNames<T> = {
  [K in keyof T]: T[K] extends string ? K : never; // 조건부 타입에서 string 인 것만 반환
}[keyof T]; // 그리고 속성의 밸류를 타입으로 반환

/**
 * 객체의 모든 속성을 optional로 만드는 type
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
