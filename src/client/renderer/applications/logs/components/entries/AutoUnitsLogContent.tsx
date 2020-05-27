import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

import { AutoUnitsLogEntryContentPayload } from '../../../../_types/graphql';
import { imageLinks } from '../../../../utils/imageLinks';

type StylesProps = {
  readonly unitIndex: number;
};

const useStyles = makeStyles<unknown, StylesProps>({
  image: props => ({
    backgroundImage: `url("${imageLinks.getUnit(props.unitIndex)}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '18px',
    width: '18px',
  }),
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
});

type Props = {
  readonly className?: string;
  readonly content: AutoUnitsLogEntryContentPayload;
};

export const AutoUnitsLogContent: React.FC<Props> = ({ className, content }) => {
  const classes = useStyles({
    unitIndex: content.index,
  });

  return (
    <div className={clsx(className, classes.root)}>
      <span>
        Building
        {' '}
        {content.amount}
      </span>
      <div className={classes.image} />
      <span>
        {content.unitName}
      </span>
    </div>
  );
};