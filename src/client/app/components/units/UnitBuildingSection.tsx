import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { UpdateAutoUnitsBuildingSettings } from '*/graphql_operations/settings.graphql';

import {
  IAutoUnitsBuildingSettings,
  IDuration,
  IUpdateAutoUnitsBuildingSettingsMutation,
  IUpdateAutoUnitsBuildingSettingsMutationVariables,
} from '../../../_types/graphql';
import { BuildingType } from '../../../../_shared/types/buildingType';
import { imageLinks } from '../../../utils/imageLinks';
import { useVillageContext } from '../../hooks/useVillageContext';
import { Duration } from '../controls/Duration';
import { UnitSettings } from './UnitSettings';

interface IProps {
  readonly buildingType: BuildingType;
  readonly className?: string;
  readonly settings: IAutoUnitsBuildingSettings
}

const useStyles = makeStyles<unknown, [BuildingType, boolean]>({
  building: {
    display: 'flex',
    alignItems: 'center',
  },
  buildingImage: ([type, allow]) => ({
    height: 108,
    width: 108,
    backgroundImage: `url("${imageLinks.getBuilding(type)}")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    filter: allow ? undefined : 'grayscale(100%)',
    margin: '0 auto',
  }),
});

export const UnitBuildingSection: React.FC<IProps> = (props) => {
  const {
    settings,
    buildingType,
    className,
  } = props;

  const { villageId } = useVillageContext();

  const [state, setState] = useState({
    allow: settings.allow,
    maxBuildTime: settings.maxBuildTime,
  });

  const {
    allow,
    maxBuildTime,
  } = state;

  const [updateSettings] = useMutation<IUpdateAutoUnitsBuildingSettingsMutation, IUpdateAutoUnitsBuildingSettingsMutationVariables>(UpdateAutoUnitsBuildingSettings, {
    variables: {
      input: {
        villageId,
        buildingType,
        allow,
        maxBuildTime,
      },
    },
  });

  const classes = useStyles([buildingType, allow]);

  //  to trigger useEffect effect only on updates as there is no need to update when rendering first time
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      updateSettings();
    }
  }, [state, settings, updateSettings]);

  const toggleAllow = () => {
    setState(prevState => ({
      ...prevState,
      allow: !prevState.allow,
    }));
  };

  const updateMaxBuildTime = useCallback((newValue: IDuration) => setState(prevState => ({ ...prevState, maxBuildTime: newValue })), []);

  return (
    <div className={className}>
      <div className={classes.building}>
        <div
          className={classes.buildingImage}
          onClick={toggleAllow}
        />
        <div className={classes.maxBuildTime}>
          <label htmlFor="maxBuildTime">Max build time:</label>
          <Duration onChange={updateMaxBuildTime} value={maxBuildTime}/>
        </div>
      </div>
      {settings.units.map(unitSettings => (
        <UnitSettings key={unitSettings.index} settings={unitSettings} />
      ))}
    </div>
  );
};
