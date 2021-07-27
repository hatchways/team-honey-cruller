import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import useStyles from './useStyles';
import ImageModal from '../../components/ImageModal/ImageModal';

interface Props {
  images: string[];
  artistName: string;
  artistPic: string;
}

const SubmittedDesigns = ({ images, artistName, artistPic }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      {images.map((image) => (
        <ImageListItem key={image} cols={1} className={classes.listItem}>
          <ImageModal artistPic={artistPic} artistName={artistName} image={image}>
            <img
              srcSet={`${image}?w=248&fit=crop&auto=format 1x,
            ${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={artistName}
              loading="lazy"
              style={{ height: '250px', width: '100%' }}
            />
          </ImageModal>
          <ImageListItemBar title={`By @${artistName}`} classes={{ titleWrap: classes.by, root: classes.titleBar }} />
        </ImageListItem>
      ))}
    </>
  );
};

export default SubmittedDesigns;
