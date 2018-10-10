const { DEFAULT_LOCALE, LOCALES } = require('./constants');

const DEFAULT_OPTIONS = {
  denominationModifier: null,
};

class CashRegister {
  constructor(locale = DEFAULT_LOCALE, options = {}) {
    // Get locale config
    const localeConfig = LOCALES[locale];
    if (!localeConfig) {
      throw new Error('Invalid locale.');
    }

    // Prepare denominations
    this.denominationNames = localeConfig.denominations;
    this.denominations = Object.keys(this.denominationNames)
      .sort((a, b) => b - a); // Start with largest denomination

    // Prepare options
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
  }

  calculateChange(owedAmount, paidAmount) {
    const { denominationModifier } = this.options;
    const result = {};

    // Copy a fresh list of available denominations
    let denominations = this.denominations.slice();

    // Calculate change amount
    const changeAmount = paidAmount - owedAmount;
    let leftoverCents = Math.round(changeAmount * 100); // Work with whole numbers to avoid floats
    // Note for above: for ultimate flexiblity, consider adding
    // toInt(), fromInt() helpers to LOCALE_CONFIGS or calculate
    // automatically based on number of decimal digits

    // Custom denomination modifier?
    if (denominationModifier) {
      denominations = denominationModifier(owedAmount, paidAmount, denominations);
    }

    // Work with whole numbers in denominations also
    denominations = denominations.map(denomination => denomination * 100);

    // Given each denomination, see how many times it fits into the change amount
    // Go until we run out of change or run out of denominations
    while (leftoverCents > 0 && denominations.length > 0) {
      const denomination = denominations.shift();
      const times = Math.floor(leftoverCents / denomination);

      if (times) {
        const originalDenomination = denomination / 100;
        result[originalDenomination] = times;
      }

      leftoverCents -= times * denomination;
    }

    // Unable to calculate result?
    if (leftoverCents !== 0) {
      throw new Error('Change cannot be calculated given the available denominations.');
    }

    // No change required?
    if (Object.keys(result).length === 0) {
      return null;
    }

    return result;
  }

  formatChangeResult(result) {
    const parts = [];
    const denominations = Object.keys(result).sort((a, b) => b - a);

    // Format each denomination in result
    denominations.forEach((denomination) => {
      const times = result[denomination];
      const names = this.denominationNames[denomination]; // [singular, plural]

      if (times > 1) {
        // Plural
        parts.push(`${times} ${names[1]}`);
      } else {
        // Singular
        parts.push(`${times} ${names[0]}`);
      }
    });

    return parts.join(', ');
  }
}

module.exports = CashRegister;
