import { context } from '../../graphql/context';
import { settingsService } from '../../services/settingsService';
import { VillageSettings } from '../settings/VillageSettings';
import { Village } from './village';

export class Villages {
  public currentVillageId: number;
  private readonly _villages: Record<number, Village> = {};

  public all = (): readonly Village[] => Object.values(this._villages);

  public village = (villageId = this.currentVillageId): Village => this._villages[villageId];

  public set = (villages: readonly Village[]): void => {
    villages.forEach(village => {
      this._villages[village.id] = village;
      const general = settingsService.village(village.id).general.load();
      const autoBuild = settingsService.village(village.id).autoBuild.load();
      context.settings.setVillage(village.id, new VillageSettings({
        general,
        autoBuild,
      }));
    });
  };
}
