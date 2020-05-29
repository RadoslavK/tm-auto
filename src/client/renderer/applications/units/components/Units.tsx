import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { NextVillageTaskExecution } from '../../../_shared/components/nextTaskExecution/NextVillageTaskExecution';
import { VillageTaskType } from '../../../_types/graphql';
import { BuildingType } from '../../../../../_shared/types/buildingType';
import { useGetAutoUnitsSettings } from '../hooks/useAutoUnitsSettings';
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
  const settings = useGetAutoUnitsSettings();

  if (!settings) {
    return null;
  }

  return (
    <div>
      <NextVillageTaskExecution task={VillageTaskType.AutoUnits} />
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