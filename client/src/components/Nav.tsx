import * as React from 'react';
import { Link } from 'react-router-dom';

interface INavigationItem {
  readonly path: string;
  readonly text: string;
}

const navigationItems: readonly INavigationItem[] = [
  { path: '/', text: 'Home' },
  { path: '/villages', text: 'Villages' },
];

export const Nav: React.FunctionComponent = () => (
  <nav>
    <ul>
      {navigationItems.map(route => (
        <li key={route.path}>
          <Link to={route.path}>{route.text}</Link>
        </li>
      ))}
    </ul>
  </nav>
);
