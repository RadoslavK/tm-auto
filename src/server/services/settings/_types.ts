import { Boxed } from '../../../_shared/types';
import { InternalSettingsService } from './internalSettingsService';

export type ComplexSettingsServiceType<TParams extends Boxed<TParams>, TSettings extends TParams> = {
  [TSettingsKey in keyof TSettings]: InternalSettingsService<TParams[TSettingsKey], TSettings[TSettingsKey]>;
} & {
  readonly get: () => TSettings;
};