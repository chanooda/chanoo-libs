import { extractLetters, extractNumbers } from './validate';

describe('문자열 검증', () => {
  it('특정 문자열에서 숫자만 남기게', () => {
    const word = '1234ㅁ';
    const word2 = 'a1234';
    const word3 = 'a';
    const word4 = '1f2d3g4';

    expect(extractNumbers(word)).toBe('1234');
    expect(extractNumbers(word2)).toBe('1234');
    expect(extractNumbers(word3)).toBe('');
    expect(extractNumbers(word4)).toBe('1234');
  });
  it('특정 문자열에서 문자만 남기게', () => {
    const word = '1234ㅁ';
    const word2 = 'a1234';
    const word3 = 'a';
    const word4 = '1f2d3g4';

    expect(extractLetters(word)).toBe('ㅁ');
    expect(extractLetters(word2)).toBe('a');
    expect(extractLetters(word3)).toBe('a');
    expect(extractLetters(word4)).toBe('fdg');
  });
});
