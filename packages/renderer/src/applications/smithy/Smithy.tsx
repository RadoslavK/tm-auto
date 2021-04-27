import { Button } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useCallback,
  useMemo,
} from 'react';
import {
  PreloadedQuery,
  useMutation,
  usePreloadedQuery,
  useQueryLoader,
  useSubscription,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { SmithyQuery } from '../../_graphql/__generated__/SmithyQuery.graphql.js';
import type { SmithySettingsSubscription } from '../../_graphql/__generated__/SmithySettingsSubscription.graphql.js';
import type { SmithySetUnitsMutation } from '../../_graphql/__generated__/SmithySetUnitsMutation.graphql.js';
import { selectedVillageIdState } from '../../_recoil/atoms/selectedVillageId.js';
import { NextVillageTaskExecution } from '../../_shared/components/nextTaskExecution/NextVillageTaskExecution.js';
import { SmithyUnitsList } from './SmithyUnitsList.js';

graphql`
  fragment Smithy_autoSmithySettings on AutoSmithySettings {
      units {
          ...SmithyUnitsList_autoSmithyUnitSettings
      }
  }
`;

const query = graphql`
    query SmithyQuery($villageId: ID!) {
        upgradeableUnits(villageId: $villageId)
        autoSmithySettings(villageId: $villageId) {
            ...Smithy_autoSmithySettings @relay(mask: false)
        }
        nextVillageTaskExecution(task: AutoSmithy, villageId: $villageId) {
            ...NextVillageTaskExecution_timestamp
        }
    }
`;

const setUnitsMutation = graphql`
  mutation SmithySetUnitsMutation($villageId: ID!) {
      resetAutoSmithySettingsUnits(villageId: $villageId) {
          ...Smithy_autoSmithySettings
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
  const { autoSmithySettings, nextVillageTaskExecution, upgradeableUnits } = usePreloadedQuery(query, queryRef);

  const settingsSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<SmithySettingsSubscription> => ({
    subscription: settingsSubscription,
    variables: { villageId },
    updater: (store) => {
      const newRecord = store.getRootField('autoSmithySettingsUpdated');
      store.getRoot().setLinkedRecord(newRecord, 'autoSmithySettings', { villageId });
    },
  }), [villageId]);

  useSubscription(settingsSubscriptionConfig);

  const [setUnits] = useMutation<SmithySetUnitsMutation>(setUnitsMutation);

  const clearUnits = () => {
    setUnits({
      variables: { villageId },
      updater: (store) => {
        const newRecord = store.getRootField('resetAutoSmithySettingsUnits');
        store.getRoot().setLinkedRecord(newRecord, 'autoSmithySettings', { villageId });
      },
    });
  };

  return (
    <div>
      <NextVillageTaskExecution
        task="AutoSmithy"
        timestamp={nextVillageTaskExecution}
      />
      <SmithyUnitsList
        unitsKey={autoSmithySettings.units}
        upgradeableUnits={upgradeableUnits}
      />
      <Button
        color="secondary"
        onClick={clearUnits}
        variant="contained"
      >
        Clear all units
      </Button>
    </div>
  );
};

Smithy.displayName = 'Smithy';