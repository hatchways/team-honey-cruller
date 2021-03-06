import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import useStyles from './useStyles';
import ImageModal from '../../components/ImageModal/ImageModal';
import { Link } from 'react-router-dom';

interface Props {
  images: string[];
  artistName: string;
  artistPic: string;
  submissionId: string;
  artistId: string;
}

const SubmittedDesigns = ({ images, artistName, artistPic, submissionId, artistId }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      {images.map((image) => (
        <ImageListItem key={image} cols={1} className={classes.listItem}>
          <ImageModal
            submissionId={submissionId}
            artistPic={artistPic}
            artistName={artistName}
            artistId={artistId ? artistId : null}
            image={image}
          >
            <img
              srcSet={`${image}?w=248&fit=crop&auto=format 1x,
            ${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={artistName}
              loading="lazy"
              style={{ height: '250px', width: '100%' }}
            />
          </ImageModal>
          <Link className={classes.link} to={{ pathname: '/artist', state: `${artistId}` }}>
            <ImageListItemBar title={`By @${artistName}`} classes={{ titleWrap: classes.by, root: classes.titleBar }} />
          </Link>
        </ImageListItem>
      ))}
    </>
  );
};

export default SubmittedDesigns;
