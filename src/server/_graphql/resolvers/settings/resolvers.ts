import { Resolvers } from '../../_types';
import { AutoAdventureSettings } from '../../../_models/settings/tasks/autoAdventureSettings';
import { AutoBuildSettings } from '../../../_models/settings/tasks/autoBuildSettings';
import { AutoPartySettings } from '../../../_models/settings/tasks/autoPartySettings';
import { AutoUnitsSettings } from '../../../_models/settings/tasks/autoUnitsSettings';

export default <Resolvers>{
  ITaskSettings: {
    __resolveType: (settings) => {
      if (settings instanceof AutoAdventureSettings) {
        return 'AutoAdventureSettings';
      }

      if (settings instanceof AutoBuildSettings) {
        return 'AutoBuildSettings';
      }

      if (settings instanceof AutoUnitsSettings) {
        return 'AutoUnitsSettings';
      }

      if (settings instanceof AutoPartySettings) {
        return 'AutoPartySettings';
      }

      return null;
    },
  },
};