import clsx from 'clsx';
import { Typography, Grid } from '@material-ui/core';
import Image from '../Image/Image';
import useStyles from './useStyles';
import ImageModal from '../ImageModal/ImageModal';

interface ViewComponentProps {
  className?: string;
  data?: any;
}

const WinnerCard = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container direction="row">
        {data.map((item: any, index: number) => (
          <Grid item spacing={5} xs={12} sm={6} md={3} className={classes.winnerItem} key={index} data-aos="fade-up">
            <ImageModal
              artistPic={item.winningArtist.profilePic}
              artistName={item.winningArtist.username}
              artistId={item.winningArtist._id}
              image={item.winningPic}
            >
              <div>
                <Image
                  src={item.winningPic}
                  alt={item.title}
                  className={clsx('folio__image', classes.image)}
                  lazy={false}
                />
                <div className={classes.winnerInfoWrapper}>
                  <div>
                    <Typography variant="h6" className={classes.winnerTitle}>
                      {item.title}
                    </Typography>
                    <Typography variant="subtitle1" className={classes.winnerSubtitle}>
                      {item.description}
                    </Typography>
                  </div>
                </div>
              </div>
            </ImageModal>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default WinnerCard;
