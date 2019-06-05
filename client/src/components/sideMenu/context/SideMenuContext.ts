import React from 'react';
import { INavigationItem } from '../../../_types/INavigationItem';

export interface ISideMenuContext {
  readonly items: readonly INavigationItem[];
  readonly setItems?: (items: readonly INavigationItem[]) => void;
}

export const SideMenuContext = React.createContext<ISideMenuContext>({
  items: [],
});
