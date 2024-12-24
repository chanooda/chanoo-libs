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
