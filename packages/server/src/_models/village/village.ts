import { Tribe } from 'shared/enums/Tribe.js';
import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

import { AccountContext } from '../../accountContext.js';
import { BotEvent } from '../../events/botEvent.js';
import { publishPayloadEvent } from '../../pubSub.js';
import { Buildings } from '../buildings';
import { Coords } from '../coords.js';
import { Units } from '../units';
import { VillageResources } from './villageResources.js';

export class Village {
  public readonly buildings: Buildings = new Buildings({
    onBuildingSpotUpdated: (buildingSpot) =>
      publishPayloadEvent(BotEvent.BuildingSpotUpdated, {
        villageId: this.id,
        buildingSpot,
      }),
    onOngoingUpdated: () => {
      publishPayloadEvent(BotEvent.BuildingsInProgressUpdated, {
        villageId: this.id,
      });
    },
    onCrannyCapacityUpdate: () =>
      publishPayloadEvent(BotEvent.CrannyCapacityUpdated, { villageId: this.id }),
    onMainBuildingLevelsChanged: () =>
      publishPayloadEvent(BotEvent.BuildingQueueTimesUpdated, { villageId: this.id }),
    onActualAndOngoingUpdate: () =>
      AccountContext.getContext().villageService.serialize([this.id]),
  });

  public tribe: Tribe = Tribe.Romans;

  public readonly coords: Coords = new Coords();

  public readonly id: string = '';

  public isCapital: boolean = false;

  public name: string = '';

  public readonly units: Units = new Units();

  public readonly resources: VillageResources = new VillageResources();

  public scanned: boolean = false;

  constructor(params: PartialFields<Village> = {}) {
    mergeDefaults(this, params);
  }

  public getWarehouseFullness = (): number =>
    this.resources.amount.getRequiredWarehouseSize() /
    this.resources.capacity.warehouse;

  public getGranaryFullness = (): number =>
    this.resources.amount.crop / this.resources.capacity.granary;
}
