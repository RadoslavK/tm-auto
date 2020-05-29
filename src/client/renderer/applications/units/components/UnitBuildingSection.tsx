import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  AutoUnitsBuildingSettings,
  Duration as DurationModel,
} from '../../../_graphql/types/graphql.type';
import { Duration } from '../../../_shared/components/controls/Duration';
import { BuildingType } from '../../../../../_shared/types/buildingType';
import { areShallowEqual } from '../../../utils/areShallowEqual';
import { imageLinks } from '../../../utils/imageLinks';
import { useVillageContext } from '../../villages/context/villageContext';
import { useUpdateAutoUnitsBuildingSettingsMutation } from '../hooks/useUpdateAutoUnitsBuildingSettingsMutation';
import { UnitSettings } from './UnitSettings';

type StylesProps = {
  readonly buildingType: BuildingType;
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
  readonly settings: AutoUnitsBuildingSettings
};

export const UnitBuildingSection: React.FC<Props> = ({
  buildingType,
  className,
  settings,
}) => {
  const classes = useStyles({
    buildingType,
    isAllowed: settings.allow,
  });

  const { villageId } = useVillageContext();

  const [maxBuildTime, setMaxBuildTime] = useState(settings.maxBuildTime);
  const [allow, setAllow] = useState(settings.allow);

  const updateSettings = useUpdateAutoUnitsBuildingSettingsMutation();

  useEffect(() => {
    if (allow === settings.allow && areShallowEqual(maxBuildTime, settings.maxBuildTime)) {
      return;
    }

    updateSettings({
      variables: {
        settings: {
          allow,
          buildingType,
          maxBuildTime,
          villageId,
        },
      },
    });
  }, [settings, allow, buildingType, villageId, maxBuildTime, updateSettings]);

  const toggleAllow = () => setAllow(!allow);

  const updateMaxBuildTime = useCallback((newValue: DurationModel) => {
    setMaxBuildTime(newValue);
  }, []);

  return (
    <div className={clsx(className, classes.root)}>
      <div className={classes.building}>
        <div
          className={classes.buildingImage}
          onClick={toggleAllow}
        />
        <div className={classes.maxBuildTime}>
          <label htmlFor="maxBuildTime">
            Max build time:
          </label>
          <Duration
            onChange={updateMaxBuildTime}
            value={maxBuildTime}
          />
        </div>
      </div>
      {settings.units.map((unitSettings) => (
        <UnitSettings
          key={unitSettings.index}
          className={classes.unit}
          settings={unitSettings}
        />
      ))}
    </div>
  );
};
