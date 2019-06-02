export const logException = (message: string) => {
  const error = new Error(message);

  error.stack = error.stack
    .replace(/.*InvariantException.*\n/, '')
    .replace('Error:', 'InvariantException:');

  console.error(error.stack);
};
