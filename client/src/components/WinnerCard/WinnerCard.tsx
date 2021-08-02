import { useState } from 'react'
import useStyles from './useStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Collapse } from '@material-ui/core';



interface Props {
    winningPic: string;
    title: string;
    prizeAmount: number;
    winningArtist: any;
    description: string;
    key: string;
    time: number;
    useWindowPosition: (id: string) => boolean;
}

const WinnerCard = (props: Props): JSX.Element => {
    const classes = useStyles();

    return (
        <>
        <Collapse in={props.useWindowPosition('header')}  {...( props.useWindowPosition('header') ? { timeout: 500 } : {})}>
                <Card className={classes.root}>
                        <CardMedia
                            className={classes.media}
                            image={props.winningPic}
                            title={props.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h1" className={classes.title}>
                                {props.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                                {props.description}
                            </Typography>
                        </CardContent>
                </Card>
                </Collapse>
        </>
    );
};

export default WinnerCard;