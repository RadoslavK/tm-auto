import {
  Dialog,
  makeStyles, 
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React, { useState } from 'react';
import {
  useFragment,
  useLazyLoadQuery,
  useMutation,
} from 'react-relay/hooks';
import { BuildingType } from 'shared/enums/BuildingType.js';

import type { BuildingSpot_buildingSpot$key } from '../../../_graphql/__generated__/BuildingSpot_buildingSpot.graphql.js';
import type { BuildingSpotBuildingInfoQuery } from '../../../_graphql/__generated__/BuildingSpotBuildingInfoQuery.graphql.js';
import type { BuildingSpotDequeueBuildingAtFieldMutation } from '../../../_graphql/__generated__/BuildingSpotDequeueBuildingAtFieldMutation.graphql.js';
import type { BuildingSpotEnqueueBuildingMutation } from '../../../_graphql/__generated__/BuildingSpotEnqueueBuildingMutation.graphql.js';
import { imageLinks } from '../../../utils/imageLinks.js';
import { MultiLevelDialog } from '../multiLevelDialog/MultiLevelDialog.js';
import { NewBuildingDialog } from '../newBuilding/NewBuildingDialog.js';
import { BuildingLevelBox } from './BuildingLevelBox.js';

enum DialogType {
  None,
  MultiDequeue,
  MultiEnqueue,
  NewBuilding,
}

type Props = {
  readonly building: BuildingSpot_buildingSpot$key;
  readonly className?: string;
  readonly villageId: string;
  readonly tribe: string;
};

const buildingSpotBuildingSpotFragment = graphql`
  fragment BuildingSpot_buildingSpot on BuildingSpot {
      type
      fieldId
      level {
          actual
          ongoing
          queued
          total
          ...BuildingLevelBox_buildingSpotLevel
      }
  }
`;

const buildingSpotBuildingInfoQuery = graphql`
  query BuildingSpotBuildingInfoQuery($buildingType: Int!) {
      buildingInfo(buildingType: $buildingType) {
          maxLevel
          name
      }
  }
`;

const buildingSpotDequeueBuildingAtFieldMutation = graphql`
  mutation BuildingSpotDequeueBuildingAtFieldMutation($input: DequeueBuildingAtFieldInput!) {
      dequeueBuildingAtField(input: $input)
  }
`;

const buildingSpotEnqueueBuildingMutation = graphql`
    mutation BuildingSpotEnqueueBuildingMutation($input: EnqueueBuildingInput!) {
        enqueueBuilding(input: $input)
    }
`;

type StyleProps = {
  readonly buildingType: number;
  readonly tribe: string;
};

const useStyles = makeStyles<unknown, StyleProps>({
  fieldId: {
    alignSelf: 'center',
    background: '#b1b5b9',
    fontWeight: 'bold',
  },
  root: (props) => ({
    alignItems: 'flex-start',
    justifyContent:
      props.buildingType === BuildingType.None ? 'flex-end' : 'space-between',
    backgroundImage: `url("${imageLinks.getBuilding(props.buildingType, props.tribe)}")`,
    backgroundSize: 'contain',
    border: '1px solid black',
    display: 'flex',
    flexFlow: 'column',
    height: '6rem',
    width: '6rem',
  }),
});

export const BuildingSpot: React.FC<Props> = React.memo(({ building, className, villageId, tribe }) => {
  const buildingSpotFragment = useFragment(buildingSpotBuildingSpotFragment, building);

  const classes = useStyles({ buildingType: buildingSpotFragment.type, tribe });
  const [dialog, setDialog] = useState(DialogType.None);

  const closeDialog = () => setDialog(DialogType.None);

  const [enqueueBuilding] = useMutation<BuildingSpotEnqueueBuildingMutation>(buildingSpotEnqueueBuildingMutation);
  const enqueue = (targetLevel: number | undefined) => {
    enqueueBuilding({
      variables: {
        input: {
          type: buildingSpotFragment.type,
          fieldId: buildingSpotFragment.fieldId,
          villageId,
          targetLevel,
        },
      },
    });
  };

  const [dequeueAtField] = useMutation<BuildingSpotDequeueBuildingAtFieldMutation>(buildingSpotDequeueBuildingAtFieldMutation);

  const { buildingInfo } = useLazyLoadQuery<BuildingSpotBuildingInfoQuery>(buildingSpotBuildingInfoQuery, { buildingType: buildingSpotFragment.type });
  const { maxLevel, name } = buildingInfo;

  const onEnqueue = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    if (
      buildingSpotFragment.type !== BuildingType.None &&
      buildingSpotFragment.level.total >= maxLevel
    ) {
      return;
    }

    if (buildingSpotFragment.type !== BuildingType.None) {
      if (event.ctrlKey) {
        setDialog(DialogType.MultiEnqueue);
      } else {
        enqueue(event.shiftKey ? maxLevel : undefined);
      }
    } else {
      setDialog(DialogType.NewBuilding);
    }
  };

  const onDequeue = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    if (!buildingSpotFragment.level.queued) {
      return;
    }

    if (event.ctrlKey) {
      setDialog(DialogType.MultiDequeue);
    } else {
      dequeueAtField({
        variables: {
          input: {
            targetLevel: event.shiftKey
              ? buildingSpotFragment.level.ongoing || buildingSpotFragment.level.actual
              : undefined,
            fieldId: buildingSpotFragment.fieldId,
            villageId,
          },
        },
      });
    }
  };

  const onMultiLevelEnqueue = (targetLevel: number): void => {
    enqueue(targetLevel);
    closeDialog();
  };

  const onMultiLevelDequeue = (targetLevel: number): void => {
    dequeueAtField({
      variables: {
        input: {
          targetLevel,
          fieldId: buildingSpotFragment.fieldId,
          villageId,
        },
      },
    });

    closeDialog();
  };

  return (
    <>
      <div
        className={clsx(className, classes.root)}
        onClick={onEnqueue}
        onContextMenu={onDequeue}
        title={name}>
        {buildingSpotFragment.type !== BuildingType.None && (
          <BuildingLevelBox level={buildingSpotFragment.level} maxLevel={maxLevel} />
        )}
        <div className={classes.fieldId}>[{buildingSpotFragment.fieldId}]</div>
      </div>
      <Dialog onClose={closeDialog} open={dialog === DialogType.NewBuilding}>
        <NewBuildingDialog tribe={tribe} villageId={villageId} fieldId={buildingSpotFragment.fieldId} onSelect={closeDialog} />
      </Dialog>
      <Dialog onClose={closeDialog} open={dialog === DialogType.MultiEnqueue}>
        <MultiLevelDialog
          maxLevel={maxLevel}
          minLevel={buildingSpotFragment.level.total + 1}
          onSelect={onMultiLevelEnqueue}
        />
      </Dialog>
      <Dialog onClose={closeDialog} open={dialog === DialogType.MultiDequeue}>
        {buildingSpotFragment.level.queued && (
          <MultiLevelDialog
            maxLevel={buildingSpotFragment.level.queued - 1}
            minLevel={buildingSpotFragment.level.ongoing || buildingSpotFragment.level.actual}
            onSelect={onMultiLevelDequeue}
          />
        )}
      </Dialog>
    </>
  );
});
