import {
  arg,
  enumType,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';

import { BotEvent } from '../../events/botEvent.js';
import { subscribeToEvent } from '../../pubSub.js';
import { MapSearchState } from '../../services/mapScan/mapScanService.js';
import { relevantVillageTileTypes } from '../../services/mapScan/utils/scanSector.js';

export const SearchMapMutation = mutationField(t => {
  t.nullable.boolean('searchMap', {
    args: {
      input: arg({ type: SearchMapInput }),
    },
    resolve: (_, { input: { types, origin, cropBonus } }, ctx) => {
      ctx.mapSearchService.searchVillageTiles(
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
    resolve: (_, _args, ctx) => {
      ctx.mapScanService.scanMap();

      return null;
    },
  });
});

export const StopMapScanMutation = mutationField(t => {
  t.nullable.boolean('stopMapScan', {
    resolve: (_, _args, ctx) => {
      ctx.mapScanService.stopScan();

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
    resolve: (_, _args, ctx) =>
      ctx.mapScanService.isInProgress()
        ? MapSearchState.Scanning
        : ctx.mapSearchService.getState(),
  });
});

export const MapScanProgressQuery = queryField(t => {
  t.float('mapScanProgress', {
    resolve: (_, _args, ctx) => ctx.mapScanService.getScanProgress(),
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