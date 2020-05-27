import { Village } from '../_types/graphql';

type VillageType = Pick<Village, 'name' | 'coords'> & Pick<Partial<Village>, 'isCapital'>;

export const formatVillageName = ({ coords, isCapital, name }: VillageType): string =>
  `${name} [${coords.x}|${coords.y}] ${isCapital ? ' (Capital)' : ''}`;