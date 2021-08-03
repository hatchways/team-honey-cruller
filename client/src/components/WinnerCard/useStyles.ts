import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
root: {
    maxWidth: 645,
    width: '400px',
    background: 'black',
    margin: '20px'
},
media: {
    height: 440
},
title: {
    fontWeight: 'bold',
    fontSize: '2rem',
    color: 'black'
},
description: {
    fontSize: '1.1rem',
    color: 'black'
},
cardContent: {
    background: 'rgb(247, 249, 250)'
}
}));

export default useStyles;
