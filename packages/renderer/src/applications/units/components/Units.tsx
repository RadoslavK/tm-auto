import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { BuildingType } from 'shared/enums/BuildingType.js';

import type { UnitsAutoUnitsSettingsQuery } from '../../../_graphql/__generated__/UnitsAutoUnitsSettingsQuery.graphql.js';
import type { UnitsQuery } from '../../../_graphql/__generated__/UnitsQuery.graphql.js';
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

const unitsQuery = graphql`
    query UnitsQuery {
        ... on Query { __typename }
        selectedVillageId
    }
`;

export const Units: React.FC = () => {
  const classes = useStyles();

  const { selectedVillageId: villageId } = useLazyLoadQuery<UnitsQuery>(unitsQuery, {});
  const { autoUnitsSettings } = useLazyLoadQuery<UnitsAutoUnitsSettingsQuery>(unitsAutoUnitsSettingsQuery, { villageId });

  return (
    <div>
      <NextVillageTaskExecution
        task={'AutoUnits'}
        villageId={villageId}
      />
      <div className={classes.buildings}>
        <UnitBuildingSection
          buildingType={BuildingType.Barracks}
          className={classes.building}
          settings={autoUnitsSettings.barracks}
          villageId={villageId}
        />
        <UnitBuildingSection
          buildingType={BuildingType.Stable}
          className={classes.building}
          settings={autoUnitsSettings.stable}
          villageId={villageId}
        />
        <UnitBuildingSection
          buildingType={BuildingType.Workshop}
          className={classes.building}
          settings={autoUnitsSettings.workshop}
          villageId={villageId}
        />
        <UnitBuildingSection
          buildingType={BuildingType.Residence}
          className={classes.building}
          settings={autoUnitsSettings.residence}
          villageId={villageId}
        />
      </div>
    </div>
  );
};
