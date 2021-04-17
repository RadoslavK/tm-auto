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

import type { AcademyQuery } from '../../_graphql/__generated__/AcademyQuery.graphql.js';
import type { AcademySettingsSubscription } from '../../_graphql/__generated__/AcademySettingsSubscription.graphql.js';
import { selectedVillageIdState } from '../../_recoil/atoms/selectedVillageId.js';
import { NextVillageTaskExecution } from '../../_shared/components/nextTaskExecution/NextVillageTaskExecution.js';
import { Resources } from '../../_shared/components/Resources.js';
import { ResearchList } from './ResearchList.js';

graphql`
  fragment Academy_autoAcademySettings on AutoAcademySettings {
      totalCost {
          ...Resources_resources
      }
      ...ResearchList_autoAcademySettings
  }
`;

const query = graphql`
    query AcademyQuery($villageId: ID!) {
        autoAcademySettings(villageId: $villageId) {
            ...Academy_autoAcademySettings @relay(mask: false)
        }
        nextVillageTaskExecution(task: AutoAcademy, villageId: $villageId) {
            ...NextVillageTaskExecution_timestamp
        }
    }
`;

const settingsSubscription = graphql`
    subscription AcademySettingsSubscription($villageId: ID!) {
        autoAcademySettingsUpdated(villageId: $villageId) {
            ...Academy_autoAcademySettings
        }
    }
`;

export const useAcademyQuery = () => {
  const [academyQueryRef, loadAcademyQuery] = useQueryLoader<AcademyQuery>(query);

  const reloadAcademyQuery = useCallback((villageId: string) => {
    loadAcademyQuery({ villageId }, { fetchPolicy: 'store-and-network' });
  }, [loadAcademyQuery]);

  return { academyQueryRef, reloadAcademyQuery };
};

type Props = {
  readonly queryRef: PreloadedQuery<AcademyQuery>;
};

export const Academy: React.FC<Props> = ({ queryRef }) => {
  const villageId = useRecoilValue(selectedVillageIdState);
  const { autoAcademySettings, nextVillageTaskExecution } = usePreloadedQuery(query, queryRef);

  const settingsSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<AcademySettingsSubscription> => ({
    subscription: settingsSubscription,
    variables: { villageId },
    updater: (store) => {
      const newRecord = store.getRootField('autoAcademySettingsUpdated');
      store.getRoot().setLinkedRecord(newRecord, 'autoAcademySettings', { villageId });
    },
  }), [villageId]);

  useSubscription(settingsSubscriptionConfig);

  return (
    <div>
      <NextVillageTaskExecution
        task="AutoSmithy"
        timestamp={nextVillageTaskExecution}
      />
      <Resources resourcesKey={autoAcademySettings.totalCost} />
      <ResearchList settingsKey={autoAcademySettings} />
    </div>
  );
};

Academy.displayName = 'Academy';