import { InMemoryCache } from '@apollo/client';

import { possibleTypes } from '../fragmentTypes.json';
import { GetCollapsedBuildingQueueRangesQueryVariables } from '../graphqlHooks';

export const graphQLCache = new InMemoryCache({
  possibleTypes,
});

const collapsedBuildingQueueRangeIds = graphQLCache.makeVar<
  Record<string, readonly string[]>
>({});
const selectedVillageId = graphQLCache.makeVar<string>('');

graphQLCache.policies.addTypePolicies({
  HeroLevelUpItem: { keyFields: ['name'] },
  QueuedBuildingRange: { keyFields: false },
  Query: {
    fields: {
      collapsedBuildingQueueRanges: (_prev, { args }) => {
        if (!args) {
          return;
        }

        const {
          villageId,
        } = args as GetCollapsedBuildingQueueRangesQueryVariables;

        const ids = collapsedBuildingQueueRangeIds();
        return ids[villageId] || [];
      },
      selectedVillageId: () => selectedVillageId(),
    },
  },
});

export const updateCollapsedBuildingQueueRangeIds = (
  villageId: string,
  newIds: readonly string[],
): void => {
  const ids = collapsedBuildingQueueRangeIds();

  collapsedBuildingQueueRangeIds({
    ...ids,
    [villageId]: newIds,
  });
};

export const updateSelectedVillageId = (id: string) => {
  selectedVillageId(id);
};
