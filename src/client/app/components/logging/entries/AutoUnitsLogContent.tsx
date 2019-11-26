import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import { imageLinks } from '../../../../utils/imageLinks';
import { IAutoUnitsLogEntryContentPayload } from '../../../../_types/graphql';

interface IProps {
  readonly className?: string;
  readonly content: IAutoUnitsLogEntryContentPayload;
}

const useStyles = makeStyles<unknown, IProps>({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  image: props => ({
    height: '18px',
    width: '18px',
    backgroundImage: `url("${imageLinks.getUnit(props.content.index)}")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  }),
});

export const AutoUnitsLogContent: React.FC<IProps> = (props) => {
  const {
    className,
    content,
  } = props;

  const classes = useStyles(props);

  return (
    <div className={classNames(className, classes.root)}>
      <span>Building {content.amount}</span>
      <div className={classes.image} />
      <span>{content.unitName}</span>
    </div>
  );
};