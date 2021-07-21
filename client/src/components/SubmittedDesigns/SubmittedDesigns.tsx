import Box from '@material-ui/core/Box';

import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';



{
  /* these images are temporary, will be deleted, After getting images as props from Contest.tsx file*/
}
import image1 from '../../Images/48bbc97ff2ad97160445538959a224e642ce5816.png';
import image2 from '../../Images/612bd8560dbfd2834c5d539bf0a1055d505f48a4.png';
import image3 from '../../Images/612bd8560dbfd2834c5d539bf0a1055d505f48a4.png';
import image4 from '../../Images/612bd8560dbfd2834c5d539bf0a1055d505f48a4.png';

interface Props {
  images: [];
  artist: string;
}

{
  /* tempImages is only for testing purpose, have to delete them later, after getting images from api*/
}
const tempImages = [
  {
    src: image1,
    artist: 'jesse',
  },
  {
    src: image2,
    artist: 'anthony',
  },
  {
    src: image3,
    artist: 'denise',
  },
  {
    src: image4,
    artist: 'james',
  },
];

const SubmittedDesigns = ({ images, artist }: Props): JSX.Element => {
  return (
    <Box textAlign="center">
      <ImageList cols={4} gap={10} style={{ marginTop: '40px', marginBottom: '20px' }}>
        {tempImages.map((item) => (
          <ImageListItem key={item.src}>
            <img
              srcSet={`${item.src}?w=248&fit=crop&auto=format 1x,
                ${item.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.artist}
              loading="lazy"
            />
            <ImageListItemBar title={`By @${item.artist}`} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default SubmittedDesigns;
