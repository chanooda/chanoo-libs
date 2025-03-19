export function pull<T>(arr: T[], pullArray: readonly unknown[]): T[] {
  const set = new Set(pullArray);
  let newArrayIndex = 0;

  for (let i = 0; i < arr.length; i++) {
    if (set.has(arr[i])) {
      continue;
    }

    arr[newArrayIndex++] = arr[i] as T;
  }

  arr.length = newArrayIndex;

  return arr;
}
