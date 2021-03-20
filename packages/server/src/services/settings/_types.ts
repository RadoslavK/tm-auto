import type { InternalSettingsService } from './internalSettingsService.js';

export type ComplexSettingsServiceType<TSettings extends object> = {
  [TSettingsKey in keyof TSettings]: TSettings[TSettingsKey] extends object ? InternalSettingsService<TSettings[TSettingsKey]> : never;
};
