import { ChangeEvent } from 'react';
import TablePagination from '@material-ui/core/TablePagination';

interface Props {
  page: number;
  rowsPerPage: number;
  handleChangePage: (e: any, newPage: number) => void;
  handleChangeRowsPerPage: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function MyTablePagination({
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}: Props): JSX.Element {
  return (
    <TablePagination
      component="div"
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
