import debounce from 'p-debounce';
import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

import { fileService } from '../fileService.js';

export class InternalSettingsService<TSettings extends object> {
  private settings: TSettings | null = null;

  constructor(
    private path: string,
    private constructValue: (params?: PartialFields<TSettings>) => TSettings,
  ) {}

  public get = (): TSettings => {
    if (!this.settings) {
      this.settings = fileService.loadInstance<TSettings>({
        targetPath: this.path,
        constructValue: this.constructValue,
      });
    }

    return this.settings;
  };

  public getWithoutDefaultValue = (): TSettings | null =>
    this.settings ||
    fileService.loadInstanceWithoutDefaultValue<TSettings>({
      constructValue: this.constructValue,
      targetPath: this.path,
    });

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
    this.settings = this.constructValue();

    this.debouncedSave();

    return this.settings;
  };

  private save = async (): Promise<void> => {
    await fileService.save(this.path, this.settings);
  };

  private debouncedSave = debounce(this.save, 333);
}
