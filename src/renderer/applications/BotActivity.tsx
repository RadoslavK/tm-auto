import { makeStyles } from '@material-ui/core/styles';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  useLazyLoadQuery,
} from 'react-relay/hooks';
import { BotActivityQuery } from '../_graphql/__generated__/BotActivityQuery.graphql';

type StylesProps = {
  readonly isBotActive: boolean;
};

const useStyles = makeStyles<unknown, StylesProps>({
  root: (props) => ({
    color: props.isBotActive ? 'green' : 'red',
  }),
});

export const botActivityQuery = graphql`
    query BotActivityQuery {
        isBotActive
    }
`;


export const BotActivity: React.FC = () => {
  const { isBotActive } = useLazyLoadQuery<BotActivityQuery>(botActivityQuery, {});

  const classes = useStyles({ isBotActive });

  return <div className={classes.root}>{isBotActive ? 'ACTIVE' : 'INACTIVE'}</div>;
};
