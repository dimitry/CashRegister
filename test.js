const CashRegister = require('./cash_register.js');
const { DEFAULT_LOCALE } = require('./constants');
const { ensureDecimalPrecision } = require('./helpers');
const { randomizeIfDivisibleBy3 } = require('./modifiers');

describe('default cash register without modifiers', () => {
  const cashRegister = new CashRegister(DEFAULT_LOCALE);

  test('process $3.33 to equal $3.33 in change', () => {
    const owedAmount = 3.33;
    const paidAmount = 6.66;
    const changeAmount = ensureDecimalPrecision(paidAmount - owedAmount);
    const result = cashRegister.calculateChange(owedAmount, paidAmount);
    const finalAmount = Object.keys(result)
      .map(denomination => denomination * result[denomination])
      .reduce((a, b) => a + b, 0);

    expect(ensureDecimalPrecision(finalAmount)).toBe(changeAmount);
  });

  test('process random number to equal itself in change', () => {
    const owedAmount = Math.floor(Math.random() * 1001) / 100;
    const paidAmount = owedAmount + Math.floor(Math.random() * 1001) / 100;
    const changeAmount = ensureDecimalPrecision(paidAmount - owedAmount);
    console.log('Random number:', changeAmount);
    const result = cashRegister.calculateChange(owedAmount, paidAmount);
    const finalAmount = Object.keys(result)
      .map(denomination => denomination * result[denomination])
      .reduce((a, b) => a + b, 0);

    expect(ensureDecimalPrecision(finalAmount)).toBe(changeAmount);
  });

  test('process $0.00 to return no change', () => {
    const owedAmount = 1;
    const paidAmount = 1;
    const result = cashRegister.calculateChange(owedAmount, paidAmount);

    expect(result).toBe(null);
  });

  test('process negative change amount to throw an error', () => {
    const owedAmount = 1;
    const paidAmount = 0;

    expect(() => {
      cashRegister.calculateChange(owedAmount, paidAmount);
    }).toThrow(Error);
  });

  test('process formatted $3.33 to equal "1 $2-dollar bill, 1 $1-dollar bill, 1 quarter, 1 nickel, 3 pennies"', () => {
    const owedAmount = 3.33;
    const paidAmount = 6.66;
    const result = cashRegister.calculateChange(owedAmount, paidAmount);
    const formattedResult = cashRegister.formatChangeResult(result);

    expect(formattedResult).toBe('1 $2-dollar bill, 1 $1-dollar bill, 1 quarter, 1 nickel, 3 pennies');
  });
});

describe('default cash register with "divisible by 3" modifier', () => {
  const cashRegister = new CashRegister(DEFAULT_LOCALE, {
    denominationModifier: randomizeIfDivisibleBy3,
  });

  test('process $3.33 to equal $3.33 in change', () => {
    const owedAmount = 3.33;
    const paidAmount = 6.66;
    const changeAmount = ensureDecimalPrecision(paidAmount - owedAmount);
    const result = cashRegister.calculateChange(owedAmount, paidAmount);
    const finalAmount = Object.keys(result)
      .map(denomination => denomination * result[denomination])
      .reduce((a, b) => a + b, 0);

    expect(ensureDecimalPrecision(finalAmount)).toBe(changeAmount);
  });
});

describe('french cash register without modifiers', () => {
  const cashRegister = new CashRegister('fr_FR');

  test('process $3.33 to equal $3.33 in change', () => {
    const owedAmount = 3.33;
    const paidAmount = 6.66;
    const changeAmount = ensureDecimalPrecision(paidAmount - owedAmount);
    const result = cashRegister.calculateChange(owedAmount, paidAmount);
    const finalAmount = Object.keys(result)
      .map(denomination => denomination * result[denomination])
      .reduce((a, b) => a + b, 0);

    expect(ensureDecimalPrecision(finalAmount)).toBe(changeAmount);
  });
});
