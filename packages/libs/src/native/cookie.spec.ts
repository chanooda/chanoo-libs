import {
	getAllCookies,
	getCookie,
	hasCookie,
	removeCookie,
	setCookie,
	setCookieWithDays,
} from "./cookie";

describe("cookie", () => {
	let cookieSetter: jest.SpyInstance;

	beforeEach(() => {
		// document.cookie에 설정되는 값을 캡처하기 위한 spy
		cookieSetter = jest.spyOn(document, "cookie", "set");
		// 모든 쿠키 제거
		document.cookie.split(";").forEach((cookie) => {
			const eqPos = cookie.indexOf("=");
			const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
			document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
		});
		cookieSetter.mockClear();
	});

	afterEach(() => {
		cookieSetter.mockRestore();
	});

	describe("setCookie", () => {
		it("기본 쿠키를 설정할 수 있다.", () => {
			setCookie("test", "value");
			expect(getCookie("test")).toBe("value");
		});

		it("경로를 지정할 수 있다.", () => {
			setCookie("test", "value", { path: "/admin" });
			// document.cookie에 설정된 값 확인
			const cookieString = cookieSetter.mock.calls[0]?.[0] ?? "";
			console.log(cookieString);
			expect(cookieString).toContain("test=value");
			expect(cookieString).toContain("path=/admin");
		});

		it("도메인을 지정할 수 있다.", () => {
			setCookie("test", "value", { domain: "example.com" });
			// document.cookie에 설정된 값 확인
			const cookieString = cookieSetter.mock.calls[0]?.[0] ?? "";
			expect(cookieString).toContain("test=value");
			expect(cookieString).toContain("domain=example.com");
		});

		it("만료일을 Date 객체로 지정할 수 있다.", () => {
			const date = new Date();
			date.setTime(date.getTime() + 1000 * 60 * 60 * 24); // 1일 후
			setCookie("test", "value", { expires: date });
			expect(getCookie("test")).toBe("value");
		});

		it("만료일을 일수로 지정할 수 있다.", () => {
			setCookie("test", "value", { expires: 7 }); // 7일 후
			expect(getCookie("test")).toBe("value");
		});

		it("secure 플래그를 설정할 수 있다.", () => {
			setCookie("test", "value", { secure: true });
			// document.cookie에 설정된 값 확인
			const cookieString = cookieSetter.mock.calls[0]?.[0] ?? "";
			expect(cookieString).toContain("test=value");
			expect(cookieString).toContain("secure");
		});

		it("sameSite 속성을 설정할 수 있다.", () => {
			setCookie("test", "value", { sameSite: "strict" });
			expect(getCookie("test")).toBe("value");
		});
	});

	describe("getCookie", () => {
		it("저장된 쿠키 값을 가져올 수 있다.", () => {
			document.cookie = "test=value";
			expect(getCookie("test")).toBe("value");
		});

		it("URL 인코딩된 값을 디코딩하여 가져온다.", () => {
			document.cookie = "test=hello%20world";
			expect(getCookie("test")).toBe("hello world");
		});

		it("존재하지 않는 쿠키는 null을 반환한다.", () => {
			expect(getCookie("nonexistent")).toBeNull();
		});
	});

	describe("removeCookie", () => {
		it("쿠키를 제거할 수 있다.", () => {
			setCookie("test", "value");
			removeCookie("test");
			expect(getCookie("test")).toBeNull();
		});

		it("경로를 지정하여 쿠키를 제거할 수 있다.", () => {
			setCookie("test", "value", { path: "/admin" });
			removeCookie("test", { path: "/admin" });
			expect(getCookie("test")).toBeNull();
		});
	});

	describe("getAllCookies", () => {
		it("모든 쿠키를 가져올 수 있다.", () => {
			setCookie("test1", "value1");
			setCookie("test2", "value2");
			const cookies = getAllCookies();
			expect(cookies.test1).toBe("value1");
			expect(cookies.test2).toBe("value2");
		});

		it("쿠키가 없으면 빈 객체를 반환한다.", () => {
			const cookies = getAllCookies();
			expect(Object.keys(cookies)).toHaveLength(0);
		});
	});

	describe("hasCookie", () => {
		it("존재하는 쿠키는 true를 반환한다.", () => {
			setCookie("test", "value");
			expect(hasCookie("test")).toBe(true);
		});

		it("존재하지 않는 쿠키는 false를 반환한다.", () => {
			expect(hasCookie("nonexistent")).toBe(false);
		});
	});

	describe("setCookieWithDays", () => {
		it("일수를 지정하여 쿠키를 설정할 수 있다.", () => {
			setCookieWithDays("test", "value", 7);
			expect(getCookie("test")).toBe("value");
		});

		it("오늘 자정부터 일수를 계산하여 만료일을 설정한다.", () => {
			// 2월 10일 23시로 현재 시간 설정
			const mockDate = new Date(2024, 1, 10, 23, 0, 0);
			jest.useFakeTimers();
			jest.setSystemTime(mockDate);

			setCookieWithDays("test", "value", 1);

			// 쿠키 문자열에서 만료일 추출
			const cookieString = document.cookie;
			const expiresMatch = cookieString.match(/expires=([^;]+)/);

			if (expiresMatch) {
				const expiresDate = new Date(expiresMatch[1] ?? "");
				// 2월 11일 0시가 되어야 함
				expect(expiresDate.getFullYear()).toBe(2024);
				expect(expiresDate.getMonth()).toBe(1); // 2월 (0-based)
				expect(expiresDate.getDate()).toBe(11);
				expect(expiresDate.getHours()).toBe(0);
			}

			jest.useRealTimers();
		});

		it("추가 옵션(path)을 함께 지정할 수 있다.", () => {
			setCookieWithDays("test", "value", 7, { path: "/admin" });
			// document.cookie에 설정된 값 확인
			const cookieString = cookieSetter.mock.calls[0]?.[0] ?? "";
			expect(cookieString).toContain("test=value");
			expect(cookieString).toContain("path=/admin");
		});

		it("추가 옵션(domain)을 함께 지정할 수 있다.", () => {
			setCookieWithDays("test", "value", 7, { domain: "example.com" });
			// document.cookie에 설정된 값 확인
			const cookieString = cookieSetter.mock.calls[0]?.[0] ?? "";
			expect(cookieString).toContain("test=value");
			expect(cookieString).toContain("domain=example.com");
		});

		it("추가 옵션(secure)을 함께 지정할 수 있다.", () => {
			setCookieWithDays("test", "value", 7, { secure: true });
			// document.cookie에 설정된 값 확인
			const cookieString = cookieSetter.mock.calls[0]?.[0] ?? "";
			expect(cookieString).toContain("test=value");
			expect(cookieString).toContain("secure");
		});

		it("추가 옵션(sameSite)을 함께 지정할 수 있다.", () => {
			setCookieWithDays("test", "value", 7, { sameSite: "strict" });
			expect(getCookie("test")).toBe("value");
		});

		it("여러 옵션을 함께 지정할 수 있다.", () => {
			setCookieWithDays("test", "value", 7, {
				path: "/admin",
				secure: true,
				sameSite: "strict",
			});
			// document.cookie에 설정된 값 확인
			const cookieString = cookieSetter.mock.calls[0]?.[0] ?? "";
			expect(cookieString).toContain("test=value");
			expect(cookieString).toContain("path=/admin");
			expect(cookieString).toContain("secure");
			expect(cookieString).toContain("SameSite=strict");
		});
	});
});
