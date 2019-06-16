import { file } from 'babel-types';
import { GeneralSettings } from '../_models/settings/GeneralSettings';
import { GeneralVillageSettings } from '../_models/settings/GeneralVillageSettings';
import { AutoAdventureSettings } from '../_models/settings/tasks/AutoAdventureSettings';
import { AutoBuildSettings } from '../_models/settings/tasks/AutoBuildSettings';
import { VillageSettings } from '../_models/settings/VillageSettings';
import { context } from '../graphql/context';
import { fileUtils } from '../utils/fileUtils';
import set = Reflect.set;

const basePath = 'settings';
const generalPath = `${basePath}/general.json`;

const heroPath = {
  autoAdventure: `${basePath}/hero/autoAdventure.json`,
};

const villagePath = (villageId: number) => ({
  general: `${basePath}/village/${villageId}/general.json`,
  autoBuild: `${basePath}/village/${villageId}/autoBuild.json`,
});

export const settingsService = {
  general: {
    load(): GeneralSettings {
      return fileUtils.load(generalPath, GeneralSettings, new GeneralSettings());
    },
    update(settings: GeneralSettings): void {
      context.settings.general = settings;
      fileUtils.save(generalPath, settings);
    },
  },

  hero: {
    autoAdventure: {
      load(): AutoAdventureSettings {
        return fileUtils.load(heroPath.autoAdventure, AutoAdventureSettings, new AutoAdventureSettings());
      },
      update(settings: AutoAdventureSettings): void {
        context.settings.hero.autoAdventure = settings;
        fileUtils.save(heroPath.autoAdventure, settings);
      },
    },
  },

  village(villageId: number) {
    const localVillagePath = villagePath(villageId);

    return {
      general: {
        load(): GeneralVillageSettings {
          return fileUtils.load(localVillagePath.general, GeneralVillageSettings);
        },
        update(settings: GeneralVillageSettings) {
          context.settings.village(villageId).general = settings;
          fileUtils.save(localVillagePath.general, settings);
        },
      },
      autoBuild: {
        load(): AutoBuildSettings {
          return fileUtils.load(localVillagePath.autoBuild, AutoBuildSettings);
        },
        update(settings: AutoBuildSettings) {
          context.settings.village(villageId).autoBuild = settings;
          fileUtils.save(localVillagePath.autoBuild, settings);
        },
      },
    };
  },
};
