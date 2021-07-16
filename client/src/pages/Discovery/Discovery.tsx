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
                if (allContests) {
                    // setContests(allContests)
                }
            } catch (err) {
                console.log("No Contests Found")
                new Error("Could Not Get Contests")
            };
        };

        getAll()
    }, []);

    const columns: Column[] = [
        { id: 'Contest Title', label: 'Contest Title', minWidth: 50 },
        { id: 'Contest Description', label: 'Contest Description', minWidth: 50 },
        {
            id: 'Prize Amount',
            label: 'Prize Amount',
            minWidth: 50,
            align: 'right',
        },
        {
            id: 'Deadline Date',
            label: 'Deadline Date',
            minWidth: 50,
            align: 'right',
        },
        {
            id: 'More Info',
            label: 'More Info',
            minWidth: 50,
            align: 'right',
        },
    ];

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <AuthHeader linkTo="/createcontest" btnText="create contest" />
            <Grid container justify="center" className={classes.grid}>
                <Container>
                    <Grid item>
                        <Typography className={classes.typography}>All Contests</Typography>
                    </Grid>
                </Container>

                <Paper className={classes.paper}>
                    <TableContainer className={classes.tableContainer}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow className={classes.tableHead}>
                                    <TableCell className={classes.tableRow} key={columns[0].id} align={columns[0].align} style={{ minWidth: columns[0].minWidth }}>
                                        {columns[0].label}
                                    </TableCell>
                                    <TableCell className={classes.tableRow} key={columns[1].id} align={columns[1].align} style={{ minWidth: columns[1].minWidth }}>
                                        {columns[1].label}
                                    </TableCell>
                                    <TableCell className={classes.tableRow} key={columns[2].id} align={columns[2].align} style={{ minWidth: columns[2].minWidth }}>
                                        {columns[2].label}
                                    </TableCell>
                                    <TableCell className={classes.tableRow} key={columns[3].id} align={columns[3].align} style={{ minWidth: columns[3].minWidth }}>
                                        {columns[3].label}
                                    </TableCell>
                                    <TableCell className={classes.tableRow} key={columns[4].id} align={columns[4].align} style={{ minWidth: columns[4].minWidth }}>
                                        {columns[4].label}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {contests.map(contest => {
                                    return (
                                        console.log(contest)
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </>
    )

}

