import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import { QueuedBuilding as QueuedBuildingModel } from '../../../_graphql/graphqlHooks';
import { imageLinks } from '../../../utils/imageLinks';
import { Cost } from './Cost';
import { QueuedBuildingActions } from './QueuedBuildingActions';

type StyleProps = {
  readonly buildingType: number;
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
    height: '7em',
    width: '7em',
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
};

export const QueuedBuildingComponent: React.FC<Props> = ({ building }) => {
  const classes = useStyles({
    buildingType: building.type,
  });

  return (
    <div className={classes.root}>
      <QueuedBuildingActions
        building={building}
        className={classes.actions}
      />
      <div className={classes.imageWithFieldId}>
        <div className={classes.buildingImage} />
        <div>
          [{building.fieldId}]
        </div>
      </div>
      <div className={classes.info}>
        <div>
          {building.name}
          {' '}
          Level
          {' '}
          {building.level}
        </div>
        <Cost cost={building.cost} />
      </div>
    </div>
  );
};
