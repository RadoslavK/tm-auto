import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useRecoilValue } from 'recoil';

import type { AddResearchUnitDialogResearcheableUnitsQuery } from '../../_graphql/__generated__/AddResearchUnitDialogResearcheableUnitsQuery.graphql.js';
import { selectedVillageIdState } from '../../_recoil/atoms/selectedVillageId.js';
import { useLazyLoadQuery } from '../../_shared/hooks/useLazyLoadQuery.js';
import { UnitResearch } from './UnitResearch.js';

const researcheableUnitsQuery = graphql`
    query AddResearchUnitDialogResearcheableUnitsQuery($villageId: ID!) {
        researcheableUnits(villageId: $villageId)
    }
`;

type Props = {
  readonly alreadyAddedUnits: ReadonlySet<number>;
  readonly onSubmit: (unitIndex: number) => void;
};

export const AddResearchUnitDialog: React.FC<Props> = ({ alreadyAddedUnits, onSubmit }) => {
  const villageId = useRecoilValue(selectedVillageIdState);
  const { researcheableUnits } = useLazyLoadQuery<AddResearchUnitDialogResearcheableUnitsQuery>(researcheableUnitsQuery, { villageId });
  const unitsToAdd = researcheableUnits.filter(uIndex => !alreadyAddedUnits.has(uIndex));

  return (
    <div>
      {unitsToAdd.map(uIndex => (
        <UnitResearch key={uIndex} unitIndex={uIndex} onClick={() => onSubmit(uIndex)} />
      ))}
    </div>
  );
};

AddResearchUnitDialog.displayName = 'AddResearchUnitDialog';