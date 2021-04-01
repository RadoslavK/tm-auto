import {
  Dialog,
  makeStyles, 
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import {
  useLazyLoadQuery,
  useMutation,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type { NewBuildingDialogItemEnqueueBuildingMutation } from '../../../_graphql/__generated__/NewBuildingDialogItemEnqueueBuildingMutation.graphql.js';
import type { NewBuildingDialogItemQuery } from '../../../_graphql/__generated__/NewBuildingDialogItemQuery.graphql.js';
import { tribeState } from '../../../_recoil/atoms/tribe.js';
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
  }),
  name: {
    textAlign: 'center',
  },
});

type Props = {
  readonly className?: string;
  readonly fieldId: number;
  readonly onSelect: (targetLevel?: number) => void;
  readonly type: number;
  readonly villageId: string;
};

const newBuildingDialogItemEnqueueBuildingMutation = graphql`
  mutation NewBuildingDialogItemEnqueueBuildingMutation($input: EnqueueBuildingInput!) {
      enqueueBuilding(input: $input)
  }
`;

const newBuildingDialogItemQuery = graphql`
  query NewBuildingDialogItemQuery($buildingType: Int!) {
      buildingInfo(buildingType: $buildingType) {
          maxLevel
          name
      }
  }
`;

export const NewBuildingDialogItem: React.FC<Props> = ({
  className,
  fieldId,
  onSelect,
  type,
  villageId,
}) => {
  const { buildingInfo } = useLazyLoadQuery<NewBuildingDialogItemQuery>(newBuildingDialogItemQuery, { buildingType: type });
  const tribe = useRecoilValue(tribeState);
  const [showMultiEnqueue, setShowMultiEnqueue] = useState(false);
  const classes = useStyles({
    buildingType: type,
    tribe,
  });

  const [enqueueBuilding] = useMutation<NewBuildingDialogItemEnqueueBuildingMutation>(newBuildingDialogItemEnqueueBuildingMutation);

  const { maxLevel, name } = buildingInfo;

  const enqueue = (targetLevel: number | undefined) => enqueueBuilding({
    variables: {
      input: {
        fieldId,
        targetLevel,
        type,
        villageId,
      },
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
      <div className={className} onClick={onClick}>
        <div className={classes.image} />
        <div className={classes.name}>{name}</div>
      </div>
      <Dialog
        onClose={() => setShowMultiEnqueue(false)}
        open={showMultiEnqueue}>
        <MultiLevelDialog
          maxLevel={maxLevel}
          minLevel={1}
          onSelect={(targetLevel: number) => {
            setShowMultiEnqueue(false);
            enqueue(targetLevel);
            onSelect();
          }}
        />
      </Dialog>
    </>
  );
};

NewBuildingDialogItem.displayName = 'NewBuildingDialogItem';