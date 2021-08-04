import useStyles from './useStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

interface Props {
  content: string;
}

const TourContent = ({ content }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Card className={classes.wrapper}>
      <Typography>{content}</Typography>
    </Card>
  );
};

export default TourContent;
