import {
  arg,
  enumType,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import { MapSearchState } from '../../services/mapScan/mapScanService.js';
import { getAccountContext } from '../../accountContext.js';
import { BotEvent } from '../../events/botEvent.js';
import { subscribeToEvent } from '../../pubSub.js';
import { relevantVillageTileTypes } from '../../services/mapScan/utils/scanSector.js';

export const SearchMapMutation = mutationField(t => {
  t.nullable.boolean('searchMap', {
    args: {
      input: arg({ type: SearchMapInput }),
    },
    resolve: async (_, { input: { types, origin, cropBonus } }) => {
      await getAccountContext().mapSearchService.searchVillageTiles(
        types,
        origin,
        cropBonus,
      );

      return null;
    },
  });
});

export const ScanWholeMapMutation = mutationField(t => {
  t.nullable.boolean('scanWholeMap', {
    resolve: async () => {
      await getAccountContext().mapScanService.scanMap();

      return null;
    },
  });
});

export const StopMapScanMutation = mutationField(t => {
  t.nullable.boolean('stopMapScan', {
    resolve: async () => {
      await getAccountContext().mapScanService.stopScan();

      return null;
    },
  });
});

export const VillageTileTypesQuery = queryField(t => {
  t.list.string('villageTileTypes', {
    resolve: () => Object.values(relevantVillageTileTypes),
  });
});

export const MapSearchStateQuery = queryField(t => {
  t.field('mapSearchState', {
    type: MapSearchStateEnum,
    resolve: () =>
      getAccountContext().mapScanService.isInProgress()
        ? MapSearchState.Scanning
        : getAccountContext().mapSearchService.getState(),
  });
});

export const MapScanProgressQuery = queryField(t => {
  t.float('mapScanProgress', {
    resolve: () => getAccountContext().mapScanService.getScanProgress(),
  });
});

export const MapSearchStateChangedSubscription = subscriptionField(t => {
  t.field('mapSearchStateChanged', {
    type: MapSearchStateEnum,
    ...subscribeToEvent(BotEvent.MapSearchStateChanged, {
      resolve: (p) => p.state,
    }),
  });
});

export const MapSearchFinishedSubscription = subscriptionField(t => {
  t.list.field('mapSearchFinished', {
    type: VillageTile,
    ...subscribeToEvent(BotEvent.MapSearchFinished, {
      resolve: (p) => p.tiles.map(tile => ({
        ...tile,
        coords: { x: tile.x, y: tile.y },
      })),
    }),
  });
});

export const MapScanProgressUpdatedSubscription = subscriptionField(t => {
  t.float('mapScanProgressUpdated', {
    ...subscribeToEvent(BotEvent.MapScanProgressUpdated, {
      resolve: (p) => p.scanProgress,
    }),
  });
});

export const VillageTile = objectType({
  name: 'VillageTile',
  definition(t) {
    t.field('coords', { type: 'Coords' });
    t.string('type');
    t.nullable.boolean('claimed');
    t.float('distance');
    t.int('cropBonus');
  },
});

export const SearchMapInput = inputObjectType({
  name: 'SearchMapInput',
  definition(t) {
    t.list.string('types');
    t.field('origin', { type: SearchMapOriginInput });
    t.int('cropBonus');
  },
});

export const SearchMapOriginInput = inputObjectType({
  name: 'SearchMapOriginInput',
  definition(t) {
    t.int('radius');
    t.int('x');
    t.int('y');
  },
});

export const MapSearchStateEnum = enumType({
  name: 'MapSearchState',
  members: MapSearchState,
});