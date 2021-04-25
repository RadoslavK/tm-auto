import {
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import React from 'react';
import {
  DragPreviewImage,
  useDrag,
  useDrop,
} from 'react-dnd';

import { imageLinks } from '../../utils/imageLinks.js';
import { UnitResearch } from './UnitResearch.js';

type StylesProps = {
  readonly isDragging: boolean;
};

const useStyles = makeStyles<unknown, StylesProps>({
  root: {
    display: 'flex',
    opacity: props => props.isDragging ? 0.5 : 1,
  },
  remove: {
    backgroundImage: `url("${imageLinks.actions.delete}")`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: 24,
    width: 24,
    alignSelf: 'center',
    cursor: 'pointer',
  },
});

type Props = {
  readonly listIndex: number;
  readonly onRemove: () => void;
  readonly onUnitDrop: (originalListIndex: number, targetListIndex: number) => void;
  readonly unitIndex: number;
};

export type UnitResearchDrag = {
  readonly listIndex: number;
  readonly unitIndex: number;
};

export const ResearchListUnit: React.FC<Props> = ({ listIndex, onRemove, onUnitDrop, unitIndex }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { listIndex, unitIndex } as UnitResearchDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type: 'UnitResearch',
  });

  const [{ isUnitOver, movedUnit }, drop] = useDrop({
    accept: 'UnitResearch',
    canDrop: (droppedItem: UnitResearchDrag) => droppedItem.listIndex !== listIndex,
    collect: (monitor) => ({
      movedUnit: monitor.getItem() as UnitResearchDrag | undefined,
      isUnitOver: monitor.isOver() && monitor.canDrop(),
    }),
    drop: (droppedItem) => onUnitDrop(droppedItem.listIndex, listIndex),
  });

  const classes = useStyles({ isDragging });
  const isAbove = movedUnit && movedUnit.listIndex >= listIndex;
  const movedElement = movedUnit && <UnitResearch unitIndex={movedUnit.unitIndex} isHighlight />;

  return (
    <div ref={drop}>
      {isUnitOver && isAbove && movedElement}
      <div ref={drag} className={classes.root}>
        <Tooltip title="Remove">
          <div className={classes.remove} onClick={onRemove} />
        </Tooltip>
        <UnitResearch unitIndex={unitIndex} />
        <DragPreviewImage
          connect={preview}
          src={imageLinks.getUnit(unitIndex)}
        />
      </div>
      {isUnitOver && !isAbove && movedElement}
    </div>
  );
};

ResearchListUnit.displayName = 'ResearchListUnit';