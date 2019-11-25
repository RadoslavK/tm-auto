import { Village } from '../_models/village/village';
import { Coords } from '../_models/coords';

export class VillageService {
  public currentVillageId: number;
  private readonly m_villages: Record<string, Village> = {};

  public allVillages = (): readonly Village[] => Object.values(this.m_villages);

  public village = (villageId: number): Village => this.m_villages[villageId];

  public currentVillage = (): Village => this.village(this.currentVillageId);

  public updateVillage = (villages: readonly Village[]): void => {
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
    });
  };

  public setCapital = (coords: Coords): { readonly capitalChanged: boolean; } => {
    const villages = this.allVillages();
    const village = villages.find(x => x.coords.x === coords.x && x.coords.y === coords.y);

    if (!village) {
      throw new Error(`No village at coords ${coords.toString()} was found`);
    }

    const previousCapitalVillage = villages.find(x => x.isCapital);

    if (previousCapitalVillage === village) {
      return { capitalChanged: false };
    }

    if (previousCapitalVillage) {
      previousCapitalVillage.isCapital = false;
    }

    village.isCapital = true;

    return  { capitalChanged: true };
  };
}
