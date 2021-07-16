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
        
    },
    tableHead: {
        width: '100%'
    },
    tableRow: {
        padding: '25px'
    }
}))

export default useStyles;