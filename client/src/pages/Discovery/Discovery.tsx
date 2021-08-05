import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { Winner } from '../../interface/User';
import ContestTable from '../../components/ContestTable/ContestTable';
import { getSomeWinners } from '../../helpers/APICalls/winner';
import { getNumContests } from '../../helpers/APICalls/contest';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Animated } from 'react-animated-css';
import WinnerCard from '../../components/WinnerCard/WinnerCard';
import Section from '../../components/Section/Section';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { Divider } from '@material-ui/core';
import SplashReviews from '../../components/SplashReviews/SplashReviews';
import SectionAlternate from '../../components/SectionAlternate/SectionAlternate';
import Hero from '../../components/Hero/Hero';
import useStyles from './useStyles';

export default function Discovery(): JSX.Element {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [numContests, setNumContests] = useState<number>(0);
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const winnersData = async () => {
    const getWinners = await getSomeWinners(4);
    if (getWinners) {
      setWinners(getWinners);
    } else {
      return new Error('Could Not Get Winners');
    }
  };

  useEffect(() => {
    fetchCall('');
  }, []);

  useEffect(() => {
    if (dateFilter !== undefined) {
      const date = moment.utc(dateFilter._d).format();
      fetchCall(date);
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
    winnersData();
    getNumContests().then((data: number) => {
      setNumContests(data);
    });
  }, []);
  return (
    <>
      <AuthHeader
        linkTo={loggedInUser ? '/create-contest' : '/login'}
        btnText={loggedInUser ? 'Create Contest' : 'Log In'}
      />
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
                    onChange={(value) => handleChangeDate(value)}
                    keyboardIcon={<DateRangeIcon />}
                    autoOk={true}
                  />
                  <Button className={classes.buttonReset} onClick={() => fetchCall('')}>
                    Reset Filter
                  </Button>
                </Grid>
              </MuiPickersUtilsProvider>
        <Hero />
        <Section>
          <Grid>
            <SectionHeader
              title={
                <Typography component="span" variant="inherit" color="primary">
                  Check out some of our recent Contest winners.
                </Typography>
              }
              subtitle="We Guarantee atleast 20 submissions to your contest and you could receive up to 500+."
              fadeUp
            />
            <Grid container className={classes.winnerCard}>
              {winners.map((winner) => {
                return (
                  <Grid
                    item
                    alignItems="center"
                    direction="column"
                    spacing={5}
                    xs={12}
                    sm={6}
                    md={3}
                    key={winner._id}
                    className={classes.winnerWrapper}
                  >
                    <WinnerCard
                      winningPic={winner.winningPic}
                      title={winner.title}
                      prizeAmount={winner.prizeAmount}
                      winningArtist={winner.winningArtist}
                      description={winner.description}
                      key={winner.description}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Section>
        <Divider />
        <SectionAlternate>
          <SplashReviews className="reviews" />
        </SectionAlternate>
        <Divider />
        <div className={classes.table}>
          <ContestTable allContestsLength={numContests} />
        </div>
        <Divider />
      </Animated>
    </>
  );
}
