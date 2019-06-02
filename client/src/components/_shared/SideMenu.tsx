import React from 'react';
import { Link } from 'react-router-dom';
import { INavigationItem } from '../../types/INavigationItem';

interface IParams {
    readonly items: readonly INavigationItem[];
}

export const SideMenu: React.FunctionComponent<IParams> = (props) => (
  <div className="side-menu">
      {props.items.map((item, index) => <Link key={index} className="side-menu-link" to={item.path}>{item.text}</Link>)}
  </div>
);
