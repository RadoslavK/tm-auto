import { Resolvers } from '../../_types';
import { HeroInformation } from '../../../_types/graphql';
import { accountContext } from '../../../accountContext';
import { mapHeroInformation } from '../../mappers/mapHeroInformation';

export default <Resolvers>{
  Query: {
    heroInformation: (): HeroInformation => {
      const { hero } = accountContext;

      return mapHeroInformation(hero);
    },
  },
};