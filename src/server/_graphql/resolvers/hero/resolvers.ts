import { Resolvers } from '../../_types';
import { accountContext } from '../../../accountContext';

export default <Resolvers> {
  HeroInformation: {
    village: hero => hero.villageId
      ? accountContext.villageService.village(hero.villageId)
      : null,
  },
};