export const logException = (message: string): void => {
  const error = new Error(message);

  error.stack = error.stack && error.stack
    .replace(/.*InvariantException.*\n/, '')
    .replace('Error:', 'InvariantException:');

  console.error(error.stack);
};
