import graphql from 'babel-plugin-relay/macro';
import React, {
  useCallback,
  useMemo,
} from 'react';
import {
  PreloadedQuery,
  usePreloadedQuery,
  useQueryLoader,
  useSubscription,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { SmithyQuery } from '../../_graphql/__generated__/SmithyQuery.graphql.js';
import type { SmithySettingsSubscription } from '../../_graphql/__generated__/SmithySettingsSubscription.graphql.js';
import { selectedVillageIdState } from '../../_recoil/atoms/selectedVillageId.js';
import { NextVillageTaskExecution } from '../../_shared/components/nextTaskExecution/NextVillageTaskExecution.js';

graphql`
  fragment Smithy_autoSmithySettings on AutoSmithySettings {
      units {
          unitIndex
      }
  }
`;

const query = graphql`
    query SmithyQuery($villageId: ID!) {
        autoSmithySettings(villageId: $villageId) {
            ...Smithy_autoSmithySettings @relay(mask: false)
        }
        nextVillageTaskExecution(task: AutoSmithy, villageId: $villageId) {
            ...NextVillageTaskExecution_timestamp
        }
    }
`;

const settingsSubscription = graphql`
  subscription SmithySettingsSubscription($villageId: ID!) {
      autoSmithySettingsUpdated(villageId: $villageId) {
          ...Smithy_autoSmithySettings
      }
  }
`;

export const useSmithyQuery = () => {
  const [smithyQueryRef, loadSmithyQuery] = useQueryLoader<SmithyQuery>(query);

  const reloadSmithyQuery = useCallback((villageId: string) => {
    loadSmithyQuery({ villageId }, { fetchPolicy: 'store-and-network' });
  }, [loadSmithyQuery]);

  return { smithyQueryRef, reloadSmithyQuery };
};

type Props = {
  readonly queryRef: PreloadedQuery<SmithyQuery>;
};

export const Smithy: React.FC<Props> = ({ queryRef }) => {
  const villageId = useRecoilValue(selectedVillageIdState);
  const { autoSmithySettings, nextVillageTaskExecution } = usePreloadedQuery(query, queryRef);

  const settingsSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<SmithySettingsSubscription> => ({
    subscription: settingsSubscription,
    variables: { villageId },
    updater: (store) => {
      const newRecord = store.getRootField('autoSmithySettingsUpdated');
      store.getRoot().setLinkedRecord(newRecord, 'autoSmithySettings', { villageId });
    },
  }), [villageId]);

  useSubscription(settingsSubscriptionConfig);

  return (
    <div>
      <NextVillageTaskExecution
        task="AutoSmithy"
        timestamp={nextVillageTaskExecution}
      />
      {autoSmithySettings.units.length}
    </div>
  );
};

Smithy.displayName = 'Smithy';