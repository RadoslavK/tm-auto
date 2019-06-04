import { Paper } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import { Link } from 'react-router-dom';
import { INavigationItem } from '../_types/INavigationItem';
import useReactRouter from 'use-react-router';
import { SideMenu } from './_shared/SideMenu';

const navigationItems: readonly INavigationItem[] = [
  { path: '/', text: 'Home' },
  { path: '/villages', text: 'Villages' },
];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export const Navigation: React.FunctionComponent = () => {
  const classes = useStyles({});
  const { location } = useReactRouter();

  const currentItemIndex = location.pathname.startsWith('/villages') ? 1 : 0;

  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          value={currentItemIndex}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {navigationItems.map((route, index) => (
            <Tab
              key={index}
              label={route.text}
              component={Link}
              to={route.path}
            />
          ))}
        </Tabs>
      </Paper>
      <SideMenu />
    </>
  );
};
