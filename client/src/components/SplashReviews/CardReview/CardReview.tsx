import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CardBase from '../../CardBase/CardBase';
import useStyles from './useStyles';

interface Props {
    className?: string;
    icon: JSX.Element;
    text: string;
    reviewerPhoto: string;
    reviewerName: string;
    reviewerTitle?: string;
    align?: 'left' | 'right' | 'center';
    textVariant?: 'inherit' | 'button' | 'overline' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'srOnly' | undefined;
    [x: string]: any;
}

const CardReview = ({
    icon,
    text,
    reviewerPhoto,
    reviewerName,
    reviewerTitle,
    align = 'center',
    textVariant = 'h6',
    className
}: Props): JSX.Element => {
    const classes = useStyles();

    let justifyGrid: ('center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | undefined) = 'center';
    if (align === 'left') {
        justifyGrid = 'flex-start';
    } else if (align === 'right') {
        justifyGrid = 'flex-end';
    }

    return (
        <CardBase
            className={clsx('card-review', classes.root, className)}
        >
            <Grid container spacing={2} className="card-review__wrapper">
                <Grid
                    item
                    container
                    justifyContent={justifyGrid}
                    xs={12}
                    className="card-review__icon-wrapper"
                >
                    {icon}
                </Grid>
                <Grid item xs={12} className="card-review__text-wrapper">
                    <Typography
                        variant={textVariant}
                        align={align}
                        component="p"
                    >
                        {text}
                    </Typography>
                </Grid>
                <Grid item xs={12} className="card-review__lits-container">
                    <Grid
                        container
                        justifyContent={justifyGrid}
                        className="card-review__list-wrapper"
                    >
                        <List disablePadding className="card-review__list">
                            <ListItem className="card-review__list-item">
                                <ListItemAvatar className="card-review__list-item-avatar">
                                    <Avatar
                                        src={reviewerPhoto}
                                        alt={reviewerName}
                                        className="card-review__avatar"
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    className="card-review__list-item-text"
                                    primary={reviewerName}
                                    secondary={reviewerTitle}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </CardBase>
    );
};

export default CardReview;