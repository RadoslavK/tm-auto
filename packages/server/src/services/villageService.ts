import type { BuildingSpot } from '../_models/buildings/spots/buildingSpot.js';
import type { Coords } from '../_models/coords.js';
import { Village } from '../_models/village/village.js';
import { AccountContext } from '../accountContext.js';
import { BotEvent } from '../events/botEvent.js';
import { publishPayloadEvent } from '../pubSub.js';
import { accountService } from './accountService.js';
import { dataPathService } from './dataPathService.js';
import { fileService } from './fileService.js';

type SerializableVillage = Pick<Village,
  'scanned' | 'coords' | 'isCapital' | 'id' | 'name'> & {
  readonly spots: ReadonlyArray<BuildingSpot>;
};

type CapitalChangedPayload = {
  readonly oldCapVillageId?: string;
  readonly newCapVillageId?: string;
};

export class VillageService {
  private getSerializePath = (villageId: string): string => {
    const accId = accountService.getCurrentAccount().id;

    return dataPathService.accountPath(accId).context.village(villageId);
  }

  private getVillagesFolderPath = (): string => {
    const accId = accountService.getCurrentAccount().id;

    return dataPathService.accountPath(accId).context.villagesFolder;
  }

  private _currentVillageId: string = '';

  get currentVillageId(): string {
    return this._currentVillageId;
  }

  set currentVillageId(villageId: string) {
    this._currentVillageId = villageId;
    publishPayloadEvent(BotEvent.ActiveVillageIdChanged, { villageId });
  }

  private _villages: Village[] = [];

  public allVillages = (): readonly Village[] => this._villages;

  public village = (villageId: string): Village => {
    const vill = this._villages.find((v) => v.id === villageId);

    if (!vill) {
      throw new Error(`Village with id ${villageId} does not exist`);
    }

    return vill;
  };

  public currentVillage = (): Village => this.village(this.currentVillageId);

  public updateVillages = (villages: readonly Village[]): void => {
    const oldVillages: Village[] = [];

    for (const existingVillage of this._villages) {
      const updatedVillage = villages.find((v) => v.id === existingVillage.id);

      if (!updatedVillage) {
        const accountId = accountService.getCurrentAccount().id;
        // old village to be deleted
        const { root: villageDataPath } = dataPathService.villagePath(
          accountId,
          existingVillage.id,
        );
        const villageContextPath = dataPathService.accountPath(accountId).context.village(existingVillage.id);
        fileService.delete(villageDataPath);
        fileService.delete(villageContextPath);
        oldVillages.push(existingVillage);
      } else {
        existingVillage.name = updatedVillage.name;
      }
    }

    // add new villages
    villages
      .filter(
        (v) =>
          !this._villages.some(
            (existingVillage) => existingVillage.id === v.id,
          ),
      )
      .forEach((village) => {
        this._villages.push(village);
      });

    this._villages = this._villages.filter((v) => !oldVillages.includes(v));
  };

  public villageByCoords = (coords: Coords): Village | undefined =>
    this._villages.find(v => v.coords.equalsTo(coords));

  public capitalVillage = (): Village | undefined =>
    this._villages.find((x) => x.isCapital);

  public setCapital = (
    coords: Coords,
    ensureVillageExists = true,
  ): CapitalChangedPayload => {
    const village = this.villageByCoords(coords);
    const previousCapitalVillage = this.capitalVillage();

    if (previousCapitalVillage === village) {
      return {};
    }

    if (previousCapitalVillage) {
      previousCapitalVillage.isCapital = false;
    }

    if (village) {
      village.isCapital = true;
    } else if (ensureVillageExists) {
      throw new Error(`No village at coords ${coords} was found`);
    }

    return {
      newCapVillageId: village?.id,
      oldCapVillageId: previousCapitalVillage?.id,
    };
  };

  public serialize = async (villageIds?: ReadonlyArray<String>): Promise<void> => {
    const villages = this._villages.filter(v => !villageIds || villageIds.includes(v.id));

    for (const village of villages) {
      const path = this.getSerializePath(village.id);

      const data: SerializableVillage = {
        name: village.name,
        id: village.id,
        isCapital: village.isCapital,
        coords: village.coords,
        scanned: village.scanned,
        spots: village.buildings.spots.buildings(),
      };

      await fileService.save(path, data);
    }
  };

  public load = async (): Promise<void> => {
    const folderPath = this.getVillagesFolderPath();
    const villageFiles = await fileService.getFiles(folderPath);
    const villageIds = villageFiles.map(f => /(.*)\.json/.exec(f)?.[1]);

    for (const id of villageIds) {
      if (!id) {
        console.error('Didnt parse village id correctly');
        continue;
      }

      const path = this.getSerializePath(id);
      const data = await fileService.loadWithoutDefaultValue<SerializableVillage>(path);

      if (!data) {
        console.error('Failed to read village info');
        continue;
      }

      const village = new Village({
        id: data.id,
        scanned: data.scanned,
        coords: data.coords,
        isCapital: data.isCapital,
        name: data.name,
      });

      village.buildings.spots.set(data.spots);
      this._villages.push(village);

      const buildingQueueService = AccountContext.getContext().buildingQueueService.for(village.id);
      await buildingQueueService.loadQueueAndUpdate();
    }

    publishPayloadEvent(BotEvent.VillagesUpdated, { villages: this._villages });
  };
}
