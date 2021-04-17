import { makeStyles } from '@material-ui/core';
import React from 'react';
import {
  DragPreviewImage,
  useDrag,
} from 'react-dnd';

import { imageLinks } from '../../utils/imageLinks.js';
import { ResearchUnitDropArea } from './ResearchUnitDropArea.js';
import { UnitResearch } from './UnitResearch.js';

type StylesProps = {
  readonly isDragging: boolean;
};

const useStyles = makeStyles<unknown, StylesProps>({
  root: {
    display: 'flex',
    opacity: props => props.isDragging ? 0.5 : 1,
  },
  removeImg: {
    backgroundImage: `url("${imageLinks.actions.delete}")`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: 24,
    width: 24,
    alignSelf: 'center',
  },
});

type Props = {
  readonly onRemove: () => void;
  readonly onUnitDrop: (originalIndex: number, targetIndex: number) => void;
  readonly unitIndex: number;
};

export type UnitResearchDrag = {
  readonly unitIndex: number;
};

export const ResearchListUnit: React.FC<Props> = ({ onRemove, onUnitDrop, unitIndex }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { unitIndex } as UnitResearchDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type: 'UnitResearch',
  });

  const classes = useStyles({ isDragging });

  return (
    <>
      <div ref={drag} className={classes.root}>
        <div className={classes.removeImg} onClick={onRemove} />
        <UnitResearch unitIndex={unitIndex} />
        <DragPreviewImage
          connect={preview}
          src={imageLinks.getUnit(unitIndex)}
        />
      </div>
      <ResearchUnitDropArea
        onDrop={targetIndex => onUnitDrop(unitIndex, targetIndex)}
        unitIndex={unitIndex}
      />
    </>
  );
};

ResearchListUnit.displayName = 'ResearchListUnit';