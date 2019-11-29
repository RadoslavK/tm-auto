import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core';
import React from 'react';

import { GetAutoUnitsSettings } from '*/graphql_operations/settings.graphql';

import {
  IGetAutoUnitsSettingsQuery,
  IGetAutoUnitsSettingsQueryVariables,
} from '../../../_types/graphql';
import { BuildingType } from '../../../../server/_enums/buildingType';
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
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  section: {
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
    <div className={classes.root}>
      <UnitBuildingSection
        className={classes.section}
        settings={settings.barracks}
        buildingType={BuildingType.Barracks}
      />
      <UnitBuildingSection
        className={classes.section}
        settings={settings.stable}
        buildingType={BuildingType.Stable}
      />
      <UnitBuildingSection
        className={classes.section}
        settings={settings.workshop}
        buildingType={BuildingType.Workshop}
      />
      <UnitBuildingSection
        className={classes.section}
        settings={settings.residence}
        buildingType={BuildingType.Residence}
      />
    </div>
  );
};