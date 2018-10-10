/* eslint no-console: ["error", { allow: ["log"] }] */
const csv = require('fast-csv');
const fs = require('fs');

const CashRegister = require('./cash_register.js');
const { DEFAULT_LOCALE } = require('./constants');
const { randomizeIfDivisibleBy3 } = require('./modifiers');

// Instantiate our specific cash register
const cashRegister = new CashRegister(DEFAULT_LOCALE, {
  denominationModifier: randomizeIfDivisibleBy3,
});

// Load data and process
fs.createReadStream('data.csv')
  .pipe(csv({ headers: false }))
  .on('data', (row) => {
    // Parse amounts
    const owedAmount = row[0];
    const paidAmount = row[1];

    // Process
    try {
      console.log(`(${owedAmount}, ${paidAmount})`);
      const result = cashRegister.calculateChange(owedAmount, paidAmount);
      if (result) {
        // Format the result
        const formattedResult = cashRegister.formatChangeResult(result);
        console.log(formattedResult);
      } else {
        console.log('No change required');
      }
    } catch (e) {
      console.log('Change cannot be calculated');
    }
  });
