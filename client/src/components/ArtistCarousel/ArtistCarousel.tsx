import Carousel from 'react-material-ui-carousel';
import { Box } from '@material-ui/core';
import useStyles from './useStyles';

interface Props {
  info: [];
}

const ArtistCarousel = (): JSX.Element => {
    const classes = useStyles();

    const items = [
        {
            name: "jeewan",
            description: "What an artist",
        },
        {
            name: "another person",
            description: "What up",
        }
    ]

  return (
      <Box display="flex" justifyContent="center" alignItems="center" >
          <Carousel className={classes.carousel}>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
      </Box>
  );
};

export default ArtistCarousel;

function Item(props:any)
{
    return (
        <Box style={{background: 'none', color: '#fff', minHeight:'300px', opacity: '1 !important'}} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>
        </Box>
    )
}