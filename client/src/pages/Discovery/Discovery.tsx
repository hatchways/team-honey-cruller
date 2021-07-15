import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { Contest } from '../../interface/User';
import { Column } from '../../interface/Discovery';
import { getAllContests } from '../../helpers/APICalls/contest';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import useStyles from './useStyles';

export default function Discovery(): JSX.Element {
    const [contests, setContests] = useState<Contest[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10)
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

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return loggedInUser ? (
        <>
            <AuthHeader linkTo="/createcontest" btnText="create contest" />
            <Grid container justify="center" className={classes.grid}>
                <Container>
                    <Grid item>
                        <Typography className={classes.typography}>All Contests</Typography>
                    </Grid>
                </Container>
            <Paper className={classes.paper}>
                <TableContainer classname={classes.tableContainer}>
                    
                </TableContainer>
            </Paper>

            </Grid>
        </>
    ) : (<CircularProgress />)

}
