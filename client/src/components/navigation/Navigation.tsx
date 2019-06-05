import AppBar from '@material-ui/core/AppBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import { Link } from 'react-router-dom';
import { INavigationItem } from '../../_types/INavigationItem';
import useReactRouter from 'use-react-router';

const useStyles = (drawerWidth: number) => makeStyles({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
});

interface IProps {
  readonly drawerWidth: number;
  readonly navigationItems: readonly INavigationItem[];
}

export const Navigation: React.FunctionComponent<IProps> = (props) => {
  const classes = useStyles(props.drawerWidth)({});
  const { location } = useReactRouter();

  const currentItemIndex = location.pathname.startsWith('/villages') ? 1 : 0;

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Tabs
        value={currentItemIndex}
        indicatorColor="primary"
        centered
      >
        {props.navigationItems.map((route, index) => (
          <Tab
            key={index}
            label={route.text}
            component={Link}
            to={route.path}
          />
        ))}
      </Tabs>
    </AppBar>
  );
};
