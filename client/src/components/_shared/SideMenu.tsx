import { CssBaseline } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { Link } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import { INavigationItem } from '../../_types/INavigationItem';
import classNames from 'classnames';

interface IParams {
  readonly items?: readonly INavigationItem[];
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  button: theme.mixins.gutters({
    borderRadius: 0,
    justifyContent: 'flex-start',
    width: '100%',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: theme.palette.background.default,
    },
    paddingLeft: '0px',
  }),
  navLinkButton: {
    color: theme.palette.text.secondary,
    textIndent: 24,
    fontSize: 13,
  },
  selectedOption: {
    color: theme.palette.text.primary,
  },
}));

export const SideMenu: React.FunctionComponent<IParams> = (props) => {
  const classes = useStyles({});
  const { location } = useReactRouter();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <List>
          {props.items && props.items.map((item, index) => {
            const isSelected = location.pathname.startsWith(item.path);

            return (
              <ListItem key={index}>
                <Button
                  className={classNames(classes.button, classes.navLinkButton, { [classes.selectedOption]: isSelected })}
                  component={Link}
                  to={item.path}
                >
                  {item.text}
                </Button>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
};
