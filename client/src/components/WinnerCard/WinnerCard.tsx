import useStyles from './useStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

interface Props {
  winningPic: string;
  title: string;
  prizeAmount: number;
  winningArtist: any;
  description: string;
  key: string;
  className?: string;
}

const WinnerCard = ({
  winningPic,
  title,
  prizeAmount,
  description,
  key,
  winningArtist,
  className,
}: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardMedia className={classes.media} image={winningPic} title={title} />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h1" className={classes.title}>
            {title}
          </Typography>
          <Typography gutterBottom variant="h5" component="h1" className={classes.title}>
            ${prizeAmount}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default WinnerCard;
