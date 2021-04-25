import {
  FormGroup,
  LinearProgress,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  PreloadedQuery,
  useMutation,
  usePreloadedQuery,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { MapSearchBotSubscription } from '../../_graphql/__generated__/MapSearchBotSubscription.graphql.js';
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
import { VillageName } from '../villages/components/VillageName.js';

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

export const mapSearchQuery = graphql`
    query MapSearchQuery {
        botState
        mapScanProgress
        mapSearchState
        gameInfo {
            factions
            mapSize
        }
        villages {
            id
            coords {
                x
                y
            }
            ...VillageName_village
        }
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
            region
            oases
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

const botStateSubscription = graphql`
    subscription MapSearchBotSubscription {
        botStateChanged
    }
`;

const useStyles = makeStyles({
  numberInput: {
    width: 50,
  },
  villageInput: {
    width: 200,
  },
});

type Props = {
  readonly queryRef: PreloadedQuery<MapSearchQuery>;
};

export const MapSearch: React.FC<Props> = ({ queryRef }) => {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState<SearchMapSortBy>(SearchMapSortBy.Distance);
  const [order, setOrder] = useState<SortOrder>(SortOrder.Asc);
  const [cropBonus, setCropBonus] = useState(0);
  const [villageTiles, setVillageTiles] = useState<readonly VillageTile[]>([]);
  const [villageTypes, setVillageTypes] = useState<readonly string[]>([]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [radius, setRadius] = useState(5);

  const { villageTileTypes } = useLazyLoadQuery<MapSearchVillageTileTypesQuery>(villageTileTypesQuery, {});
  const { botState, mapSearchState, mapScanProgress, gameInfo, villages } = usePreloadedQuery(mapSearchQuery, queryRef);
  const { factions, mapSize } = gameInfo;
  const [searchMap] = useMutation(searchMapMutation);
  const [scanWholeMap] = useMutation(scanWholeMapMutation);
  const [stopScan] = useMutation(stopMapScanMutation);

  const sortedVillageTiles = useMemo(
    () => getSortedTiles(villageTiles, sortBy, order),
    [villageTiles, sortBy, order],
  );

  const isScanningDisabled = botState === 'InitialScanning';

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

  const botStateSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<MapSearchBotSubscription> => ({
    subscription: botStateSubscription,
    variables: {},
    updater: (store, data) => {
      store.getRoot().setValue(data.botStateChanged, 'botState');
    },
  }), []);

  useSubscription(botStateSubscriptionConfig);

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

  const boxCoord = (coord: number, defaultValue: number): number => {
    if (isNaN(coord)) {
      return defaultValue;
    }

    return Math.max(Math.min(coord, mapSize), -mapSize);
  };

  const boxRadius = (radius: number): number =>
    Math.max(radius, 1);

  const [selectedVillageId, setSelectedVillageId] = useState<string>('');

  useEffect(() => {
    const village = villages.find(v => v.id === selectedVillageId);

    if (!village) {
      return;
    }

    setX(village.coords.x);
    setY(village.coords.y);
  }, [villages, selectedVillageId]);

  return (
    <div>
      <FormGroup>
        <TextField
          className={classes.numberInput}
          type="number"
          label="X"
          value={x}
          onChange={e => setX(prevX => boxCoord(+e.currentTarget.value, prevX))}
        />
        <TextField
          className={classes.numberInput}
          label="Y"
          type="number"
          value={y}
          onChange={e => setY(prevY => boxCoord(+e.currentTarget.value, prevY))}
        />
        <Select
          className={classes.villageInput}
          label="Village coords"
          value={selectedVillageId}
          onChange={e => setSelectedVillageId(e.target.value as string)}
        >
          {villages.map((village) => (
            <MenuItem key={village.id} value={village.id}>
              <VillageName village={village} />
            </MenuItem>
          ))}
        </Select>
        <TextField
          className={classes.numberInput}
          label="Radius"
          type="number"
          value={radius}
          onChange={e => setRadius(boxRadius(+e.currentTarget.value))}
        />
      </FormGroup>
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
          <button disabled={isScanningDisabled} onClick={() => onSearchMap()}>Search map</button>
          <button disabled={isScanningDisabled} onClick={() => onScanWholeMap()}>Scan whole map</button>
        </>
      )}

      <LinearProgress variant="determinate" value={mapScanProgress} />

      <Paper style={{ height: 400, width: '100%' }}>
        <VirtualizedTable
          getCellData={(cellData, rowData, dataKey: keyof VillageTile) => {
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

              case 'cropBonus': {
                const cropBonus = cellData as VillageTile[typeof dataKey];
                const formattedOases = rowData.oases.length
                  ? ` (${[...rowData.oases
                    .reduce((reduced, oasis) => {
                      let count  = reduced.get(oasis);
                      
                      if (!count) {
                        count = 1;
                      } else {
                        count++;
                      }
                      
                      reduced.set(oasis, count);
                      return reduced;
                    }, new Map<number, number>())
                    .entries()]
                    .reduce((text, [bonus, count]) => {
                      const formattedOasis = count > 1
                        ? `${count} x ${bonus}`
                        : `${bonus}`;
                      
                      return text
                        ? `${text}, ${formattedOasis}`
                        : formattedOasis;
                    }, '')})`
                  : '';

                return `${cropBonus} %${formattedOases}`;
              }

              default:
                return cellData;
            }
          }}
          columns={[
            { width: 200, label: 'Coords', dataKey: 'coords' },
            { width: 200, label: 'Type', dataKey: 'type' },
            { width: 200, label: 'Claimed', dataKey: 'claimed' },
            { width: 200, label: 'Crop bonus', dataKey: 'cropBonus', numeric: true },
            { width: 200, label: 'Distance', dataKey: 'distance', numeric: true },
            ...factions ? [{
              width: 200, label: 'Region', dataKey: 'region', numeric: false,
            }] as const : [],
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