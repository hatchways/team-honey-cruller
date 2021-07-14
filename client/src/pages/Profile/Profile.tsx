import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import TabPanel from '@material-ui/lab/TabPanel';





export default function Profile(): JSX.Element {
    const classes = useStyles();
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

    // if(loggedInUser){
    return (
        <>
            <Grid className={classes.grid} container direction="column">
                <Avatar alt="Profile Image" src={`https://robohash.org/image.png`} className={classes.profileImg}></Avatar>
                <Typography className={classes.user}> Username here</Typography>
                <Button className={classes.button}>Edit Profile</Button>
                <Container className={classes.container}>
                    <Toolbar className={classes.toolbar}>
                        <ThemeProvider theme={newTheme}>
                            <Tabs className={classes.tabs} textColor="primary">
                                <Tab label="IN PROGRESS" />
                                <Tab label="COMPLETED" />
                            </Tabs>
                        </ThemeProvider>
                    </Toolbar>
                <Paper square elevation={3}>
                    <TabPanel value="0">

                    </TabPanel>
                </Paper>
                </Container>
            </Grid>
        </>
    )
    // } else {
    //     return <CircularProgress />;
    // }
}