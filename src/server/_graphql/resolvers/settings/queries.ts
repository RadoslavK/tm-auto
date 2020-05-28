import { Resolvers } from '../../_types';
import { accountContext } from '../../../accountContext';

export default <Resolvers>{
  Query: {
    autoBuildSettings: (_, args) => accountContext.settingsService.village(args.villageId).autoBuild.get(),
    autoPartySettings: (_, args) => accountContext.settingsService.village(args.villageId).autoParty.get(),
    autoUnitsSettings: (_, args) => accountContext.settingsService.village(args.villageId).autoUnits.get(),
    generalSettings: () => accountContext.settingsService.general.get(),
    generalVillageSettings: (_, args) => accountContext.settingsService.village(args.villageId).general.get(),
    hero: () => accountContext.settingsService.hero.get(),
  },
};