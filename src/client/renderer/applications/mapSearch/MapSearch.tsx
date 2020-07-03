import { LinearProgress, Paper } from '@material-ui/core';
import React, { useMemo, useState } from 'react';

import {
  MapSearchState,
  OnMapScanProgressUpdatedDocument,
  OnMapScanProgressUpdatedSubscription,
  OnMapScanProgressUpdatedSubscriptionVariables,
  OnMapSearchFinishedSubscription,
  OnMapSearchStateChangedDocument,
  OnMapSearchStateChangedSubscription,
  OnMapSearchStateChangedSubscriptionVariables,
  VillageTile,
  useGetMapScanProgressQuery,
  useGetMapSearchStateQuery,
  useGetVillageTileTypesQuery,
  useOnMapSearchFinishedSubscription,
  useScanWholeMapMutation,
  useSearchMapMutation,
  useStopMapScanMutation,
} from '../../_graphql/graphqlHooks';
import { VirtualizedTable } from '../../_shared/components/VirtualizedTable';
import { SortOrder } from '../../_shared/SortOrder';

enum SearchMapSortBy {
  Distance,
  CropBonus,
}

const bonuses = [0, 25, 50, 75, 100, 125, 150];

const useVillageTileTypes = () => {
  const { data, loading } = useGetVillageTileTypesQuery({
    fetchPolicy: 'cache-first',
  });

  return loading || !data ? [] : data.villageTileTypes;
};

const useMapSearchState = () => {
  const { data, loading, subscribeToMore } = useGetMapSearchStateQuery();

  subscribeToMore<
    OnMapSearchStateChangedSubscription,
    OnMapSearchStateChangedSubscriptionVariables
  >({
    document: OnMapSearchStateChangedDocument,
    updateQuery: (_prev, { subscriptionData: { data } }) => ({
      mapSearchState: data.mapSearchStateChanged,
    }),
  });

  return loading || !data ? null : data.mapSearchState;
};

const useScanProgress = () => {
  const { data, loading, subscribeToMore } = useGetMapScanProgressQuery();

  subscribeToMore<
    OnMapScanProgressUpdatedSubscription,
    OnMapScanProgressUpdatedSubscriptionVariables
  >({
    document: OnMapScanProgressUpdatedDocument,
    updateQuery: (_prev, { subscriptionData: { data } }) => ({
      mapScanProgress: data.mapScanProgressUpdated,
    }),
  });

  return loading || !data ? 0 : data.mapScanProgress;
};

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

export const MapSearch: React.FC = () => {
  const [sortBy, setSortBy] = useState<SearchMapSortBy>(
    SearchMapSortBy.Distance,
  );
  const [order, setOrder] = useState<SortOrder>(SortOrder.Asc);
  const [cropBonus, setCropBonus] = useState(0);
  const [villageTiles, setVillageTiles] = useState<
    OnMapSearchFinishedSubscription['mapSearchFinished']
  >([]);
  const [villageTypes, setVillageTypes] = useState<readonly string[]>([]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [radius, setRadius] = useState(5);

  const villageTileTypes = useVillageTileTypes();
  const scanProgress = useScanProgress();
  const searchState = useMapSearchState();
  const [searchMap] = useSearchMapMutation();
  const [scanWholeMap] = useScanWholeMapMutation();
  const [stopScan] = useStopMapScanMutation();

  const sortedVillageTiles = useMemo(
    () => getSortedTiles(villageTiles, sortBy, order),
    [villageTiles, sortBy, order],
  );

  useOnMapSearchFinishedSubscription({
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (!data) {
        return;
      }

      setVillageTiles(data.mapSearchFinished);
    },
  });

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

  const onScanWholeMap = () => scanWholeMap();
  const onStopScan = () => stopScan();

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

      {searchState !== MapSearchState.None ? (
        <button onClick={onStopScan}>Stop scan</button>
      ) : (
        <>
          <button onClick={() => onSearchMap()}>Search map</button>
          <button onClick={() => onScanWholeMap()}>Scan whole map</button>
        </>
      )}

      <LinearProgress variant="determinate" value={scanProgress} />

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
