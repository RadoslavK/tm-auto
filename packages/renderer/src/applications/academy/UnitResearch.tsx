import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';

import type { UnitResearchUnitQuery } from '../../_graphql/__generated__/UnitResearchUnitQuery.graphql.js';
import { Resources } from '../../_shared/components/Resources.js';
import { useLazyLoadQuery } from '../../_shared/hooks/useLazyLoadQuery.js';
import { imageLinks } from '../../utils/imageLinks.js';

const query = graphql`
  query UnitResearchUnitQuery($index: Int!) {
      unitInfo(index: $index) {
          name
      }
      unitUpgradeCost(unitIndex: $index, level: 0) {
          ...Resources_resources
      }
  }
`;

type StylesProps = {
  readonly isHighlight: boolean;
  readonly unitIndex: number;
};

const useStyles = makeStyles<unknown, StylesProps>({
  root: props => props.isHighlight
    ? {
      backgroundColor: 'lightgreen',
    }
    : {
      '&:not(:last-child)': {
        borderBottom: 'black solid 3px',
      },
    },
  iconWithName: {
    display: 'flex',
  },
  unitName: {
    alignSelf: 'center',
  },
  unitImage: (props) => ({
    backgroundImage: `url("${imageLinks.getUnit(props.unitIndex)}")`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: 18,
    width: 18,
    margin: 12,
  }),
});

type Props = {
  readonly isHighlight?: boolean;
  readonly onClick?: () => void;
  readonly unitIndex: number;
};

export const UnitResearch: React.FC<Props> = ({ isHighlight, unitIndex, onClick }) => {
  const classes = useStyles({ unitIndex, isHighlight: !!isHighlight });
  const { unitUpgradeCost, unitInfo } = useLazyLoadQuery<UnitResearchUnitQuery>(query, { index: unitIndex });

  return (
    <div className={classes.root} onClick={onClick}>
      <div className={classes.iconWithName}>
        <div className={classes.unitImage} />
        <span className={classes.unitName}>{unitInfo.name}</span>
      </div>
      <Resources resourcesKey={unitUpgradeCost} showFreeCrop={false} />
    </div>
  );
};

UnitResearch.displayName = 'UnitResearch';