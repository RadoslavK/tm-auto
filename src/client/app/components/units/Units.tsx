import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core';
import React from 'react';

import { GetAutoUnitsSettings } from '*/graphql_operations/settings.graphql';

import { NextVillageTaskExecution } from '../_shared/NextVillageTaskExecution';
import {
  IGetAutoUnitsSettingsQuery,
  IGetAutoUnitsSettingsQueryVariables,
  VillageTaskType,
} from '../../../_types/graphql';
import { BuildingType } from '../../../../_shared/types/buildingType';
import { useVillageContext } from '../../hooks/useVillageContext';
import { UnitBuildingSection } from './UnitBuildingSection';

const useAutoUnitsSettings = () => {
  const { villageId } = useVillageContext();

  const { data, loading } = useQuery<IGetAutoUnitsSettingsQuery, IGetAutoUnitsSettingsQueryVariables>(GetAutoUnitsSettings, {
    variables: { villageId },
  });

  return loading || !data
    ? null
    : data.autoUnitsSettings;
};

const useStyles = makeStyles({
  buildings: {
    display: 'flex',
    flexDirection: 'row',
  },
  building: {
    flex: '1',
  },
});

export const Units: React.FC = () => {
  const settings = useAutoUnitsSettings();

  const classes = useStyles();

  if (!settings) {
    return null;
  }

  return (
    <div>
      <NextVillageTaskExecution task={VillageTaskType.AutoUnits} />
      <div className={classes.buildings}>
        <UnitBuildingSection
          className={classes.building}
          settings={settings.barracks}
          buildingType={BuildingType.Barracks}
        />
        <UnitBuildingSection
          className={classes.building}
          settings={settings.stable}
          buildingType={BuildingType.Stable}
        />
        <UnitBuildingSection
          className={classes.building}
          settings={settings.workshop}
          buildingType={BuildingType.Workshop}
        />
        <UnitBuildingSection
          className={classes.building}
          settings={settings.residence}
          buildingType={BuildingType.Residence}
        />
      </div>
    </div>
  );
};
