import React from 'react';

export interface IVillageContext {
  readonly villageId: number;
}

//  TODO useVillageContext

export const VillageContext = React.createContext<IVillageContext>({ villageId: 0 });
