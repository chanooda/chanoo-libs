/**
 * 로컬 스토리지에 값을 설정합니다.
 * @param key - 저장할 값의 키
 * @param value - 저장할 값
 */
export function setLocalStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  const _value = typeof value === 'object' ? JSON.stringify(value) : String(value);
  localStorage.setItem(key, _value);
}

/**
 * 로컬 스토리지에서 값을 가져옵니다.
 * @param key - 가져올 값의 키
 * @returns 가져온 값 또는 null
 */
export function getLocalStorageItem<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;

  const item = localStorage.getItem(key);

  if (!item) return null;

  try {
    return JSON.parse(item);
  } catch (e) {
    return item as unknown as T;
  }
}

/**
 * 로컬 스토리지에서 값을 제거합니다.
 * @param key - 제거할 값의 키
 */
export function removeLocalStorageItem(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}

/**
 * 로컬 스토리지의 모든 값을 제거합니다.
 */
export function clearLocalStorage(): void {
  if (typeof window === 'undefined') return;
  localStorage.clear();
}
