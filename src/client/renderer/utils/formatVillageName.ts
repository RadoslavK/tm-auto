import { Village } from '../_graphql/types/graphql.type';

type VillageType = Pick<Village, 'name' | 'coords'> & Pick<Partial<Village>, 'isCapital'>;

export const formatVillageName = ({ coords, isCapital, name }: VillageType): string =>
  `${name} [${coords.x}|${coords.y}] ${isCapital ? ' (Capital)' : ''}`;