export const adventureCriterias = ['Closest', 'Furthest', 'Random'] as const;

export type AdventureCriteria = typeof adventureCriterias[number];