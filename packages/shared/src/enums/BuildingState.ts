export const buildingStates = ['None', 'Completed', 'OngoingMaxed', 'QueueMaxed'] as const;

export type BuildingState = typeof buildingStates[number];