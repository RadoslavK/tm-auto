export const formatTime = (date: Date): string => {
  const hours = date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`;
  const mins = date.getMinutes() > 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`;
  const sec = date.getSeconds() > 9 ? `${date.getSeconds()}` : `0${date.getSeconds()}`;

  return `${hours}:${mins}:${sec}`;
};
