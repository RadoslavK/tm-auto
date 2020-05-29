import { useQuery } from '@apollo/react-hooks';
import { Dialog } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useState } from 'react';

import { GetMaxBuildingLevel } from '*/graphql_operations/building.graphql';

import {
  GetMaxBuildingLevelQuery,
  GetMaxBuildingLevelQueryVariables,
} from '../../../_graphql/types/graphql.type';
import { BuildingType } from '../../../../../_shared/types/buildingType';
import { useEnqueueBuildingMutation } from '../../../hooks/buildings/useEnqueueBuildingMutation';
import { imageLinks } from '../../../utils/imageLinks';
import { MultiEnqueueDialog } from '../multiEnqueue/MultiEnqueueDialog';

type Props = {
  readonly className?: string;
  readonly fieldId: number;
  readonly name: string;
  readonly onSelect: () => void;
  readonly type: BuildingType
};

const useStyles = makeStyles<unknown, Props>({
  image: props => ({
    backgroundImage: `url("${imageLinks.getBuilding(props.type)}")`,
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

export const NewBuildingItem: React.FC<Props> = (props) => {
  const {
    className,
    fieldId,
    name,
    onSelect,
    type,
  } = props;

  const [showMultiEnqueue, setShowMultiEnqueue] = useState(false);
  const classes = useStyles(props);

  const enqueue = useEnqueueBuildingMutation({ buildingType: type, fieldId });
  const maxLevelResult = useQuery<GetMaxBuildingLevelQuery, GetMaxBuildingLevelQueryVariables>(GetMaxBuildingLevel, {
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
      <div
        className={className}
        onClick={onClick}
      >
        <div className={classes.image} />
        <div className={classes.name}>{name}</div>
      </div>
      <Dialog
        onClose={() => setShowMultiEnqueue(false)}
        open={showMultiEnqueue}
      >
        <MultiEnqueueDialog
          buildingType={type}
          fieldId={fieldId}
          maxLevel={maxLevel}
          onSelect={() => {
            setShowMultiEnqueue(false);
            onSelect();
          }}
          totalLevel={0}
        />
      </Dialog>
    </>
  );
};
