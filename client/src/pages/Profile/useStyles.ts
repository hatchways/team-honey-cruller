import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    grid: {
        width: '100%',
        height: '100%'
    },

    profileImg: {
        height: 'auto', 
        width: theme.spacing(25),
        marginBottom: '16px',
        marginTop: '64px'
    },

    user: {
        fontSize: 24
    },

    button: {
        color: 'black',
        margin: '32px',
        border: '1px solid #DCDCDC',
        width: '120px',
        height: '50px'
    }


}))

export default useStyles;