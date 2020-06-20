import { GeneralSettings } from '../../_models/settings/generalSettings';
import { DataPathService } from '../dataPathService';
import { InternalSettingsService } from './internalSettingsService';

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
