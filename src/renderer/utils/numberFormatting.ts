const addCommas = (number: string): string =>
  number.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

const formatNumber = (num: number, maxDigits?: number): string =>
  maxDigits ? addCommas(num.toFixed(maxDigits)) : addCommas(num.toString());

enum ValueUnit {
  Million = 'm',
  None = '',
  Thousand = 'k',
}

export const createFormatter = (formatAgainst?: number) => (
  amount: number,
): string => {
  let amountLeft = amount;
  let lFormatAgainst = formatAgainst || amountLeft;
  let valueUnit: ValueUnit = ValueUnit.None;

  if (lFormatAgainst < 10000) {
    return formatNumber(amount) + valueUnit;
  }

  lFormatAgainst /= 1000;
  amountLeft /= 1000;
  valueUnit = ValueUnit.Thousand;

  if (lFormatAgainst < 1000) {
    return formatNumber(amountLeft, 1) + valueUnit;
  }

  amountLeft /= 1000;
  valueUnit = ValueUnit.Million;

  return formatNumber(amountLeft, 1) + valueUnit;
};
