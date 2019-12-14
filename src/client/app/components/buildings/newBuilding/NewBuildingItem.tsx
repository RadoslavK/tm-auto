import { useQuery } from '@apollo/react-hooks';
import { Dialog } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useState } from 'react';

import { GetMaxBuildingLevel } from '*/graphql_operations/building.graphql';

import {
  IGetMaxBuildingLevelQuery,
  IGetMaxBuildingLevelQueryVariables,
} from '../../../../_types/graphql';
import { BuildingType } from '../../../../../_shared/types/buildingType';
import { imageLinks } from '../../../../utils/imageLinks';
import { useEnqueueBuildingMutation } from '../../../hooks/useEnqueueBuildingMutation';
import { MultiEnqueueDialog } from '../multiEnqueue/MultiEnqueueDialog';

interface IProps {
  readonly className?: string;
  readonly name: string;
  readonly type: BuildingType,
  readonly fieldId: number;
  readonly onSelect: () => void;
}

const useStyles = makeStyles<unknown, IProps>({
  image: props => ({
    width: 96,
    height: 96,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url("${imageLinks.getBuilding(props.type)}")`,
    margin: '0 auto',
  }),
  name: {
    textAlign: 'center',
  },
});

export const NewBuildingItem: React.FC<IProps> = (props) => {
  const {
    className,
    name,
    type,
    fieldId,
    onSelect,
  } = props;

  const [showMultiEnqueue, setShowMultiEnqueue] = useState(false);
  const classes = useStyles(props);

  const [enqueue] = useEnqueueBuildingMutation({ buildingType: type, fieldId });
  const maxLevelResult = useQuery<IGetMaxBuildingLevelQuery, IGetMaxBuildingLevelQueryVariables>(GetMaxBuildingLevel, {
    variables: { buildingType: type },
  });

  if (maxLevelResult.loading || !maxLevelResult.data) {
    return null;
  }

  const maxLevel = maxLevelResult.data.maxBuildingLevel;

  const onClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>): Promise<void> => {
    if (event.ctrlKey) {
      setShowMultiEnqueue(true);
    } else if (event.shiftKey) {
      onSelect();
      await enqueue(maxLevel);
    } else {
      onSelect();
      await enqueue();
    }
  };

  return (
    <>
      <div className={className} onClick={onClick}>
        <div className={classes.image} />
        <div className={classes.name}>{name}</div>
      </div>
      <Dialog
        open={showMultiEnqueue}
        onClose={() => setShowMultiEnqueue(false)}
      >
        <MultiEnqueueDialog
          totalLevel={0}
          buildingType={type}
          fieldId={fieldId}
          maxLevel={maxLevel}
          onSelect={() => {
            setShowMultiEnqueue(false);
            onSelect();
          }}
        />
      </Dialog>
    </>
  );
};
