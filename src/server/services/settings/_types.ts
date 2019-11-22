import { Boxed } from '../../../_shared/types';
import { InternalSettingsService } from './internalSettingsService';

export type ComplexSettingsServiceType<TSettings extends Boxed<TSettings>> = {
  [TSettingsKey in keyof TSettings]: InternalSettingsService<TSettings[TSettingsKey]>;
} & {
  readonly get: () => TSettings;
};