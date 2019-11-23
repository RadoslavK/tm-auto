import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import { imageLinks } from '../../../../utils/imageLinks';
import { IAutoBuildLogEntryContentPayload } from '../../../../_types/graphql';

interface IProps {
  readonly className?: string;
  readonly content: IAutoBuildLogEntryContentPayload;
}

const useStyles = makeStyles<unknown, IProps>({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  image: props => ({
    height: '18px',
    width: '18px',
    backgroundImage: `url("${imageLinks.getBuilding(props.content.type)}")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  }),
});

export const AutoBuildLogContent: React.FC<IProps> = (props) => {
  const {
    className,
    content,
  } = props;

  const classes = useStyles(props);

  return (
    <div className={classNames(className, classes.root)}>
      <span>Building</span>
      <div className={classes.image} />
      <span>{content.name} to level {content.level} at field {content.fieldId}</span>
    </div>
  );
};