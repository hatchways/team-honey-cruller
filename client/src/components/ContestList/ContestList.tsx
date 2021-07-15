import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import useStyles from './useStyles';
import { Contest } from '../../interface/User';
import LionTatoo from "../../Images/lionTatoo.png";

interface Props {
    userContests: Contest[];
}

export default function ContestList({ userContests }: Props): JSX.Element {
    const classes = useStyles();

    return (
        <>
            {/* Write ternary operator checking to see if any data has been recieved, otherwise return default message */}
            {userContests.length > 0 ? (

                <List className={classes.list}>
                    {/* map through given data and alter the return inside of the map */}
                    {userContests.map(contest => {
                        return (
                            <ListItem key={contest.userId}>
                                <Avatar className={classes.avatar} alt="Test Contest Image" variant="square" src={LionTatoo} />
                                <Grid className={classes.grid} container >
                                    <ListItemText
                                        primary={
                                            <>
                                                <Typography className={classes.typography}>{contest.title}</Typography>
                                            </>
                                        }
                                        secondary={
                                            <>
                                                <Typography>{contest.description}</Typography>
                                                <Container className={classes.container}>
                                                    <Button className={classes.button}>{contest.prizeAmount}</Button>
                                                </Container>
                                            </>
                                        }
                                    />
                                </Grid>
                            </ListItem>
                        )
                    })}
                </List>

            ) : (<Typography> None Available </Typography>)}

        </>
    )
}