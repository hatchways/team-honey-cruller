import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    list: {
        overflow: 'auto',
        height: '40rem'
    },
    avatar: {
        margin: '32px',
        height: theme.spacing(40),
        width: theme.spacing(40)
    },
    grid: {
        marginLeft: '32px',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    typography: {
        fontWeight: 'bold',
        fontSize: '22px'
    },
    container: {
        height: 'auto',
        marginTop: '32px',
        color: '#3A8DFF'
    },
    button: {
        fontWeight: 'bold',
        backgroundColor: 'black',
        color: 'white',
        padding: '8px 16px',
        marginLeft: '-20px'
    }

}));

export default useStyles;
