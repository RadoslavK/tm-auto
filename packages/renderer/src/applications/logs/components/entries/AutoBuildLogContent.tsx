import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type { AutoBuildLogContent_autoBuildLogEntryContent$key } from '../../../../_graphql/__generated__/AutoBuildLogContent_autoBuildLogEntryContent.graphql.js';
import { tribeState } from '../../../../_recoil/atoms/tribe.js';
import { imageLinks } from '../../../../utils/imageLinks.js';

type StylesProps = {
  readonly buildingType: number;
  readonly tribe: string;
};

const useStyles = makeStyles<unknown, StylesProps>({
  image: (props) => ({
    backgroundImage: `url("${imageLinks.getBuilding(props.buildingType, props.tribe)}")`,
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
  readonly content: AutoBuildLogContent_autoBuildLogEntryContent$key;
};

const autoBuildLogContentFragment = graphql`
  fragment AutoBuildLogContent_autoBuildLogEntryContent on AutoBuildLogEntryContent {
      fieldId
      level
      name
      type
  }
`;

export const AutoBuildLogContent: React.FC<Props> = ({
  className,
  content,
}) => {
  const {
    fieldId,
    level,
    name,
    type,
  } = useFragment(autoBuildLogContentFragment, content);

  const tribe = useRecoilValue(tribeState);

  const classes = useStyles({
    buildingType: type,
    tribe,
  });

  return (
    <div className={clsx(className, classes.root)}>
      <span>Building</span>
      <div className={classes.image} />
      <span>
        {name} to level
        {level} at field
        {fieldId}
      </span>
    </div>
  );
};

AutoBuildLogContent.displayName = 'AutoBuildLogContent';