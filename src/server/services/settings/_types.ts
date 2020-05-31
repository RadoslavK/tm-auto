import { InternalSettingsService } from './internalSettingsService';

export type ComplexSettingsServiceType<TSettings> = {
  [TSettingsKey in keyof TSettings]: InternalSettingsService<TSettings[TSettingsKey]>;
};