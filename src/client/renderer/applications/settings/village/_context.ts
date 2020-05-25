import React, { useContext } from 'react';

type Context = {
  readonly villageId: number;
};

export const VillageSettingsContext = React.createContext<Context>({ villageId: 0 });

export const useVillageSettingsContext = () => useContext<Context>(VillageSettingsContext);
