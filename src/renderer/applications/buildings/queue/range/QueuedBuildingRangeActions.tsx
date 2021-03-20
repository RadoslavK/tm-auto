import makeStyles from '@material-ui/core/styles/makeStyles';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React from 'react';
import {
  useFragment,
  useMutation,
} from 'react-relay/hooks';
import { QueuedBuildingRangeActions_queuedBuildingRange$key } from '../../../../_graphql/__generated__/QueuedBuildingRangeActions_queuedBuildingRange.graphql.js';
import { QueuedBuildingRangeActionsMoveQueuedBuildingsBlockAsHighAsPossibleMutation } from '../../../../_graphql/__generated__/QueuedBuildingRangeActionsMoveQueuedBuildingsBlockAsHighAsPossibleMutation.graphql.js';
import { imageLinks } from '../../../../utils/imageLinks.js';
import { QueuedBuildingRangeActionsDequeueBuildingsBlockMutation } from '../../../../_graphql/__generated__/QueuedBuildingRangeActionsDequeueBuildingsBlockMutation.graphql.js';

const useStyles = makeStyles({
  expand: {
    backgroundImage: `url("${imageLinks.actions.expand}")`,
  },
  delete: {
    backgroundImage: `url("${imageLinks.actions.delete}")`,
  },
  moveToTop: {
    backgroundImage: `url("${imageLinks.actions.queue.moveToTop}")`,
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '2em',
    width: '2em',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

type Props = {
  readonly className?: string;
  readonly onExpand: () => void;
  readonly range: QueuedBuildingRangeActions_queuedBuildingRange$key;
};

const queuedBuildingRangeActionsQueuedBuildingRangeFragment = graphql`
  fragment QueuedBuildingRangeActions_queuedBuildingRange on QueuedBuildingRange {
      buildings {
          queueId
      }
  }
`;

const queuedBuildingRangeActionsDequeueBuildingsBlockMutation = graphql`
  mutation QueuedBuildingRangeActionsDequeueBuildingsBlockMutation($villageId: ID!, $bottomBuildingQueueId: ID!, $topBuildingQueueId: ID!) {
      dequeueBuildingsBlock(villageId: $villageId, bottomBuildingQueueId: $bottomBuildingQueueId, topBuildingQueueId: $topBuildingQueueId)
  }
`;

const queuedBuildingRangeActionsMoveQueuedBuildingsBlockAsHighAsPossibleMutation = graphql`
    mutation QueuedBuildingRangeActionsMoveQueuedBuildingsBlockAsHighAsPossibleMutation($villageId: ID!, $bottomBuildingQueueId: ID!, $topBuildingQueueId: ID!) {
        moveQueuedBuildingsBlockAsHighAsPossible(villageId: $villageId, bottomBuildingQueueId: $bottomBuildingQueueId, topBuildingQueueId: $topBuildingQueueId)
    }
`;

export const QueuedBuildingRangeActions: React.FC<Props> = ({
  className,
  onExpand,
  range,
}) => {
  const queuedBuildingRangeFragment = useFragment(queuedBuildingRangeActionsQueuedBuildingRangeFragment, range);
  const classes = useStyles();

  const villageId = '';

  const [moveToTop] = useMutation<QueuedBuildingRangeActionsMoveQueuedBuildingsBlockAsHighAsPossibleMutation>(queuedBuildingRangeActionsMoveQueuedBuildingsBlockAsHighAsPossibleMutation);
  const [dequeue] = useMutation<QueuedBuildingRangeActionsDequeueBuildingsBlockMutation>(queuedBuildingRangeActionsDequeueBuildingsBlockMutation);

  const onMoveToTop = () => {
    moveToTop({
      variables: {
        villageId,
        topBuildingQueueId: queuedBuildingRangeFragment.buildings[0].queueId,
        bottomBuildingQueueId:
        queuedBuildingRangeFragment.buildings[queuedBuildingRangeFragment.buildings.length - 1].queueId,
      },
    });
  };

  const onDequeue = () => {
    dequeue({
      variables: {
        villageId,
        topBuildingQueueId: queuedBuildingRangeFragment.buildings[0].queueId,
        bottomBuildingQueueId:
        queuedBuildingRangeFragment.buildings[queuedBuildingRangeFragment.buildings.length - 1].queueId,
      },
    });
  };

  return (
    <div className={clsx(className, classes.root)}>
      <button
        className={clsx(classes.image, classes.moveToTop)}
        onClick={onMoveToTop}
      />
      <button
        className={clsx(classes.image, classes.delete)}
        onClick={onDequeue}
      />
      <button
        className={clsx(classes.image, classes.expand)}
        onClick={onExpand}
      />
    </div>
  );
};
