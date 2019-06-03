import { Village } from './_models/village';
import { IVillage } from './_types/graphql';

export const villageData: { villages: IVillage[] } = {
  villages: [
    new Village({
      id: '1',
      name: 'Village',
    }),
  ],
};
