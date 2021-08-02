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
    [x: string]: any;
}

const WinnerCard = ({ winningPic, title, prizeAmount, description, key, winningArtist, className }: Props): JSX.Element => {
    const classes = useStyles();

    return (
        <>
            <Grid container spacing={2}>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    image={winningPic}
                    title={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h1" className={classes.title}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                        {description}
                    </Typography>
                </CardContent>
            </Card>
            </Grid>
        </>
    );
};

export default WinnerCard;