import { settingsService } from '../../services/settingsService';
import { VillageSettings } from '../settings/VillageSettings';
import { Village } from './village';

export class Villages {
  public currentVillageId: number;
  private readonly m_villages: Record<string, Village> = {};

  public all = (): readonly Village[] => Object.values(this.m_villages);

  public village = (villageId = this.currentVillageId): Village => this.m_villages[villageId];

  public update = (villages: readonly Village[]): void => {
    const oldVillages = Object
      .values(this.m_villages)
      .filter(v => !villages.some(x => x.id === v.id));

    //  TODO: delete all village related data

    const newVillages = villages
      .filter(v => !this.m_villages[v.id]);

    Object
      .keys(this.m_villages)
      .forEach(villageId => {
        if (oldVillages.some(v => v.id === +villageId)) {
          delete this.m_villages[villageId];
        }
      });

    newVillages.forEach(village => {
      this.m_villages[village.id] = village;
      const general = settingsService.village(village.id).general.load();
      const autoBuild = settingsService.village(village.id).autoBuild.load();
      settingsService.get().setVillage(village.id, new VillageSettings({
        general,
        autoBuild,
      }));
    });
  };
}
