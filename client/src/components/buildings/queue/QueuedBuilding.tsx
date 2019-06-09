import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import PropTypes from 'prop-types';
import { IQueuedBuilding } from '../../../_types/graphql';
import { imageLinks } from '../../../utils/imageLinks';
import { Cost } from './Cost';
import { QueuedBuildingActions } from './QueuedBuildingActions';

interface IProps {
  readonly building: IQueuedBuilding;
}

const propTypes: PropTypesShape<IProps> = {
  building: PropTypes.shape({
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    queueIndex: PropTypes.number.isRequired,
  }).isRequired,
};

const useStyles = makeStyles<unknown, IProps>({
  root: {
    display: 'flex',
    '&>*': {
      marginLeft: '10px',
    },
  },
  actions: {
    '& button': {
      display: 'block',
    },
  },
  buildingImage: props => ({
    height: '7em',
    width: '7em',
    backgroundImage: `url("${imageLinks.getBuilding(props.building.type)}")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  }),
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  }
});

const QueuedBuilding:  React.FunctionComponent<IProps> = (props) => {
  const {
    building,
  } = props;

  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <QueuedBuildingActions className={classes.actions} building={building} />
      <div className={classes.buildingImage} />
      <div className={classes.info}>
        <div>{building.name} Level {building.level}</div>
        <Cost cost={building.cost} />
      </div>
    </div>
  );
};

QueuedBuilding.displayName = 'QueuedBuilding';
QueuedBuilding.propTypes = propTypes;

export { QueuedBuilding };
