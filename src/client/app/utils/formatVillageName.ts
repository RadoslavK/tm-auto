import { IVillage } from '../../_types/graphql';

export const formatVillageName = ({ name, coords }: Pick<IVillage, 'name' | 'coords'>): string => `${name} [${coords.x}|${coords.y}]`;
