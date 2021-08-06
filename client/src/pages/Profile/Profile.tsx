import { useState, useEffect, ChangeEvent } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useHistory } from 'react-router-dom';
import useStyles from './useStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from '@material-ui/core/Toolbar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TourContent from '../../components/TourContent/TourContent';
import ContestList from '../../components/ContestList/ContestList';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { Contest, Winner } from '../../interface/User';
import { getContestByUser } from '../../helpers/APICalls/contest';
import { getWinnersByUser } from '../../helpers/APICalls/winner';
import updateProfile from '../../helpers/APICalls/profile';
import { useSnackBar } from '../../context/useSnackbarContext';
import loginWithCookies from '../../helpers/APICalls/loginWithCookies';
import { useHistory } from 'react-router-dom';

export default function Profile(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [contests, setContests] = useState<Contest[]>([]);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [newProfilePic, setNewProfilePic] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { loggedInUser, updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const history = useHistory();

  const steps = [
    {
      selector: '[data-tour="start-contest"]',
      content: {
        words:
          "This is your profile page, you can view all of your open and completed contests. Don't forget to upload a profile pic.",
        theme: 'primary',
      },
      style: {
        padding: 20,
        minWidth: '40%',
        maxWidth: '80vw',
      },
    },
    {
      selector: '[data-tour="start-contest"]',
      content: {
        words:
          "This is your profile page, you can view all of your open and completed contests. Don't forget to upload a profile pic.",
        theme: 'primary',
      },
      style: {
        padding: 20,
        minWidth: '40%',
        maxWidth: '80vw',
      },
      action: () => history.push('/settings'),
    },
  ];

  const newTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#3d3d3d',
      },
    },
  });

  interface TabPanelProps {
    direction?: string;
    value: number;
    children: React.ReactNode;
    index: number;
  }

  useEffect(() => {
    async function getUserContests() {
      const userContests = await getContestByUser();
      if (userContests.contests) {
        setContests(userContests.contests);
      } else {
        new Error('Could Not Get Contests');
      }
    }

    async function getWinners() {
      const usersWinners = await getWinnersByUser();
      if (usersWinners) {
        setWinners(usersWinners);
      } else {
        new Error('Could not get winners');
      }
    }

    getUserContests();
    getWinners();
  }, []);

  const isActive = () => {
    if (contests) {
      return contests.filter((contest) => contest.active);
    }
    return [];
  };

  const isComplete = () => {
    if (contests) {
      return contests.filter((contest) => !contest.active);
    }
    return [];
  };

  const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, valueChange: number) => {
    setValue(valueChange);
  };

  const Panel = function (props: TabPanelProps) {
    return (
      <div role="tabpanel" id={`${props.index}`}>
        {value === props.index && (
          <Container>
            <Typography>{props.children}</Typography>
          </Container>
        )}
      </div>
    );
  };

  const submitNewPic = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('image', e.target.files[0], e.target.files[0].name);
        const newPic = await updateProfile(formData);
        setNewProfilePic(newPic);
        setLoading(false);
        const { success } = await loginWithCookies();
        if (success) {
          updateLoginContext(success);
          history.push('/profile');
        }
      } catch (err: any) {
        updateSnackBarMessage(err.message);
      }
    }
  };

  return loggedInUser ? (
    <>
      <AuthHeader linkTo="/create-contest" btnText="create contest" />
      <Grid className={classes.grid} container alignItems="center" direction="column">
        {loading ? (
          <CircularProgress />
        ) : (
          <Avatar
            alt="Profile Image"
            src={newProfilePic || loggedInUser.profilePic}
            className={classes.avatar}
          ></Avatar>
        )}
        <Typography className={classes.user}>{loggedInUser.username}</Typography>
        <Box className={classes.buttonBox}>
          <Button className={classes.button}>Edit Profile</Button>
          <Button className={classes.button}>
            <label htmlFor="file" className={classes.fileInputLabel}>
              Choose New Pic
              <input
                type="file"
                accept="image/*"
                id="file"
                name="image"
                multiple={false}
                onChange={submitNewPic}
                className={classes.fileInput}
              />
            </label>
          </Button>
        </Box>
        <Container className={classes.container}>
          <Toolbar className={classes.toolbar}>
            <ThemeProvider theme={newTheme}>
              <Tabs
                className={classes.tabs}
                value={value}
                onChange={handleChange}
                textColor="primary"
                variant="fullWidth"
              >
                <div data-tour="profile"></div>
                <Tab label="in progress" className={classes.tab} />
                <Tab label="choose a winner" className={classes.tab} />
                <Tab label="past winners" className={classes.tab} />
              </Tabs>
            </ThemeProvider>
          </Toolbar>
          <Paper square elevation={2}>
            <Panel value={value} index={0}>
              <ContestList userContests={isActive()} />
            </Panel>
            <Panel value={value} index={1}>
              <ContestList userContests={isComplete()} />
            </Panel>
            <Panel value={value} index={2}>
              <ContestList userContests={winners} />
            </Panel>
          </Paper>
        </Container>
      </Grid>
      <TourContent steps={steps} />
    </>
  ) : (
    <CircularProgress />
  );
}
