import SectionHeader from '../SectionHeader/SectionHeader';
import CardBase from '../CardBase/CardBase';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './useStyles';

interface ViewComponentProps {
    className?: string;
    data?: any;
    themeMode?: string;
    // All other props
    [x: string]: any;
}

const About = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
    const classes = useStyles();
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    return (
        <div className={className} {...rest}>
            <Grid container spacing={isMd ? 4 : 2}>
                <Grid item container alignItems="center" xs={12} md={6}>
                    <SectionHeader
                        title={
                            <span className={classes.textWhite}>
                                Customer Reviews
                            </span>
                        }
                        // subtitle={
                        //     <span className={classes.textWhite}>
                        //     Customer Testimonial
                        //     </span>
                        // }
                        // subtitleVariant="body1"
                        // data-aos="fade-up"
                        // align="left"
                        // ctaGroup={[
                        //     <Button key='button' variant="contained" size="large">
                        //         Start Contest
                        //     </Button>,
                        // ]}
                    />
                </Grid>
                <Grid
                    item
                    container
                    justify={isMd ? 'flex-start' : 'center'}
                    xs={12}
                    md={6}
                >
                    <CardBase withShadow liftUp align="left" className={classes.card}>
                        <>
                            <Typography className={classes.cardTitle} variant="h6">
                                Tattoo Arts Designers gave me a plethora of options from a diverse collection of artists. I appreciate the time that was spent on the designs that were submitted.
                            </Typography>
                            <List disablePadding>
                                <ListItem disableGutters>
                                    <ListItemAvatar className={classes.listItemAvatar}>
                                        <Avatar
                                            src="https://assets.maccarianagency.com/the-front/photos/people/jack-smith.jpg"
                                            srcSet="https://assets.maccarianagency.com/the-front/photos/people/jack-smith@2x.jpg 2x"
                                            alt="Tyler Bolty"
                                            className={classes.avatar}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Tyler Bolty"
                                        secondary="Full Stack Developer at Wayne Enterprises."
                                    />
                                </ListItem>
                            </List>
                        </>
                    </CardBase>
                </Grid>
            </Grid>
        </div>
    );
};

export default About;