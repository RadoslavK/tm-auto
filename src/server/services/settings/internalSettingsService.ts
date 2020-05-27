import { PartialFields } from '../../../_shared/types/fields.type';
import { fileService } from '../fileService';

export class InternalSettingsService<TSettings> {
  private settings: TSettings;
  private loaded: boolean;

  constructor(private path: string, private DefaultSettings: { new(params?: PartialFields<TSettings>): TSettings }) {}

  public get = (): TSettings => {
    if (!this.loaded) {
      this.settings = fileService.loadInstance<TSettings>(this.path, this.DefaultSettings);
      this.loaded = true;
    }

    return this.settings;
  };

  public update = (settings: TSettings): Promise<void> => {
    this.settings = settings;
    return fileService.save(this.path, this.settings);
  };
}