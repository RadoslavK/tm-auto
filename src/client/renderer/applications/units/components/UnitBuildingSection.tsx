import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  AutoUnitsBuildingSettings,
  BuildingType,
  Duration as DurationModel,
  GetAutoUnitsSettingsDocument,
  GetAutoUnitsSettingsQuery,
  GetAutoUnitsSettingsQueryVariables,
  UpdateAutoUnitsBuildingSettingsInput,
  useUpdateAutoUnitsBuildingSettingsMutation,
} from '../../../_graphql/graphqlHooks';
import { Duration } from '../../../_shared/components/controls/Duration';
import { updateQueryCache } from '../../../../../server/utils/graphql';
import { useSelectedVillageId } from '../../../hooks/villages/useSelectedVillageId';
import { imageLinks } from '../../../utils/imageLinks';
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
  const [state, setState] = useState<UpdateAutoUnitsBuildingSettingsInput>({
    allow: settings.allow,
    maxBuildTime: settings.maxBuildTime,
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setState({
      allow: settings.allow,
      maxBuildTime: settings.maxBuildTime,
    });
    setHasChanges(false);
  }, [settings]);

  const classes = useStyles({
    buildingType,
    isAllowed: state.allow,
  });

  const villageId = useSelectedVillageId();

  const [updateSettings] = useUpdateAutoUnitsBuildingSettingsMutation();

  useEffect(() => {
    if (hasChanges) {
      updateSettings({
        variables: {
          buildingType,
          villageId,
          settings: state,
        },
        update: (cache, { data }) => {
          if (!data) {
            return;
          }

          updateQueryCache<GetAutoUnitsSettingsQuery, GetAutoUnitsSettingsQueryVariables>({
            cache,
            query: GetAutoUnitsSettingsDocument,
            data: { autoUnitsSettings: data.updateAutoUnitsBuildingSettings },
            variables: { villageId },
          });
        },
      });
    }
  }, [state, buildingType, villageId, updateSettings, hasChanges]);

  const toggleAllow = () => {
    setState(prevState => ({ ...prevState, allow: !prevState.allow }));
    setHasChanges(true);
  };

  const updateMaxBuildTime = useCallback((newValue: DurationModel) => {
    setState(prevState => ({ ...prevState, maxBuildTime: newValue }));
    setHasChanges(true);
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
            value={state.maxBuildTime}
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
