import { useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar"
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Toolbar from '@material-ui/core/Toolbar';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import ContestList from '../../components/ContestList/ContestList'
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import ProfilePic from '../../Images/profilePic.png';



export default function Profile(): JSX.Element {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const { loggedInUser } = useAuth();

    const newTheme = createMuiTheme({
        palette: {
            primary: {
                main: '#000000',
            },
            secondary: {
                main: '#3d3d3d'
            }
        }
    })

    interface TabPanelProps {
        direction?: string;
        value: number;
        children: React.ReactNode;
        index: number;
    }

    const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, valueChange: number) => {
        setValue(valueChange);
    }

    const Panel = function (props: TabPanelProps) {

        return (
            <div
                role="tabpanel"
                id={`${props.index}`}
                >
                {value === props.index && (
                    <Container >
                        <Typography>{props.children}</Typography>
                    </Container>
                )}
            </div>
        );
    }



    // if(loggedInUser){
    return (
        <>
            <AuthHeader linkTo="/signup" btnText="sign up" />
            <Grid className={classes.grid} container alignItems="center" direction="column">
                <Avatar alt="Profile Image" src={ProfilePic} className={classes.avatar}></Avatar>
                <Typography className={classes.user}>Kenneth Stewart</Typography>
                <Button className={classes.button}>Edit Profile</Button>
                <Container className={classes.container}>
                    <Toolbar className={classes.toolbar}>
                        <ThemeProvider theme={newTheme}>
                            <Tabs className={classes.tabs} value={value} onChange={handleChange} textColor="primary" variant="fullWidth">
                                <Tab label="IN PROGRESS" />
                                <Tab label="COMPLETED" />
                            </Tabs>
                        </ThemeProvider>
                    </Toolbar>
                    <Paper square elevation={3}>
                        <Panel value={value} index={0}>
                            <ContestList />
                        </Panel>
                        <Panel value={value} index={1}>
                            <ContestList />
                        </Panel>
                    </Paper>
                </Container>
            </Grid>
        </>
    )
    // } else {
    //     return <CircularProgress />;
    // }
}