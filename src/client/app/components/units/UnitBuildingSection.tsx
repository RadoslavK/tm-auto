import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { makeStyles } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { BuildingType } from '../../../../server/_enums/BuildingType';
import { UnitSettings } from './UnitSettings';
import {
  IAutoUnitsBuildingSettings,
  IUpdateAutoUnitsBuildingSettingsMutation,
  IUpdateAutoUnitsBuildingSettingsMutationVariables,
} from '../../../_types/graphql';
import { imageLinks } from '../../../utils/imageLinks';
import { UpdateAutoUnitsBuildingSettings } from '*/graphql_operations/settings.graphql';
import {
  IVillageContext,
  VillageContext,
} from '../villages/context/VillageContext';

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

  const { villageId } = useContext<IVillageContext>(VillageContext);

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

  const onNumberChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    const {
      name,
      value,
    } = e.currentTarget;

    if (+value < 0) {
      return;
    }

    setState(prevState => ({
      ...prevState,
      [name]: +value,
    }));
  };

  return (
    <div className={className}>
      <div className={classes.building}>
        <div
          className={classes.buildingImage}
          onClick={toggleAllow}
        />
        <div className={classes.maxBuildTime}>
          <label htmlFor="maxBuildTime">Max build time:</label>
          <input type="number" value={maxBuildTime} onChange={onNumberChange} id="maxBuildTime" name="maxBuildTime"/>
        </div>
      </div>
      {settings.units.map(unitSettings => (
        <UnitSettings key={unitSettings.index} settings={unitSettings} />
      ))}
    </div>
  );
};