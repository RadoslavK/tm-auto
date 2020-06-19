import { InMemoryCache } from '@apollo/client';
import { ReactiveVar } from '@apollo/client/cache/inmemory/inMemoryCache';

import { possibleTypes } from '../fragmentTypes.json';
import { GetCollapsedBuildingQueueRangesQueryVariables } from '../graphqlHooks';

let collapsedBuildingQueueRangeIds: ReactiveVar<Record<string, readonly string[]>>;
let selectedVillageId: ReactiveVar<string>;

export const graphQLCache = new InMemoryCache({
  possibleTypes,
  typePolicies: {
    QueuedBuildingRange: { keyFields: false },
    Query: {
      fields: {
        collapsedBuildingQueueRanges: (_prev, { args }) => {
          if (!args) {
            return;
          }

          const { villageId } = args as GetCollapsedBuildingQueueRangesQueryVariables;

          const ids = collapsedBuildingQueueRangeIds();
          return ids[villageId] || [];
        },
        selectedVillageId: () => selectedVillageId(),
      },
    },
  },
});

collapsedBuildingQueueRangeIds = graphQLCache.makeVar<Record<string, readonly string[]>>({});

export const updateCollapsedBuildingQueueRangeIds = (villageId: string, newIds: readonly string[]): void => {
  const ids = collapsedBuildingQueueRangeIds();

  collapsedBuildingQueueRangeIds({
    ...ids,
    [villageId]: newIds,
  });
};

selectedVillageId = graphQLCache.makeVar<string>('');

export const updateSelectedVillageId = (id: string) => {
  selectedVillageId(id);
};