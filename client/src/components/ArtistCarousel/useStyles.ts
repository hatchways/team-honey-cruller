import { makeStyles } from '@material-ui/core/styles';
import review from '../../Images/review.jpeg';

const useStyles = makeStyles((theme) => ({
  carousel : {
     width: 500,
     height: 300,
     marginTop: 20,
     marginBottom: 40,
     backgroundImage: `url(${review})`,
     borderRadius: '3%',
     fontWeight: 'bold'
  }
}));

export default useStyles;
