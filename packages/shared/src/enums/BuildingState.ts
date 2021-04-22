//  None means its not maxed in any means and is used like that on client
export const buildingStates = ['None', 'Completed', 'OngoingMaxed', 'QueueMaxed'] as const;

export type BuildingState = typeof buildingStates[number];