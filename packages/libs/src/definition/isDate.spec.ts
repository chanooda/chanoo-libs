import { isDate } from './isDate';

describe('isDate', () => {
  it('value가 date 타입이면 true를 반환한다.', () => {
    expect(isDate(new Date())).toBe(true);
  });

  it('value가 date 타입이 아니면 false를 반환한다.', () => {
    expect(isDate('2022.10.03')).toBe(false);
    expect(isDate('2022-10-03')).toBe(false);
    expect(isDate(2021)).toBe(false);
  });

  it('object의 속성 date 타입이면 true를 반환한다.', () => {
    const obj = { date: new Date() };
    expect(isDate(obj.date)).toBe(true);
  });
});
