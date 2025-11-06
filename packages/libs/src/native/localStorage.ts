/**
 * localStorage에 값을 저장합니다.
 * @param key 저장할 키
 * @param value 저장할 값 (객체는 JSON.stringify로 변환됩니다)
 */
export function setLocalStorage(key: string, value: unknown): void {
	try {
		const stringValue =
			typeof value === "string" ? value : JSON.stringify(value);
		window.localStorage.setItem(key, stringValue);
	} catch (error) {
		throw new Error(`localStorage 저장 실패: ${error}`);
	}
}

/**
 * localStorage에서 값을 가져옵니다.
 * @param key 가져올 키
 * @returns 저장된 값 (없으면 null)
 */
export function getLocalStorage<T = unknown>(key: string): T | null {
	try {
		const value = window.localStorage.getItem(key);
		if (value === null) {
			return null;
		}

		try {
			return JSON.parse(value) as T;
		} catch {
			// JSON 파싱 실패 시 문자열로 반환
			return value as T;
		}
	} catch (error) {
		throw new Error(`localStorage 읽기 실패: ${error}`);
	}
}

/**
 * localStorage에서 특정 키를 제거합니다.
 * @param key 제거할 키
 */
export function removeLocalStorage(key: string): void {
	try {
		window.localStorage.removeItem(key);
	} catch (error) {
		throw new Error(`localStorage 삭제 실패: ${error}`);
	}
}

/**
 * localStorage를 모두 비웁니다.
 */
export function clearLocalStorage(): void {
	try {
		window.localStorage.clear();
	} catch (error) {
		throw new Error(`localStorage 전체 삭제 실패: ${error}`);
	}
}

/**
 * localStorage에 특정 키가 존재하는지 확인합니다.
 * @param key 확인할 키
 * @returns 키가 존재하면 true, 없으면 false
 */
export function hasLocalStorage(key: string): boolean {
	try {
		return window.localStorage.getItem(key) !== null;
	} catch {
		return false;
	}
}
