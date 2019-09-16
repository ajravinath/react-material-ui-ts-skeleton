import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3)
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2)
    },
    table: {
      minWidth: 750
    },
    tableWrapper: {
      overflowX: 'auto'
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1
    }
  })
);
type Order = 'asc' | 'desc';

interface CustomTableHeadProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;

  order: Order;
  orderBy: string;
}

interface headCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export default function CustomTableHead(props: CustomTableHeadProps) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  const headCells: headCell[] = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Dessert (100g serving)'
    },
    { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
    { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
    { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
    {
      id: 'protein',
      numeric: true,
      disablePadding: false,
      label: 'Protein (g)'
    }
  ];

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
