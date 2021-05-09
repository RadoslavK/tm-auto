import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

import { Duration } from '../../../duration.js';

class VideoFeatureSettings {
  public readonly allow: boolean = true;
  public readonly minBuildTime: Duration = new Duration({ minutes: 10 });

  constructor(params: PartialFields<VideoFeatureSettings> = {}) {
    mergeDefaults(this, params);
  }
}

export class GlobalAutoBuildSettings {
  public readonly allow: boolean = true;
  public readonly videoFeature: VideoFeatureSettings = new VideoFeatureSettings();

  constructor(params: PartialFields<GlobalAutoBuildSettings> = {}) {
    mergeDefaults(this, params);
  }
}