import { useState, useEffect, ChangeEvent } from 'react';
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from '@material-ui/core/Toolbar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ContestList from '../../components/ContestList/ContestList';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { Contest } from '../../interface/User';
import { getContestByUser } from '../../helpers/APICalls/contest';
import updateProfile from '../../helpers/APICalls/profile';

interface SelectedFile {
  lastModified: number;
  name: string;
  size: number;
  type: string;
}

export default function Profile(): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [contests, setContests] = useState<Contest[]>([]);
  const [selectedFile, setSelectedFile] = useState<SelectedFile>();
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
    async function getUserContests() {
      const userContests = await getContestByUser();
      if (userContests.contests) {
        setContests(userContests.contests);
      } else {
        new Error('Could Not Get Contests');
      }
    }
    getUserContests();
  }, []);

  // create function to figure out if a contest is still active
  const isActive = () => {
    if (contests) {
      const filter = contests.filter((contest) => new Date() < new Date(contest.deadlineDate));

      return filter;
    }

    return contests;
  };

  //create a function to figure out if a contest is no longer active
  const isComplete = () => {
    if (contests) {
      const filter = contests.filter((contest) => new Date() > new Date(contest.deadlineDate));

      return filter;
    }

    return contests;
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

  const getFileFromInput = (file: File): Promise<any> => {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.readAsBinaryString(file); // here the file can be read in different way Text, DataUrl, ArrayBuffer
    });
  };

  const manageUploadedFile = (binary: string, file: File) => {
    // do what you need with your file (fetch POST, ect ....)
    updateProfile(file);
    // console.log(`The file size is ${binary.length}`);
    // console.log(`The file name is ${file.name}`);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    if (event.target.files) {
      getFileFromInput(event.target.files[0])
        .then((binary) => {
          if (event.target.files) {
            manageUploadedFile(binary, event.target.files[0]);
          }
        })
        .catch(function (reason) {
          console.log(`Error during upload ${reason}`);
          event.target.value = ''; // to allow upload of same file if error occurs
        });
    }
  };

  return loggedInUser ? (
    <>
      <AuthHeader linkTo="/createcontest" btnText="create contest" />
      <Grid className={classes.grid} container alignItems="center" direction="column">
        <Avatar alt="Profile Image" src={loggedInUser.profilePic} className={classes.avatar}></Avatar>
        <Typography className={classes.user}>{loggedInUser.username}</Typography>
        <Box>
          <Button className={classes.button}>Edit Profile</Button>
          {selectedFile ? (
            <Button className={classes.button}>Submit Profile Pic</Button>
          ) : (
            <>
              <Button className={classes.button}>
                <label htmlFor="file" className={classes.fileInputLabel}>
                  Choose New Pic
                  <input
                    type="file"
                    accept="image/*"
                    id="file"
                    multiple={false}
                    onChange={handleFileChange}
                    className={classes.fileInput}
                  />
                </label>
              </Button>
            </>
          )}
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
                <Tab label="IN PROGRESS" />
                <Tab label="COMPLETED" />
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
          </Paper>
        </Container>
      </Grid>
    </>
  ) : (
    <CircularProgress />
  );
}
