import React, { useContext } from 'react';

type Context = {
  readonly villageId: string;
};

export const VillageSettingsContext = React.createContext<Context>({ villageId: '' });

export const useVillageSettingsContext = () => useContext<Context>(VillageSettingsContext);
