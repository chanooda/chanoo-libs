/**
 * Cookie 옵션 타입
 */
export interface CookieOptions {
	/**
	 * 만료 일자 (Date 객체 또는 일수)
	 */
	expires?: Date | number;
	/**
	 * 경로
	 */
	path?: string;
	/**
	 * 도메인
	 */
	domain?: string;
	/**
	 * Secure 플래그 (HTTPS에서만 전송)
	 */
	secure?: boolean;
	/**
	 * SameSite 속성
	 */
	sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Cookie에 값을 저장합니다.
 * @param key 저장할 키
 * @param value 저장할 값
 * @param options Cookie 옵션
 */
export function setCookie(key: string, value: string, options: CookieOptions = {}): void {
	const { expires, path = '/', domain, secure = false, sameSite = 'lax' } = options;

	let cookieString = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

	if (expires) {
		if (typeof expires === 'number') {
			const date = new Date();
			date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
			cookieString += `; expires=${date.toUTCString()}`;
		} else {
			cookieString += `; expires=${expires.toUTCString()}`;
		}
	}

	if (path) {
		cookieString += `; path=${path}`;
	}

	if (domain) {
		cookieString += `; domain=${domain}`;
	}

	if (secure) {
		cookieString += '; secure';
	}

	if (sameSite) {
		cookieString += `; SameSite=${sameSite}`;
	}

	document.cookie = cookieString;
}

/**
 * Cookie에서 값을 가져옵니다.
 * @param key 가져올 키
 * @returns 저장된 값 (없으면 null)
 */
export function getCookie(key: string): string | null {
	const name = `${encodeURIComponent(key)}=`;
	const cookies = document.cookie.split(';');

	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i];
		if (!cookie) continue;
		while (cookie.charAt(0) === ' ') {
			cookie = cookie.substring(1);
		}
		if (cookie.indexOf(name) === 0) {
			return decodeURIComponent(cookie.substring(name.length));
		}
	}

	return null;
}

/**
 * Cookie에서 특정 키를 제거합니다.
 * @param key 제거할 키
 * @param options Cookie 옵션 (path, domain 등이 필요할 수 있습니다)
 */
export function removeCookie(
	key: string,
	options: Pick<CookieOptions, 'path' | 'domain'> = {},
): void {
	const { path = '/', domain } = options;

	let cookieString = `${encodeURIComponent(key)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;

	if (path) {
		cookieString += `; path=${path}`;
	}

	if (domain) {
		cookieString += `; domain=${domain}`;
	}

	document.cookie = cookieString;
}

/**
 * 모든 Cookie를 가져옵니다.
 * @returns Cookie 객체 (key-value 쌍)
 */
export function getAllCookies(): Record<string, string> {
	const cookies: Record<string, string> = {};

	if (document.cookie) {
		const cookieArray = document.cookie.split(';');

		for (let i = 0; i < cookieArray.length; i++) {
			const cookie = cookieArray[i]?.trim();
			if (!cookie) continue;
			const [key, value] = cookie.split('=');

			if (key && value) {
				cookies[decodeURIComponent(key)] = decodeURIComponent(value);
			}
		}
	}

	return cookies;
}

/**
 * Cookie에 특정 키가 존재하는지 확인합니다.
 * @param key 확인할 키
 * @returns 키가 존재하면 true, 없으면 false
 */
export function hasCookie(key: string): boolean {
	return getCookie(key) !== null;
}

/**
 * 일수를 지정하여 Cookie에 값을 저장합니다.
 * 오늘 자정(0시)부터 시작하여 지정된 일수만큼 유지됩니다.
 * 예: 2월 10일 23시에 일수 1을 설정하면 2월 11일 0시에 만료됩니다.
 * @param key 저장할 키
 * @param value 저장할 값
 * @param days 유지할 일수
 * @param options 추가 Cookie 옵션 (path, domain, secure, sameSite)
 */
export function setCookieWithDays(
	key: string,
	value: string,
	days: number,
	options: Omit<CookieOptions, 'expires'> = {},
): void {
	// 오늘 자정 시간 계산
	const now = new Date();
	const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

	// 오늘 자정부터 일수만큼 더한 날의 자정
	const expireDate = new Date(todayMidnight);
	expireDate.setDate(expireDate.getDate() + days);

	setCookie(key, value, {
		...options,
		expires: expireDate,
	});
}
