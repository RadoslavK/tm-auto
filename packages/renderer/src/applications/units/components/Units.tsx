import { makeStyles } from '@material-ui/core';
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
import { BuildingType } from 'shared/enums/BuildingType.js';

import type { UnitsAutoUnitsSettingsQuery } from '../../../_graphql/__generated__/UnitsAutoUnitsSettingsQuery.graphql.js';
import type { UnitsSubscription } from '../../../_graphql/__generated__/UnitsSubscription.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { NextVillageTaskExecution } from '../../../_shared/components/nextTaskExecution/NextVillageTaskExecution.js';
import { UnitBuildingSection } from './UnitBuildingSection.js';

const useStyles = makeStyles({
  building: {
    flex: '1',
  },
  buildings: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const unitsAutoUnitsSettingsQuery = graphql`
  query UnitsAutoUnitsSettingsQuery($villageId: ID!) {
      autoUnitsSettings(villageId: $villageId) {
          barracks {
              ...UnitBuildingSection_autoUnitsBuildingSettings
          }
          stable {
              ...UnitBuildingSection_autoUnitsBuildingSettings
          }
          workshop {
              ...UnitBuildingSection_autoUnitsBuildingSettings
          }
          residence {
              ...UnitBuildingSection_autoUnitsBuildingSettings
          }
      }
  }
`;

const unitsSubscription = graphql`
    subscription UnitsSubscription($villageId: ID!) {
        autoUnitsSettingsUpdated(villageId: $villageId) {
            ...AutoUnitsSettings
        }
    }
`;

export const useUnitsQuery = () => {
  const [unitSettingsQueryRef, loadUnitSettingsQuery] = useQueryLoader<UnitsAutoUnitsSettingsQuery>(unitsAutoUnitsSettingsQuery);

  const reloadUnitSettingsQuery = useCallback((villageId: string) => {
    loadUnitSettingsQuery({ villageId }, { fetchPolicy: 'store-and-network' });
  }, [loadUnitSettingsQuery]);

  return {
    reloadUnitSettingsQuery,
    unitSettingsQueryRef,
  };
};

type Props = {
  readonly unitSettingsQueryRef: PreloadedQuery<UnitsAutoUnitsSettingsQuery>;
};

export const Units: React.FC<Props> = ({
  unitSettingsQueryRef,
}) => {
  const classes = useStyles();

  const villageId = useRecoilValue(selectedVillageIdState);
  const { autoUnitsSettings } = usePreloadedQuery(unitsAutoUnitsSettingsQuery, unitSettingsQueryRef);

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<UnitsSubscription> => ({
    subscription: unitsSubscription,
    variables: { villageId },
    updater: (store) => {
      const newRecord = store.getRootField('autoUnitsSettingsUpdated');
      const record = store.getRoot().getLinkedRecord('autoUnitsSettings', { villageId });

      record?.copyFieldsFrom(newRecord);
    },
  }), [villageId]);

  useSubscription(subscriptionConfig);

  return (
    <div>
      <NextVillageTaskExecution task="AutoUnits" />
      <div className={classes.buildings}>
        <UnitBuildingSection
          buildingType={BuildingType.Barracks}
          className={classes.building}
          settings={autoUnitsSettings.barracks}
        />
        <UnitBuildingSection
          buildingType={BuildingType.Stable}
          className={classes.building}
          settings={autoUnitsSettings.stable}
        />
        <UnitBuildingSection
          buildingType={BuildingType.Workshop}
          className={classes.building}
          settings={autoUnitsSettings.workshop}
        />
        <UnitBuildingSection
          buildingType={BuildingType.Residence}
          className={classes.building}
          settings={autoUnitsSettings.residence}
        />
      </div>
    </div>
  );
};

Units.displayName = 'Units';