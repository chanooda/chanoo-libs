/**
 * 문자열 검증을 위한 정규식 객체
 * new RegExp(REGEX.NUMBER).test("가나다라") -> false
 * new RegExp(REGEX.LETTER).test("1234") -> true
 */
export const REGEX = {
  PHONE_NUMBER: /^(01[016789])(\d{4})(\d{4})$/,
  PHONE_NUMBER_DASH: /^(01[016789])-(\d{4})-(\d{4})$/,
  NUMBER: /^[0-9]+$/,
  LETTER: /^[^0-9]+$/,
  KOREAN: /^[ㄱ-ㅣ가-힣]+$/,
  ENGLISH: /^[A-Za-z]+$/,
  REGISTER_NUMBER: /^\d{6}-?\d{7}$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
} as const;

/**
 * 문자열 수정을 위한 정규식 객체
 * "가1나2다3라4마5바6".replace(MODIFY_REGEX.LETTER,"") -> "가나다라마바"
 * "가1나2다3라4마5바6".replace(MODIFY_REGEX.NUMBER,"") -> "123456"
 */
export const MODIFY_REGEX = {
  LETTER: /[^0-9]/g,
  NUMBER: /[0-9]/g,
} as const;
