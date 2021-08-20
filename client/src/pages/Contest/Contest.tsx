import { useState, useEffect } from 'react';
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SubmittedDesigns from '../../components/SubmittedDesigns/SubmittedDesigns';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import ImageModal from '../../components/ImageModal/ImageModal';
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
      overflowY: 'hidden',
    },
    'ul.li.MuiImageListItem-item': {
      padding: 0,
    },
    '.MuiImageListItemBar-titleWrap': {
      color: '#333',
      marginTop: '12px',
    },
    '.MuiImageListItemBar-title': {
      fontSize: '15px',
      fontWeight: 'bolder',
      textDecoration: 'underline',
      color: 'white',
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
    async function getUserContestSubmissions() {
      try {
        const submissions = await getContestSubmissions(id);
        if (submissions) {
          setContestSubmissions(submissions);
        } else {
          setContestSubmissions([]);
        }
      } catch (err: any) {
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

  return (
    <>
      <CssBaseline />
      <GlobalCss />
      <AuthHeader
        linkTo={loggedInUser ? `/create-contest` : '/login'}
        btnText={loggedInUser ? 'create contest' : 'login'}
      />
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
              {contest ? contest.title : ''}
              <Button className={classes.prizeAmount}>
                <Typography className={classes.prize}>${contest ? contest.prizeAmount : '0'}</Typography>
              </Button>
            </Typography>
            <Grid direction="row" className={classes.grid} container alignItems="center">
              <Grid item>
                <Link to={{ pathname: '/artist', state: `${contest?.userId}` }}>
                  <Avatar
                    src={contest && (contest.ownerProfilePic || `https://robohash.org/${contest.ownerName}.png`)}
                    className={classes.avatar}
                  ></Avatar>
                </Link>
              </Grid>
              <Grid item>
                <Typography className={classes.user}>
                  By <span className={classes.username}>{contest ? contest.ownerName : ''}</span>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={2}>
            {loggedInUser?.id === contest?.userId || !loggedInUser ? (
              <Button variant="outlined" size="large" className={classes.button} disabled>
                submit design
              </Button>
            ) : (
              <Link to={`/submit-design/${id}`} style={{ textDecoration: 'none' }}>
                <Button variant="outlined" size="large" className={classes.button}>
                  submit design
                </Button>
              </Link>
            )}
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
                  <Tab label={contest && contest.images ? `DESIGNS (${contest.images.length})` : `DESIGNS (30)`} />
                )}
                <Tab label="BRIEF" />
              </Tabs>
            </ThemeProvider>
          </Toolbar>
          <Paper elevation={2}>
            {contestSubmissions.length ? (
              <Panel value={value} index={0}>
                <div className={classes.imageWrapper}>
                  <ImageList cols={4} gap={3} className={classes.imageList}>
                    {contestSubmissions.map((submission) => (
                      <SubmittedDesigns
                        key={submission._id}
                        images={submission.images}
                        artistPic={submission.artistPic}
                        artistName={submission.artistName}
                        submissionId={submission._id}
                        artistId={submission.artistId}
                      />
                    ))}
                  </ImageList>
                </div>
              </Panel>
            ) : null}
            <Panel value={value} index={contestSubmissions.length ? 1 : 0}>
              <Typography align="center" variant="h3" className={classes.descriptionHeader}>
                Tattoo Description:
              </Typography>
              <Typography align="center" variant="h5">
                {contest ? contest.description : ''}
              </Typography>
              <ImageList cols={4} gap={10} className={classes.imageList}>
                {contest && contest.images
                  ? contest.images.map((image) => (
                      <ImageListItem cols={1} key={image} className={classes.listItem}>
                        <ImageModal image={image}>
                          <img
                            srcSet={`${image}?w=248&fit=crop&auto=format 1x,
                          ${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={`${image} inspiration`}
                            loading="lazy"
                            className={classes.image}
                          />
                        </ImageModal>
                      </ImageListItem>
                    ))
                  : null}
              </ImageList>
            </Panel>
          </Paper>
        </Grid>
      </Container>
    </>
  );
}
