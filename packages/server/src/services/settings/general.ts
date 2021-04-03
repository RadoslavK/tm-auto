import { GeneralSettings } from '../../_models/settings/generalSettings.js';
import { DataPathService } from '../dataPathService.js';
import { InternalSettingsService } from './internalSettingsService.js';

export class GeneralSettingsService {
  private static _service: InternalSettingsService<GeneralSettings> | null;

  public static getService = (): InternalSettingsService<GeneralSettings> => {
    if (!GeneralSettingsService._service) {
      GeneralSettingsService._service = new InternalSettingsService<GeneralSettings>(
        DataPathService.generalPath(),
        GeneralSettings,
      );
    }

    return GeneralSettingsService._service;
  };
}
