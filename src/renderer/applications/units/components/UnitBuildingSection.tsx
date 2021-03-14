import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import {
  useFragment,
  useMutation,
} from 'react-relay/hooks';
import { BuildingType } from '../../../../_shared/enums/BuildingType';
import { Duration as DurationModel } from '../../../../_shared/types/duration.type';

import { UnitBuildingSection_autoUnitsBuildingSettings$key } from '../../../_graphql/__generated__/UnitBuildingSection_autoUnitsBuildingSettings.graphql';
import { Duration } from '../../../_shared/components/controls/Duration';
import { imageLinks } from '../../../utils/imageLinks';
import { UnitSettings } from './UnitSettings';
import graphql from 'babel-plugin-relay/macro';
import { UnitBuildingSectionUpdateAutoUnitsBuildingSettingsMutation } from '../../../_graphql/__generated__/UnitBuildingSectionUpdateAutoUnitsBuildingSettingsMutation.graphql';

type StylesProps = {
  readonly buildingType: number;
  readonly isAllowed: boolean;
};

const useStyles = makeStyles<unknown, StylesProps>({
  building: {
    alignItems: 'center',
    display: 'flex',
  },
  buildingImage: ({ buildingType, isAllowed }) => ({
    backgroundImage: `url("${imageLinks.getBuilding(buildingType)}")`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    filter: isAllowed ? undefined : 'grayscale(100%)',
    height: 108,
    marginBottom: 25,
    marginRight: 25,
    opacity: isAllowed ? undefined : 0.2,
    width: 108,
  }),
  root: {
    marginRight: 35,
  },
  unit: {
    marginBottom: 30,
  },
});

type Props = {
  readonly buildingType: BuildingType;
  readonly className?: string;
  readonly settings: UnitBuildingSection_autoUnitsBuildingSettings$key;
};

const unitBuildingSectionAutoUnitsBuildingSettingsFragment = graphql`
  fragment UnitBuildingSection_autoUnitsBuildingSettings on AutoUnitsBuildingSettings {
      allow
      maxBuildTime {
          days
          hours
          minutes
          seconds
      }
      units {
          index
          ...UnitSettings_autoUnitsUnitSettings
      }
  }
`;

const unitBuildingSectionUpdateAutoUnitsBuildingSettingsMutation = graphql`
  mutation UnitBuildingSectionUpdateAutoUnitsBuildingSettingsMutation($settings: UpdateAutoUnitsBuildingSettingsInput!, $villageId: ID!, $buildingType: Int!) {
      updateAutoUnitsBuildingSettings(settings: $settings, villageId: $villageId, buildingType: $buildingType) {
          allow
      }
  }
`;

export const UnitBuildingSection: React.FC<Props> = ({
  buildingType,
  className,
  settings,
}) => {
  const buildingSettingsFragment = useFragment(unitBuildingSectionAutoUnitsBuildingSettingsFragment, settings);

  const [state, setState] = useState({
    allow: buildingSettingsFragment.allow,
    maxBuildTime: buildingSettingsFragment.maxBuildTime,
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setState({
      allow: buildingSettingsFragment.allow,
      maxBuildTime: buildingSettingsFragment.maxBuildTime,
    });
    setHasChanges(false);
  }, [buildingSettingsFragment]);

  const classes = useStyles({
    buildingType: buildingType,
    isAllowed: state.allow,
  });

  const villageId = '';

  const [updateSettings] = useMutation<UnitBuildingSectionUpdateAutoUnitsBuildingSettingsMutation>(unitBuildingSectionUpdateAutoUnitsBuildingSettingsMutation);

  useEffect(() => {
    if (hasChanges) {
      updateSettings({
        variables: {
          buildingType,
          villageId,
          settings: state,
        },
      });
    }
  }, [state, buildingType, villageId, updateSettings, hasChanges]);

  const toggleAllow = () => {
    setState((prevState) => ({ ...prevState, allow: !prevState.allow }));
    setHasChanges(true);
  };

  const updateMaxBuildTime = useCallback((newValue: DurationModel) => {
    setState((prevState) => ({ ...prevState, maxBuildTime: newValue }));
    setHasChanges(true);
  }, []);

  return (
    <div className={clsx(className, classes.root)}>
      <div className={classes.building}>
        <div className={classes.buildingImage} onClick={toggleAllow} />
        <div className={classes.maxBuildTime}>
          <label htmlFor="maxBuildTime">Max build time:</label>
          <Duration onChange={updateMaxBuildTime} value={state.maxBuildTime} />
        </div>
      </div>
      {buildingSettingsFragment.units.map((unitSettings) => (
        <UnitSettings
          key={unitSettings.index}
          className={classes.unit}
          settings={unitSettings}
        />
      ))}
    </div>
  );
};
