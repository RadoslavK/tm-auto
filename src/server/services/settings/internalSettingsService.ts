import { mergeDefaults } from '../../../_shared/merge';
import { PartialFields } from '../../../_shared/types/fields.type';
import { fileService } from '../fileService';

export class InternalSettingsService<TSettings> {
  private settings: TSettings;
  private loaded: boolean;

  constructor(private path: string, private SettingsConstructor: { new(params?: PartialFields<TSettings>): TSettings }) {}

  public get = (): TSettings => {
    if (!this.loaded) {
      this.settings = fileService.loadInstance<TSettings>(this.path, this.SettingsConstructor);
      this.loaded = true;
    }

    return this.settings;
  };

  // TODO check if needed
  public update = (settings: TSettings): void => {
    this.settings = settings;

    this.save();
  };

  public merge = (updated: PartialFields<TSettings>): TSettings => {
    mergeDefaults(this.settings, updated);
    this.save();

    return this.settings;
  };

  public reset = (): TSettings => {
    this.settings = new this.SettingsConstructor();

    return this.settings;
  };

  private save = async (): Promise<void> => {
    await fileService.save(this.path, this.settings);
  };
}