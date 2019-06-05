import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import classNames from 'classnames';
import { ISideMenuContext, SideMenuContext } from './context/SideMenuContext';

const useStyles = (drawerWidth: number) => makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
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

interface IProps {
  readonly width: number;
}

export const SideMenu: React.FunctionComponent<IProps> = (props) => {
  const {
    width
  } = props;

  const classes = useStyles(width)({});
  const { location } = useReactRouter();
  const { items } = useContext<ISideMenuContext>(SideMenuContext);

  return (
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
        {items && items.map((item, index) => {
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
  );
};
