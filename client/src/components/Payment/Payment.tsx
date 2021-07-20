import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Customer } from '../../interface/User';
import useStyles from './useStyles'

interface Props {
    customer?: Customer;
}

export default function Payment(): JSX.Element {
    const stripe = useStripe();
    const elements = useElements();
    const classes = useStyles();

    return (
        <>
            <Grid container className={classes.gridOne} justify="center">
                <form className={classes.form}>
                    <Grid container className={classes.formGrid}>
                        <Paper className={classes.paper}>
                            <Typography className={classes.typography}>
                                Enter your card details
                            </Typography>
                        </Paper>
                    </Grid>
                </form>
            </Grid>
        </>
    )
}