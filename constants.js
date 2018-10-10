const DEFAULT_LOCALE = 'en_US';

const LOCALES = {
  en_US: {
    denominations: {
      100: ['$100-dollar bill', '$100-dollar bills'],
      50: ['$50-dollar bill', '$50-dollar bills'],
      20: ['$20-dollar bill', '$20-dollar bills'],
      10: ['$10-dollar bill', '$10-dollar bills'],
      5: ['$5-dollar bill', '$5-dollar bills'],
      2: ['$2-dollar bill', '$2-dollar bills'],
      1: ['$1-dollar bill', '$1-dollar bills'],
      0.25: ['quarter', 'quarters'],
      0.1: ['dime', 'dimes'],
      0.05: ['nickel', 'nickels'],
      0.01: ['penny', 'pennies'],
    },
  },
  fr_FR: {
    denominations: {
      500: ['500-euro bill', '500-euro bills'],
      200: ['200-euro bill', '200-euro bills'],
      100: ['100-euro bill', '100-euro bills'],
      50: ['50-euro bill', '50-euro bills'],
      20: ['20-euro bill', '20-euro bills'],
      10: ['10-euro bill', '10-euro bills'],
      5: ['5-euro bill', '5-euro bills'],
      2: ['2-euro coin', '2-euro coins'],
      1: ['1-euro coin', '1-euro coins'],
      0.5: ['50-cent coin', '50-cent coins'],
      0.2: ['20-cent coin', '20-cent coins'],
      0.1: ['10-cent coin', '10-cent coins'],
      0.05: ['5-cent coin', '5-cent coins'],
      0.02: ['2-cent coin', '2-cent coins'],
      0.01: ['1-cent coin', '1-cent coins'],
    },
  },
};

module.exports = {
  DEFAULT_LOCALE,
  LOCALES,
};
