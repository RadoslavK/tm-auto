import { Resources } from '../../misc/resources';

export enum ClaimHeroResourcesReason {
  AutoBuild = 'AutoBuild',
  AutoUnits = 'AutoUnits',
  AutoParty = 'AutoParty'
}

export class ResourceClaimLogEntryContent {
  public readonly reason: ClaimHeroResourcesReason =
    ClaimHeroResourcesReason.AutoBuild;

  public readonly resources: Resources = new Resources();

  constructor(params: ResourceClaimLogEntryContent) {
    Object.assign(this, params);
  }
}
