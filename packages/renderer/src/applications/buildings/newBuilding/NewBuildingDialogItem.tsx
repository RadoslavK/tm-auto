import {
  Dialog,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import {
  useFragment,
  useMutation,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type { NewBuildingDialogItem_availableNewBuildingFragment$key } from '../../../_graphql/__generated__/NewBuildingDialogItem_availableNewBuildingFragment.graphql.js';
import type { NewBuildingDialogItemEnqueueBuildingMutation } from '../../../_graphql/__generated__/NewBuildingDialogItemEnqueueBuildingMutation.graphql.js';
import { alwaysAddNewToTopState } from '../../../_recoil/atoms/alwaysAddToTop.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { villageTribeState } from '../../../_recoil/atoms/tribe.js';
import { enqueueBuildingUpdater } from '../../../_shared/cache/enqueueBuildingUpdater.js';
import { imageLinks } from '../../../utils/imageLinks.js';
import { MultiLevelDialog } from '../multiLevelDialog/MultiLevelDialog.js';

type StylesProps = {
  readonly buildingType: number;
  readonly tribe: string;
};

const useStyles = makeStyles<unknown, StylesProps>({
  image: (props) => ({
    backgroundImage: `url("${imageLinks.getBuilding(props.buildingType, props.tribe)}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: 96,
    margin: '0 auto',
    width: 96,
    cursor: 'pointer',
  }),
  name: {
    textAlign: 'center',
  },
});

type Props = {
  readonly availableNewBuildingKey: NewBuildingDialogItem_availableNewBuildingFragment$key;
  readonly className?: string;
  readonly fieldId: number;
  readonly onSelect: (targetLevel?: number) => void;
};

const newBuildingDialogItemEnqueueBuildingMutation = graphql`
  mutation NewBuildingDialogItemEnqueueBuildingMutation($input: EnqueueBuildingInput!) {
      enqueueBuilding(input: $input) {
          addedNew
          newIndex
          building {
              ...QueuedBuilding_queuedBuilding
          }
          queue {
              ...BuildingQueueDurationAndCost
          }
      }
  }
`;

const availableNewBuildingFragmentDefinition = graphql`
  fragment NewBuildingDialogItem_availableNewBuildingFragment on AvailableNewBuilding {
      type
      name
      maxLevel
  }
`;

export const NewBuildingDialogItem: React.FC<Props> = ({
  availableNewBuildingKey,
  className,
  fieldId,
  onSelect,
}) => {
  const availableNewBuildingFragment = useFragment(availableNewBuildingFragmentDefinition, availableNewBuildingKey);
  const { maxLevel, name, type } = availableNewBuildingFragment;
  const tribe = useRecoilValue(villageTribeState);
  const villageId = useRecoilValue(selectedVillageIdState);
  const alwaysAddNewToTop = useRecoilValue(alwaysAddNewToTopState);
  const [showMultiEnqueue, setShowMultiEnqueue] = useState(false);
  const classes = useStyles({
    buildingType: type,
    tribe,
  });

  const [enqueueBuilding] = useMutation<NewBuildingDialogItemEnqueueBuildingMutation>(newBuildingDialogItemEnqueueBuildingMutation);

  const enqueue = (targetLevel: number | undefined) => enqueueBuilding({
    variables: {
      input: {
        fieldId,
        targetLevel,
        type,
        villageId,
        addNewToTop: alwaysAddNewToTop,
      },
    },
    updater: (store, data) => {
      if (!data.enqueueBuilding) {
        return;
      }

      const result = store.getRootField('enqueueBuilding');
      const addedBuilding = result.getLinkedRecord('building');
      const queue = result.getLinkedRecord('queue');

      enqueueBuildingUpdater(store, addedBuilding, data.enqueueBuilding.addedNew, data.enqueueBuilding.newIndex, queue, villageId);
    },
  });

  const onClick = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): Promise<void> => {
    if (event.ctrlKey) {
      setShowMultiEnqueue(true);
    } else {
      enqueue(event.shiftKey ? maxLevel : undefined);
      onSelect();
    }
  };

  return (
    <>
      <Tooltip title="Select building">
        <div className={className} onClick={onClick}>
          <div className={classes.image} />
          <div className={classes.name}>{name}</div>
        </div>
      </Tooltip>
      <Dialog
        onClose={() => setShowMultiEnqueue(false)}
        open={showMultiEnqueue}
      >
        <MultiLevelDialog
          maxLevel={maxLevel}
          minLevel={1}
          onSelect={(targetLevel: number) => {
            setShowMultiEnqueue(false);
            enqueue(targetLevel);
            onSelect();
          }}
          itemTitle="Select level"
        />
      </Dialog>
    </>
  );
};

NewBuildingDialogItem.displayName = 'NewBuildingDialogItem';