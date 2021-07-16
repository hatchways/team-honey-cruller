import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    grid: {
        height: '100%',
        width: '100%'
    },
    typography: {
        fontSize: '50px',
        fontWeight: 'bold',
        borderBottom: '2px #DCDCDC',
        borderBottomWidth: '2px',
        borderBottomStyle: 'solid',
        textAlign: 'center'
    },
    paper: {
        width: '50%'
    },
    tableContainer: {
        marginBottom: '50px',
        marginTop: '50px'
    },
    tableHead: {
        width: '100%'
    },
    tableRow: {
        padding: '25px 0px 25px 0px',
        textAlign: 'center'
    },
    button: {
        fontWeight: 'bold',
        backgroundColor: 'black',
        color: 'white',
        padding: '4px 8px',
        marginLeft: '10px'
    }
}))

export default useStyles;