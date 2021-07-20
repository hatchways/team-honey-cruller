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
    height: '400px',
    width: '500px'
},
container: {
    justifyContent: 'space-between',
},
typography: {
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '20px 0',
},
cardNum: {
    width: '300px',
    marginBottom: '20px'
},
cardExpiry: {
    width: '150px',
    marginRight: '20px'
},
cardCvc: {
    width: '130px'
},
button: {
    color: '#000000',
    margin: '40px 20px',
    border: '1px solid #000000',
    width: '15rem',
    height: '6rem',
    fontSize: '15px'
},
}))

export default useStyles;