export const shuffle = <T>(array: readonly T[]): readonly T[] => {
  const newArray: T[] = array.slice();

  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // swap elements
  }

  return newArray;
};
