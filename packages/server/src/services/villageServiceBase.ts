import type { Village } from '../_models/village/village.js';
import { AccountContext } from '../accountContext.js';

export abstract class VillageServiceBase {
  protected readonly village: Village;

  protected constructor(villageId: string) {
    this.village = AccountContext.getContext().villageService.village(villageId);
  }
}