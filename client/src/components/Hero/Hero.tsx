import useStyles from './useStyles';
import Button from '@material-ui/core/Button';
import HeroShaped from './HeroShaped/HeroShaped';
import SectionHeader from '../SectionHeader/SectionHeader';
import Image from '../Image/Image';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';

import HeroImg from '../../Images/heroImg.jpg';

interface Props {
  className?: string;
}

const Hero = ({ className }: Props): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();

  return (
    <div className={className}>
      <HeroShaped
        leftSide={
          <div>
            <SectionHeader
              title={
                <span>
                  <Typography component="span" variant="inherit" color="primary">
                    Tattoo Art
                  </Typography>
                </span>
              }
              subtitle="Premier tattoo designs created by artists all over the world."
              ctaGroup={[
                loggedInUser ? (
                  <Button
                    component={Link}
                    to="create-contest"
                    key="button"
                    variant="contained"
                    color="primary"
                    size="large"
                    data-tour="start-contest"
                  >
                    Start Contest
                  </Button>
                ) : (
                  <Button key="button" variant="contained" color="primary" size="large">
                    Start Contest
                  </Button>
                ),
              ]}
              align="left"
              titleVariant="h3"
              className={classes.sectionHeader}
            />
          </div>
        }
        rightSide={
          <Image
            src={HeroImg}
            srcSet={HeroImg}
            alt="..."
            className={classes.image}
            lazyProps={{
              width: '100%',
              height: '100%',
            }}
          />
        }
      />
    </div>
  );
};

export default Hero;
