import {
	clearSessionStorage,
	getSessionStorage,
	hasSessionStorage,
	removeSessionStorage,
	setSessionStorage,
} from './sessionStorage';

describe('sessionStorage', () => {
	beforeEach(() => {
		window.sessionStorage.clear();
	});

	describe('setSessionStorage', () => {
		it('문자열 값을 저장할 수 있다.', () => {
			setSessionStorage('test', 'value');
			expect(window.sessionStorage.getItem('test')).toBe('value');
		});

		it('객체를 JSON.stringify로 저장할 수 있다.', () => {
			const obj = { name: 'test', age: 20 };
			setSessionStorage('test', obj);
			expect(window.sessionStorage.getItem('test')).toBe(JSON.stringify(obj));
		});

		it('배열을 JSON.stringify로 저장할 수 있다.', () => {
			const arr = [1, 2, 3];
			setSessionStorage('test', arr);
			expect(window.sessionStorage.getItem('test')).toBe(JSON.stringify(arr));
		});
	});

	describe('getSessionStorage', () => {
		it('저장된 문자열 값을 가져올 수 있다.', () => {
			window.sessionStorage.setItem('test', 'value');
			expect(getSessionStorage('test')).toBe('value');
		});

		it('저장된 객체를 JSON.parse로 가져올 수 있다.', () => {
			const obj = { name: 'test', age: 20 };
			window.sessionStorage.setItem('test', JSON.stringify(obj));
			expect(getSessionStorage('test')).toEqual(obj);
		});

		it('존재하지 않는 키는 null을 반환한다.', () => {
			expect(getSessionStorage('nonexistent')).toBeNull();
		});

		it('제네릭 타입을 지정할 수 있다.', () => {
			const obj = { name: 'test', age: 20 };
			window.sessionStorage.setItem('test', JSON.stringify(obj));
			const result = getSessionStorage<{ name: string; age: number }>('test');
			expect(result).toEqual(obj);
		});
	});

	describe('removeSessionStorage', () => {
		it('저장된 값을 제거할 수 있다.', () => {
			window.sessionStorage.setItem('test', 'value');
			removeSessionStorage('test');
			expect(window.sessionStorage.getItem('test')).toBeNull();
		});
	});

	describe('clearSessionStorage', () => {
		it('모든 값을 제거할 수 있다.', () => {
			window.sessionStorage.setItem('test1', 'value1');
			window.sessionStorage.setItem('test2', 'value2');
			clearSessionStorage();
			expect(window.sessionStorage.length).toBe(0);
		});
	});

	describe('hasSessionStorage', () => {
		it('존재하는 키는 true를 반환한다.', () => {
			window.sessionStorage.setItem('test', 'value');
			expect(hasSessionStorage('test')).toBe(true);
		});

		it('존재하지 않는 키는 false를 반환한다.', () => {
			expect(hasSessionStorage('nonexistent')).toBe(false);
		});
	});
});
