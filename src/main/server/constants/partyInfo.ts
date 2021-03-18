import { Resources } from '../_models/misc/resources.js';

export const partyInfo = {
  small: {
    cost: new Resources({
      clay: 6650,
      crop: 1340,
      iron: 5940,
      wood: 6400,
    }),
    townHallLevel: 1,
  },
  large: {
    cost: new Resources({
      clay: 33250,
      crop: 6700,
      iron: 32000,
      wood: 29700,
    }),
    townHallLevel: 10,
  },
};
