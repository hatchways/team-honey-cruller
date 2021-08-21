import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { addCardToCustomer } from '../../helpers/APICalls/stripe';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import useStyles from './useStyles';

export default function Payment(): JSX.Element {
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    if (loggedInUser && cardElement) {
      stripe
        .createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: loggedInUser.username,
          },
        })
        .then((result) => {
          if (result.paymentMethod) {
            const cardId = result.paymentMethod.id;
            const stripeId = loggedInUser.stripeId;
            addCardToCustomer(cardId, stripeId);
            updateSnackBarMessage('Card has been added to your account.');
          } else {
            updateSnackBarMessage('Card could not be added');
          }
        });
    }
  };

  return (
    <>
      <Grid container justifyContent="center">
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container className={classes.formGrid}>
            <Box className={classes.paper}>
              <Container className={classes.container}>
                <Typography className={classes.typography}>Enter your card details:</Typography>
                <Box maxWidth="100%">
                  <CardNumberElement
                    className={classes.cardNum}
                    id="outlined-basic"
                    options={{
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
                      },
                    }}
                  />
                  <Box display="flex" flex-direction="row">
                    <CardExpiryElement className={classes.cardExpiry} id="outlined-basic"></CardExpiryElement>
                    <CardCvcElement className={classes.cardCvc} id="outlined-basic"></CardCvcElement>
                  </Box>
                </Box>
              </Container>
              <Button type="submit" className={classes.button}>
                Add Card
              </Button>
            </Box>
          </Grid>
        </form>
      </Grid>
    </>
  );
}
