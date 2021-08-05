import { useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { submissionByArtist } from '../../interface/User';
import moment from 'moment';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
import useStyles from './useStyles';
import { useState } from 'react';

interface Props {
  submission: submissionByArtist[] | null;
}

const ArtistCarousel = ({ submission }: Props): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = submission !== null && submission.length < 5 ? submission.length : 4;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box display="flex" justifyContent="center">
      <div className={classes.root}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {submission !== null && submission?.length ? (
            submission?.map((submission, index) => (
              <div key={submission._id}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box display="flex" mb={2} justifyContent="center">
                    <Paper elevation={3} className={classes.paper}>
                      <Box
                        display="flex"
                        mb={4}
                        textAlign="center"
                        pt={2}
                        justifyContent="center"
                        mt={4}
                        flexDirection="column"
                      >
                        <Typography className={classes.username}>Artist submitted in the contest titled</Typography>
                        <Typography
                          className={classes.title}
                          variant="h5"
                        >{`"${submission.contest.title}"`}</Typography>
                        <Typography className={classes.date} variant="body1">
                          {moment(submission.created_at).fromNow()}
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                ) : null}
              </div>
            ))
          ) : (
            <Typography style={{ marginTop: '30px', padding: '20px' }} variant="h5">
              This artist does not have any review
            </Typography>
          )}
        </AutoPlaySwipeableViews>
        <MobileStepper
          variant="progress"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.root}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </div>
    </Box>
  );
};

export default ArtistCarousel;
