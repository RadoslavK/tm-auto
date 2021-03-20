import { GeneralSettings } from '../../_models/settings/generalSettings.js';
import { DataPathService } from '../dataPathService.js';
import { InternalSettingsService } from './internalSettingsService.js';

let generalSettingsServiceField: InternalSettingsService<
  GeneralSettings
> | null;

export const getGeneralSettingsService = (): InternalSettingsService<
  GeneralSettings
> => {
  if (!generalSettingsServiceField) {
    generalSettingsServiceField = new InternalSettingsService<GeneralSettings>(
      DataPathService.generalPath(),
      GeneralSettings,
    );
  }

  return generalSettingsServiceField;
};
