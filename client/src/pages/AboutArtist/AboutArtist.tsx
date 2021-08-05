import { useState, useEffect } from 'react';
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from '@material-ui/core/Toolbar';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import AboutArtistTab from '../../components/AboutArtistTab/AboutArtistTab';
import { PersonalInfo } from '../../interface/PersonalInfo';
import { getPersonalInfo } from '../../helpers/APICalls/personalInfo';
import { submissionByArtist } from '../../interface/User';
import { getartistSubmission } from '../../helpers/APICalls/submission';
import { withStyles } from '@material-ui/core/styles';
import ReviewTab from '../../components/ReviewTab/ReviewTab';

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiToolbar-root': {
      padding: 0,
    },
    '.MuiToolbar-regular': {
      minHeight: 0,
    },
  },
})(() => null);

//Pass 'artistId' through the react-router Link , when calling this component
export default function AboutArtist(props: { location: { state: string } }): JSX.Element {
  const id = props.location.state;
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [info, setInfo] = useState<PersonalInfo>();
  const [submission, setSubmission] = useState<submissionByArtist[]>([]);
  const { loggedInUser } = useAuth();

  const newTheme = createTheme({
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
    async function getInfo() {
      const artistInfo = await getPersonalInfo(id);
      const artistSubmission = await getartistSubmission(id);
      if (artistInfo !== null) {
        setInfo(artistInfo);
      } else {
        new Error('Could Not Get Artist Info');
      }
      if (artistSubmission !== null) {
        setSubmission(artistSubmission);
      } else {
        new Error('Could Not Get Artist Submssions');
      }
    }
    getInfo();
  }, [id]);

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

  return loggedInUser ? (
    <>
      <GlobalCss />
      <AuthHeader linkTo="/create-contest" btnText="create contest" />
      <Grid className={classes.grid} container alignItems="center" direction="column">
        <Avatar alt="Profile Image" src={info?.userId.profilePic} className={classes.avatar}></Avatar>
        <Typography className={classes.user}>{`${info ? info.firstName : ''} ${info ? info.lastName : ''}`}</Typography>
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
                <Tab label="ABOUT ARTIST" />
                <Tab label="REVIEWS" />
              </Tabs>
            </ThemeProvider>
          </Toolbar>
          <Paper square elevation={2} style={{ marginBottom: '10px' }}>
            <Panel value={value} index={0}>
              <AboutArtistTab info={info} submission={submission} />
            </Panel>
            <Panel value={value} index={1}>
              <ReviewTab artistId={id} />
            </Panel>
          </Paper>
        </Container>
      </Grid>
    </>
  ) : (
    <CircularProgress />
  );
}
