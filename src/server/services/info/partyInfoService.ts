import { Resources } from '../../_models/misc/resources';
import { PartyType } from '../../_types/graphql';

interface IPartyInfo {
  readonly cost: Resources;
  readonly townHallLevel: number;
}

const partiesInfo: Record<string, IPartyInfo> = {
  [PartyType.Small]: {
    cost: new Resources({
      clay: 6650, crop: 1340, iron: 5940, wood: 6400,
    }),
    townHallLevel: 1,
  },
  [PartyType.Large]: {
    cost: new Resources({
      clay: 33250, crop: 6700, iron: 32000, wood: 29700,
    }),
    townHallLevel: 10,
  },
};

class PartyInfoService {
  public get = (type: PartyType): IPartyInfo => partiesInfo[type];
}

export const partyInfoService = new PartyInfoService();
