import {
  makeStyles,
  TableCell, 
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import {
  AutoSizer,
  Column,
  SortIndicator,
  Table, 
} from 'react-virtualized';
import type {
  SortDirectionType,
  TableCellRenderer,
  TableHeaderRenderer,
} from 'react-virtualized/dist/es/Table';

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
      flip: false,
      paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
    },
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
  sortableColumn: {
    cursor: 'pointer',
  },
}));

type ColumnData<TDataKey> = {
  readonly width: number;
  readonly label: string;
  readonly dataKey: TDataKey;
  readonly numeric?: boolean;
};

type CellDataGetter<TData, TKey extends keyof TData> = (
  cellData: TData[TKey],
  rowData: TData,
  dataKey: TKey,
) => React.ReactNode;

type SortProps<TCellData> = {
  readonly sortStates: readonly (keyof TCellData)[];
  readonly sortBy: keyof TCellData;
  readonly sortDirection: SortDirectionType;
  readonly onSortByChanged: (newSortBy: keyof TCellData) => void;
  readonly onSortDirectionChanged: (newDirection: SortDirectionType) => void;
};

type Props<TCellData> = {
  readonly headerHeight?: number;
  readonly rowHeight?: number;
  readonly onRowClick?: () => void;
  readonly columns: ColumnData<keyof TCellData>[];
  readonly data: readonly TCellData[];
  readonly getCellData: CellDataGetter<TCellData, keyof TCellData>;
  readonly sort?: SortProps<TCellData>;
};

export const VirtualizedTable = <TCellData extends {}>({
  headerHeight = 48,
  rowHeight = 48,
  onRowClick,
  columns,
  data,
  getCellData,
  sort,
}: Props<TCellData>): ReturnType<React.FC<Props<TCellData>>> => {
  const classes = useStyles();

  const getRowClassName = ({ index }: { readonly index: number }) => {
    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  const cellRenderer: TableCellRenderer = ({ cellData, columnIndex, rowIndex }) => {
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (
            columnIndex != null && columns[columnIndex].numeric
          ) || false
            ? 'right'
            : 'left'
        }>
        {getCellData(cellData, data[rowIndex], columns[columnIndex].dataKey)}
      </TableCell>
    );
  };

  const headerRenderer = (columnIndex: number): TableHeaderRenderer => ({
    label,
    dataKey,
  }) => {
    const isSortable =
      sort && sort.sortStates.includes(dataKey as keyof TCellData);

    const onHeaderClick = isSortable
      ? () => {
        if (!sort) {
          return;
        }

        if (sort.sortBy === dataKey) {
          sort.onSortDirectionChanged(
            sort.sortDirection === 'DESC' ? 'ASC' : 'DESC',
          );
        } else {
          sort.onSortByChanged(dataKey as keyof TCellData);
        }
      }
      : undefined;

    return (
      <TableCell
        onClick={onHeaderClick}
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          isSortable ? classes.sortableColumn : classes.noClick,
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}>
        <span>{label}</span>
        {sort && sort.sortBy === dataKey && (
          <SortIndicator sortDirection={sort.sortDirection} />
        )}
      </TableCell>
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          height={height}
          width={width}
          rowHeight={rowHeight}
          gridStyle={{
            direction: 'inherit',
          }}
          headerHeight={headerHeight}
          className={classes.table}
          rowCount={data.length}
          rowGetter={({ index }) => data[index]}
          rowClassName={getRowClassName}>
          {columns.map(({ dataKey, ...other }, index) => {
            return (
              <Column
                key={dataKey.toString()}
                headerRenderer={headerRenderer(index)}
                className={classes.flexContainer}
                cellRenderer={cellRenderer}
                dataKey={dataKey.toString()}
                {...other}
              />
            );
          })}
        </Table>
      )}
    </AutoSizer>
  );
};

(VirtualizedTable as React.FC<Props<unknown>>).displayName = 'VirtualizedTable';