import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import useStyles from './useStyles';

interface Props {
  images: string[];
  artist: string;
}

const SubmittedDesigns = ({ images, artist }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      {images.map((image) => (
        <ImageListItem key={image} cols={1} className={classes.listItem}>
          <img
            srcSet={`${image}?w=248&fit=crop&auto=format 1x,
            ${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={artist}
            loading="lazy"
          />
          <ImageListItemBar title={`By @${artist}`} />
        </ImageListItem>
      ))}
    </>
  );
};

export default SubmittedDesigns;
