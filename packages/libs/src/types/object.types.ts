/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 2개의 객체를 병합하는 타입
 * @argument T - 덮어 씌어질 Object
 * @argument U - 덮어 씌울 Object
 * @example
 * interface A {
 *   x: {
 *     y: number;
 *     z: string;
 *   };
 *   w: boolean;
 * }
 * interface B {
 *   x: {
 *     y: string;   // 타입이 달라도 덮어씌워집니다
 *     newProp: number;
 *   };
 *   v: string;
 * }
 * // 결과 타입:
 * // {
 * //   x: {
 * //     y: string;   // B의 y 타입으로 덮어씌워짐
 * //     z: string;   // A에만 존재
 * //     newProp: number; // B에만 존재
 * //   };
 * //   w: boolean;     // A에만 존재
 * //   v: string;      // B에만 존재
 * // }
 * type Merged = DeepMerge<A, B>;
 */
export type DeepMerge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? U[K] extends object
      ? K extends keyof T
        ? T[K] extends object
          ? DeepMerge<T[K], U[K]>
          : U[K]
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : never;
};
/**
 * 객체의 모든 속성을 optional로 만드는 타입
 * @argument T - Object
 * @example
 * ```typescript
 * interface User {
 *   id: number;
 *   profile: {
 *     name: string;
 *     contact: {
 *       email: string;
 *       phone: string;
 *     };
 *   };
 * }
 * type PartialUser = DeepPartial<User>;
 * // Resulting type:
 * // {
 * //   id?: number;
 * //   profile?: {
 * //     name?: string;
 * //     contact?: {
 * //       email?: string;
 * //       phone?: string;
 * //     };
 * //   };
 * // }
 * ```
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * 객체 type에서 string인 값의 key에 대한 type 반환
 * @argument T - Object
 */
export type StringPropertyNames<T> = {
  [K in keyof T]: T[K] extends string ? K : never; // 조건부 타입에서 string 인 것만 반환
}[keyof T]; // 그리고 속성의 밸류를 타입으로 반환

/**
 * 객체의 모든 속성을 readonly로 만드는 타입
 * @argument T - Object
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? // 함수도 object 타입에 속하므로, 함수는 그대로 보존하도록 분기
      T[P] extends (...args: any[]) => any
      ? T[P]
      : DeepReadonly<T[P]>
    : T[P];
};
