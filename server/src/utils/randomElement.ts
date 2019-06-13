export const randomElement = <T>(elements: readonly T[]): T => {
  return elements[Math.floor(Math.random() * elements.length)];
};
