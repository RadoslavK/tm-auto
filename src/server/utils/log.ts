import { formatTime } from './formatTime';

export const log = (message: string): void => {
  const now = new Date();
  const time = formatTime(now);
  console.log(`${time}: ${message}`);
};
