import { useState } from 'react'
import useStyles from './useStyles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

interface Props {
    winningPic: string;
    title: string;
    prizeAmount: string;
    winningArtist: string;
    description: string;
}

const WinnerCard = (props: Props): JSX.Element => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Winning Submission" className={classes.avatar}>BF</Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="Will be props"
                    subheader="more props"
                    className={classes.cardHeader} />
                <CardMedia
                    className={classes.media}
                    image="../../Images/kristian-angelo-xyJZvUL4_TY-unsplash.jpg"
                    title="Winning Submission"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component='p'>More Props here</Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            putting more stuff here 
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </>
    );
};

export default WinnerCard;