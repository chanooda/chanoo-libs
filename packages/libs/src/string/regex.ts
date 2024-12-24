/**
 * 문자열 검증을 위한 정규식 객체
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
 */
export const MODIFY_REGEX = {
  NUMBER: /[^0-9]/g,
  LETTER: /[0-9]/g,
} as const;
