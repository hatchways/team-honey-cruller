import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { Customer } from '../../interface/User';
import { addCardToCustomer } from '../../helpers/APICalls/stripe'
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles'

export default function Payment(): JSX.Element {
    const stripe = useStripe();
    const elements = useElements();
    const classes = useStyles();
    const { loggedInUser } = useAuth();
    const [message, setMessage] = useState('')
    console.log(loggedInUser);
    console.log(stripe);
    console.log(elements);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardNumberElement);
        console.log(cardElement)
        // Use your card Element with other Stripe.js APIs
        if(loggedInUser){
            const addCard = await addCardToCustomer(cardElement,loggedInUser.stripeId);
            console.log(addCard)
            setMessage('Credit Card has been added to your account.')
        }

        // if (error) {
        //     console.log('[error]', error);
        // } else {
        //     console.log('[PaymentMethod]', paymentMethod);
        // }
    };

    return (
        <>
            <Grid container justifyContent="center">
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container className={classes.formGrid}>
                        <Grid className={classes.paper}>
                            <Container className={classes.container}>
                                <Typography className={classes.typography}>
                                    Enter your card details:
                                </Typography>
                                <CardNumberElement className={classes.cardNum} id="outlined-basic" options={{
                                    iconStyle: 'solid',
                                    style: {
                                        base: {
                                            color: 'black',
                                            fontSize: '16px',
                                            iconColor: '#fff',
                                        },
                                        invalid: {
                                            iconColor: 'red',
                                            color: 'red',
                                        },
                                        complete: {
                                            iconColor: '#cbf4c9',
                                        },
                                    }
                                }}
                                />
                                <Box className={classes.div}>
                                    <CardExpiryElement className={classes.cardExpiry} id="outlined-basic"></CardExpiryElement>
                                    <CardCvcElement className={classes.cardCvc} id="outlined-basic"></CardCvcElement>
                                </Box>
                            </Container>
                            <Button type='submit' className={classes.button}>Add Card</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </>
    )
}