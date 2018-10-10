module.exports = {
  ensureDecimalPrecision: number => Math.round(number * 100) / 100,

  arrayShuffle: (a) => {
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
};
