export const randomElement = <T>(elements: readonly T[]): T => elements[Math.floor(Math.random() * elements.length)];
