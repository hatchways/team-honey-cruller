import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { Contest } from '../../interface/User';
import { Column } from '../../interface/Discovery';
import { getAllContests, getContestsByDate } from '../../helpers/APICalls/contest';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import TablePagination from '@material-ui/core/TablePagination';
import SortIcon from '@material-ui/icons/Sort';
import { Animated } from 'react-animated-css';
import useStyles from './useStyles';

//might have to delete later
import { Link } from 'react-router-dom';

export default function Discovery(): JSX.Element {
  const [contests, setContests] = useState<Contest[]>([]);
  const [sortType, setSortType] = useState<keyof Contest>('deadlineDate');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateFilter, setDateFilter] = useState<any>()
  const { loggedInUser } = useAuth();
  const classes = useStyles();

  useEffect(() => {
    async function getAll() {
      const allContests = await getAllContests();
      if (allContests.contests) {
        setContests(allContests.contests);
      } else {
        new Error('Could Not Get Contests');
      }
    }
    getAll();
  }, []);

  useEffect(() => {
    async function getAllByDate(date: string) {
      const allContests = await getContestsByDate(date);
      if (allContests.contests) {
        setContests(allContests.contests);
      } else {
        new Error('Could Not Get Contests');
      }
    }
    if (dateFilter) {
      const date = moment.utc(dateFilter._d).format()
      getAllByDate(date)
    }
  }, [dateFilter]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeDate = (date: any) => {
    const momentTime = date
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
      <AuthHeader linkTo="/create-contest" btnText="create contest" />
      <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible={true}>
        <Grid container justify="center" className={classes.grid}>
          <Container className={classes.tableContainer}>
            <Grid item>
              <Typography className={classes.typography}>All Open Contests</Typography>
            </Grid>
            <Grid container justify="center" className={classes.muiPicker}>
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
                    onChange={value => handleChangeDate(value)}
                    keyboardIcon={<DateRangeIcon />} 
                    autoOk={true}
                    />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
          </Container>
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
                      <>
                        <TableRow hover role="checkbox" className={classes.tableHead} tabIndex={-1} key={contest.title}>
                          <TableCell className={classes.tableRow}>{contest.title}</TableCell>
                          <TableCell className={classes.tableRow}>{contest.description}</TableCell>
                          <TableCell className={classes.tableRow}>${contest.prizeAmount}</TableCell>
                          <TableCell className={classes.tableRow}>{contest.deadlineDate}</TableCell>
                          <TableCell className={classes.tableRow}>
                            {/* Is this the link to go for a particular contest. If yes, then we can pass contest */}
                            <Button className={classes.button} component={Link} to={`/contest/${contest._id}`}>
                              More Info
                            </Button>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Animated>
    </>
  );
}
