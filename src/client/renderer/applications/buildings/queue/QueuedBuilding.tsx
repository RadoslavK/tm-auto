import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import { IQueuedBuilding } from '../../../_types/graphql';
import { imageLinks } from '../../../utils/imageLinks';
import { Cost } from './Cost';
import { QueuedBuildingActions } from './QueuedBuildingActions';

type Props = {
  readonly building: IQueuedBuilding;
};

const useStyles = makeStyles<unknown, Props>({
  actions: {
    '& button': {
      display: 'block',
    },
  },
  buildingImage: props => ({
    backgroundImage: `url("${imageLinks.getBuilding(props.building.type)}")`,
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

export const QueuedBuilding: React.FC<Props> = (props) => {
  const {
    building,
  } = props;

  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <QueuedBuildingActions
        building={building}
        className={classes.actions}
      />
      <div className={classes.imageWithFieldId}>
        <div className={classes.buildingImage} />
        <div>
          [
          {building.fieldId}
          ]
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
