import { useState, useEffect } from 'react';
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import ImageList from '@material-ui/core/ImageList';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SubmittedDesigns from '../../components/SubmittedDesigns/SubmittedDesigns';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import ProfilePic from '../../Images/profilePic.png';
import { Contest, Submission } from '../../interface/User';
import { getContestById } from '../../helpers/APICalls/contest';
import { getContestSubmissions } from '../../helpers/APICalls/submission';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link, useParams } from 'react-router-dom';
import { useSnackBar } from '../../context/useSnackbarContext';

import { withStyles } from '@material-ui/core/styles';

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
    'li.MuiImageListItem-root': {
      height: '250px !important',
      overflowY: 'hidden',
    },
    '.MuiImageListItemBar-root': {
      background: 'none',
    },
    'ul.li.MuiImageListItem-item': {
      padding: 0,
      height: '250px !important',
    },
    '.MuiImageListItemBar-titleWrap': {
      color: '#333',
      marginTop: '12px',
    },
    '.MuiImageListItemBar-title': {
      fontSize: '15px',
      fontWeight: 'bolder',
      textDecoration: 'underline',
    },
    '.MuiImageListItem-imgFullHeight': {
      opacity: '0.8',
    },
  },
})(() => null);

export default function ContestPage(): JSX.Element {
  const { id } = useParams() as { id: string };
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { updateSnackBarMessage } = useSnackBar();
  const [contestSubmissions, setContestSubmissions] = useState<Submission[]>([]);
  const [contest, setContest] = useState<Contest>();
  const { loggedInUser } = useAuth();

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
    async function getUserContestSubmissions() {
      try {
        const submissions = await getContestSubmissions(id);
        if (submissions) {
          setContestSubmissions(submissions);
        } else {
          setContestSubmissions([]);
        }
      } catch (err) {
        updateSnackBarMessage(err.message);
      }
    }
    if (loggedInUser) {
      getUserContestSubmissions();
    }
  }, [loggedInUser, id, updateSnackBarMessage]);

  useEffect(() => {
    async function getContest() {
      try {
        const data = await getContestById(id);
        if (data) {
          setContest(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getContest();
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
      <CssBaseline />
      <GlobalCss />
      <AuthHeader linkTo={`/create-contest`} btnText="create contest" />
      <Container className={classes.container}>
        <Grid className={classes.grid} container style={{ marginBottom: '35px' }}>
          <Grid item>
            <Typography>
              {/* should be redirected to all the contests page*/}
              <Link to="/discovery" className={classes.greyText}>
                <ArrowBackIosIcon className={classes.backIcon} />
                Back to contests list
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Grid className={classes.grid} container>
          <Grid item xs={12} sm={10}>
            <Typography className={classes.contestTitle}>
              {contest ? contest.title : 'Lion tattoo concept in minimal style'}{' '}
              <Button className={classes.prizeAmount}>
                <Typography className={classes.prize}>{contest ? contest.prizeAmount : '$150'}</Typography>
              </Button>
            </Typography>
            <Grid direction="row" className={classes.grid} container>
              <Grid item>
                <Avatar alt="Profile Image" src={ProfilePic} className={classes.avatar}></Avatar>
              </Grid>
              <Grid item>
                <Typography className={classes.user}>
                  By <span className={classes.username}>{loggedInUser.username}</span>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={2} justifyContent="center" alignItems="center">
            <Link to={`/submit-design/${id}`} style={{ textDecoration: 'none' }}>
              <Button variant="outlined" size="large" className={classes.button}>
                submit design
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container direction="column" className={classes.designGrid}>
          <Toolbar className={classes.toolbar}>
            <ThemeProvider theme={newTheme}>
              <Tabs
                className={classes.tabs}
                value={value}
                onChange={handleChange}
                textColor="primary"
                variant="fullWidth"
                TabIndicatorProps={{
                  style: {
                    height: 5,
                  },
                }}
              >
                {contestSubmissions.length && (
                  <Tab label={contest ? `DESIGNS (${contest.images.length})` : `DESIGNS (30)`} />
                )}
                <Tab label="BRIEF" />
              </Tabs>
            </ThemeProvider>
          </Toolbar>
          <Paper elevation={2} style={{ width: '100%' }}>
            <Panel value={value} index={0}>
              <Box textAlign="center">
                <ImageList
                  cols={4}
                  gap={10}
                  style={{ marginTop: '40px', marginBottom: '20px' }}
                  className={classes.imageList}
                >
                  {contestSubmissions.length &&
                    contestSubmissions.map((submission) => (
                      <SubmittedDesigns
                        key={submission._id}
                        images={submission.images}
                        artist={submission.artistName}
                      />
                    ))}
                </ImageList>
              </Box>
            </Panel>
            <Panel value={value} index={1}>
              <Typography style={{ height: '200px', marginTop: '40px' }}>
                {contest ? contest.description : 'Description of the contest'}
              </Typography>
            </Panel>
          </Paper>
        </Grid>
      </Container>
    </>
  ) : (
    <CircularProgress />
  );
}
