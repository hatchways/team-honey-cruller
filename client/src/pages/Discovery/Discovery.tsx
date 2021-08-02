import { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { Contest, Winner } from '../../interface/User';
import { getAllContests } from '../../helpers/APICalls/contest';
import { getSomeWinners } from '../../helpers/APICalls/winner'
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateRangeIcon from '@material-ui/icons/DateRange';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton'
import { Animated } from 'react-animated-css';
import Hidden from '@material-ui/core/Hidden';
import WinnerCard from '../../components/WinnerCard/WinnerCard'
import { CssBaseline } from '@material-ui/core';
import { Link as Scroll } from 'react-scroll';
import DashSection from '../../components/DashSection/DashSection';
import Collapse from '@material-ui/core/Collapse';
import useStyles from './useStyles';

//might have to delete later
import { Link } from 'react-router-dom';

export default function Discovery(): JSX.Element {

  const [contests, setContests] = useState<Contest[]>([]);
  const [sortType, setSortType] = useState<keyof Contest>('deadlineDate');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateFilter, setDateFilter] = useState<any>();
  const [winners, setWinners] = useState<Winner[]>([]);
  const [checked, setChecked] = useState<boolean>(false)
  const [animation, setAnimation] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const { loggedInUser } = useAuth();
  const classes = useStyles();

  const fetchCall = async (date: any) => {
    const allContests = await getAllContests(date);
    if (allContests.contests) {
      setContests(allContests.contests);
    } else {
      return new Error('Could Not Get Contests');
    }
  }

  const winnersData = async () => {
    const getWinners = await getSomeWinners(2);
    if (getWinners) {
      setWinners(getWinners);
    } else {
      return new Error('Could Not Get Winners');
    }
  }

  useEffect(() => {
    fetchCall('');
    winnersData();
    setChecked(true)
  }, []);

  useEffect(() => {
    if (dateFilter !== undefined) {
      const date = moment.utc(dateFilter._d).format()
      fetchCall(date)
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

  const useWindowPosition = (id: string) => {
    useLayoutEffect(() => {
      function updatePosition() {
        const offetSetHeight = ref.current && ref.current.offsetHeight;
        if (offetSetHeight) {

          if (window.pageYOffset > offetSetHeight * 0.7) {
            setAnimation(true);
          }
        }
      }
      window.addEventListener('scroll', updatePosition);
      updatePosition();
      return () => window.removeEventListener('scroll', updatePosition);
    }, [id]);
    return animation;
  }

  return (
    <>
      <AuthHeader linkTo="/create-contest" btnText="create contest" />
      <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible={true}>
        <Grid className={classes.tableContainer}>
          <CssBaseline />
          <Collapse in={checked} {...(checked ? { timeout: 4000 } : {})} collapsedHeight={50}>
            <Box className={classes.heroContents}>
              <Typography variant='h1'>Welcome to Tatoo Art</Typography>
              <Typography variant='h5'>Premier tatoo designs created by artists all over the world.</Typography>
              <Scroll to='header' smooth={true}>
                <IconButton>
                  <ExpandMoreIcon onClick={e => console.log(ref.current)} className={classes.expand} />
                </IconButton>
              </Scroll>
            </Box>
          </Collapse>
        </Grid>
        <Grid ref={ref} id='header' className={classes.winnerCard}>
        <Grid>
            <Typography className={classes.typography}>Past Winners</Typography>
          </Grid>
          {winners.map((winner, i) => {
            return (
              <>
                <WinnerCard
                  winningPic={winner.winningPic}
                  title={winner.title}
                  prizeAmount={winner.prizeAmount}
                  winningArtist={winner.winningArtist}
                  description={winner.description}
                  key={winner.description}
                  time={1500}
                  useWindowPosition={useWindowPosition}
                />
              </>
            )
          })}
        </Grid>
        <Grid>
          <DashSection />
        </Grid>
        <Grid container justify="center" className={classes.grid}>
          <Grid>
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
                <Button className={classes.buttonReset} onClick={() => fetchCall('')}>
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
                      <>
                        <TableRow hover role="checkbox" className={classes.tableHead} tabIndex={-1} key={contest.title}>
                          <TableCell className={classes.tableRow}>{contest.title}</TableCell>
                          <TableCell className={classes.tableRow}>{contest.description}</TableCell>
                          <TableCell className={classes.tableRow}>${contest.prizeAmount}</TableCell>
                          <TableCell className={classes.tableRow}>{moment(contest.deadlineDate).local().format('MM-DD-YYYY')}</TableCell>
                          <TableCell className={classes.tableRow}>
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
