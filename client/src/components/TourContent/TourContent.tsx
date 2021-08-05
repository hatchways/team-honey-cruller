import { useState } from 'react';
import useStyles from './useStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Tour from 'reactour';
import { useAuth } from '../../context/useAuthContext';

const TourContent = (): JSX.Element => {
  const [isTourOpen, setIsTourOpen] = useState<boolean>(true);
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const steps = [
    {
      selector: '[data-tour="nav-btn"]',
      content: () => tourContent('Create a contest here!'),
      style: {
        padding: 20,
        minWidth: '40%',
        maxWidth: '80vw',
      },
    },
    {
      selector: '[data-tour="contests"]',
      content: () => tourContent('Check out our active contests!'),
      style: {
        padding: 20,
        minWidth: '40%',
        maxWidth: '80vw',
      },
    },
  ];

  const tourContent = (words: string) => {
    return (
      <Box display="flex" flexDirection="column" padding="10px 20px">
        <Typography className={classes.tattooArt}>tattoo art</Typography>
        <Card className={classes.wrapper}>
          <Typography>{words}</Typography>
        </Card>
      </Box>
    );
  };

  return loggedInUser?.username === 'stanleythemanly' ? (
    <Tour steps={steps} isOpen={isTourOpen} onRequestClose={() => setIsTourOpen(false)} />
  ) : (
    <div></div>
  );
};

export default TourContent;
