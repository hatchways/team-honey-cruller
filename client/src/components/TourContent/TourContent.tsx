import { useState } from 'react';
import useStyles from './useStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
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
        padding: 50,
      },
    },
    {
      selector: '[data-tour="create-contest-btn"]',
      content: () => tourContent('this is the first step'),
      style: {
        padding: 50,
      },
    },
  ];

  const tourContent = (words: string) => {
    return (
      <Card className={classes.wrapper}>
        <Typography>{words}</Typography>
      </Card>
    );
  };

  return loggedInUser?.username === 'stanleythemanly' ? (
    <Tour steps={steps} isOpen={isTourOpen} onRequestClose={() => setIsTourOpen(false)} />
  ) : (
    <div></div>
  );
};

export default TourContent;
