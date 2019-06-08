import { DequeueBuilding, GetBuildingSpots, GetQueuedBuildings } from '*/graphql_operations/building.graphql';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import {
  ICost,
  IDequeueBuildingMutation,
  IDequeueBuildingMutationVariables,
  IQueuedBuilding,
} from '../../../_types/graphql';
import { imageLinks } from '../../../utils/imageLinks';
import { BuildingImage } from '../../images/BuildingImage';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';

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

const useStyles = makeStyles({
  root: {
    '& span + span::before': {
      marginRight: '5px',
    },
  },
});

export const Cost: React.FunctionComponent<{
  readonly cost: ICost;
}> = (props) => {
  const {
    cost,
  } = props;

  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <span><img src={imageLinks.resources.wood} /> {cost.wood}</span>
      <span><img src={imageLinks.resources.clay} />{cost.clay}</span>
      <span><img src={imageLinks.resources.iron} />{cost.iron}</span>
      <span><img src={imageLinks.resources.crop} />{cost.crop}</span>
      <span><img src={imageLinks.resources.total} />{cost.total}</span>
      <span><img src={imageLinks.resources.freeCrop} />{cost.freeCrop}</span>
    </div>
  );
};

Cost.displayName = 'Cost';

const QueuedBuilding:  React.FunctionComponent<IProps> = (props) => {
  const {
    building,
  } = props;

  const { villageId } = useContext<IVillageContext>(VillageContext);

  const dequeue = useMutation<IDequeueBuildingMutation, IDequeueBuildingMutationVariables>(DequeueBuilding, {
    variables: {
      input: {
        villageId,
        queueIndex: building.queueIndex,
      },
    },
    refetchQueries: [
      { query: GetBuildingSpots, variables: { villageId } },
      { query: GetQueuedBuildings, variables: { villageId } },
    ],
  });

  const onDequeue = async () => await dequeue();

  return (
    <button onClick={onDequeue}>
      <BuildingImage buildingType={building.type} />
      <div>{building.name}</div>
      <div>Level {building.level}</div>
      <Cost cost={building.cost} />
      <div><img src={imageLinks.time} />{building.time}</div>
    </button>
  );
};

QueuedBuilding.displayName = 'QueuedBuilding';
QueuedBuilding.propTypes = propTypes;

export { QueuedBuilding };
