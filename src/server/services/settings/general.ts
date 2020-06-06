import { GeneralSettings } from '../../_models/settings/generalSettings';
import { DataPathService } from '../dataPathService';
import { InternalSettingsService } from './internalSettingsService';

let _generalSettingsService: InternalSettingsService<GeneralSettings> | null;

export const getGeneralSettingsService = (): InternalSettingsService<GeneralSettings> => {
  if (!_generalSettingsService) {
    _generalSettingsService = new InternalSettingsService<GeneralSettings>(
      DataPathService.generalPath(),
      GeneralSettings,
    );
  }

  return _generalSettingsService;
};