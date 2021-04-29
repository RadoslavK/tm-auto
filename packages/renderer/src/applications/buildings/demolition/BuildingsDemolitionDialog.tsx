import {
  Button,
  Dialog,
  makeStyles,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useMemo,
  useState,
} from 'react';
import {
  PreloadedQuery,
  useMutation,
  usePreloadedQuery,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type { DemolitionBuildingInput } from '../../../_graphql/__generated__/BuildingQueueAddBuildingMutation.graphql.js';
import type { BuildingsDemolitionDialogClearBuildingsMutation } from '../../../_graphql/__generated__/BuildingsDemolitionDialogClearBuildingsMutation.graphql.js';
import type { BuildingsDemolitionDialogQuery } from '../../../_graphql/__generated__/BuildingsDemolitionDialogQuery.graphql.js';
import type { BuildingsDemolitionDialogRemoveDemolitionBuildingMutation } from '../../../_graphql/__generated__/BuildingsDemolitionDialogRemoveDemolitionBuildingMutation.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { MultiLevelDialog } from '../multiLevelDialog/MultiLevelDialog.js';

graphql`
    fragment BuildingsDemolitionDialog_buildingDemolitionSettings on BuildingDemolitionSettings {
        fieldId
        targetLevel
        type
        name
    }
`;

export const buildingsDemolitionDialogQuery = graphql`
    query BuildingsDemolitionDialogQuery($villageId: ID!) {
        infrastructure(villageId: $villageId) {
            fieldId
            name
            level {
                actual
            }
            type
        }
        autoBuildSettings(villageId: $villageId) {
            buildingsDemolition {
                ...BuildingsDemolitionDialog_buildingDemolitionSettings @relay(mask: false)
            }
        }
    }
`;

const removeBuildingMutation = graphql`
    mutation BuildingsDemolitionDialogRemoveDemolitionBuildingMutation($villageId: ID!, $fieldId: Int!) {
        removeDemolitionBuilding(villageId: $villageId, fieldId: $fieldId) {
            fieldId
        }
    }
`;

const clearMutation = graphql`
  mutation BuildingsDemolitionDialogClearBuildingsMutation($villageId: ID!) {
      clearDemolitionBuildings(villageId: $villageId) {
        ...BuildingsDemolitionDialog_buildingDemolitionSettings   
      }
  }
`;

const useStyles = makeStyles({
  possibleBuilding: {
    display: 'flex',
    alignItems: 'center',
    '& > *:not(last-child)': {
      marginRight: 4,
    },
  },
  queuedDemolition: {
    display: 'flex',
    alignItems: 'center',
  },
  removeAction: {
    cursor: 'pointer',
  },
  addButton: {
    padding: 0,
  },
  clearButton: {
    display: 'block',
    margin: '0 auto',
  },
});

type Props = {
  readonly onSubmit: (params: DemolitionBuildingInput) => void;
  readonly queryRef: PreloadedQuery<BuildingsDemolitionDialogQuery>;
};

export const BuildingsDemolitionDialog: React.FC<Props> = ({ onSubmit, queryRef }) => {
  const classes = useStyles();
  const { autoBuildSettings, infrastructure } = usePreloadedQuery(buildingsDemolitionDialogQuery, queryRef);

  const demolitionFieldIds = useMemo(
    () => new Set(autoBuildSettings.buildingsDemolition.map(b => b.fieldId)),
    [autoBuildSettings.buildingsDemolition],
  );
  const possibleBuildings = useMemo(
    () => infrastructure.filter(b => !demolitionFieldIds.has(b.fieldId)),
    [infrastructure, demolitionFieldIds],
  );

  const [isMultiLevelDialogOpen, setIsMultiLevelDialogOpen] = useState(false);
  const [dialogMaxLevel, setDialogMaxLevel] = useState(0);
  const [buildingParams, setBuildingParams] = useState({ fieldId: 0, type: 0 });

  const openDialog = (maxLevel: number, params: typeof buildingParams) => {
    setIsMultiLevelDialogOpen(true);
    setDialogMaxLevel(maxLevel);
    setBuildingParams(params);
  };
  const closeDialog = () => {
    setIsMultiLevelDialogOpen(false);
    setDialogMaxLevel(0);
    setBuildingParams({ fieldId: 0, type: 0 });
  };

  const villageId = useRecoilValue(selectedVillageIdState);
  const [removeBuilding] = useMutation<BuildingsDemolitionDialogRemoveDemolitionBuildingMutation>(removeBuildingMutation);
  const [clearBuildings] = useMutation<BuildingsDemolitionDialogClearBuildingsMutation>(clearMutation);

  const onRemove = (fieldId: number) => {
    removeBuilding({
      variables: { villageId, fieldId },
      updater: (store) => {
        const root = store.getRoot();
        const autoBuildSettingsRecord = root.getLinkedRecord('autoBuildSettings', { villageId });

        if (!autoBuildSettingsRecord) {
          return;
        }

        const removedRecord = store.getRootField('removeDemolitionBuilding');
        let demolitionBuildingsRecords = autoBuildSettingsRecord.getLinkedRecords('buildingsDemolition') || [];
        demolitionBuildingsRecords = demolitionBuildingsRecords.filter(b => b.getValue('fieldId') !== removedRecord.getValue('fieldId'));

        autoBuildSettingsRecord.setLinkedRecords(demolitionBuildingsRecords, 'buildingsDemolition');
        root.setLinkedRecord(autoBuildSettingsRecord, 'autoBuildSettings', { villageId });
      },
    });
  };

  const onClear = () => {
    clearBuildings({
      variables: { villageId },
      updater: (store) => {
        const newRecords = store.getPluralRootField('clearDemolitionBuildings');
        const root = store.getRoot();
        const autoBuildSettingsRecord = root.getLinkedRecord('autoBuildSettings', { villageId });

        if (!autoBuildSettingsRecord) {
          return;
        }

        autoBuildSettingsRecord.setLinkedRecords(newRecords, 'buildingsDemolition');
        root.setLinkedRecord(autoBuildSettingsRecord, 'autoBuildSettings', { villageId });
      },
    });
  };

  return (
    <div>
      <h2>
        Buildings demolition
      </h2>
      <Button
        className={classes.clearButton}
        color="secondary"
        variant="contained"
        onClick={onClear}
      >
        Clear
      </Button>
      <div>
        <h3>Possible buildings</h3>
        {possibleBuildings.map((building) => (
          <div
            className={classes.possibleBuilding}
            key={building.fieldId}
          >
            <Button
              className={classes.addButton}
              onClick={() => openDialog(
                building.level.actual - 1,
                { fieldId: building.fieldId, type: building.type },
              )}
            >
              Add
            </Button>
            <div>{building.name}</div>
            <div>{building.level.actual}</div>
          </div>
        ))}
      </div>
      <div>
        <h3>Demolition queue</h3>
        <div>
          {autoBuildSettings.buildingsDemolition.map(b => (
            <div key={b.fieldId} className={classes.queuedDemolition}>
              <Delete className={classes.removeAction} onClick={() => onRemove(b.fieldId)} />
              <div>{b.name} [{b.fieldId}]: Target {b.targetLevel}</div>
            </div>
          ))}
        </div>
      </div>
      <Dialog
        open={isMultiLevelDialogOpen}
        onClose={closeDialog}
      >
        <MultiLevelDialog
          maxLevel={dialogMaxLevel}
          onSelect={(targetLevel) => {
            onSubmit({
              type: buildingParams.type,
              targetLevel,
              fieldId: buildingParams.fieldId,
            });

            closeDialog();
          }}
          minLevel={0}
          itemTitle="Demolition target level"
        />
      </Dialog>
    </div>
  );
};

BuildingsDemolitionDialog.displayName = 'BuildingsDemolitionDialog';