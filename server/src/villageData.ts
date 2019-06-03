import { IVillage, Village } from './controller/models/village';

export const villageData: { villages: IVillage[] } = {
  villages: [
    new Village({
      id: 1,
      name: 'Village',
    }),
  ],
};
