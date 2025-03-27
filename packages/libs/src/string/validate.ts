import { MODIFY_REGEX } from './regex';

/**
 * 인자로 받은 문자열에서 숫자만 추출해줍니다.
 * @param string
 * @returns string
 */
export const extractNumbers = (string: string) => {
  return string.replace(MODIFY_REGEX.LETTER, '');
}; /**
 * 인자로 받은 문자열에서 문자만 추출해줍니다.
 * @param string
 * @returns string
 */
export const extractLetters = (string: string) => {
  return string.replace(MODIFY_REGEX.NUMBER, '');
};

extractLetters('가1나2다3라4마5바6'); // 가나다라마바
