import { Villages } from '../_models/village/villages';

class VillagesService {
  private villages: Villages = new Villages();

  public get = (): Villages => this.villages;
}

export const villagesService = new VillagesService();