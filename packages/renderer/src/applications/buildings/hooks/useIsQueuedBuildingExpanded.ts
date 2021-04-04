import { useRecoilValue } from 'recoil';

import { expandedQueuedBuildingsState } from '../../../_recoil/atoms/expandedQueuedBuildings.js';

export const useIsQueuedBuildingExpanded = (villageId: string, queueId: string): boolean => {
  const expandedQueuedBuildings = useRecoilValue(expandedQueuedBuildingsState);
  const expandedIds = expandedQueuedBuildings.get(villageId) ?? new Set<string>();

  return expandedIds.has(queueId);
};