import { REGEX } from './regex';

describe('정규식', () => {
  it('숫자만', () => {
    const success = '0';
    const success2 = '123';
    const fail = 'ad';
    const fail2 = '';

    expect(REGEX.NUMBER.test(success)).toBe(true);
    expect(REGEX.NUMBER.test(success2)).toBe(true);
    expect(REGEX.NUMBER.test(fail)).toBe(false);
    expect(REGEX.NUMBER.test(fail2)).toBe(false);
  });

  it('문자만', () => {
    const success = 'aㄱ-  !@#ㅗ ㅇ      ㅣ;ㅣ;';
    const fail = '1234';
    const fail2 = '';
    expect(REGEX.LETTER.test(success)).toBe(true);
    expect(REGEX.LETTER.test(fail)).toBe(false);
    expect(REGEX.LETTER.test(fail2)).toBe(false);
  });

  it('영어만', () => {
    const success = 'abcdefg';
    const fail = '1234';
    const fail2 = '가나다라마';
    const fail3 = '_!asd2#()';
    expect(REGEX.ENGLISH.test(success)).toBe(true);
    expect(REGEX.ENGLISH.test(fail)).toBe(false);
    expect(REGEX.ENGLISH.test(fail2)).toBe(false);
    expect(REGEX.ENGLISH.test(fail3)).toBe(false);
  });

  it('한글만', () => {
    const success = 'ㄱㄴㄷㄹㅁㅂㅅ';
    const success2 = 'ㅏㅑㅓㅕㅗㅛㅜㅠ';
    const success3 = '각난닫랄맘밥삿가나다라마바사';
    const fail = '1234';
    const fail2 = 'abcdefg';
    expect(REGEX.KOREAN.test(success)).toBe(true);
    expect(REGEX.KOREAN.test(success2)).toBe(true);
    expect(REGEX.KOREAN.test(success3)).toBe(true);
    expect(REGEX.KOREAN.test(fail)).toBe(false);
    expect(REGEX.KOREAN.test(fail2)).toBe(false);
  });

  it('전화번호(- 포함)', () => {
    const success = REGEX.PHONE_NUMBER_DASH.test('010-1234-5678');
    //   '-' 미포함
    const fail1 = REGEX.PHONE_NUMBER_DASH.test('01012345678');
    //   길이부족
    const fail2 = REGEX.PHONE_NUMBER_DASH.test('010123456');
    //   맨 앞 3자리 형식 불일치
    const fail3 = REGEX.PHONE_NUMBER_DASH.test('00112345678');
    expect(success).toBe(true);
    expect(fail1).toBe(false);
    expect(fail2).toBe(false);
    expect(fail3).toBe(false);
  });

  it('전화번호( - 미포함)', () => {
    const success = REGEX.PHONE_NUMBER.test('01012345678');
    //   '-' 포함
    const fail1 = REGEX.PHONE_NUMBER.test('010-1234-5678');
    //   길이부족
    const fail2 = REGEX.PHONE_NUMBER.test('0101234567');
    //   맨 앞 3자리 형식 불일치
    const fail3 = REGEX.PHONE_NUMBER.test('00112345678');
    expect(success).toBe(true);
    expect(fail1).toBe(false);
    expect(fail2).toBe(false);
    expect(fail3).toBe(false);
  });

  it('주민등록번호', () => {
    const success = '123456-1234567';
    const success2 = '1234561234567';
    const fail = 'qwertt-qwerasd';
    const fail2 = '12345612345678';
    const fail3 = '123456-12345678';
    const fail4 = '1234562-1234567';
    expect(REGEX.REGISTER_NUMBER.test(success)).toBe(true);
    expect(REGEX.REGISTER_NUMBER.test(success2)).toBe(true);
    expect(REGEX.REGISTER_NUMBER.test(fail)).toBe(false);
    expect(REGEX.REGISTER_NUMBER.test(fail2)).toBe(false);
    expect(REGEX.REGISTER_NUMBER.test(fail3)).toBe(false);
    expect(REGEX.REGISTER_NUMBER.test(fail4)).toBe(false);
  });

  it('E-Mail', () => {
    const success = 'a@a.com';
    const success2 = '-aa@a.com';
    const success3 = 'aa-aa@a.com';
    const fail = 'asd@';
    const fail2 = 'asd@asd.';
    const fail3 = 'asd!@asd.com';
    const fail4 = 'asd@asd.c';
    expect(REGEX.EMAIL.test(success)).toBe(true);
    expect(REGEX.EMAIL.test(success2)).toBe(true);
    expect(REGEX.EMAIL.test(success3)).toBe(true);
    expect(REGEX.EMAIL.test(fail)).toBe(false);
    expect(REGEX.EMAIL.test(fail2)).toBe(false);
    expect(REGEX.EMAIL.test(fail3)).toBe(false);
    expect(REGEX.EMAIL.test(fail4)).toBe(false);
  });
});
