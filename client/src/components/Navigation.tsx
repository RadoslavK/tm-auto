import React from 'react';
import { Link } from 'react-router-dom';
import { INavigationItem } from '../types/INavigationItem';

const navigationItems: readonly INavigationItem[] = [
  { path: '/', text: 'Home' },
  { path: '/villages', text: 'Villages' },
];

export const Navigation: React.FunctionComponent = () => (
  <nav className="navigation">
    {navigationItems.map((route, index) => (
      <Link key={index} className="navigation-link" to={route.path}>{route.text}</Link>
    ))}
  </nav>
);
