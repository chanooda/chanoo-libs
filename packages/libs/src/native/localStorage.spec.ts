import {
	clearLocalStorage,
	getLocalStorage,
	hasLocalStorage,
	removeLocalStorage,
	setLocalStorage,
} from "./localStorage";

describe("localStorage", () => {
	beforeEach(() => {
		window.localStorage.clear();
	});

	describe("setLocalStorage", () => {
		it("문자열 값을 저장할 수 있다.", () => {
			setLocalStorage("test", "value");
			expect(window.localStorage.getItem("test")).toBe("value");
		});

		it("객체를 JSON.stringify로 저장할 수 있다.", () => {
			const obj = { name: "test", age: 20 };
			setLocalStorage("test", obj);
			expect(window.localStorage.getItem("test")).toBe(JSON.stringify(obj));
		});

		it("배열을 JSON.stringify로 저장할 수 있다.", () => {
			const arr = [1, 2, 3];
			setLocalStorage("test", arr);
			expect(window.localStorage.getItem("test")).toBe(JSON.stringify(arr));
		});
	});

	describe("getLocalStorage", () => {
		it("저장된 문자열 값을 가져올 수 있다.", () => {
			window.localStorage.setItem("test", "value");
			expect(getLocalStorage("test")).toBe("value");
		});

		it("저장된 객체를 JSON.parse로 가져올 수 있다.", () => {
			const obj = { name: "test", age: 20 };
			window.localStorage.setItem("test", JSON.stringify(obj));
			expect(getLocalStorage("test")).toEqual(obj);
		});

		it("존재하지 않는 키는 null을 반환한다.", () => {
			expect(getLocalStorage("nonexistent")).toBeNull();
		});

		it("제네릭 타입을 지정할 수 있다.", () => {
			const obj = { name: "test", age: 20 };
			window.localStorage.setItem("test", JSON.stringify(obj));
			const result = getLocalStorage<{ name: string; age: number }>("test");
			expect(result).toEqual(obj);
		});
	});

	describe("removeLocalStorage", () => {
		it("저장된 값을 제거할 수 있다.", () => {
			window.localStorage.setItem("test", "value");
			removeLocalStorage("test");
			expect(window.localStorage.getItem("test")).toBeNull();
		});
	});

	describe("clearLocalStorage", () => {
		it("모든 값을 제거할 수 있다.", () => {
			window.localStorage.setItem("test1", "value1");
			window.localStorage.setItem("test2", "value2");
			clearLocalStorage();
			expect(window.localStorage.length).toBe(0);
		});
	});

	describe("hasLocalStorage", () => {
		it("존재하는 키는 true를 반환한다.", () => {
			window.localStorage.setItem("test", "value");
			expect(hasLocalStorage("test")).toBe(true);
		});

		it("존재하지 않는 키는 false를 반환한다.", () => {
			expect(hasLocalStorage("nonexistent")).toBe(false);
		});
	});
});
