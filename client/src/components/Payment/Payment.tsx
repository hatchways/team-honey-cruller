import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Customer } from '../../interface/User';
import { createStripeUser } from '../../helpers/APICalls/stripe'
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles'

interface Props {
    customer?: Customer;
}

export default function Payment(): JSX.Element {
    const stripe = useStripe();
    const elements = useElements();
    const classes = useStyles();
    const { loggedInUser } = useAuth();

    console.log(loggedInUser);
    console.log(stripe);
    console.log(elements);

    const addCard = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
            try {
                // const createCustomer = await createStripeUser()
            }catch (err) {

            }
    }

    return (
        <>
            <Grid container className={classes.gridOne} justifyContent="center">
                <form className={classes.form}>
                    <Grid container className={classes.formGrid}>
                        <Grid className={classes.paper}>
                            <Container className={classes.container}>
                                <Typography className={classes.typography}>
                                    Enter your card details:
                                </Typography>
                                <TextField className={classes.cardNum} id="outlined-basic" label="Card number" placeholder="0000 0000 0000 0000" variant="outlined" />
                                <TextField className={classes.cardExpiry} id="outlined-basic" label="Card expiry" placeholder="MM/YY" variant="outlined" />
                                <TextField className={classes.cardCvc} id="outlined-basic" label="CVC" placeholder="123" variant="outlined" />
                            </Container>
                            <Button className={classes.button}>Add Card</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </>
    )
}