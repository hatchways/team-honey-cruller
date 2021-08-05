import { useState } from 'react';
import useStyles from './useStyles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tour from 'reactour';
import { useAuth } from '../../context/useAuthContext';

interface Props {
  steps: {
    selector: string;
    content: { words: string; theme: string };
    style?: Record<string, unknown>;
    updateDelay?: number;
    nextStep?: () => void;
    scrollDuration?: number;
  }[];
}

const TourContent = ({ steps }: Props): JSX.Element => {
  const [isTourOpen, setIsTourOpen] = useState<boolean>(true);
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  // const steps = [
  //   {
  //     selector: '[data-tour="start-contest"]',
  //     content: () => tourContent('You can create a contest here!', 'primary'),
  //     style: {
  //       padding: 20,
  //       minWidth: '40%',
  //       maxWidth: '80vw',
  //     },
  //     updateDelay: 2,
  //   },
  //   {
  //     selector: '[data-tour="contests"]',
  //     content: () => tourContent('Check out our active contests here!', 'secondary'),
  //     style: {
  //       padding: 20,
  //       minWidth: '40%',
  //       maxWidth: '80vw',
  //       backgroundColor: 'black',
  //     },
  //     scrollDuration: 1500,
  //     nextStep: () => history.push('/profile'),
  //   },
  //   {
  //     selector: '[data-tour="profile"]',
  //     // action: () => history.push('/profile'),
  //     content: (): JSX.Element =>
  //       tourContent(
  //         `Here you can see your active contests, choose a winner and see all your past winners. Click on an image to view full size! \n (don't forget to upload a profile pic)`,
  //         'secondary',
  //       ),
  //     style: {
  //       padding: 20,
  //       minWidth: '40%',
  //       maxWidth: '80vw',
  //       backgroundColor: 'black',
  //     },
  //   },
  // {
  //   selector: '[data-tour="messaging"]',
  //   action: () => history.push('/dashboard'),
  //   content: () => tourContent(`Message anyone on our platform to hear more about their tattoo ideas.`, 'secondary'),
  //   style: {
  //     padding: 20,
  //     minWidth: '40%',
  //     maxWidth: '80vw',
  //     backgroundColor: 'black',
  //   },
  // },
  // {
  //   selector: '[data-tour="payment"]',
  //   action: () => history.push('/settings'),
  //   content: () =>
  //     tourContent(`Don't forget to add your credit card information before you create a contest.`, 'secondary'),
  //   style: {
  //     padding: 20,
  //     minWidth: '40%',
  //     maxWidth: '80vw',
  //     backgroundColor: 'black',
  //   },
  // },
  // ];

  const tourContent = (words: string, theme: string) => {
    return (
      <Box display="flex" flexDirection="column" padding="10px 20px">
        <Typography color={theme === 'primary' ? 'primary' : 'secondary'} className={classes.tattooArt}>
          tattoo art
        </Typography>
        <Card className={classes.wrapper} style={{ backgroundColor: theme === 'primary' ? 'black' : 'white' }}>
          <Typography color={theme === 'primary' ? 'secondary' : 'primary'}>{words}</Typography>
        </Card>
      </Box>
    );
  };

  const stepsWithContent = steps.map((step) => ({
    ...step,
    content: tourContent(step.content.words, step.content.theme),
  }));

  return loggedInUser?.username === 'stanleythemanly' ? (
    <Tour steps={stepsWithContent} isOpen={isTourOpen} onRequestClose={() => setIsTourOpen(false)} />
  ) : (
    <div></div>
  );
};

export default TourContent;
