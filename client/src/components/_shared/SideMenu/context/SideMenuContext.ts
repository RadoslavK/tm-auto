import React from 'react';
import { INavigationItem } from '../../../../_types/INavigationItem';

export interface ISideNavigationContext {
  readonly setItems?: (items: readonly INavigationItem[]) => void;
}

export const SideNavigationContext = React.createContext<ISideNavigationContext>({});
