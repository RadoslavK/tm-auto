interface IParams {
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
}

export const getSeconds = (params?: Partial<IParams>) => {
  const {
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = params;

  const totalMinutes = hours * 60 + minutes;
  const totalSeconds = totalMinutes * 60 + seconds;

  return totalSeconds;
};
