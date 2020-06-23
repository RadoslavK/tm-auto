import path from 'path';

export const getServerAppDirectory = (): string => {
  if (!process.env.dirname) {
    throw new Error('Unknown server directory name');
  }

  return path.join(process.env.dirname, '.data');
};
