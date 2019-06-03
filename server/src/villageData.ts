import { IVillageRecord, Village } from './controller/models/village';

export const villageData: { villages: IVillageRecord[] } = {
  villages: [
    new Village({
      id: 1,
      name: 'Village',
    }),
  ],
};
