import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #000000',
    borderRadius: '5px'
},
cardExpiry: {
    width: '150px',
    border: '1px solid #000000',
    marginRight: '20px',
    padding: '10px',
    borderRadius: '5px'
},
cardCvc: {
    width: '110px',
    border: '1px solid #000000',
    padding: '10px',
    borderRadius: '5px'
},
button: {
    color: '#000000',
    margin: '40px 20px',
    border: '1px solid #000000',
    width: '15rem',
    height: '6rem',
    fontSize: '15px'
},
div: {
    display: 'flex',
    flexDirection: 'row'
}
}))

export default useStyles;