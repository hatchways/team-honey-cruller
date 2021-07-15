import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { Contest } from '../../interface/User';
import { getAllContests } from '../../helpers/APICalls/contest';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import useStyles from './useStyles';

export default function Discovery(): JSX.Element {
    const [contests, setContests] = useState<Contest[]>([]);
    const { loggedInUser } = useAuth();
    const classes = useStyles();

    useEffect(() => {
        async function getAll() {
            try {
                const allContests = await getAllContests();

                if (allContests.contests) {
                    console.log(allContests.contests)
                    setContests(allContests.contests)
                }
            } catch (err) {
                console.log("No Contests Found")
                new Error("Could Not Get Contests")
            };
        };

        getAll()
    }, []);

    return loggedInUser ? (
        <>

        </>
    ) : (<CircularProgress />)

}
