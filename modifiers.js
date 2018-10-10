const { arrayShuffle } = require('./helpers');

module.exports = {
  randomizeIfDivisibleBy3: (owedAmount, paidAmount, denominations) => {
    const owedAmountInCents = Math.round(owedAmount * 100);

    // Divisible by 3?
    if (owedAmountInCents % 3 === 0) {
      return arrayShuffle(denominations);
    }

    return denominations;
  },
};
