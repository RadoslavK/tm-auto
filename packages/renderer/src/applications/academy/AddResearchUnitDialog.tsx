import graphql from 'babel-plugin-relay/macro';
import React from 'react';

import type { AddResearchUnitDialogResearcheableUnitsQuery } from '../../_graphql/__generated__/AddResearchUnitDialogResearcheableUnitsQuery.graphql.js';
import { useLazyLoadQuery } from '../../_shared/hooks/useLazyLoadQuery.js';
import { UnitResearch } from './UnitResearch.js';

const researcheableUnitsQuery = graphql`
    query AddResearchUnitDialogResearcheableUnitsQuery {
        researcheableUnits
    }
`;

type Props = {
  readonly alreadyAddedUnits: ReadonlySet<number>;
  readonly onSubmit: (unitIndex: number) => void;
};

export const AddResearchUnitDialog: React.FC<Props> = ({ alreadyAddedUnits, onSubmit }) => {
  const { researcheableUnits } = useLazyLoadQuery<AddResearchUnitDialogResearcheableUnitsQuery>(researcheableUnitsQuery, {});
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