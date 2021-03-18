import { InternalSettingsService } from './internalSettingsService.js';

export type ComplexSettingsServiceType<TSettings> = {
  [TSettingsKey in keyof TSettings]: InternalSettingsService<
    TSettings[TSettingsKey]
  >;
};
