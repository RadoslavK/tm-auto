export const getServerAppDirectory = (): string => {
  if (!process.env.dirname) {
    throw new Error('Unknown server directory name');
  }

  return process.env.dirname;
};
