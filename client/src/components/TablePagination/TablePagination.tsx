import { ChangeEvent } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import useStyles from './useStyles';

interface Props {
  page: number;
  rowsPerPage: number;
  handleChangePage: (e: any, newPage: number) => void;
  handleChangeRowsPerPage: (e: ChangeEvent<HTMLInputElement>) => void;
  numContests: number;
}

export default function MyTablePagination({
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  numContests,
}: Props): JSX.Element {
  const classes = useStyles();

  return (
    <TablePagination
      component="div"
      count={numContests}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      className={classes.pagination}
    />
  );
}
