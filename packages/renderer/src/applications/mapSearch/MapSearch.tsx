import {
  LinearProgress,
  Paper, 
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useMemo,
  useState, 
} from 'react';
import {
  useMutation,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type {
  MapSearchOnMapSearchFinishedSubscription,
  MapSearchOnMapSearchFinishedSubscriptionResponse,
} from '../../_graphql/__generated__/MapSearchOnMapSearchFinishedSubscription.graphql.js';
import type { MapSearchProgressSubscription } from '../../_graphql/__generated__/MapSearchProgressSubscription.graphql.js';
import type { MapSearchQuery } from '../../_graphql/__generated__/MapSearchQuery.graphql.js';
import type { MapSearchStateSubscription } from '../../_graphql/__generated__/MapSearchStateSubscription.graphql.js';
import type { MapSearchVillageTileTypesQuery } from '../../_graphql/__generated__/MapSearchVillageTileTypesQuery.graphql.js';
import { VirtualizedTable } from '../../_shared/components/VirtualizedTable.js';
import { useLazyLoadQuery } from '../../_shared/hooks/useLazyLoadQuery.js';
import { SortOrder } from '../../_shared/SortOrder.js';

enum SearchMapSortBy {
  Distance,
  CropBonus,
}

const bonuses = [0, 25, 50, 75, 100, 125, 150];

type VillageTile = MapSearchOnMapSearchFinishedSubscriptionResponse['mapSearchFinished'][0];

const getSortedTiles = (
  tiles: readonly VillageTile[],
  sortBy: SearchMapSortBy,
  order: SortOrder,
): readonly VillageTile[] => {
  return tiles.slice().sort((t1, t2) => {
    if (sortBy === SearchMapSortBy.CropBonus) {
      return order === SortOrder.Asc
        ? t1.cropBonus - t2.cropBonus
        : t2.cropBonus - t1.cropBonus;
    } else {
      return order === SortOrder.Asc
        ? t1.distance - t2.distance
        : t2.distance - t1.distance;
    }
  });
};

const villageTileTypesQuery = graphql`
    query MapSearchVillageTileTypesQuery {
        villageTileTypes
    }
`;

const query = graphql`
    query MapSearchQuery {
        mapScanProgress
        mapSearchState
    }
`;

const searchMapMutation = graphql`
    mutation MapSearchSearchMapMutation($input: SearchMapInput!) {
        searchMap(input: $input)
    }
`;

const scanWholeMapMutation = graphql`
    mutation MapSearchScanWholeMapMutation {
        scanWholeMap
    }
`;

const stopMapScanMutation = graphql`
  mutation MapSearchStopMapScanMutation {
      stopMapScan
  }
`;

const onMapSearchFinishedSubscription = graphql`
    subscription MapSearchOnMapSearchFinishedSubscription {
        mapSearchFinished {
            claimed
            cropBonus
            distance
            coords {
                x
                y
            }
            type
        }
    }
`;

const mapScanProgressSubscription = graphql`
  subscription MapSearchProgressSubscription {
      mapScanProgressUpdated
  }
`;

const mapSearchStateSubscription = graphql`
  subscription MapSearchStateSubscription {
      mapSearchStateChanged
  }
`;

export const MapSearch: React.FC = () => {
  const [sortBy, setSortBy] = useState<SearchMapSortBy>(SearchMapSortBy.Distance);
  const [order, setOrder] = useState<SortOrder>(SortOrder.Asc);
  const [cropBonus, setCropBonus] = useState(0);
  const [villageTiles, setVillageTiles] = useState<readonly VillageTile[]>([]);
  const [villageTypes, setVillageTypes] = useState<readonly string[]>([]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [radius, setRadius] = useState(5);

  const { villageTileTypes } = useLazyLoadQuery<MapSearchVillageTileTypesQuery>(villageTileTypesQuery, {});
  const { mapSearchState, mapScanProgress } = useLazyLoadQuery<MapSearchQuery>(query, {}, { fetchPolicy: 'store-and-network' });
  const [searchMap] = useMutation(searchMapMutation);
  const [scanWholeMap] = useMutation(scanWholeMapMutation);
  const [stopScan] = useMutation(stopMapScanMutation);

  const sortedVillageTiles = useMemo(
    () => getSortedTiles(villageTiles, sortBy, order),
    [villageTiles, sortBy, order],
  );

  const mapSearchStateSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<MapSearchStateSubscription> => ({
    subscription: mapSearchStateSubscription,
    variables: {},
    updater: (store, data) => {
      store.getRoot().setValue(data.mapSearchStateChanged, 'mapSearchState');
    },
  }), []);

  useSubscription(mapSearchStateSubscriptionConfig);

  const mapScanProgressSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<MapSearchProgressSubscription> => ({
    subscription: mapScanProgressSubscription,
    variables: {},
    updater: (store, data) => {
      store.getRoot().setValue(data.mapScanProgressUpdated, 'mapScanProgress');
    },
  }), []);

  useSubscription(mapScanProgressSubscriptionConfig);

  const mapSearchFinishedSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<MapSearchOnMapSearchFinishedSubscription> => ({
    subscription: onMapSearchFinishedSubscription,
    variables: {},
    onNext: (data) => {
      if (data) {
        setVillageTiles(data.mapSearchFinished);
      }
    },
  }), []);

  useSubscription<MapSearchOnMapSearchFinishedSubscription>(mapSearchFinishedSubscriptionConfig);

  const onSearchMap = () =>
    searchMap({
      variables: {
        input: {
          origin: {
            radius,
            x,
            y,
          },
          types: villageTypes,
          cropBonus,
        },
      },
    });

  const onScanWholeMap = () => scanWholeMap({ variables: {} });
  const onStopScan = () => stopScan({ variables: {} });

  return (
    <div>
      <div>
        <label>X:</label>
        <input
          type="number"
          value={x}
          onChange={(e) => {
            const { value } = e.target;
            setX(+value);
          }}
        />
      </div>

      <div>
        <label>Y:</label>
        <input
          type="number"
          value={y}
          onChange={(e) => {
            const { value } = e.target;
            setY(+value);
          }}
        />
      </div>

      <div>
        <label>Radius</label>
        <input
          type="number"
          value={radius}
          onChange={(e) => {
            const newRadius = +e.target.value;
            setRadius(newRadius);
          }}
        />
      </div>

      <div>
        {villageTileTypes.map((villageTileType) => (
          <React.Fragment key={villageTileType}>
            <input
              id={villageTileType}
              type="checkbox"
              checked={villageTypes.includes(villageTileType)}
              onChange={(e) => {
                const { checked } = e.target;

                setVillageTypes((prevTypes) =>
                  checked
                    ? prevTypes.concat([villageTileType])
                    : prevTypes.filter((t) => t !== villageTileType),
                );
              }}
            />
            <label htmlFor={villageTileType}>{villageTileType}</label>
          </React.Fragment>
        ))}
      </div>

      <div>
        <label>Crop bonus:</label>
        <select
          value={cropBonus}
          onChange={(e) => {
            const { value } = e.target;
            setCropBonus(+value);
          }}>
          {bonuses.map((bonus) => (
            <option key={bonus} value={bonus} label={`${bonus} %`} />
          ))}
        </select>
      </div>

      {mapSearchState !== 'None' ? (
        <button onClick={onStopScan}>Stop scan</button>
      ) : (
        <>
          <button onClick={() => onSearchMap()}>Search map</button>
          <button onClick={() => onScanWholeMap()}>Scan whole map</button>
        </>
      )}

      <LinearProgress variant="determinate" value={mapScanProgress} />

      <Paper style={{ height: 400, width: '100%' }}>
        <VirtualizedTable
          getCellData={(cellData, dataKey: keyof VillageTile) => {
            switch (dataKey) {
              case 'distance':
                return (cellData as VillageTile[typeof dataKey]).toFixed(2);
              case 'claimed':
                return (cellData as VillageTile[typeof dataKey])
                  ? 'true'
                  : 'false';
              case 'coords': {
                const data = cellData as VillageTile[typeof dataKey];

                return `${data.x} | ${data.y}`;
              }

              default:
                return cellData;
            }
          }}
          columns={[
            { width: 200, label: 'Coords', dataKey: 'coords' },
            { width: 200, label: 'Type', dataKey: 'type' },
            { width: 200, label: 'Claimed', dataKey: 'claimed' },
            {
              width: 200,
              label: 'Crop bonus',
              dataKey: 'cropBonus',
              numeric: true,
            },
            {
              width: 200,
              label: 'Distance',
              dataKey: 'distance',
              numeric: true,
            },
          ]}
          data={sortedVillageTiles}
          sort={{
            sortBy:
              sortBy === SearchMapSortBy.Distance ? 'distance' : 'cropBonus',
            sortDirection: order === SortOrder.Asc ? 'ASC' : 'DESC',
            sortStates: ['distance', 'cropBonus'],
            onSortByChanged: (newSortBy) => {
              setSortBy(
                newSortBy === 'distance'
                  ? SearchMapSortBy.Distance
                  : SearchMapSortBy.CropBonus,
              );
              setOrder(SortOrder.Asc);
            },
            onSortDirectionChanged: (newDirection) => {
              setOrder(
                newDirection === 'DESC' ? SortOrder.Desc : SortOrder.Asc,
              );
            },
          }}
        />
      </Paper>
    </div>
  );
};

MapSearch.displayName = 'MapSearch';