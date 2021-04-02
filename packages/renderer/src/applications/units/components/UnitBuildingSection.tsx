import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React, {
  useCallback,
  useEffect,
  useState, 
} from 'react';
import {
  useFragment,
  useMutation,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';
import type { BuildingType } from 'shared/enums/BuildingType.js';
import type { Duration as DurationModel } from 'shared/types/duration.type.js';

import type { UnitBuildingSection_autoUnitsBuildingSettings$key } from '../../../_graphql/__generated__/UnitBuildingSection_autoUnitsBuildingSettings.graphql.js';
import type { UnitBuildingSectionUpdateAutoUnitsBuildingSettingsMutation } from '../../../_graphql/__generated__/UnitBuildingSectionUpdateAutoUnitsBuildingSettingsMutation.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { tribeState } from '../../../_recoil/atoms/tribe.js';
import { Duration } from '../../../_shared/components/controls/Duration.js';
import { imageLinks } from '../../../utils/imageLinks.js';
import { UnitSettings } from './UnitSettings.js';

type StylesProps = {
  readonly buildingType: number;
  readonly isAllowed: boolean;
  readonly tribe: string;
};

const useStyles = makeStyles<unknown, StylesProps>({
  building: {
    alignItems: 'center',
    display: 'flex',
  },
  buildingImage: ({ buildingType, tribe, isAllowed }) => ({
    backgroundImage: `url("${imageLinks.getBuilding(buildingType, tribe)}")`,
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

  const tribe = useRecoilValue(tribeState);
  const classes = useStyles({
    buildingType: buildingType,
    isAllowed: state.allow,
    tribe,
  });

  const villageId = useRecoilValue(selectedVillageIdState);
  const [updateSettings] = useMutation<UnitBuildingSectionUpdateAutoUnitsBuildingSettingsMutation>(unitBuildingSectionUpdateAutoUnitsBuildingSettingsMutation);

  useEffect(() => {
    if (hasChanges) {
      updateSettings({
        variables: {
          buildingType,
          villageId,
          settings: state,
        },
        updater: (store) => {
          const record = store.getRoot().getLinkedRecord('autoUnitsSettings', { villageId });
          const newRecord = store.getRootField('updateAutoUnitsBuildingSettings');

          record?.copyFieldsFrom(newRecord);
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

UnitBuildingSection.displayName = 'UnitBuildingSection';