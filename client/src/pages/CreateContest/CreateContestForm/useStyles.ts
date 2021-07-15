import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: theme.spacing(1),
  },
  textField: {
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
  },
  inputs: {

  },
  box: {
    width: '65%',
  },
  submit: {
    padding: 10,
    width: 200,
    borderRadius: 5,
    height: 60,
    fontSize: 14,
  },
  imageList: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: 450,
    border: '0.5px solid #DDDDDD',
    borderRadius: 5,
    padding: '20px',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'black',
    }
  },
  images: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '20px',
  },
  img: {
    width: 150,
    height: 150,
  },
}));

export default useStyles;