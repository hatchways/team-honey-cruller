import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
root: {
    maxWidth: 645,
    width: '400px',
    background: 'rgba(0,0,0,0.5)',
    margin: '20px'
},
media: {
    height: 440
},
title: {
    fontWeight: 'bold',
    fontSize: '2rem',
    color: '#fff'
},
description: {
    fontSize: '1.1rem',
    color: '#ddd'
}
}));

export default useStyles;
