import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import {
  TaskType,
  useGetAutoUnitsSettingsQuery,
} from '../../../_graphql/graphqlHooks';
import { NextVillageTaskExecution } from '../../../_shared/components/nextTaskExecution/NextVillageTaskExecution';
import { BuildingType } from '../../../../../_shared/types/buildingType';
import { useVillageContext } from '../../villages/context/villageContext';
import { UnitBuildingSection } from './UnitBuildingSection';

const useStyles = makeStyles({
  building: {
    flex: '1',
  },
  buildings: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export const Units: React.FC = () => {
  const classes = useStyles();
  const { villageId } = useVillageContext();
  const { data, loading } = useGetAutoUnitsSettingsQuery({ variables: { villageId } });

  if (loading || !data) {
    return null;
  }

  const settings = data.autoUnitsSettings;

  return (
    <div>
      <NextVillageTaskExecution task={TaskType.AutoUnits} />
      <div className={classes.buildings}>
        <UnitBuildingSection
          buildingType={BuildingType.Barracks}
          className={classes.building}
          settings={settings.barracks}
        />
        <UnitBuildingSection
          buildingType={BuildingType.Stable}
          className={classes.building}
          settings={settings.stable}
        />
        <UnitBuildingSection
          buildingType={BuildingType.Workshop}
          className={classes.building}
          settings={settings.workshop}
        />
        <UnitBuildingSection
          buildingType={BuildingType.Residence}
          className={classes.building}
          settings={settings.residence}
        />
      </div>
    </div>
  );
};
