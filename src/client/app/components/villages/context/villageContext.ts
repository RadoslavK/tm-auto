import React from 'react';

export interface IVillageContext {
  readonly villageId: number;
}

export const VillageContext = React.createContext<IVillageContext>({ villageId: 0 });
