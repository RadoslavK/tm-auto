import { ITribe } from '../server/_types/graphql';
import { Tribe } from '../client/_types/graphql';

export const getTribeFromIndex = (index: number): ITribe => {
  switch (index) {
    case 1: return ITribe.Romans;
    case 2: return ITribe.Teutons;
    case 3: return ITribe.Gauls;
    case 4: return ITribe.Nature;
    case 5: return ITribe.Natars;
    case 6: return ITribe.Egyptians;
    case 7: return ITribe.Huns;
    default: throw new Error(`Unknown tribe index: ${index}`);
  }
};

export const getTribeIndex = (tribe: Tribe | ITribe): number => {
  switch (tribe) {
    case Tribe.Romans: return 1;
    case Tribe.Teutons: return 2;
    case Tribe.Gauls: return 3;
    case Tribe.Nature: return 4;
    case Tribe.Natars: return 5;
    case Tribe.Egyptians: return 6;
    case Tribe.Huns: return 7;
    default: throw new Error(`Unknown tribe: ${Tribe[tribe]}`);
  }
};