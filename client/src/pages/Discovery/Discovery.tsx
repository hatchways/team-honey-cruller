import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { Contest } from '../../interface/User';
import { Column } from '../../interface/Discovery';
import { getAllContests } from '../../helpers/APICalls/contest';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import Box from '@material-ui/core/Box';
import Carousel from 'react-material-ui-carousel';
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
  const { loggedInUser } = useAuth();
  const classes = useStyles();

  useEffect(() => {
    async function getAll() {
      const allContests = await getAllContests();
      if (allContests.contests) {
        setContests(allContests.contests);
      } else {
        console.log('No Contests Found');
        new Error('Could Not Get Contests');
      }
    }
    getAll();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
      <Grid xs={12} sm={6} md={4} container justify="center" className={classes.grid}>
        <Grid xs={12} sm={6} md={7} className={classes.tableContainer}>
          <Paper elevation={20} className={classes.heroImage}>
            <Box className={classes.heroContents}>
              <Typography variant='h2'>Welcome to Tatoo Art</Typography>
              <Typography paragraph={true}>Premier tatoo designs created by artists all over the world.</Typography>
            </Box>
          </Paper>

          <Paper>
            <Carousel
              animation="fade"
              next={(now: any, previous: any) => console.log(`Next User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
              prev={(now: any, previous: any) => console.log(`Prev User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
              onChange={(now: any, previous: any) => console.log(`OnChange User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
            >
              {contests.map((contest, i) => {
                return (
                  <>
                    <Typography variant='h4'>{contest.title}</Typography>
                  </>
                )
              })}
            </Carousel>
          </Paper>
          <Grid xs={12} sm={6} md={4} item>
            <Typography className={classes.typography}>All Open Contests</Typography>
          </Grid>
        </Grid>
        <Paper className={classes.paper}>
          <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible={true}>
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
          </Animated>
        </Paper>
      </Grid>
    </>
  );
}
