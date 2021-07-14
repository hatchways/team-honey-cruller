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
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Profile(): JSX.Element {
    const classes = useStyles();
    const { loggedInUser } = useAuth()

    // if(loggedInUser){
        return (
            <>
            <Grid className={classes.grid} container direction="column">
            <Avatar alt="Profile Image" src={`https://robohash.org/image.png`} className={classes.profileImg}></Avatar>
            <Typography className={classes.user}> Username here</Typography>
            <Button className={classes.button}>Edit Profile</Button>
            
            </Grid>
            </>
        )
    // } else {
    //     return <CircularProgress />;
    // }
}