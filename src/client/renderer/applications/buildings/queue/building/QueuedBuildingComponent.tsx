import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import {
  BuildingType,
  QueuedBuilding as QueuedBuildingModel,
} from '../../../../_graphql/graphqlHooks';
import { useBuildingInfo } from '../../../../hooks/buildings/useBuildingInfo';
import { useBuildingLevelInfo } from '../../../../hooks/buildings/useBuildingLevelInfo';
import { imageLinks } from '../../../../utils/imageLinks';
import { Cost } from '../Cost';
import { QueuedBuildingActions } from './QueuedBuildingActions';

type StyleProps = {
  readonly buildingType: BuildingType;
};

const useStyles = makeStyles<unknown, StyleProps>({
  actions: {
    '& button': {
      display: 'block',
    },
  },
  buildingImage: props => ({
    backgroundImage: `url("${imageLinks.getBuilding(props.buildingType)}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '4rem',
    width: '4rem',
  }),
  imageWithFieldId: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  root: {
    '&>*': {
      marginLeft: '10px',
    },
    display: 'flex',
  },
});

type Props = {
  readonly building: QueuedBuildingModel;
  readonly isHighlight?: boolean;
  readonly onCollapse? : () => void;
};

export const QueuedBuildingComponent: React.FC<Props> = ({ building, isHighlight, onCollapse }) => {
  const classes = useStyles({
    buildingType: building.type,
  });

  const buildingInfo = useBuildingInfo(building.type);
  const buildingLevelInfo = useBuildingLevelInfo(building.type, building.level);

  if (!buildingLevelInfo) {
    return null;
  }

  return (
    <div className={classes.root}>
      {!isHighlight && (
        <QueuedBuildingActions
          building={building}
          className={classes.actions}
          onCollapse={onCollapse}
        />
      )}
      <div className={classes.imageWithFieldId}>
        <div className={classes.buildingImage} />
        <div>
          [{building.fieldId}]
        </div>
      </div>
      <div className={classes.info}>
        <div>
          {buildingInfo?.name}
          {' '}
          Level
          {' '}
          {building.level}
        </div>
        <Cost
          buildTime={building.buildingTime}
          resources={buildingLevelInfo.cost}
        />
      </div>
    </div>
  );
};
