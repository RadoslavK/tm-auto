import makeStyles from '@material-ui/core/styles/makeStyles';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React from 'react';
import { useMutation } from 'react-relay/hooks';
import { QueuedBuildingActionsDequeueBuildingMutation } from '../../../../_graphql/__generated__/QueuedBuildingActionsDequeueBuildingMutation.graphql.js';
import { QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation } from '../../../../_graphql/__generated__/QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation.graphql.js';

import { imageLinks } from '../../../../utils/imageLinks.js';

type Props = {
  readonly buildingQueueId: string;
  readonly className?: string;
  readonly onCollapse?: () => void;
};

const useStyles = makeStyles({
  collapse: {
    backgroundImage: `url("${imageLinks.actions.collapse}")`,
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

const queuedBuildingActionsDequeueBuildingMutation = graphql`
  mutation QueuedBuildingActionsDequeueBuildingMutation($input: DequeueBuildingInput!) {
      dequeueBuilding(input: $input)
  }
`;

const queuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation = graphql`
    mutation QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation($queueId: ID!, $villageId: ID!) {
        moveQueuedBuildingAsHighAsPossible(queueId: $queueId, villageId: $villageId)
    }
`;

export const QueuedBuildingActions: React.FC<Props> = (props) => {
  const {
    buildingQueueId,
    className,
    onCollapse,
  } = props;

  const villageId = '';

  const [moveToTop] = useMutation<QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation>(queuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation);
  const [dequeue] = useMutation<QueuedBuildingActionsDequeueBuildingMutation>(queuedBuildingActionsDequeueBuildingMutation);

  const classes = useStyles({});

  const onMoveToTop = () => {
    return moveToTop({
      variables: { queueId: buildingQueueId, villageId },
    });
  };

  const onDequeue = () => {
    return dequeue({
      variables: { input: { queueId: buildingQueueId, villageId } },
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
      {onCollapse && (
        <button
          className={clsx(classes.image, classes.collapse)}
          onClick={onCollapse}
        />
      )}
    </div>
  );
};
