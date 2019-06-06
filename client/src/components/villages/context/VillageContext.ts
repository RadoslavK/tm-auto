import React from 'react';

export interface IVillageContext {
  readonly villageId: string;
}

export const VillageContext = React.createContext<IVillageContext>({ villageId: '' });
