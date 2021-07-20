import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
gridOne: {

},
form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '800px'
},
formGrid: {
    height: '100%',
    width: '50%'
},
paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1.25px solid black',
    height: '320px'
},
typography: {
    fontWeight: 'bold',
    fontSize: '16px'
},

}));

export default useStyles;