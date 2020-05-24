import React, { useContext } from 'react';

interface IContext {
  readonly villageId: number;
}

export const VillageSettingsContext = React.createContext<IContext>({ villageId: 0 });

export const useVillageSettingsContext = () => useContext<IContext>(VillageSettingsContext);
