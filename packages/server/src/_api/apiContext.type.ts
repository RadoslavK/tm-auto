import type { GameInfo } from '../_models/gameInfo.js';
import type { Hero } from '../_models/hero/hero.js';
import type { GeneralSettings } from '../_models/settings/generalSettings.js';
import type { AccountService } from '../services/accountService.js';
import type { AvailableBuildingTypesService } from '../services/availableBuildingTypesService.js';
import type { ExpandedBuildingService } from '../services/buildingQueue/expandedBuildingService.js';
import type { BuildingQueueService } from '../services/buildingQueueService.js';
import type { ControllerService } from '../services/controllerService.js';
import type { CrannyInfoService } from '../services/crannyInfoService.js';
import type { BuildingInfoService } from '../services/info/buildingInfoService.js';
import type { UnitInfoService } from '../services/info/unitInfoService.js';
import type { LogsService } from '../services/logsService.js';
import type { MapScanService } from '../services/mapScan/mapScanService.js';
import type { MapSearchService } from '../services/mapSearchService/mapSearchService.js';
import type { NextExecutionService } from '../services/nextExecutionService.js';
import type { SettingsService } from '../services/settings';
import type { InternalSettingsService } from '../services/settings/internalSettingsService.js';
import type { SettingsManagementService } from '../services/settingsManagementService.js';
import type { VillageService } from '../services/villageService.js';

export type ApiContext = {
  readonly controllerService: ControllerService;
  readonly crannyInfoService: CrannyInfoService;
  readonly unitInfoService: UnitInfoService;
  readonly hero: Hero;
  readonly availableBuildingTypesService: AvailableBuildingTypesService;
  readonly buildingInfoService: BuildingInfoService;
  readonly accountService: AccountService;
  readonly settingsManagementService: SettingsManagementService;
  readonly generalSettingsService: InternalSettingsService<GeneralSettings>;
  readonly expandedBuildingService: ExpandedBuildingService;
  readonly buildingQueueService: {
    readonly for: (villageId: string) => BuildingQueueService;
  };

  readonly settingsService: SettingsService;
  readonly gameInfo: GameInfo;
  readonly logsService: LogsService;
  readonly nextExecutionService: NextExecutionService;
  readonly mapSearchService: MapSearchService;
  readonly mapScanService: MapScanService;
  readonly villageService: VillageService;
};