import { context } from '../../graphql/context';
import { settingsService } from '../../services/settingsService';
import { VillageSettings } from '../settings/VillageSettings';
import { Village } from './village';

export class Villages {
  public currentVillageId: number;
  private readonly _villages: Record<number, Village> = {};

  public all = (): readonly Village[] => Object.values(this._villages);

  public village = (villageId = this.currentVillageId): Village => this._villages[villageId];

  public update = (villages: readonly Village[]): void => {
    const oldVillages = Object
      .values(this._villages)
      .filter(v => !villages.some(x => x.id === v.id));

    //  TODO: delete all village related data

    const newVillages = villages
      .filter(v => !this._villages[v.id]);

    Object
      .keys(this._villages)
      .forEach(villageId => {
        if (oldVillages.some(v => v.id === +villageId)) {
          delete this._villages[villageId];
        }
      });

    newVillages.forEach(village => {
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
