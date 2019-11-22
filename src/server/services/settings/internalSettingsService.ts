import { Boxed } from '../../../_shared/types';
import { fileUtils } from '../../utils/fileUtils';

export class InternalSettingsService<TSettings extends Boxed<TSettings>> {
  private settings: TSettings;
  private loaded: boolean;

  constructor(private SettingsConstructor: { new(params?: Partial<TSettings>): TSettings }, private path: string) {}

  public get = (): TSettings => {
    if (!this.loaded) {
      this.settings = fileUtils.loadInstance<TSettings>(this.path, this.SettingsConstructor);
      this.loaded = true;
    }

    return this.settings;
  };

  public update = (settings: TSettings): Promise<void> => {
    this.settings = settings;
    return fileUtils.save(this.path, this.settings);
  };
}