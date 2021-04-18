export const dualQueuePreferences = ['Resources', 'Infrastructure'] as const;

export type DualQueuePreference = typeof dualQueuePreferences[number];