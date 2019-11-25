export const parseNumber = (text: string): number | null => {
  const correctedText = text
    .replace('−', '-') // replace special minus symbol
    .replace(/[^\d-+.]/gi, ''); // remove special characters

  const match = /(-‭?\d+)/.exec(correctedText);

  return match && +match[1];
};