import { InternalSettingsService } from './internalSettingsService';

// TODO toto je co boha
export type ComplexSettingsServiceType<TSettings> = {
  [TSettingsKey in keyof TSettings]: InternalSettingsService<TSettings[TSettingsKey]>;
} & {
  readonly get: () => TSettings;
};