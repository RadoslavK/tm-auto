import { AccountContext } from '../accountContext.js';
import { accountService } from '../services/accountService.js';
import { AvailableBuildingTypesService } from '../services/availableBuildingTypesService.js';
import { ExpandedBuildingService } from '../services/buildingQueue/expandedBuildingService.js';
import { ControllerService } from '../services/controllerService.js';
import { CrannyInfoService } from '../services/crannyInfoService.js';
import { buildingInfoService } from '../services/info/buildingInfoService.js';
import { unitInfoService } from '../services/info/unitInfoService.js';
import { unitUpgradeCostService } from '../services/info/unitUpgradeCostService.js';
import { GeneralSettingsService } from '../services/settings/general.js';
import { SettingsManagementService } from '../services/settingsManagementService.js';
import type { ApiContext } from './apiContext.type.js';

interface ProxyConstructor {
  new <T extends object, S extends object>(target: S, handler: ProxyHandler<T>): S&T;
}
declare var Proxy: ProxyConstructor;

type ProxiedType<Provided> = Omit<ApiContext, keyof Provided>;

export const createApiContextProxy = (): ApiContext => {
  const context = {
    controllerService: new ControllerService(),
    crannyInfoService: new CrannyInfoService(),
    unitInfoService,
    availableBuildingTypesService: new AvailableBuildingTypesService(),
    buildingInfoService,
    unitUpgradeCostService,
    accountService,
    settingsManagementService: new SettingsManagementService(),
    expandedBuildingService: new ExpandedBuildingService(),
  };

  const handler: ProxyHandler<ProxiedType<typeof context>> = {
    get: (target, prop: keyof ProxiedType<typeof context>) => {
      switch (prop) {
        case 'settingsService': return AccountContext.getContext().settingsService;
        case 'hero': return AccountContext.getContext().hero;
        case 'generalSettingsService': return GeneralSettingsService.getService();
        case 'villageService': return AccountContext.getContext().villageService;
        case 'buildingQueueService': return AccountContext.getContext().buildingQueueService;
        case 'gameInfo': return AccountContext.getContext().gameInfo;
        case 'logsService': return AccountContext.getContext().logsService;
        case 'mapScanService': return AccountContext.getContext().mapScanService;
        case 'mapSearchService': return AccountContext.getContext().mapSearchService;
        case 'nextExecutionService': return AccountContext.getContext().nextExecutionService;
        default: return target[prop];
      }
    },
  };

  return new Proxy(context, handler);
};