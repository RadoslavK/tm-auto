import { GeneralSettings } from '../_models/settings/GeneralSettings';
import { GeneralVillageSettings } from '../_models/settings/GeneralVillageSettings';
import { AutoAdventureSettings } from '../_models/settings/tasks/AutoAdventureSettings';
import { AutoBuildSettings } from '../_models/settings/tasks/AutoBuildSettings';
import { fileUtils } from '../utils/fileUtils';
import { Settings } from '../_models/settings/Settings';

const basePath = 'settings';
const generalPath = `${basePath}/general.json`;

const heroPath = {
  autoAdventure: `${basePath}/hero/autoAdventure.json`,
};

interface IVillagePath {
  readonly general: string;
  readonly autoBuild: string;
}

const villagePath = (villageId: number): IVillagePath => ({
  general: `${basePath}/village/${villageId}/general.json`,
  autoBuild: `${basePath}/village/${villageId}/autoBuild.json`,
});

let mSettings: Settings;

export const settingsService = {
  get(): Settings {
    const init = (): void => {
      const generalSettings = this.general.load();
      const autoAdventureSettings = this.hero.autoAdventure.load();
      mSettings = new Settings(generalSettings, autoAdventureSettings);
    };

    if (!mSettings) {
      init();
    }

    return mSettings;
  },

  general: {
    load(): GeneralSettings {
      return fileUtils.loadInstance(generalPath, GeneralSettings);
    },
    update(settings: GeneralSettings): void {
      mSettings.general = settings;
      fileUtils.save(generalPath, settings);
    },
  },

  hero: {
    autoAdventure: {
      load(): AutoAdventureSettings {
        return fileUtils.loadInstance(heroPath.autoAdventure, AutoAdventureSettings);
      },
      update(settings: AutoAdventureSettings): void {
        mSettings.hero.autoAdventure = settings;
        fileUtils.save(heroPath.autoAdventure, settings);
      },
    },
  },

  village(villageId: number) {
    const localVillagePath = villagePath(villageId);

    return {
      general: {
        load(): GeneralVillageSettings {
          return fileUtils.loadInstance(localVillagePath.general, GeneralVillageSettings);
        },
        update(settings: GeneralVillageSettings) {
          mSettings.village(villageId).general = settings;
          fileUtils.save(localVillagePath.general, settings);
        },
      },
      autoBuild: {
        load(): AutoBuildSettings {
          return fileUtils.loadInstance(localVillagePath.autoBuild, AutoBuildSettings);
        },
        update(settings: AutoBuildSettings) {
          mSettings.village(villageId).autoBuild = settings;
          fileUtils.save(localVillagePath.autoBuild, settings);
        },
      },
    };
  },
};
