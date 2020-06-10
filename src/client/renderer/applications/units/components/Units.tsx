import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { TaskType } from '../../../_graphql/graphqlHooks';
import { NextVillageTaskExecution } from '../../../_shared/components/nextTaskExecution/NextVillageTaskExecution';
import { BuildingType } from '../../../../../_shared/types/buildingType';
import { useAutoUnitsSettings } from '../../settings/village/AutoUnitsSettings';
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

  const { settings } = useAutoUnitsSettings();

  if (!settings) {
    return null;
  }

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
