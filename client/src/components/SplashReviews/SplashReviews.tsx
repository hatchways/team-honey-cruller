import { useEffect, useState } from 'react';
import clsx from 'clsx';
import SectionHeader from '../SectionHeader/SectionHeader';
import useStyles from './useStyles';
import { Review } from '../../interface/User';
import { getAllReviews } from '../../helpers/APICalls/review';
import { Box } from '@material-ui/core';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import ReviewCarousel from '../ReviewCarousel/ReviewCarousel';

interface Props {
  className?: string;
}

const SplashReviews = ({ className }: Props): JSX.Element => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const classes = useStyles();

  const getReviews = async () => {
    const getAll = await getAllReviews();

    if (getAll) {
      setReviews(getAll);
    } else {
      new Error('Could Not Get Reviews');
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className={classes.wrapper}>
      <SectionHeader title="Customer Reviews" subtitle="Take a look at some of our recent contest creators feedback." />
      <div className={clsx('swiper-container', classes.swiperContainer)}>
        <div className="swiper-wrapper">
          <ReviewCarousel reviews={reviews} text={true} />
        </div>
      </div>
    </div>
  );
};

export default SplashReviews;
