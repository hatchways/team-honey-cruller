import { useEffect, useState } from 'react';
import { useSnackBar } from '../../context/useSnackbarContext';
import { Contest } from '../../interface/User';
import { getAllContests } from '../../helpers/APICalls/contest';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import MyTablePagination from '../../components/TablePagination/TablePagination';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateRangeIcon from '@material-ui/icons/DateRange';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import SortIcon from '@material-ui/icons/Sort';
import { Animated } from 'react-animated-css';
import useStyles from './useStyles';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { Link } from 'react-router-dom';

interface Props {
  allContestsLength: number;
}

const ContestTable = ({ allContestsLength }: Props): JSX.Element => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [numContests, setNumContests] = useState<number>(allContestsLength);
  const [sortType, setSortType] = useState<keyof Contest>('deadlineDate');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateFilter, setDateFilter] = useState<any>();
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  useEffect(() => {
    if (!dateFilter && !contests) {
      setNumContests(allContestsLength);
    }
  }, [dateFilter, contests, allContestsLength]);

  useEffect(() => {
    if (dateFilter !== undefined) {
      const date = moment.utc(dateFilter._d).format();
      fetchCall(date, rowsPerPage, page);
    } else {
      fetchCall('', rowsPerPage, page);
      setNumContests(allContestsLength);
    }
  }, [dateFilter, rowsPerPage, page, allContestsLength]);

  const fetchCall = async (date = '', rows = 10, page = 0) => {
    const allContests = await getAllContests(date, rows, page);
    if (allContests.contests) {
      setContests(allContests.contests);
      if (date !== '') {
        setNumContests(allContests.contests.length);
      }
    } else {
      new Error('Could Not Get Contests');
    }
  };

  const handleChangePage = async (e: any, newPage: number) => {
    const allContests = await getAllContests(
      dateFilter !== undefined ? moment.utc(dateFilter._d).format() : '',
      rowsPerPage,
      newPage,
    );
    if (allContests.contests) {
      setPage(newPage);
      setContests(allContests.contests);
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeDate = (date: any) => {
    setPage(0);
    const momentTime = date;
    setDateFilter(momentTime);
  };

  const sortByHeader = (sortParam: Contest[] = contests) => {
    if (contests) {
      const sort = [...sortParam].sort((a: Contest, b: Contest) => {
        if (a[sortType] > b[sortType]) {
          return 1;
        } else if (a[sortType] < b[sortType]) {
          return -1;
        } else {
          return 0;
        }
      });
      setContests(sort);
    }
  };

  return (
    <>
      <Grid container justifyContent="center" className={classes.grid}>
        <SectionHeader
          title={
            <Typography component="span" variant="inherit" color="primary">
              Current Contests
            </Typography>
          }
          subtitle="Here we have all of our current contests, feel free to use our date picker to find all contests that end by a certain date"
          fadeUp
        />
        <Grid container justifyContent="center" className={classes.muiPicker}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid item xs={5}>
              <KeyboardDatePicker
                id="date"
                name="deadlineDate"
                margin="normal"
                variant="inline"
                inputVariant="outlined"
                format="MMM Do YYYY"
                value={dateFilter}
                onChange={(value) => handleChangeDate(value)}
                keyboardIcon={<DateRangeIcon />}
                autoOk={true}
              />
              <Button className={classes.buttonReset} onClick={() => handleChangeDate(undefined)}>
                Reset Filter
              </Button>
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow className={classes.tableHead}>
                  <TableCell className={classes.tableRow} key="Contest Title">
                    Contest Title
                  </TableCell>
                  <TableCell className={classes.tableRow} key="Contest Description">
                    Contest Description
                  </TableCell>
                  <TableCell className={classes.tableRow} key="Prize Amount">
                    Prize Amount
                  </TableCell>
                  <TableCell className={classes.tableRow} key="Deadline Date">
                    <div onClick={() => sortByHeader()}>Deadline Date</div>
                  </TableCell>
                  <TableCell className={classes.tableRow} key="Contest Page">
                    Contest Page
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contests.map((contest) => {
                  return (
                    <TableRow hover role="checkbox" className={classes.tableHead} tabIndex={-1} key={contest.title}>
                      <TableCell className={classes.tableRow}>{contest.title}</TableCell>
                      <TableCell className={classes.tableRow}>{contest.description}</TableCell>
                      <TableCell className={classes.tableRow}>${contest.prizeAmount}</TableCell>
                      <TableCell className={classes.tableRow}>
                        {moment(contest.deadlineDate).local().format('MM-DD-YYYY')}
                      </TableCell>
                      <TableCell className={classes.tableRow}>
                        <Button className={classes.button} component={Link} to={`/contest/${contest._id}`}>
                          More Info
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <MyTablePagination
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            numContests={numContests}
          />
        </Paper>
      </Grid>
    </>
  );
};

export default ContestTable;
