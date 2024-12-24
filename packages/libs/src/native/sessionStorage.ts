/**
 * 세션 스토리지에 값을 설정합니다.
 * @param key 설정할 키입니다.
 * @param value 설정할 값입니다.
 */
export function setSessionStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(key, JSON.stringify(value));
}

/**
 * 세션 스토리지에서 값을 가져옵니다.
 * @param key 가져올 키입니다.
 * @returns 키와 연결된 값이 있으면 해당 값을 반환하고, 그렇지 않으면 null을 반환합니다.
 */
export function getSessionStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  const value = sessionStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

/**
 * 세션 스토리지에서 값을 제거합니다.
 * @param key 제거할 키입니다.
 */
export function removeSessionStorage(key: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(key);
}

/**
 * 세션 스토리지의 모든 값을 지웁니다.
 */
export function clearSessionStorage(): void {
  sessionStorage.clear();
}
