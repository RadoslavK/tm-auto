import { context } from '../graphql/context';

export const updateUnitsInformation = async (): Promise<void> => {
  const village = context.villages.village();

  for (let i = 1; i <= 10; i++) {
    village.units.setCount(i, 0);
  }
};
