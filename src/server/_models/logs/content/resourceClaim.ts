import { ClaimHeroResourcesReason } from '../../../../_shared/types/claimHeroResourcesReason';
import { Resources } from '../../misc/resources';

export class ResourceClaimLogEntryContent {
  public readonly reason: ClaimHeroResourcesReason = ClaimHeroResourcesReason.AutoBuild;
  public readonly resources: Resources = new Resources();

  constructor(params: ResourceClaimLogEntryContent) {
    Object.assign(this, params);
  }
}