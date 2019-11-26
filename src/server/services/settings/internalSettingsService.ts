import { Boxed } from '../../../_shared/types';
import { fileService } from '../fileService';

export class InternalSettingsService<TParams extends Boxed<TParams>, TSettings extends TParams> {
  private settings: TSettings;
  private loaded: boolean;

  constructor(private SettingsConstructor: { new(params?: Partial<TParams>): TSettings }, private path: string) {}

  public get = (): TSettings => {
    if (!this.loaded) {
      this.settings = fileService.loadInstance<TSettings>(this.path, this.SettingsConstructor);
      this.loaded = true;
    }

    return this.settings;
  };

  public update = (settings: TSettings): Promise<void> => {
    this.settings = settings;
    return fileService.save(this.path, this.settings);
  };
}