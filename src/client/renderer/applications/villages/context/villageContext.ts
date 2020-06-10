import React, { useContext } from 'react';

export type Context = {
  readonly villageId: string;
};

export const VillageContext = React.createContext<Context>({ villageId: '' });

export const useVillageContext = (): Context => useContext<Context>(VillageContext);