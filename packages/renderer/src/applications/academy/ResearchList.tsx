import { Dialog } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  Suspense,
  useState,
} from 'react';
import {
  useFragment,
  useMutation,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type { ResearchList_autoAcademySettings$key } from '../../_graphql/__generated__/ResearchList_autoAcademySettings.graphql.js';
import type { ResearchListSetAutoAcademySettingsUnitsMutation } from '../../_graphql/__generated__/ResearchListSetAutoAcademySettingsUnitsMutation.graphql.js';
import { selectedVillageIdState } from '../../_recoil/atoms/selectedVillageId.js';
import { AddResearchUnitDialog } from './AddResearchUnitDialog.js';
import { ResearchListUnit } from './ResearchListUnit.js';

const settingsFragmentDef = graphql`
    fragment ResearchList_autoAcademySettings on AutoAcademySettings {
        units
    }
`;

const setUnitsMutation = graphql`
  mutation ResearchListSetAutoAcademySettingsUnitsMutation($villageId: ID!, $units: [Int!]!) {
      setAutoAcademySettingsUnits(villageId: $villageId, units: $units) {
          ...Academy_autoAcademySettings
      }
  }
`;

type Props = {
  readonly settingsKey: ResearchList_autoAcademySettings$key;
};

export const ResearchList: React.FC<Props> = ({ settingsKey }) => {
  const villageId = useRecoilValue(selectedVillageIdState);
  const { units } = useFragment(settingsFragmentDef, settingsKey);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => setIsDialogOpen(false);
  const openDialog = () => setIsDialogOpen(true);

  const [setUnits] = useMutation<ResearchListSetAutoAcademySettingsUnitsMutation>(setUnitsMutation);

  const resetResearch = (): void => {
    setUnits({
      variables: { villageId, units: [] },
      updater: (store) => {
        const newRecord = store.getRootField('setAutoAcademySettingsUnits');
        store.getRoot().setLinkedRecord(newRecord, 'autoAcademySettings', { villageId });
      },
    });
  };

  const addUnitToResearch = (unitIndex: number): void => {
    closeDialog();

    setUnits({
      variables: { villageId, units: [...units, unitIndex] },
      updater: (store) => {
        const newRecord = store.getRootField('setAutoAcademySettingsUnits');
        store.getRoot().setLinkedRecord(newRecord, 'autoAcademySettings', { villageId });
      },
    });
  };

  const removeUnit = (unitIndex: number): void => {
    setUnits({
      variables: { villageId, units: units.filter(i => i !== unitIndex) },
      updater: (store) => {
        const newRecord = store.getRootField('setAutoAcademySettingsUnits');
        store.getRoot().setLinkedRecord(newRecord, 'autoAcademySettings', { villageId });
      },
    });
  };

  const dropUnit = (originalIndex: number, targetIndex: number): void => {
    const newUnits = [...units];
    newUnits.splice(targetIndex, 0, units[originalIndex]);

    setUnits({
      variables: { villageId, units: newUnits },
      updater: (store) => {
        const newRecord = store.getRootField('setAutoAcademySettingsUnits');
        store.getRoot().setLinkedRecord(newRecord, 'autoAcademySettings', { villageId });
      },
    });
  };

  return (
    <div>
      <button onClick={openDialog}>
        Add unit to research
      </button>
      <button onClick={resetResearch}>
        Reset
      </button>
      <Suspense fallback={null}>
        {units.map(uIndex => (
          <ResearchListUnit
            key={uIndex}
            onRemove={() => removeUnit(uIndex)}
            onUnitDrop={dropUnit}
            unitIndex={uIndex}
          />
        ))}
      </Suspense>
      <Dialog
        onClose={closeDialog}
        open={isDialogOpen}
      >
        <Suspense fallback={null}>
          <AddResearchUnitDialog
            alreadyAddedUnits={new Set(units)}
            onSubmit={addUnitToResearch}
          />
        </Suspense>
      </Dialog>
    </div>
  );
};

ResearchList.displayName = 'ResearchList';