import { makeStyles } from '@material-ui/core/styles';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { BuildingType } from '../../../../_shared/enums/BuildingType';
import { UnitsAutoUnitsSettingsQuery } from '../../../_graphql/__generated__/UnitsAutoUnitsSettingsQuery.graphql';

import { NextVillageTaskExecution } from '../../../_shared/components/nextTaskExecution/NextVillageTaskExecution';
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

export const Units: React.FC = () => {
  const classes = useStyles();
  const villageId = '';

  const { autoUnitsSettings } = useLazyLoadQuery<UnitsAutoUnitsSettingsQuery>(unitsAutoUnitsSettingsQuery, { villageId });

  return (
    <div>
      <NextVillageTaskExecution task={'AutoUnits'} />
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
