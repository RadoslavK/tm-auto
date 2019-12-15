import { Resources } from '../../_models/misc/resources';
import { PartyType } from '../../_types/graphql';

interface IPartyInfo {
  readonly townHallLevel: number;
  readonly cost: Resources;
}

const partiesInfo: Record<string, IPartyInfo> = {
  [PartyType.Small]: {
    townHallLevel: 1,
    cost: new Resources({ wood: 6400, clay: 6650, iron: 5940, crop: 1340 }),
  },
  [PartyType.Large]: {
    townHallLevel: 10,
    cost: new Resources({ wood: 29700, clay: 33250, iron: 32000, crop: 6700 }),
  },
};

class PartyInfoService {
  public get = (type: PartyType): IPartyInfo => partiesInfo[type];
}

export const partyInfoService = new PartyInfoService();
