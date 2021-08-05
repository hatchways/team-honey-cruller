import useStyles from './useStyles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tour from 'reactour';
import { useTourContext } from '../../context/tourContext';

interface Props {
  steps: {
    selector: string;
    content: { words: string; theme: string };
    style?: Record<string, unknown>;
    updateDelay?: number;
    nextStep?: () => void;
    scrollDuration?: number;
  }[];
  dontOpen?: boolean;
}

const TourContent = ({ steps, dontOpen }: Props): JSX.Element => {
  const classes = useStyles();
  const { open, setOpen } = useTourContext();

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

  return (
    <Tour
      steps={stepsWithContent}
      showNumber={false}
      isOpen={dontOpen ? false : open}
      onRequestClose={() => setOpen(false)}
    />
  );
};

export default TourContent;
