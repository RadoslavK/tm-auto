interface IParams {
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
}

export const getSecondsFromString = (text: string): number => {
  const params = text.split(':');
  return getSeconds({
    hours: +params[0],
    minutes: +params[1],
    seconds: +params[2],
  });
};

export const getSeconds = (params?: Partial<IParams>): number => {
  const {
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = params;

  const totalMinutes = hours * 60 + minutes;
  const totalSeconds = totalMinutes * 60 + seconds;

  return totalSeconds;
};
