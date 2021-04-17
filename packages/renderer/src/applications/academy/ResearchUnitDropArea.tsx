import React from 'react';
import { useDrop } from 'react-dnd';

import type { UnitResearchDrag } from './ResearchListUnit.js';
import { UnitResearch } from './UnitResearch.js';

type Props = {
  readonly onDrop: (targetIndex: number) => void;
  readonly unitIndex: number;
};

export const ResearchUnitDropArea: React.FC<Props> = ({ onDrop, unitIndex }) => {
  const [ { isUnitOver, movedUnit }, drop] = useDrop({
    accept: 'UnitResearch',
    canDrop: (droppedItem: UnitResearchDrag) => droppedItem.unitIndex !== unitIndex,
    collect: (monitor) => ({
      movedUnit: monitor.getItem() as UnitResearchDrag | undefined,
      isUnitOver: monitor.isOver() && monitor.canDrop(),
    }),
    drop: (droppedItem) => onDrop(droppedItem.unitIndex),
  });

  return (
    <div ref={drop}>
      {isUnitOver && movedUnit && <UnitResearch unitIndex={movedUnit.unitIndex} />}
    </div>
  );
};

ResearchUnitDropArea.displayName = 'ResearchUnitDropArea';