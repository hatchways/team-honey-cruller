import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import { Winner } from '../../interface/User';
import ContestTable from '../../components/ContestTable/ContestTable';
import TourContent from '../../components/TourContent/TourContent';
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
import { useTourContext } from '../../context/tourContext';

export default function Discovery(): JSX.Element {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [numContests, setNumContests] = useState<number>(0);
  const classes = useStyles();
  const history = useHistory();
  const { loggedInUser } = useAuth();
  const winnersData = async () => {
    const getWinners = await getSomeWinners(4);
    if (getWinners) {
      setWinners(getWinners);
    } else {
      return new Error('Could Not Get Winners');
    }
  };

  const steps = [
    {
      selector: '[data-tour="start-contest"]',
      content: { words: 'You can create a contest here!', theme: 'primary' },
      style: {
        padding: 20,
        minWidth: '40%',
        maxWidth: '80vw',
      },
      updateDelay: 100000,
      scrollDuration: 1500,
    },
    {
      selector: '[data-tour="contests"]',
      content: { words: 'Check out our active contests here!', theme: 'secondary' },
      style: {
        padding: 20,
        minWidth: '40%',
        maxWidth: '80vw',
        backgroundColor: 'black',
      },
      scrollDuration: 1500,
    },
    {
      selector: '[data-tour="contests"]',
      content: { words: 'Check out our active contests here!', theme: 'secondary' },
      style: {
        padding: 20,
        minWidth: '40%',
        maxWidth: '80vw',
        backgroundColor: 'black',
      },
      scrollDuration: 1500,
      action: () => history.push('/profile'),
    },
  ];

  useEffect(() => {
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
        <Hero />
        <Section>
          <Grid>
            <SectionHeader
              title={
                <Typography component="span" variant="inherit" color="primary">
                  Check out some of our recent Contest winners.
                </Typography>
              }
              subtitle="We Guarantee at least 20 submissions to your contest and you could receive up to 500+."
              fadeUp
            />
            <Grid container className={classes.winnerCard} alignItems="center" direction="column">
              <WinnerCard data={winners} />
            </Grid>
          </Grid>
        </Section>
        <Divider />
        <SectionAlternate>
          <SplashReviews className="reviews" />
        </SectionAlternate>
        <Divider />
        <div className={classes.table} data-tour="contests">
          <ContestTable allContestsLength={numContests} />
        </div>
        <Divider />
        <TourContent steps={steps} />
      </Animated>
    </>
  );
}
