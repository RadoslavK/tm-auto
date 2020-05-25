import React, { useContext } from 'react';

export type Context = {
  readonly villageId: number;
};

export const VillageContext = React.createContext<Context>({ villageId: 0 });

export const useVillageContext = (): Context => useContext<Context>(VillageContext);