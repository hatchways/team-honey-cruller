import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';

interface Props {
  images: string[];
  artist: string;
}

const SubmittedDesigns = ({ images, artist }: Props): JSX.Element => {
  return (
    <>
      {images.map((image) => (
        <ImageListItem key={image} cols={4}>
          <img
            srcSet={`${image}?w=248&fit=crop&auto=format 1x,
          ${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={artist}
            loading="lazy"
            style={{ height: '100%', width: '100%' }}
          />
          <ImageListItemBar title={`By @${artist}`} />
        </ImageListItem>
      ))}
    </>
  );
};

export default SubmittedDesigns;
