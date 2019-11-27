const addCommas = (number: string) => number.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

const formatNumber = (num: number, maxDigits?: number): string => {
  return maxDigits
    ? addCommas(num.toFixed(maxDigits))
    : addCommas(num.toString());
};

enum ValueUnit {
  None = '',
  Thousand = 'k',
  Million = 'm',
}

export const createFormatter = (formatAgainst?: number) => (amount: number): string => {
  let lFormatAgainst = formatAgainst || amount;
  let valueUnit: ValueUnit = ValueUnit.None;

  if (lFormatAgainst < 10000) {
    return formatNumber(amount) + valueUnit;
  }

  lFormatAgainst /= 1000;
  amount /= 1000;
  valueUnit = ValueUnit.Thousand;

  if (lFormatAgainst < 1000) {
    return formatNumber(amount, 1) + valueUnit;
  }

  amount /= 1000;
  valueUnit = ValueUnit.Million;

  return formatNumber(amount, 1) + valueUnit;
};