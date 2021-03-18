import debouncePkg from 'debounce';
//  TODO: debounce is CommonJS
const { debounce } = debouncePkg;

import { mergeDefaults } from '../../../../_shared/merge.js';
import { PartialFields } from '../../../../_shared/types/fields.type.js';
import { fileService } from '../fileService.js';

export class InternalSettingsService<TSettings> {
  private settings: TSettings | null = null;

  constructor(
    private path: string,
    private SettingsConstructor: {
      new (params?: PartialFields<TSettings>): TSettings;
    },
  ) {}

  public get = (): TSettings => {
    if (!this.settings) {
      this.settings = fileService.loadInstance<TSettings>(
        this.path,
        this.SettingsConstructor,
      );
    }

    return this.settings;
  };

  public getWithoutDefaultValue = (): TSettings | null =>
    this.settings ||
    fileService.loadInstanceWithoutDefaultValue<TSettings>(
      this.path,
      this.SettingsConstructor,
    );

  public update = (settings: TSettings): void => {
    this.settings = settings;

    this.debouncedSave();
  };

  public merge = (updated: PartialFields<TSettings>): TSettings => {
    const settings = this.get();

    mergeDefaults(settings, updated);
    this.debouncedSave();

    return settings;
  };

  public reset = (): TSettings => {
    this.settings = new this.SettingsConstructor();

    this.debouncedSave();

    return this.settings;
  };

  private save = async (): Promise<void> => {
    await fileService.save(this.path, this.settings);
  };

  private debouncedSave = debounce(this.save, 333);
}
