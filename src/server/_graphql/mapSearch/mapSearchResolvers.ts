import { MapSearchState } from '../../_types/graphql.type';
import { Resolvers } from '../../_types/resolvers.type';
import { getAccountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';
import { relevantVillageTileTypes } from '../../services/mapScan/utils/scanSector';

export default <Resolvers>{
  VillageTile: {
    coords: (t) => ({ x: t.x, y: t.y }),
  },

  Query: {
    villageTileTypes: () => Object.values(relevantVillageTileTypes),
    mapSearchState: () =>
      getAccountContext().mapScanService.isInProgress()
        ? MapSearchState.Scanning
        : getAccountContext().mapSearchService.getState(),
    mapScanProgress: () => getAccountContext().mapScanService.getScanProgress(),
  },

  Mutation: {
    searchMap: (_, { input: { types, origin, cropBonus } }) =>
      getAccountContext().mapSearchService.searchVillageTiles(
        types,
        origin,
        cropBonus,
      ),
    scanWholeMap: () => getAccountContext().mapScanService.scanMap(),
    stopMapScan: () => getAccountContext().mapScanService.stopScan(),
  },

  Subscription: {
    mapScanProgressUpdated: subscribeToEvent(BotEvent.MapScanProgressUpdated, {
      resolve: (p) => p.scanProgress,
    }),
    mapSearchStateChanged: subscribeToEvent(BotEvent.MapSearchStateChanged, {
      resolve: (p) => p.state,
    }),
  },
};
