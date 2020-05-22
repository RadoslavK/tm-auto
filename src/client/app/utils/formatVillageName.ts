import { IVillage } from '../../_types/graphql';

type VillageType = Pick<IVillage, 'name' | 'coords'> & Pick<Partial<IVillage>, 'isCapital'>;

export const formatVillageName = ({ coords, isCapital, name }: VillageType): string =>
  `${name} [${coords.x}|${coords.y}] ${isCapital ? ' (Capital)' : ''}`;